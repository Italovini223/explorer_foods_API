const { response } = require('express');
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

  async index(request, response){
    const {user_id} = request.params;

    let orders;

    const user = await knex("users").where({id: user_id}).first();

    if(user.isAdmin !== 1){
      orders = await knex("orderDishes").where({user_id})
      .select([
        "orders.id",
        "orders.user_id",
        "orders.status",
        "orders.total",
        "orders.payMethod",
        "orders.crated_at"
      ])
      .innerJoin("orders", "orders.id", "orderDishes.order_id")
      .groupBy("orders.id")

      const orderDishes = await knex("orderDishes")
      const ordersWithDishes = orders.map(order => {
        const orderDish = orderDishes.filter(dish => dish.order_id === order.id);

        return {
          ...order,
          dishes: orderDish
        }
      })

      return response.json(ordersWithDishes);

    } else {
      orders =  await knex("orderDishes")
      .select([
        "orders.id",
        "orders.user_id",
        "orders.status",
        "orders.total",
        "orders.payMethod",
        "orders.crated_at"
      ])
      .innerJoin("orders", "orders.id", "orderDishes.order_id")
      .groupBy("orders.id")

      const orderDishes = await knex("orderDishes")
      const orderWithDishes = orders.map(order => {
        const orderDish = orderDishes.filter(dish => dish.order_id === order.id);

        return {
          ...order,
          itens: orderDish
        }
      })
      
      return response.json(orderWithDishes)
    }

  }

  async update(request, response){
    const {id, status} = request.body;
    const {user_id} = request.params;

    const user = await knex("users").where({id: user_id}).first();

    if(user.isAdmin !== 1){
      throw new appError("somente administradores podem atualizar os pedidos", 401);
    }

    await knex("orders").update({status}).where({id});

    return response.json({
      message: "Status do pedido atualizado com sucesso!"
    });
  }

}

module.exports = OrderRoutes;