const Product = require("../models/product");
const Order = require("../models/order");

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
    req.user
        .populate("cart.items.productID")
        .execPopulate()
        .then((user) => {
            productList = user.cart.items;
            res.render("shop/cart", {
                pageTitle: "Cart",
                path: "/cart",
                products: productList,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.deleteFromCart = (req, res, next) => {
    const productId = req.body.productId;
    req.user
        .deleteFromCart(productId)
        .then((result) => {
            res.redirect("/cart");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.addToCart = (req, res, next) => {
    const productId = req.body.productId;

    Product.findById(productId)
        .then((product) => {
            req.user.addToCart(product);
            res.redirect("/cart");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getOrders = (req, res, next) => {
    orders = [];
    res.render("shop/order", {
        pageTitle: "Orders",
        path: "/orders",
        orders: orders,
    });
};

exports.addOrder = (req, res, next) => {
    req.user
        .populate("cart.items.productID")
        .execPopulate()
        .then((user) => {
            productList = user.cart.items.map((i) => {
                return { quantity: i.quantity, product: { ...i.productID._doc } };
            });

            const order = new Order({
                user: {
                    name: req.user.name,
                    userID: req.user,
                },
                products: productList,
            });

            order.save();
        })
        .then((result) => {
            req.user.clearCart();
        })
        .then((result) => {
            res.redirect("/orders");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout", {
        pageTitle: "Checkout",
        path: "/checkout",
    });
};
