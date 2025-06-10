import { apiFetch } from './apiClient';
const BASE_URL = 'http://localhost:3000';

export function fetchPosicoes() {
  return apiFetch('/users/posicoes');
}

export function fetchConexoes(posicaoId) {
  return apiFetch(`/users/conexoes/id/${posicaoId}`);
}

export async function postTecnica(dadosTecnica, token) {
  const response = await fetch(`${BASE_URL}/api/posicoes`, {
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

export function fetchPosicoesEnviadas() {
  return apiFetch('/api/posicoes'); // já que seu backend usa /api/posicoes
}
