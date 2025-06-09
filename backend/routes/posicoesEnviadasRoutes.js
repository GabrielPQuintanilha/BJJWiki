const express = require('express');
const router = express.Router();
const controller = require('../controller/posicoesEnviadasController');

router.post('/', controller.criar);

module.exports = router;
