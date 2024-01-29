const express = require('express');
const authRoutes = express.Router();
const trimRequest = require('trim-request');

const {register,login} = require('../../controllers/auth');
const {validateRegister, validateLogin} = require('../../controllers/auth/validators');

authRoutes.post('/register', trimRequest.body, validateRegister, register);
authRoutes.post('/login', trimRequest.all, validateLogin, login);

module.exports = {authRoutes};