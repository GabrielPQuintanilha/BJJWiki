const express = require('express');
const router = express.Router();
const posicoesController = require('../controller/posicoesController');
const authMiddleware = require('../middleware/authMiddleware');

router.delete('/:id', authMiddleware, posicoesController.deletarTecnica);

module.exports = router;