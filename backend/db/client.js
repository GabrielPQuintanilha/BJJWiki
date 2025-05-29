require('dotenv').config();
// o nome pool é quase uma convencao de "conexoes"
const { Pool } = require('pg'); // Importa a classe Pool do pg - reutiliza conexoes e otimiza desempenho/escalabilidade

// cria a conexao
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,    
});


module.exports = pool;