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
    const title = req.body.title;
    const price = req.body.price;
    const imageURL = req.body.imageURL;
    const description = req.body.description;

    const product = new Product(title, price, description, imageURL);

    product
        .save()
        .then((result) => {
            res.redirect("/");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then((productList) => {
            res.render("admin/product-list", {
                pageTitle: "Home",
                products: productList,
                path: "/admin/products",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (editMode) {
        const id = req.params.productID;
        Product.findById(id)
            .then((product) => {
                res.render("admin/edit-product", {
                    pageTitle: "Edit Product",
                    path: "/admin/edit-page",
                    editing: editMode,
                    product: product,
                });
            })
            .catch((err) => {
                console.log(err);
                return res.redirect("/");
            });
    }
};

exports.editProduct = (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const price = req.body.price;
    const imageURL = req.body.imageURL;
    const description = req.body.description;

    const product = new Product(title, price, description, imageURL);

    Product.updateProduct(id, product)
        .then(() => {
            res.redirect("/admin/products");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.deleteProduct = (req, res, next) => {
    const id = req.body.id;
    Product.deleteProduct(id)
        .then((result) => {
            res.redirect("/admin/products");
        })
        .catch((err) => {
            console.log(err);
        });
};
