const express = require('express');

const AuthController = require('./Controllers/AuthController');

const routes = express.Router();

routes.get('/users', AuthController.index);
routes.post('/register', AuthController.store);
routes.post('/register/auth', AuthController.auth);

module.exports = routes;