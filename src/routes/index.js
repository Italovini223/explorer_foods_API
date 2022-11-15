const {Router} = require('express');

const UserRoutes = require('./user.routes');
const dishRoutes = require('./dish.routes');

const routes = Router();

routes.use("/user", UserRoutes);
routes.use("/dish", dishRoutes);

module.exports = routes;
