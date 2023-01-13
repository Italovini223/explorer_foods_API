const {Router} = require('express')
const OrderControllers = require('../controllers/ordersControllers');

const ordersRoutes = Router();
const ordersControllers = new OrderControllers();

ordersRoutes.post('/create/:user_id', ordersControllers.create);
ordersRoutes.get('/index/:user_id', ordersControllers.index);
ordersRoutes.patch('/updateStatus/:user_id', ordersControllers.update);

module.exports = ordersRoutes;