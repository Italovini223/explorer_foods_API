const knex = require ('../database/knex');
const appError = require('../utils/appError');
const AuthConfig = require('../configs/Auth');

const {compare} = require('bcrypt');
const {sign} = require('jsonwebtoken')


class SessionsController {
  async create(request, response){
    const {email, password} = request.body;

    const user = await knex("users").where({email}).first();

    if(!user) {
      throw new appError("Email e/ou senha incorretos!", 401)
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched){
      throw new appError("Email e/ou senha incorretos!", 401)
    }

    const {expiresIn, secret} = AuthConfig.jwt
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return response.status(201).json({user, token});
  }
} 

module.exports = SessionsController;
