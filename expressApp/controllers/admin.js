const Product = require("../models/product");

// Controllers
exports.getAddProduct = (req, res, next) => {
    res.render("admin/add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
    });
};

exports.postProduct = (req, res, next) => {
    const product = new Product(
        req.body.title,
        req.body.imageURL,
        req.body.description,
        req.body.price
    );
    product.save();
    res.redirect("/");
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((productList) => {
        res.render("admin/product-list", {
            pageTitle: "Home",
            products: productList,
            path: "/admin/products",
        });
    });
};

exports.editProduct = (req, res, next) => {
    console.log("inside Edit method");
};
