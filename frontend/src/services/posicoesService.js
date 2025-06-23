import * as posicoesApi from '../api/posicoesApi'; 
import { deletarPosicaoEnviada } from '../api/posicoesApi';
import { deletarTecnica as deletarTecnicaApi } from '../api/posicoesApi';


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
    await deletarPosicaoEnviada(id);
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

export const deletarTecnica = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await deletarTecnicaApi(id, token);
  } catch (error) {
    console.error('Erro ao deletar técnica no service:', error);
    throw new Error('Erro ao deletar técnica');
  }
};