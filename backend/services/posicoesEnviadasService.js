const posicoesEnviadasRepository = require('../repositories/posicoesEnviadasRepository');
const techniqueRepository = require('../repositories/techniqueRepository');

exports.criar = async (dados) => {
  return await posicoesEnviadasRepository.inserir(dados);
};

exports.deletarPosicao = async (id) => {
  return await posicoesEnviadasRepository.deletarPosicao(id);
};

exports.aprovarTecnica = async (id) => {
  const tecnica = await posicoesEnviadasRepository.buscarPorId(id);
  if (!tecnica) {
    throw new Error('Técnica não encontrada para aprovação.');
  }

  console.log('Aprovando técnica:', tecnica);
  await techniqueRepository.inserir({
    nome: tecnica.nome,
    posicao: tecnica.posicao,
    dificuldade: tecnica.dificuldade,
    finalidade: tecnica.finalidade,
    nome_usuario: tecnica.nome_usuario,
    video_url: tecnica.video_url || null, 
    //faixa_recomendada: tecnica.faixa_recomendada || null,
    //pontuacao: tecnica.pontuacao || null,
    //conexoes: tecnica.conexoes || null,
  });

  await posicoesEnviadasRepository.deletarPosicao(id);
};