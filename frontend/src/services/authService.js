import * as authApi from '../api/authApi';

export async function login(name, password) {
  return authApi.loginUser({ name, password });
}

export async function register(name, password) {
  return authApi.registerUser({ name, password });
}

export async function getUserProfile(token) {
  return authApi.fetchUserProfile(token);
}

export async function changePassword(currentPassword, newPassword, token) {
  return authApi.updatePasswordApi(currentPassword, newPassword, token);
}

export async function deleteUserAccount(token) {
  return authApi.deleteAccount(token);
}
