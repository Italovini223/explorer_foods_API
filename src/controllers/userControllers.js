const knex = require('../database/knex');
const appError = require('../utils/appError');

class UserController {
  async create(request, response) {
    const {name, email, password, isAdmin = false} = request.body
    
    await knex("users").insert({
      name,
      email,
      password,
      isAdmin
    });
  }
}

module.exports = UserController;