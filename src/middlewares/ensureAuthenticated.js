const {verify} = require('jsonwebtoken');
const appError = require('../utils/appError');
const AuthConfig = require('../configs/Auth');

function ensureAuthenticated(request, response, next){
  const authHeader = request.headers.authorization

  if(!authHeader){
    throw new appError("JWT token nao informado", 401)
  } 

  const [, token] = authHeader.split(" ");

  try {
    const {sub: user_id} = verify(token, AuthConfig.jwt.secret);

    request.user = {
      id: Number(user_id)
    }

    return next();
  } catch {
    throw new appError("JWT token inválido", 401);
  }
}

module.exports = ensureAuthenticated;