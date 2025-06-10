const posicoesEnviadasService = require('../services/posicoesEnviadasService');

exports.criar = async (req, res) => {
  try {
    const novaPosicao = await posicoesEnviadasService.criar(req.body);
    res.status(201).json(novaPosicao);
  } catch (error) {
    console.error('Erro no controller:', error);
    res.status(500).json({ error: 'Erro ao criar posição' });
  }
};

const posicoesEnviadasRepository = require('../repositories/posicoesEnviadasRepository');

exports.listar = async (req, res) => {
  try {
    const tecnicas = await posicoesEnviadasRepository.buscarTodas();
    res.json(tecnicas);
  } catch (error) {
    console.error('Erro ao buscar técnicas:', error);
    res.status(500).json({ message: 'Erro ao buscar técnicas' });
  }
};