import * as posicoesApi from '../api/posicoesApi'; 
import { deletarPosicao } from '../api/posicoesApi';


export async function getAllPosicoes() {
    return posicoesApi.fetchPosicoes();
}

export async function fetchConexoesByPosicao(posicaoId) {
    return posicoesApi.fetchConexoes(posicaoId);
}

export async function enviarTecnica(dadosTecnica) {
    const token = localStorage.getItem('token'); 
    if (!token) {
        throw new Error('Authentication required: Token not found. Please log in.');
    }
    return posicoesApi.postTecnica(dadosTecnica, token);
}

export async function listarTecnicasEnviadas() {
    const token = localStorage.getItem('token'); 
    if (!token) {
        throw new Error('Authentication required: Token not found. Please log in.');
    }
    return posicoesApi.fetchTecnicasEnviadas(token); 
}

export const excluirTecnicaEnviada = async (id, setTecnicasEnviadas) => {
  const confirmar = window.confirm('Tem certeza que deseja deletar esta técnica?');
  if (!confirmar) return;

  try {
    await deletarPosicao(id);
    setTecnicasEnviadas((prev) => prev.filter((tecnica) => tecnica.id !== id));
  } catch (error) {
    console.error('Erro ao deletar técnica enviada:', error);
    throw error;
  }
};

export async function aprovarTecnica(id) {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required: Token not found. Please log in.');
  }
  return posicoesApi.postAprovarTecnica(id, token);
}
