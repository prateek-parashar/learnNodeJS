const express = require("express");

const path = require("path");

const rootDir = require("../util/path");
const adminData = require("./admin");

const router = express.Router();

router.use("/", (req, res, next) => {
    res.render("shop", {
        pageTitle: "Shop",
        products: adminData.products,
        hasProducts: adminData.products.length > 0,
        shopPage: true,
        activeShop: true,
    });
});

module.exports = router;
