const Product = require("../models/product");

exports.getProductList = (req, res, next) => {
    Product.fetchAll((productList) => {
        res.render("shop/product-list", {
            pageTitle: "All Products",
            products: productList,
            path: "/products",
        });
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll((productList) => {
        res.render("shop/index", {
            pageTitle: "Home",
            products: productList,
            path: "/",
        });
    });
};

exports.getCart = (req, res, next) => {
    res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
    });
};

exports.getOrders = (req, res, next) => {
    res.render("shop/orders", {
        pageTitle: "Orders",
        path: "/orders",
    });
};

exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout", {
        pageTitle: "Checkout",
        path: "/checkout",
    });
};
