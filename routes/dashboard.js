const express = require('express');
const path = require('path'); //Importa o módulo path para lidar com caminhos de arquivos (evita erros de sistema operacional).
const router = express.Router();
const verificarToken = require('../middlewares/authMiddleware');

//rota redirecionamento pra pagina em caso de login
router.get('/dashboard', verificarToken, (req, res) => {
  res.sendFile(path.join(__dirname,'..', 'public', 'dashboard.html'));
});

module.exports = router;