const knex = require('../database/knex');
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

    console.log(ingredients.length);

    return response.status(201).json({
      message: "Prato criado com sucesso!"
    })
  }

  async update(request, response){
    const {name, description, price, ingredients, category} = request.body;
    const {dishId} = request.params;


    const dish = await knex("dish").where({id: dishId}).first();

    const avatarFileName = request.file.filename;

    if(dish.avatar){
      await diskStorage.deleteFile(dish.avatar);
    }

    const avatar = await diskStorage.saveFile(avatarFileName);

    dish.name = name ?? dish.name;
    dish.description = description ?? dish.description;
    dish.price = price * 100 ?? dish.price;
    dish.category = category ?? dish.category;
    dish.avatar = avatar ?? dish.avatar;

    await knex("dish").where({id: dishId}).update(dish);

    const hasOnlyOneIngredient = typeof(ingredients) === "string";

    let ingredientsInsert

    if (hasOnlyOneIngredient) {
      ingredientsInsert = {
        name: ingredients,
        dish_id: dish.id,
      }
    
    } else if (ingredients.length > 1) {
        ingredientsInsert = ingredients.map(ingredient => {
            return {
            dish_id: dish.id,
            name : ingredient
            }
        });
    }
      
    await knex("ingredients").where({ dish_id: dishId}).delete();
    await knex("ingredients").where({ dish_id: dishId}).insert(ingredientsInsert)


    return response.json({
      message: "Prato atualizado com sucesso"
    })

  }

  async index(request, response){
    const dish = await knex("dish");

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