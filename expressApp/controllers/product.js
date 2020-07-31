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
    res.redirect("/shop");
};

exports.getProductList = (req, res, next) => {
    Product.fetchAll((productList) => {
        res.render("shop/product-list", {
            pageTitle: "Shop",
            products: productList,
            hasProducts: productList.length > 0,
            path: "/shop",
        });
    });
};
