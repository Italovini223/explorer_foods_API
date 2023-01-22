const {Router} = require('express');
const DishControllers = require('../controllers/dishControllers');

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const multer = require('multer');
const uploadConfig = require('../configs/upload');
const upload = multer(uploadConfig.MULTER);

const dishRoutes = Router();
const dishControllers = new DishControllers();

dishRoutes.post("/create", ensureAuthenticated, upload.single("avatar"), dishControllers.create);
dishRoutes.put("/update/:dishId", ensureAuthenticated, upload.single("avatar"), dishControllers.update);
dishRoutes.get("/", dishControllers.index);
dishRoutes.get("/show/:id", dishControllers.show);

module.exports = dishRoutes;