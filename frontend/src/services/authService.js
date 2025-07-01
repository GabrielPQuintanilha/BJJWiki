import * as authApi from '../api/authApi';

// --- Funções de Gerenciamento do Token  ---
export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function removeToken() {
  localStorage.removeItem('token');
}

// --- Funções de Autenticação e Perfil  ---

export async function login(name, password) {
  const response = await authApi.loginUser({ name, password });
  if (response && response.token) {
    setToken(response.token);
  }
  return response; 
}

export async function register(name, password) {
  const response = await authApi.registerUser({ name, password });
  if (response && response.token) {
    setToken(response.token);
  }
  return response;
}

export async function getUserProfile() {
  const token = getToken(); 
  if (!token) {
    throw new Error('Usuário não autenticado. Token não encontrado.');
  }
  return authApi.fetchUserProfile(token);
}

export async function changePassword(currentPassword, newPassword) {
  const token = getToken(); 
  if (!token) {
    throw new Error('Usuário não autenticado. Token não encontrado.');
  }
  return authApi.updatePasswordApi(currentPassword, newPassword, token);
}

export async function deleteUserAccount() {
  const token = getToken(); 
  if (!token) {
    throw new Error('Usuário não autenticado. Token não encontrado.');
  }
  const response = await authApi.deleteAccount(token);
  removeToken();
  return response;
}

// --- Funções Auxiliares ---
export function isAuthenticated() {
  return !!getToken(); 
}