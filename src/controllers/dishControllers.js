const knex = require('../database/knex');
const appError = require('../utils/appError');

class DishControllers {
  async create(request, response){
    const {name, description, price, ingredients} = request.body

    const integerPrice = price * 100;

    const dish_id = await knex("dish").insert({
      name,
      description,
      price: integerPrice
    });

    const ingredientsInsert = ingredients.map(name => {
      return {
        dish_id,
        name,
      }
    })

    await knex("ingredients").insert(ingredientsInsert);

    return response.status(201).json({
      message: "Prato criado com sucesso!"
    })
  }

  async index(request, response){
    const dish = await knex("dish")

    response.json(dish);
  }
}

module.exports = DishControllers