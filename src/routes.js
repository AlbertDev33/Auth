const express = require('express');
const authMiddleware = require('./middlewares/auth');

const AuthController = require('./Controllers/AuthController');
const ProjectController = require('./Controllers/ProjectController');

const routes = express.Router();

routes.get('/users', authMiddleware, AuthController.index);
routes.post('/register', AuthController.store);
routes.get('/register/auth', AuthController.auth);
routes.post('/recovery', AuthController.recovery);
routes.post('/reset', AuthController.reset);

routes.get('/users/projects', authMiddleware, ProjectController.indexAll);
routes.get('/users/user/projects', authMiddleware, ProjectController.index);
routes.post('/users/create/projects', authMiddleware, ProjectController.store);

module.exports = routes;