import axios from 'axios';
import { getAccessToken, refreshToken } from './keycloakService';
import { getEnv, isDevelopment, isDebugMode } from '../envConfig';
import localStorageService from './localStorageService';

const env = getEnv();

const axiosInstance = axios.create({
  baseURL: env.ENDPOINT || '',
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach access token and add request logging
axiosInstance.interceptors.request.use(
  async (config) => {
    // Try multiple ways to get the access token
    let token = null;

    try {
      // First try the keycloak service
      token = await getAccessToken();
      console.log('token', token);
    } catch (error) {
      console.warn('Failed to get token from keycloak service:', error);
    }

    // Fallback to localStorage with different possible keys
    if (!token) {
      token = await localStorageService.getItem('access_token')

    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;

      // Log token for debugging (only in development)
      if (isDevelopment() && isDebugMode()) {
        console.log('🔑 Token attached:', token.substring(0, 20) + '...');
      }
    } else {
      console.warn('⚠️ No access token found');
    }

    // Log request for debugging (only in development and debug mode)
    if (isDevelopment() && isDebugMode()) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
        headers: {
          ...config.headers,
          Authorization: config.headers.Authorization ? 'Bearer [HIDDEN]' : 'None'
        }
      });
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor: handle 401, refresh token, and add response logging
axiosInstance.interceptors.response.use(
  (response) => {
    // Log successful response for debugging (only in development and debug mode)
    if (isDevelopment() && isDebugMode()) {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`, {
        data: response.data,
        headers: response.headers
      });
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Log error for debugging (always log errors)
    console.error('❌ API Error:', {
      status: error.response?.status,
      url: error.config?.url,
      method: error.config?.method,
      message: error.message,
      data: error.response?.data
    });

    // Handle 401 Unauthorized - try to refresh token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError);
        // Handle logout or redirect to login
        // You can dispatch a logout action here or redirect to login page
        return Promise.reject(refreshError);
      }
    }

    // Handle other common HTTP errors
    if (error.response) {
      switch (error.response.status) {
        case 403:
          console.error('🚫 Access forbidden - insufficient permissions');
          break;
        case 404:
          console.error('🔍 Resource not found');
          break;
        case 422:
          console.error('⚠️ Validation error:', error.response.data);
          break;
        case 500:
          console.error('💥 Server error - please try again later');
          break;
        default:
          console.error('❓ Unexpected error occurred');
      }
    } else if (error.request) {
      console.error('🌐 Network error - please check your connection');
    } else {
      console.error('⚙️ Request configuration error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
