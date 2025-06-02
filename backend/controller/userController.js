const userService = require('../services/userService');

exports.getUser = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Erro ao acessar o banco de dados');
  }
};

exports.createUser = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await userService.createUser(name, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { name, password } = req.body;
  try {
    const result = await userService.loginUser(name, password);
    res.json({ message: 'Login bem-sucedido', ...result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await userService.getUserProfile(req.user.userId);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getAllTechniques = async (req, res) => {
  try {
    const techniques = await userService.getAllTechniques();
    res.json(techniques);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar posições' });
  }
};

exports.getConnectionsById = async (req, res) => {
  try {
    const connections = await userService.getConnectionsById(parseInt(req.params.id));
    res.json(connections);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar conexões' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedCount = await userService.deleteUser(req.user.userId);
    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.status(200).json({ message: 'Conta deletada com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    await userService.updatePassword(req.user.userId, currentPassword, newPassword);
    res.status(200).json({ message: 'Senha atualizada com sucesso' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
