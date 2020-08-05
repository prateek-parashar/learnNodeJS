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
    Product.create({
        title: req.body.title,
        imageURL: req.body.imageURL,
        description: req.body.description,
        price: req.body.price,
    })
        .then((result) => {
            res.redirect("/");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getProducts = (req, res, next) => {
    Product.findAll()
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
        Product.findByPk(id)
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
    Product.update(
        {
            title: req.body.title,
            imageURL: req.body.imageURL,
            description: req.body.description,
            price: req.body.price,
        },
        {
            where: {
                id: id,
            },
        }
    )
        .then((result) => {
            res.redirect("/admin/products");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.deleteProduct = (req, res, next) => {
    const id = req.body.id;
    Product.destroy({
        where: {
            id: id,
        },
    })
        .then((result) => {
            res.redirect("/admin/products");
        })
        .catch((err) => {
            console.log(err);
        });
};
