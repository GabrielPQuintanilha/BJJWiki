import { apiFetch } from './apiClient';

export function loginUser(credentials) {
  return apiFetch('/users/login', {
    method: 'POST',
    body: credentials, 
  });
}

export function registerUser(credentials) {
  return apiFetch('/users/register', {
    method: 'POST',
    body: credentials, 
  });
}

export function fetchUserProfile(token) {
  return apiFetch('/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function updatePasswordApi(currentPassword, newPassword, token) {
  const requestBody = { currentPassword, newPassword };
  
  return apiFetch('/users/update-password', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: requestBody, 
  });
}

export function deleteAccount(token) {
  return apiFetch('/users/delete-account', {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
}