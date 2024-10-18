const routes = require('express').Router();
const login = require('./login/login');
const user = require('./user/user');
const portfolio = require('./portfolio/portfolio')


routes.use('/login', login);
routes.use('/user', user)
routes.use('portfolio', portfolio)

module.exports = routes;
