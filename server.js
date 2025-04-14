
const express = require('express');
const path = require('path');
require('dotenv').config();


const app = express(); // Importa o framework Express e cria uma instância da aplicação.
const port = 3000; //Define a porta onde o servidor vai rodar (http://localhost:3000).

// Middleware para interpretar o corpo das requisições como JSON (como requisicoes fetch) - MOVER P MIDDLEWARE?
app.use(express.json()); 



// Serve arquivos publicos
app.use(express.static(path.join(__dirname, 'public')));

//Rotas (novo)
app.use('/',require('./routes/auth'));
app.use('/', require('./routes/dashboard'));

// Rota principal para a pagina de login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicializando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
}
);
