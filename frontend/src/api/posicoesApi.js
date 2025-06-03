import { apiFetch } from './apiClient';

export function fetchPosicoes() {
  return apiFetch('/users/posicoes');
}

export function fetchConexoes(posicaoId) {
  return apiFetch(`/users/conexoes/id/${posicaoId}`);
}
