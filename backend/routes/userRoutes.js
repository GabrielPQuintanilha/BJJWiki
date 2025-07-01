const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const verificarToken = require('../middleware/authMiddleware');

router.get('/', userController.getUser); 
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/me', verificarToken, userController.getUserProfile); 
router.get('/posicoes', userController.getAllTechniques);
router.get('/conexoes/id/:id', userController.getConnectionsById);
router.delete('/delete-account', verificarToken, userController.deleteUser);
router.put('/update-password', verificarToken, userController.updatePassword);

module.exports = router;