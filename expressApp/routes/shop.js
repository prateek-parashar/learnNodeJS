const express = require("express");

// Creating the routes. Notice the methods used - app.get() and app.post()
// Appropriate controllers are called to handle the request
const shopController = require("../controllers/shop");

const adminData = require("./admin");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/shop");

router.get("/products", shopController.getProductList);

router.get("/cart", shopController.getCart);

router.get("/orders", shopController.getOrders);

router.get("/checkout", shopController.getCheckout);

// Here, we are basically exporting an object whose keys will be the keys we set here for the exports object.
module.exports = router;
