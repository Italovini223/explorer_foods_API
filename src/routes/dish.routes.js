const {Router} = require('express');
const DishControllers = require('../controllers/dishControllers');

const dishRoutes = Router();
const dishControllers = new DishControllers();

dishRoutes.post("/create", dishControllers.create);
dishRoutes.get("/", dishControllers.index);
dishRoutes.get("/show/:id", dishControllers.show);

module.exports = dishRoutes;