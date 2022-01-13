const express = require("express");

const authController = require("./controllers/authController");
const productController = require("./controllers/productController");

const router = express.Router();

router.use("/", productController);
router.use("/auth", authController);
// router.use('*', (req, res) => {
//     res.status(404).render('404');
// });
router.use("/mobile/product", productController);

module.exports = router;
