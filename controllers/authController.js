
const client = require('../db/client');
const jwt = require('jsonwebtoken');

// logica de login/busca no banco de dados
exports.login = async (req, res) => {
  const { usuario, senha } = req.body; //recebe usuario e senha da requisicao no html


  try {
    // Busca o usuário no banco de dados com o nome de usuário fornecido
    const result = await client.query(
        'SELECT * FROM users WHERE usuario = $1 AND senha = $2',
        [usuario, senha]
    );

    // Se o usuário não for encontrado ou a senha estiver errada
    if(result.rows.length ===0){
        return res.status(400).json({ error: 'Usuário ou senha incorretos' });
    }
    
    // Se a autenticação for bem-sucedida
    // Gera o token com os dados do usuário
    const token = jwt.sign(
      { usuario: usuario }, // payload (pode colocar também id, email, etc.)
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    // Retorna o token para o cliente
    res.status(200).json({
      success: true,
      message: "Login realizado com sucesso.",
      token: token
    });
}
    catch (err){
    console.error('Erro ao fazer login:', err);
    res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
    }
    };

exports.register = async(req,res)=>{ // Envia dados pro banco de dados
  const { usuario, senha } = req.body; //recebe usuario e senha da requisicao no html
  if (!usuario || !senha) {
  return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
}

try {
  // Verifica se o nome de usuário já existe no banco de dados
  const userCheck = await client.query(
    'SELECT * FROM users WHERE usuario = $1',
    [usuario]
  );

  // se existir retorna erro
  if (userCheck.rows.length > 0) {
    return res.status(400).json({ error: 'Nome de usuário já existe' });
  }

  // Inserir o novo usuário na tabela 'users'
  const result = await client.query(
    'INSERT INTO users (usuario, senha) VALUES ($1, $2) RETURNING *',
    [usuario, senha]
  );

  // Retorna os dados inseridos
  res.status(201).json({
    success: true,
    message: "Usuário registrado com sucesso."
  });
  
} catch (err) {
  console.error('Erro ao inserir usuário:', err);
  res.status(500).json({ error: 'Erro ao inserir no banco de dados' });
}}

// rota logout - derruba sessao

exports.logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logout realizado com sucesso."
  });
};


