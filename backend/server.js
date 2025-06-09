const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

app.use(cors());

// Middleware usado em todas as rotas - fica nesse js por convencao
app.use(express.json());

// transforma "/users" em um prefixo para usar por exemplo GET /users (executa o GET do userController)
app.use('/users', userRoutes);

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });  

const posicoesEnviadasRoutes = require('./routes/posicoesEnviadasRoutes');
app.use('/api/posicoes', posicoesEnviadasRoutes);