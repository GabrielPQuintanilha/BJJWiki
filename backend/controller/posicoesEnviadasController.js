const posicoesEnviadasService = require('../services/posicoesEnviadasService');

exports.criar = async (req, res) => {
  try {
    console.log('Conteúdo de req.body no controller:', req.body);
    console.log('Usuário autenticado:', req.user);

    // Cria um objeto com os dados do corpo + o nome do usuário
    const dadosComUsuario = { 
      ...req.body,
      nome_usuario: req.user.nome // ou o campo certo do seu token
    };

    const novaPosicao = await posicoesEnviadasService.criar(dadosComUsuario);
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

exports.deletarPosicaoEnviada = async (req, res) => {
  try {
    const id = req.params.id;
    await posicoesEnviadasService.deletarPosicaoEnviada(id);
    res.status(200).json({ message: 'Posição deletada com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar posição.' });
  }
};

exports.aprovarTecnica = async (req, res) => {
  const { id } = req.params;

  try {
    await posicoesEnviadasService.aprovarTecnica(id);
    res.status(200).json({ message: 'Técnica aprovada com sucesso!' });
  } catch (error) {
    console.error('Erro ao aprovar técnica:', error);
    res.status(500).json({ message: 'Erro ao aprovar técnica' });
  }
};