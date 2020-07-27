const express = require("express");

const productController = require("../controllers/product");

const router = express.Router();

router.get("/add-product", productController.getAddProduct);

router.post("/add-product", productController.postProduct);

// Here, we are basically exporting an object whose keys will be the keys we set here for the exports object.
module.exports = router;
