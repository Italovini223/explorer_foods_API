const {Router} = require('express');
const DishControllers = require('../controllers/dishControllers');

const dishRoutes = Router();
const dishControllers = new DishControllers();

dishRoutes.post("/create", dishControllers.create);

module.exports = dishRoutes;