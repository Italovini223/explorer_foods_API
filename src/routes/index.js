const {Router} = require('express');

const UserRoutes = require('./user.routes');
const dishRoutes = require('./dish.routes');
const ordersRoutes = require('./orders.routes');

const routes = Router();

routes.use("/user", UserRoutes);
routes.use("/dish", dishRoutes);
routes.use("/order", ordersRoutes);

module.exports = routes;
