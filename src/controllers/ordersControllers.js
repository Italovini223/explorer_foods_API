const knex = require('../database/knex');
const appError= require('../utils/appError');
class OrderRoutes {
  async create(request, response){
    const {user_id} = request.params;
    const {dishId, quantity}= request.query;

    const filteredDishes = dishId.split(',').map(dish => dish.trim());
    const filteredQuantity = quantity.split(',').map(quantity => quantity.trim())

    console.log(filteredDishes)

    const dish = await knex('dish')
    .select([
      "dish.price",
      "dish.id"
    ])
    .whereIn("id", filteredDishes)
    

    return response.json({dish, filteredQuantity})
  }
}

module.exports = OrderRoutes;