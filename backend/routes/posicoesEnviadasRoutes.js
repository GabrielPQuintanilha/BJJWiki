const express = require('express');
const router = express.Router();
const controller = require('../controller/posicoesEnviadasController');
const authMiddleware = require('../middleware/authMiddleware'); // importe o middleware

router.post('/', authMiddleware, controller.criar);
router.get('/', authMiddleware, controller.listar);
router.delete('/:id', controller.deletarPosicao);

module.exports = router;
