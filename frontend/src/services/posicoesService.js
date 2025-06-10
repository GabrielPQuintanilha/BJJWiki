import * as posicoesApi from '../api/posicoesApi'; 

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
