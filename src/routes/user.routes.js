const {Router} = require('express');
const UserController = require('../controllers/userControllers');


const UserRoutes = Router();
const userControllers = new UserController();

UserRoutes.post("/", userControllers.create);

module.exports = UserRoutes;