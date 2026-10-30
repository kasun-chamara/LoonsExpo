import axios from 'axios';
import localStorageService from './localStorageService';
import { getEnv } from '../envConfig';
import { jwtDecode } from 'jwt-decode';

const API_URL = getEnv().ENDPOINT;

export async function jwtLogin({ username, password }) {
  try {
    const response = await axios.post(`${API_URL}/api/users/login`, { email: username, password });
    console.log('Login response:', response.data);

    const { token, refreshToken } = response.data;
    // Store tokens
    await localStorageService.setItem('access_token', token);
    await localStorageService.setItem('refresh_token', refreshToken);
    // Decode user info from JWT
    // const base64Url = token.split('.')[1];
    // const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    /*  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
     }).join('')); */
    /* const decoded = JSON.parse(jsonPayload);
    const user = decoded.user || {
      name:decoded?.name || '',
      roles: decoded?.role || [],
      id: decoded?.id || ''
    }; */
    const decoded = jwtDecode(token);
    const roleNames = decoded.roles.map(role => role.role.name);

    const user = response.data.user

    user.roles = roleNames || [""];

    await localStorageService.setItem('user', user);
    return { user, accessToken: token, refreshToken };
  } catch (error) {
    // Throw error to be handled by Redux
    throw error.response ? error.response.data : { errorMessage: 'An unexpected error occurred.' };
  }
}

export async function jwtLogout() {
  await localStorageService.removeItem('access_token');
  await localStorageService.removeItem('refresh_token');
  await localStorageService.removeItem('user');
}
