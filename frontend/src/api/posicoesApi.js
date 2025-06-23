
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
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dadosTecnica), 
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

export const deletarPosicaoEnviada = async (id) => {
  const response = await apiFetch(`/api/posicoes/${id}`, {
    method: 'DELETE',
  });
  return response;
};

export async function postAprovarTecnica(id, token) {
  return await apiFetch(`/api/posicoes/${id}/aprovar`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}


