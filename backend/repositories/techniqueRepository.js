const db = require('../db/client');

exports.findAllTechniques = async () => {
  const result = await db.query('SELECT id, nome, posicao, dificuldade, finalidade FROM posicoes');
  return result.rows;
};

exports.findConnectionsByTechniqueId = async (id) => {
  const result = await db.query(
    `SELECT p2.nome, p2.id
     FROM posicoes p1
     JOIN connections c ON p1.id = c.origin_id
     JOIN posicoes p2 ON c.destiny_id = p2.id
     WHERE p1.id = $1`,
    [id]
  );
  return result.rows;
};

exports.inserir = async ({
  nome,
  posicao,
  dificuldade,
  finalidade,
  video_url = null,
  nome_usuario,
  //faixa_recomendada = null,
  //pontuacao = null,
  //conexoes = null
}) => {
  const query = `
    INSERT INTO posicoes 
      (nome, posicao, dificuldade, finalidade, video_url, nome_usuario)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [nome, posicao, dificuldade, finalidade, video_url, nome_usuario];
  const result = await db.query(query, values);
  return result.rows[0];
};

exports.deletarTecnica = async (id) => {
  const query = 'DELETE FROM posicoes WHERE id = $1';
  await db.query(query, [id]);
};