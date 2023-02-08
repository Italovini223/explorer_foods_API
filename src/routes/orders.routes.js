const {Router} = require('express')
const OrderControllers = require('../controllers/ordersControllers');

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const ensureUserIsAdmin = require('../middlewares/ensureUserIsAdmin');

const ordersRoutes = Router();
const ordersControllers = new OrderControllers();

ordersRoutes.post('/create',ensureAuthenticated, ordersControllers.create);
ordersRoutes.get('/index',ensureAuthenticated, ordersControllers.index);
ordersRoutes.patch('/updateStatus',ensureAuthenticated, ensureUserIsAdmin, ordersControllers.update);

module.exports = ordersRoutes;