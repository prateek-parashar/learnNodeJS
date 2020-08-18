const express = require("express");

const adminController = require("../controllers/admin");
const authCheck = require("../middleware/authCheck");

const router = express.Router();

// Creating the routes. Notice the methods used - app.get() and app.post()
// Appropriate controllers are called to handle the request
router.get("/add-product", authCheck, adminController.getAddProduct);

router.post("/add-product", authCheck, adminController.postProduct);

router.get("/products", authCheck, adminController.getProducts);

router.get("/edit-product/:productID", authCheck, adminController.getEditProduct);

router.post("/edit-product", authCheck, adminController.editProduct);

router.delete("/product/:productID", authCheck, adminController.deleteProduct);

// Here, we export an object whose keys will be the keys we set here for the exports object.
module.exports = router;
