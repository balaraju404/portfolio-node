const routes = require("express").Router();
const portfolioController = require('../../controller/portfolio/portfolio')

routes.post('/create', async (req, res, next) => {
 try {
  await portfolioController.create(req, res, next);
 } catch (error) {
  console.error(error);
 }
})
routes.post('/getAll', async (req, res, next) => {
 try {
  await portfolioController.details(req, res, next);
 } catch (error) {
  console.error(error);
 }
})


module.exports = routes