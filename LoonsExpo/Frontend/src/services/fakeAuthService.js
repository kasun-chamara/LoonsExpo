const FAKE_USERNAME = 'admin';
const FAKE_PASSWORD = 'admin';

const FAKE_USER = {
  id: 'fake-admin-1',
  name: 'Admin User',
  email: 'admin@example.com',
  roles: ['Admin', 'user'],
};

export async function fakeLogin({ username, password }) {
  if (username !== FAKE_USERNAME || password !== FAKE_PASSWORD) {
    const error = new Error('Invalid username or password.');
    error.errorMessage = 'Invalid username or password.';
    throw error;
  }

  return {
    user: FAKE_USER,
    accessToken: 'fake-access-token',
    refreshToken: 'fake-refresh-token',
  };
}

export async function fakeLogout() {
  return true;
}
