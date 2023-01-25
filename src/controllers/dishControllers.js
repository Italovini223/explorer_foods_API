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

    const ingredientsInserted = ingredients.map((ingredient) => {
      return {
        name: ingredient,
        dish_id: dishId,
      }
    })

    await knex("ingredients").where({dish_id: dishId}).delete();
    await knex("ingredients").where({dish_id: dishId}).insert(ingredientsInserted);

    return response.json({
      message: "Prato atualizado com sucesso"
    })

  }

  async index(request, response){
    const {category} = request.body;

    const dish = await knex("dish").where({category});

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