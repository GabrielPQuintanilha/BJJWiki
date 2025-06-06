import { apiFetch } from './apiClient';

export function fetchPosicoes() {
  return apiFetch('/users/posicoes');
}

export function fetchConexoes(posicaoId) {
  return apiFetch(`/users/conexoes/id/${posicaoId}`);
}

export async function postTecnica(dadosTecnica, token) {
  const response = await fetch('/api/posicoes', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dadosTecnica),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao enviar técnica');
  }
  
  return response.json();
}
