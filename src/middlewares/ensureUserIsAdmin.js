const knex = require('../database/knex');
const appError = require('../utils/appError');

async function ensureUserIsAdmin(request, response, next){
  const user_id = request.user.id;

  const user = await knex("users").where({id: user_id});

  if(!user.isAdmin === 1){
    throw new appError("Somente administradores tem permissão", 401)
  }

  return next();

} 

module.exports = ensureUserIsAdmin;