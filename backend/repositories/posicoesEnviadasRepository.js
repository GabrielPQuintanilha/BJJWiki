const db = require('../db/client');

exports.inserir = async ({ nome, finalidade, posicao, nome_usuario }) => {
  const query = `
    INSERT INTO posicoes_enviadas (nome, finalidade, posicao, nome_usuario)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const result = await db.query(query, [nome, finalidade, posicao, nome_usuario]);
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
