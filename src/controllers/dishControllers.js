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

    const hasOnlyOneIngredient = typeof(ingredients) === "string";

    let ingredientsInsert

    if (hasOnlyOneIngredient) {
      ingredientsInsert = {
        name: ingredients,
        dish_id
      }
    
    } else if (ingredients.length > 1) {
        ingredientsInsert = ingredients.map(ingredient => {
            return {
            dish_id,
            name : ingredient
            }
        });
    }

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


    dish.name = name ?? dish.name;
    dish.description = description ?? dish.description;
    dish.price = price * 100 ?? dish.price;

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
    const {name} = request.query;

    let dishes

    const ingredients = await knex("ingredients").whereLike("name", `%${name}%`)

    if(ingredients.length > 0){
      const dishesId = ingredients.map(ingredient => ingredient.dish_id)

      dishes = await knex("dish").whereIn("id", dishesId).orderBy("name")

    } else {
      dishes = await knex("dish")
      .whereLike("name", `%${name}%`)
      .orderBy("name");
    }

    return response.json(dishes);
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

  async delete(request, response){
    const {id} = request.params;

    console.log(id);

    const dish = await knex("dish").where({id}).first();

    if(dish.avatar){
      await diskStorage.deleteFile(dish.avatar);
    }

    await knex("dish").where({id}).delete();

    return response.json({
      message: "Prato deletado com sucesso"
    }) 
  }
}

module.exports = DishControllers