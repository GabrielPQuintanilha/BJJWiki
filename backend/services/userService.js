const db = require('../db/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async () => {
  const result = await db.query('SELECT * FROM users');
  return result.rows;
};

exports.createUser = async (name, password) => {
  const userExists = await db.query('SELECT * FROM users WHERE name = $1', [name]);
  if (userExists.rows.length > 0) {
    throw new Error('O nome de usuário já está em uso.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.query(
    'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *',
    [name, hashedPassword]
  );
  return result.rows[0];
};

exports.loginUser = async (name, password) => {
  const user = await db.query('SELECT * FROM users WHERE name = $1', [name]);
  if (user.rows.length === 0) {
    throw new Error('Nome de usuário ou senha incorretos');
  }

  const match = await bcrypt.compare(password, user.rows[0].password);
  if (!match) {
    throw new Error('Nome de usuário ou senha incorretos');
  }

  const token = jwt.sign(
    { userId: user.rows[0].id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { token, user: { 
    id: user.rows[0].id,
    name: user.rows[0].name,
    is_admin: user.rows[0].is_admin,
    }};

};

exports.getUserProfile = async (userId) => {
  const result = await db.query('SELECT name, is_admin FROM users WHERE id = $1', [userId]);
  if (result.rows.length === 0) {
    throw new Error('Usuário não encontrado');
  }
  return result.rows[0];
};

exports.getAllTechniques = async () => {
  const result = await db.query('SELECT id, nome, posicao, dificuldade, finalidade FROM posicoes');
  return result.rows;
};

exports.getConnectionsById = async (id) => {
  const result = await db.query(`
    SELECT p2.nome, p2.id
    FROM posicoes p1
    JOIN connections c ON p1.id = c.origin_id
    JOIN posicoes p2 ON c.destiny_id = p2.id
    WHERE p1.id = $1;
  `, [id]);

  return result.rows;
};

exports.deleteUser = async (userId) => {
  const result = await db.query('DELETE FROM users WHERE id = $1', [userId]);
  return result.rowCount;
};

exports.updatePassword = async (userId, currentPassword, newPassword) => {
  const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
  const user = result.rows[0];
  if (!user) throw new Error('Usuário não encontrado');

  const match = await bcrypt.compare(currentPassword, user.password);
  if (!match) throw new Error('Senha atual incorreta');

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  await db.query('UPDATE users SET password = $1 WHERE id = $2', [hashedNewPassword, userId]);
};
