const Product = require("../models/product");

// Controllers
exports.getAddProduct = (req, res, next) => {
    res.render("add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
    });
};

exports.postProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect("/shop");
};

exports.getProductList = (req, res, next) => {
    const productList = Product.fetchAll();
    res.render("shop", {
        pageTitle: "Shop",
        products: productsArray,
        hasProducts: productsArray.length > 0,
        path: "/shop",
    });
};
