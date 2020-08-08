const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProduct = (req, res, next) => {
    const id = req.params.productID;
    Product.findById(id)
        .then((product) => {
            res.render("shop/product-detail", {
                pageTitle: "Product Details",
                product: product,
                path: "/products",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getProductList = (req, res, next) => {
    Product.find()
        .then((productList) => {
            res.render("shop/product-list", {
                pageTitle: "All Products",
                products: productList,
                path: "/products",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getIndex = (req, res, next) => {
    Product.find()
        .then((productList) => {
            res.render("shop/index", {
                pageTitle: "Home",
                products: productList,
                path: "/",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getCart = (req, res, next) => {
    Cart.getCart((cart) => {
        res.render("shop/cart", {
            pageTitle: "Your Cart",
            path: "/cart",
            products: cart.products,
            totalPrice: cart.totalPrice,
        });
    });
};

exports.addToCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findProductById(productId, (product) => {
        Cart.addToCart(product);
    });

    res.redirect("/cart");
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
