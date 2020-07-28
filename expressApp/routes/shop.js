const express = require("express");

// Creating the routes. Notice the methods used - app.get() and app.post()
// Appropriate controllers are called to handle the request
const productController = require("../controllers/product");

const adminData = require("./admin");

const router = express.Router();

router.get("/", productController.getProductList);

// Here, we are basically exporting an object whose keys will be the keys we set here for the exports object.
module.exports = router;
