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

export async function listarTecnicas() {
  return posicoesApi.fetchPosicoesEnviadas();
}

export async function listarTecnicasEnviadas() {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token não encontrado');

  const response = await fetch('http://localhost:3000/api/posicoes', {
    
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro na resposta: ${response.status}`);
  }
  console.log("Criando Constante")

  const data = await response.json(); 
  return data;
}
