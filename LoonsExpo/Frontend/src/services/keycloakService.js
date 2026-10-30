import axios from 'axios';
import localStorageService from './localStorageService';
import { getEnv } from '../envConfig'
// Fill in your Keycloak config here
const KEYCLOAK_URL = getEnv().KEYCLOAK_URL; // e.g., https://auth.example.com
const REALM = getEnv().REALM;
const CLIENT_ID = getEnv().CLIENT_ID;
// const CLIENT_SECRET = 'YOUR_CLIENT_SECRET'; // Uncomment if needed

export async function login({ username, password }) {
  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('client_id', CLIENT_ID);
  params.append('username', username);
  params.append('password', password);
  // params.append('client_secret', CLIENT_SECRET); // Uncomment if needed

  const response = await axios.post(
    `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token`,
    params
  );
  console.log(response.data);

  return response;
}

export async function getAccessToken() {
  return await localStorageService.getItem('access_token');
}

export async function getRefreshToken() {
  return await localStorageService.getItem('refresh_token');
}

export async function refreshToken() {
  const refreshTokenValue = getRefreshToken();
  if (!refreshTokenValue) throw new Error('No refresh token');
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('client_id', CLIENT_ID);
  params.append('refresh_token', refreshTokenValue);
  // params.append('client_secret', CLIENT_SECRET); // Uncomment if needed

  const response = await axios.post(
    `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token`,
    params
  );
  localStorageService.setItem('access_token', response.data.access_token);
  localStorageService.setItem('refresh_token', response.data.refresh_token);
  return response.data.access_token;
}

export async function logout() {
  const refreshTokenValue = getRefreshToken();
  if (!refreshTokenValue) return;
  const params = new URLSearchParams();
  params.append('client_id', CLIENT_ID);
  params.append('refresh_token', refreshTokenValue);
  // params.append('client_secret', CLIENT_SECRET); // Uncomment if needed

  await axios.post(
    `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/logout`,
    params
  );
  localStorageService.removeItem('access_token');
  localStorageService.removeItem('refresh_token');
}
