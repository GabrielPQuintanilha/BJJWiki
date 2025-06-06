import * as posicoesApi from '../api/posicoesApi';

export async function getAllPosicoes() {
  return posicoesApi.fetchPosicoes();
}

export async function fetchConexoesByPosicao(posicaoId) {
  return posicoesApi.fetchConexoes(posicaoId);
}

// Exemplo usando fetch, ajuste a URL conforme seu backend
export async function enviarTecnica(dadosTecnica) {
  const token = localStorage.getItem('token');
  // Aqui você pode validar ou transformar dados antes de enviar
  return posicoesApi.postTecnica(dadosTecnica, token);
}