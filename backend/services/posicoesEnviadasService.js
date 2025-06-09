const posicoesEnviadasRepository = require('../repositories/posicoesEnviadasRepository');

exports.criar = async (dados) => {
  // Aqui você pode aplicar regras de negócio antes de salvar
  return await posicoesEnviadasRepository.inserir(dados);
};
