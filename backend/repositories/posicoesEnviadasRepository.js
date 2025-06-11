const db = require('../db/client');

exports.inserir = async ({ nome, finalidade, posicao }) => {
  const query = `
    INSERT INTO posicoes_enviadas (nome, finalidade, posicao)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const result = await db.query(query, [nome, finalidade, posicao]);
  return result.rows[0];
};

exports.buscarTodas = async () => {
  const result = await db.query('SELECT * FROM posicoes_enviadas');
  return result.rows;
};

exports.deletarPosicao = async (id) => {
  const query = 'DELETE FROM posicoes_enviadas WHERE id = $1';
  await db.query(query, [id]);
};
