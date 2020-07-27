const express = require("express");

const path = require("path");

const productController = require("../controllers/product");

const rootDir = require("../util/path");
const adminData = require("./admin");

const router = express.Router();

router.get("/", productController.getProductList);

module.exports = router;
