const routes = require('express').Router();
const login = require('./login/login');

routes.use('/login', login);

module.exports = routes;
