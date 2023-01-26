const {Router} = require('express');
const DishControllers = require('../controllers/dishControllers');

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const ensureUserIsAdmin = require('../middlewares/ensureUserIsAdmin');

const multer = require('multer');
const uploadConfig = require('../configs/upload');
const upload = multer(uploadConfig.MULTER);

const dishRoutes = Router();
const dishControllers = new DishControllers();

dishRoutes.post("/create", ensureAuthenticated, ensureUserIsAdmin ,upload.single("avatar"), dishControllers.create);
dishRoutes.put("/update/:dishId", ensureAuthenticated, ensureUserIsAdmin ,upload.single("avatar"), dishControllers.update);
dishRoutes.get("/", ensureAuthenticated, dishControllers.index);
dishRoutes.get("/show/:id", ensureAuthenticated, dishControllers.show);
dishRoutes.delete("/delete/:id", ensureAuthenticated, ensureUserIsAdmin, dishControllers.delete);

module.exports = dishRoutes;