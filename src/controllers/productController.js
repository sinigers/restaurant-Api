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

router.get("/:productId/delete", async (req, res) => {
  try {
    let deleted = await productService.delete(req.params.productId);
    res.send(deleted);
  } catch (error) {
    res.send(error);
  }
});

router.post("/:productId/edit", async (req, res) => {
  try {
    let product = await productService.updateOne(
      req.params.productId,
      req.body
    );
    res.send(product);
  } catch (error) {
    res.send(error);
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

// const { isAuth }  = require("../middlewares/authMiddleware.js");
// const router = require("express").Router();

// const productsService = require("../services/productsService");

// router.post("/create", async (req, res) => {
//   try {
//     await productsService.create({ ...req.body });
//     res.send(req.body);
//   } catch (error) {
//     res.status(500).end();
//   }
// });

// router.get("/:productId/details", async (req, res) => {
//   try {
//     let product = await productsService.getOne(req.params.productId);
//     res.send(product);
//   } catch (error) {
//     res.status(404).send(error);
//   }
// });

// router.get("/products", async (req, res) => {
//   try {
//     let products = await productsService.getAll();
//     res.send(products);
//   } catch (error) {
//     res.send(error);
//   }
// });

// router.get("/:productId/delete", async (req, res) => {
//   try {
//     let deleted = await productsService.delete(req.params.productId);
//     res.send(deleted);
//   } catch (error) {
//     res.send(error);
//   }
// });

// router.post("/:productId/edit", async (req, res) => {
//   try {
//     let product = await productsService.updateOne(
//       req.params.productId,
//       req.body
//     );
//     res.send(product);
//   } catch (error) {
//     res.send(error);
//   }
// });

// router.get("/catalog/category/:categoryName", async (req, res) => {
//   try {
//     let product = await productsService.getByCategory(req.params.categoryName);
//     res.send(product);
//   } catch (error) {
//     res.status(404).send(error);
//   }
// });

// router.get("/catalog/category/:categoryName/:productId", async (req, res) => {
//   try {
//     let products = await productsService.getByCategorySix(
//       req.params.categoryName,
//       req.params.productId
//     );
//     res.send(products);
//   } catch (error) {
//     res.status(404).send(error);
//   }
// });

// module.exports = router;
