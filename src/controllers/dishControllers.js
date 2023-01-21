const knex = require('../database/knex');
const appError = require('../utils/appError');
const DisKStorage = require('../providers/diskStorage')

const diskStorage = new DisKStorage();

class DishControllers {
  async create(request, response){
    const {name, description, price, ingredients, category} = request.body

    const integerPrice = price * 100;

    const fileName = request.file.filename;
    const avatar = await diskStorage.saveFile(fileName);



    const dish_id = await knex("dish").insert({
      name,
      description,
      category,
      price: integerPrice,
      avatar
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

  async update(request, response){
    
  }

  async index(request, response){
    const {category} = request.body;
    const {name} = request.query

    const dish = await knex("dish").where({category}).whereLike("name",`%${name}%`)

    response.json(dish);
  }

  async show(request, response){
    const {id} = request.params;

    const dish = await knex("dish").where({id}).first()
    const ingredients = await knex("ingredients").where({dish_id: id}).orderBy("name")

    return response.json({
      ...dish,
      ingredients
    })
  }
}

module.exports = DishControllers