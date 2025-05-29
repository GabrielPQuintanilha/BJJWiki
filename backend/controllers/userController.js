const db = require('../db/client.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool=require('../db/client')

//como a rota acessa o get

exports.getUser= async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM users');
      res.json(result.rows); // Envia os dados como resposta em formato JSON
      console.log("users table RECEBIDA")
    } catch (error) {
      console.error('Erro ao consultar o banco de dados', error);
      res.status(500).send('Erro ao acessar o banco de dados');
    }
  };
  

// como a rota insere um dado  
exports.createUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    // verificar se ja existe
    const userExists = await db.query('SELECT * FROM users WHERE name = $1', [name]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'O nome de usuário já está em uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // O número 10 é a quantidade de "salt rounds" (quanto mais alto, mais seguro)

    const result = await db.query(
      'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *',
      [name, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
    console.log("Usuário inserido com sucesso");

  } catch (error) {
    console.error('Erro ao inserir no banco de dados', error);
    res.status(500).send('Erro ao inserir no banco de dados');
  }
};

exports.loginUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await db.query('SELECT * FROM users WHERE name = $1', [name]);

    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Nome de usuário ou senha incorretos' });
    }

    const match = await bcrypt.compare(password, user.rows[0].password);
    if (!match) {
      return res.status(400).json({ message: 'Nome de usuário ou senha incorretos' });
    }

    // Gerar um token JWT com o ID do usuário
    const token = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } 
    );

    // Enviar o token JWT como resposta
    res.json({
      message: 'Login bem-sucedido',
      token: token,
      name:user.rows[0].name
    });

  } catch (error) {
    console.error('Erro ao tentar realizar login', error);
    res.status(500).json({ message: 'Erro no servidor ao tentar realizar login' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // vem do middleware
    const user = await pool.query('SELECT name  FROM users WHERE id = $1', [userId]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(user.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar perfil:', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.getAllTechniques = async (req, res) => {
  try {
    const result = await db.query('SELECT id, nome, posicao, dificuldade, finalidade FROM posicoes');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar posições:', err);
    res.status(500).json({ message: 'Erro ao buscar posições' });
  }
};

exports.getConnectionsById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await db.query(`
      SELECT p2.nome, p2.id
      FROM posicoes p1
      JOIN connections c ON p1.id = c.origin_id  
      JOIN posicoes p2 ON c.destiny_id = p2.id  
      WHERE p1.id = $1;
    `, [id]);
    console.log(result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar conexões', err);
    res.status(500).json({ message: 'Erro ao buscar conexões' });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [userId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json({ message: 'Conta deletada com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar usuário:', err);
    res.status(500).json({ message: 'Erro interno ao deletar usuário.' });
  }
};

exports.updatePassword = async (req, res) => {
  const userId = req.user.userId; // Vem do token JWT via middleware
  const { currentPassword, newPassword } = req.body;

  try {
    // 1. Buscar o usuário no banco
    const userResult = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // 2. Verificar se a senha atual está correta
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha atual incorreta' });
    }

    // 3. Hash da nova senha
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // 4. Atualizar senha no banco
    await db.query('UPDATE users SET password = $1 WHERE id = $2', [hashedNewPassword, userId]);

    res.status(200).json({ message: 'Senha atualizada com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar senha:', err);
    res.status(500).json({ message: 'Erro interno ao atualizar senha' });
  }
};