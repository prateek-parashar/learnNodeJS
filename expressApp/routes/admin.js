const express = require("express");

const path = require("path");

const rootDir = require("../util/path");

const router = express.Router();
const productsArray = [];

router.get("/add-product", (req, res, next) => {
    res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post("/add-product", (req, res, next) => {
    productsArray.push({ title: req.body.title });
    res.redirect("/shop");
});

// Here, we are basically exporting an object whose keys will be the keys we set here for the exports object.
exports.routes = router;
exports.products = productsArray;
