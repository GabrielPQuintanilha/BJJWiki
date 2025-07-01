const express = require('express');
const router = express.Router();
const controller = require('../controller/posicoesEnviadasController');
const verificarToken = require('../middleware/authMiddleware'); 

router.post('/', verificarToken, controller.criar);
router.get('/', verificarToken, controller.listar);
router.delete('/:id', controller.deletarPosicaoEnviada);
router.post('/:id/aprovar', verificarToken, controller.aprovarTecnica);

module.exports = router;
