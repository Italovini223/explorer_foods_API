const {Router} = require('express')
const OrderControllers = require('../controllers/ordersControllers');

const ordersRoutes = Router();
const ordersControllers = new OrderControllers();

ordersRoutes.post('/create/:user_id', ordersControllers.create);
ordersRoutes.get('/index/:user_id', ordersControllers.index);

module.exports = ordersRoutes;