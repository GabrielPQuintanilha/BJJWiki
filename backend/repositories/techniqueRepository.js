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
