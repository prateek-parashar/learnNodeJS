const express = require("express");

// Creating the routes. Notice the methods used - app.get() and app.post()
// Appropriate controllers are called to handle the request
const shopController = require("../controllers/shop");
const authCheck = require("../middleware/authCheck");

const adminData = require("./admin");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/shop");

router.get("/products", shopController.getProductList);

router.get("/product/:productID", shopController.getProduct);

router.get("/cart", authCheck, shopController.getCart);

router.post("/cart", authCheck, shopController.addToCart);

router.post("/cart-delete-item", authCheck, shopController.deleteFromCart);

router.get("/orders", authCheck, shopController.getOrders);

router.post("/create-order", authCheck, shopController.addOrder);

router.get("/checkout", authCheck, shopController.getCheckout);

// Here, we are basically exporting an object whose keys will be the keys we set here for the exports object.
module.exports = router;
