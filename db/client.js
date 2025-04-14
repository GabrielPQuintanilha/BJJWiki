const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'XXX',
  password: 'XXX',
  database: 'XXX'
});

client.connect()
  .then(() => console.log('Conectado ao PostgreSQL'))
  .catch(err => console.error('Erro ao conectar ao PostgreSQL:', err.stack));

module.exports = client;