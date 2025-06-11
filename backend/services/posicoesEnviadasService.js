const posicoesEnviadasRepository = require('../repositories/posicoesEnviadasRepository');

exports.criar = async (dados) => {
  // Aqui você pode aplicar regras de negócio antes de salvar
  return await posicoesEnviadasRepository.inserir(dados);
};

exports.deletarPosicao = async (id) => {
  return await posicoesEnviadasRepository.deletarPosicao(id);
};
