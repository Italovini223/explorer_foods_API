const knex = require('../database/knex');
const DisKStorage = require('../providers/diskStorage')

const diskStorage = new DisKStorage();

class DishAvatarController {
  async update(request, response) {

    const { dishId } = request.params;

    const dish = await knex("dish").where({id: dishId}).first();

    const avatarFileName =request.file.filename;

    if(dish.avatar){
      await diskStorage.deleteFile(dish.avatar);
    }

    const avatar = await diskStorage.saveFile(avatarFileName);

    dish.avatar = avatar;

    await knex('dish').where({id: dishId}).update(dish)

    return response.json();
  }
}

module.exports = DishAvatarController