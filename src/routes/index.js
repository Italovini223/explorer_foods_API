const {Router} = require('express');

const UserRoutes = require('./user.routes');

const routes = Router();

routes.use("/user", UserRoutes);

module.exports = routes;
