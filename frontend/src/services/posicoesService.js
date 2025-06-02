export async function fetchPosicoes() {
  const response = await fetch('http://localhost:3000/users/posicoes');
  if (!response.ok) throw new Error('Erro ao carregar posições');
  return await response.json();
}

export async function fetchConexoesPorPosicao(posicaoId) {
  const response = await fetch(`http://localhost:3000/users/conexoes/id/${posicaoId}`);
  if (!response.ok) throw new Error('Erro ao carregar sequências');
  return await response.json();
}