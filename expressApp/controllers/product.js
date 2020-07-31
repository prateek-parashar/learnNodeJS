const Product = require("../models/product");

// Controllers
exports.getAddProduct = (req, res, next) => {
    res.render("admin/add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
    });
};

exports.postProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect("/");
};


exports.editProduct = (req, res, next) => {
    console.log("inside Edit method");
};
