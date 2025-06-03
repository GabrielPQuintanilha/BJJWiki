const userService = require('../services/userService');
const db = require('../db/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const techniqueService = require('../services/techniqueService');

exports.getUser = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Erro ao acessar o banco de dados' });
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
  try {
    const { name, password } = req.body;
    const result = await db.query('SELECT * FROM users WHERE name = $1', [name]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Nome de usuário ou senha incorretos' });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Nome de usuário ou senha incorretos' });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        is_admin: user.is_admin,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro no login' });
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

exports.getAllTechniques = async (_req, res) => {
  try {
    const techniques = await techniqueService.getAllTechniques();
    res.json(techniques);
  } catch (error) {
    console.error('Erro em getAllTechniques:', error);
    res.status(500).json({ message: 'Erro ao buscar técnicas' });
  }
};

exports.getConnectionsById = async (req, res) => {
  try {
    const id = req.params.id;
    const connections = await techniqueService.getConnectionsById(id);
    res.json(connections);
  } catch (error) {
    console.error('Erro em getConnectionsById:', error);
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
