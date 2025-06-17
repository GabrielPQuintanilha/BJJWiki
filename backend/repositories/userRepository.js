const db = require('../db/client');

exports.findAll = async () => {
  const result = await db.query('SELECT * FROM users');
  return result.rows;
};

exports.findByName = async (name) => {
  const result = await db.query('SELECT * FROM users WHERE name = $1', [name]);
  return result.rows[0]; 
};

exports.findById = async (id) => {
  const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

exports.create = async (name, hashedPassword) => {
  const result = await db.query(
    'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *',
    [name, hashedPassword]
  );
  return result.rows[0];
};

exports.deleteById = async (userId) => {
  const result = await db.query('DELETE FROM users WHERE id = $1', [userId]);
  return result.rowCount;
};

exports.updatePassword = async (userId, hashedPassword) => {
  await db.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);
};
