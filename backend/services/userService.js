const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const { validarNomeUsuario, validarSenha } = require('../shared/userValidation');



exports.getAllUsers = async () => {
  return await userRepository.findAll();
};

exports.createUser = async (name, password) => {
  if (!validarNomeUsuario(name)) {
    throw new Error('Nome de usuário inválido: deve ter de 5 a 20 caracteres, sem espaços.');
  }

  if (!validarSenha(password)) {
    throw new Error('Senha inválida: mínimo 8 caracteres e sem espaços.');
  }

  const existingUser = await userRepository.findByName(name);
  if (existingUser) {
    throw new Error('O nome de usuário já está em uso.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return await userRepository.create(name, hashedPassword);
};

exports.loginUser = async (name, password) => {
  const user = await userRepository.findByName(name);
  if (!user) throw new Error('Nome de usuário ou senha incorretos');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Nome de usuário ou senha incorretos');

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      is_admin: user.is_admin,
    }
  };
};

exports.getUserProfile = async (userId) => {
  const user = await userRepository.findById(userId);
  if (!user) throw new Error('Usuário não encontrado');

  return { name: user.name, is_admin: user.is_admin };
};

exports.deleteUser = async (userId) => {
  return await userRepository.deleteById(userId);
};

exports.updatePassword = async (userId, currentPassword, newPassword) => {
  const user = await userRepository.findById(userId);
  if (!user) throw new Error('Usuário não encontrado');

  const match = await bcrypt.compare(currentPassword, user.password);
  if (!match) throw new Error('Senha atual incorreta');

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await userRepository.updatePassword(userId, hashedPassword);
};
