const express = require('express');
const authMiddleware = require('./middlewares/auth');

const AuthController = require('./Controllers/AuthController');
const ProjectController = require('./Controllers/ProjectController');

const routes = express.Router();

routes.get('/users', AuthController.index);
routes.post('/register', AuthController.store);
routes.post('/register/auth', AuthController.auth);

routes.get('/projects', authMiddleware, ProjectController.index);

module.exports = routes;