// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', userController.getUser); 
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/me', authMiddleware, userController.getUserProfile); 
router.get('/posicoes', userController.getAllTechniques);
router.get('/conexoes/id/:id', userController.getConnectionsById);
router.delete('/delete-account', authMiddleware, userController.deleteUser);
router.put('/update-password', authMiddleware, userController.updatePassword);

module.exports = router;