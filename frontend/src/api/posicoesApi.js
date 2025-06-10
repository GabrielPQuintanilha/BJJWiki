
import { apiFetch } from './apiClient';

export function fetchPosicoes() {
  return apiFetch('/users/posicoes');
}

export function fetchConexoes(posicaoId) {
  return apiFetch(`/users/conexoes/id/${posicaoId}`);
}

export async function postTecnica(dadosTecnica, token) {
  return apiFetch('/api/posicoes', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: dadosTecnica,
  });
}

export function fetchTecnicasEnviadas(token) { 
  return apiFetch('/api/posicoes', {
    method: 'GET', 
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}