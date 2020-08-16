const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const Product = require("../models/product");
const Order = require("../models/order");
const rootDir = require("../util/path");

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
    Order.find({ "user.userID": req.user._id })
        .then((orders) => {
            res.render("shop/order", {
                pageTitle: "Orders",
                path: "/orders",
                orders: orders,
            });
        })
        .catch((err) => {
            console.log(err);
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
                    email: req.user.email,
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

exports.getInvoice = (req, res, next) => {
    const orderID = req.params.orderID;

    Order.findById(orderID)
        .then((order) => {
            if (!order) {
                return next(new Error("No order found!"));
            }

            if (order.user.userID.toString() !== req.user._id.toString()) {
                return next(new Error("Unauthorized"));
            }
            const invoiceName = "invoice-" + orderID + ".pdf";
            const invoicePath = path.join("data", "invoices", invoiceName);

            const pdfDocument = new PDFDocument();

            pdfDocument.pipe(fs.createWriteStream(invoicePath));

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", "inline; filename=" + invoiceName + "");

            pdfDocument.pipe(res);

            pdfDocument.fontSize(26).text("Invoice", {
                underline: true,
            });
            pdfDocument.text("-----------------------");
            let totalPrice = 0;
            order.products.forEach((prod) => {
                totalPrice += prod.quantity * prod.product.price;
                pdfDocument
                    .fontSize(14)
                    .text(prod.product.title + " - " + prod.quantity + " x " + "$" + prod.product.price);
            });
            pdfDocument.text("---");
            pdfDocument.fontSize(20).text("Total Price: $" + totalPrice);

            pdfDocument.end();
        })
        .catch((err) => {
            console.log(err);
            return next(new Error(err));
        });
};
