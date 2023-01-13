const knex = require('../database/knex');
const appError= require('../utils/appError');
class OrderRoutes {
  async create(request, response){
    const {user_id} = request.params;
   const {total, payMethod, status, cart} = request.body;

   const order_id = await knex("orders").insert({
    status,
    payMethod,
    total,
    user_id
   });

   const dishesInCart = cart.map(dish => {
    return {
      title: dish.name,
      quantity: dish.quantity,
      dish_id: dish.id,
      order_id
    }
   });

   await knex("orderDishes").insert(dishesInCart);

   return response.status(201).json({
      message: `Pedido efetuado com sucesso. Numero do pedido = ${order_id}`
   });
  }
}

module.exports = OrderRoutes;