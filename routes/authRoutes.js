const express = require('express');
const router = express.Router();
const { registerValidation, loginValidation, validationMiddleware } = require('../middlewares/validationMiddleware');
const authController = require('../controllers/authController');

// Route untuk registrasi pengguna
router.post('/register', validationMiddleware(registerValidation), authController.register);

// Route untuk login pengguna
router.post('/login', validationMiddleware(loginValidation), authController.login);

module.exports = router;
