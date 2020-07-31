const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// Creating the routes. Notice the methods used - app.get() and app.post()
// Appropriate controllers are called to handle the request
router.get("/add-product", adminController.getAddProduct);

router.post("/add-product", adminController.postProduct);

router.get("/products", adminController.getProducts);

router.get("/edit-product", adminController.editProduct);

// Here, we export an object whose keys will be the keys we set here for the exports object.
module.exports = router;
