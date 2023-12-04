const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/usersControllers');
/*Pour POST  SIGNUP */ /*Route d'inscription et de connexion*/
router.post(`/signup`, userControllers.createUser );
router.post('/login', userControllers.loginUser);

module.exports = router;