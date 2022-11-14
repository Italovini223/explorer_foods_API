const knex = require('../database/knex');
const appError = require('../utils/appError');
const {hash} = require('bcrypt');

class UserController {
  async create(request, response) {
    const {name, email, password, isAdmin = false} = request.body

    const checkUserExists = await knex("users").where({email})

    console.log(checkUserExists)

    if(checkUserExists.length > 0) {
      throw new appError("Este email já existe, favor cadastrar outro!", 401)
    }

    const hashedPassword = await hash(password, 8);
    
    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
      isAdmin
    });

    return response.status(201).json({
      message: "Usuário cadastrado com sucesso!",
    })
  }
}

module.exports = UserController;