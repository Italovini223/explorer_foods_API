const {Router} = require('express');

const UserRoutes = require('./user.routes');
const dishRoutes = require('./dish.routes');
const ordersRoutes = require('./orders.routes');
const sessionsRoutes = require('./sessions.routes');

const routes = Router();

routes.use("/user", UserRoutes);
routes.use("/dish", dishRoutes);
routes.use("/order", ordersRoutes);
routes.use("/singIn", sessionsRoutes);

module.exports = routes;
