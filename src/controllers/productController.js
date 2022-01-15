const router = require("express").Router();

// const { ADMIN_USER_EMAIL } = require("../config/constants");
const productService = require("../services/productService");
const { auth } = require("../middlewares/authMiddleware");

router.get("/products", async (req, res, next) => {
  try {
    const products = await productService.getAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:productId", async (req, res, next) => {
  try {
    const product = await productService.getOne(req.params.productId);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.patch("/:productId/edit", auth, async (req, res, next) => {
  try {
    const product = await productService.getOne(req.params.productId);

    if (product.creator.toJSON() !== req.user._id.toJSON()) {
      throw { message: "You are not authorized to edit this product!" };
    }

    await productService.update(req.params.productId, req.body);
    res
      .status(200)
      .json({ message: `Product ${product.title} is successfully updated` });
  } catch (error) {
    next(error);
  }
});

router.delete("/:productId/delete", auth, async (req, res, next) => {
  try {
    const product = await productService.getOne(req.params.productId);
    if (product === null) {
      throw { message: "This product is not exist in data base!" };
    }
    if (product.creator.toJSON() !== req.user._id.toJSON()) {
      throw { message: "You are not authorized to delete this product!" };
    }

    await productService.delete(req.params.productId);
    res.status(200).json({ message: "Product is successfully deleted" });
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res) => {
  // const creator = req.user._id;

  const productData = {
    ...req.body
    // creator
  };

  try {
    const product = await productService.create(productData);

    res
      .status(201)
      .json({ message: `Product ${product.title} is successfully created` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
