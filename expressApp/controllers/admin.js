const Product = require("../models/product");

// Controllers
exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: false,
    });
};

exports.postProduct = (req, res, next) => {
    const product = new Product(req.body.title, req.body.imageURL, req.body.description, req.body.price);
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

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (editMode) {
        const productId = req.params.productID;
        Product.findProductById(productId, (product) => {
            if (!product) {
                return res.redirect("/");
            }
            res.render("admin/edit-product", {
                pageTitle: "Edit Product",
                path: "/admin/edit-page",
                editing: editMode,
                product: product,
            });
        });
    }
};
