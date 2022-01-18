const router = require("express").Router();

const productController = require("./controllers/productController");
// const authController = require('./controllers/authController');
// const userController = require('./controllers/userController');

router.use("/", productController);
// router.use('/auth', authController);
// router.use('/users', userController);

module.exports = router;
