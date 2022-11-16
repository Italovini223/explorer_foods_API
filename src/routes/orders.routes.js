const {Router} = require('express')
const OrderControllers = require('../controllers/ordersControllers');

const ordersRoutes = Router();
const ordersControllers = new OrderControllers();

ordersRoutes.post('/create/:user_id', ordersControllers.create);

module.exports = ordersRoutes;