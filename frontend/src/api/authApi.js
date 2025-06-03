import { apiFetch } from './apiClient';

export function loginUser(credentials) {
  return apiFetch('/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
}

export function registerUser(credentials) {
  return apiFetch('/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
}

export function fetchUserProfile(token) {
  return apiFetch('/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function updatePasswordApi(currentPassword, newPassword, token) {
  return apiFetch('/users/update-password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

export function deleteAccount(token) {
  return apiFetch('/users/delete-account', {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
}
