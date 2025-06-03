import * as posicoesApi from '../api/posicoesApi';

export async function getAllPosicoes() {
  return posicoesApi.fetchPosicoes();
}

export async function fetchConexoesByPosicao(posicaoId) {
  return posicoesApi.fetchConexoes(posicaoId);
}
