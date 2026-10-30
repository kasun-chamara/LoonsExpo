import { login as keycloakLogin, logout as keycloakLogout } from '../../services/keycloakService';
import { jwtLogin, jwtLogout } from '../../services/jwtAuthService';
import { fakeLogin, fakeLogout } from '../../services/fakeAuthService';
import { getEnv } from '../../envConfig';
import { jwtDecode } from 'jwt-decode';
import localStorageService from '../../services/localStorageService';

const AUTH_METHOD = getEnv().AUTH_METHOD || 'keycloak';

export const login = (username, password) => async (dispatch) => {
  try {
    let user, accessToken, refreshToken;
    if (AUTH_METHOD === 'jwt') {
      const result = await jwtLogin({ username, password });
      user = result.user;
      accessToken = result.accessToken;
      refreshToken = result.refreshToken;
    } else if (AUTH_METHOD === 'fake') {
      const result = await fakeLogin({ username, password });
      user = result.user;
      accessToken = result.accessToken;
      refreshToken = result.refreshToken;
    } else {
      const response = await keycloakLogin({ username, password });
      accessToken = response.data.access_token;
      refreshToken = response.data.refresh_token;
      // Decode user info
      const decoded = jwtDecode(accessToken);
      user = {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        roles: decoded?.realm_access?.roles,
        family_name: decoded.family_name,
        given_name: decoded.given_name,
      };
    }
    // Store in localStorage using async service
    await localStorageService.setItem('access_token', accessToken);
    await localStorageService.setItem('refresh_token', refreshToken);
    await localStorageService.setItem('user', user);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { user, accessToken, refreshToken },
    });
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error?.data?.errorMessage || error?.errorMessage || 'Login failed',
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    if (AUTH_METHOD === 'jwt') {
      await jwtLogout();
    } else if (AUTH_METHOD === 'fake') {
      await fakeLogout();
    } else {
      await keycloakLogout();
    }
  } catch (e) {}
  // Remove from localStorage using async service
  await localStorageService.removeItem('access_token');
  await localStorageService.removeItem('refresh_token');
  await localStorageService.removeItem('user');
  dispatch({ type: 'LOGOUT' });
};
