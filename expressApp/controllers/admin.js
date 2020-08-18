const Product = require("../models/product");
const user = require("../models/user");
const fileHelper = require("../util/file");

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
    const image = req.file;
    const description = req.body.description;

    const product = new Product({
        title: title,
        price: price,
        imageURL: image.path,
        description: description,
        userId: req.user, //We don't have to pass in the id manually, mongoose picks it up automatically cause of type definition
    });

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
    Product.find({ userId: req.session.user._id })
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
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImage = req.file;
    const updatedDescription = req.body.description;

    Product.findById(id)
        .then((product) => {
            if (product.userId.toString() !== req.session.user._id.toString()) {
                return res.redirect("/");
            }
            product.title = updatedTitle;
            product.price = updatedPrice;
            if (updatedImage) {
                fileHelper.deleteFile(product.imageURL);
                product.imageURL = updatedImage.path;
            }
            product.description = updatedDescription;
            return product.save().then((result) => {
                res.redirect("/admin/products");
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.deleteProduct = (req, res, next) => {
    const id = req.params.productID;
    Product.findById(id)
        .then((product) => {
            if (!product) {
                return next(new Error(err));
            }
            fileHelper.deleteFile(product.imageURL);
            return Product.deleteOne({ _id: id, userId: req.session.user._id });
        })
        .then(() => {
            res.status(200).json({ message: "success" });
        })
        .catch((err) => {
            res.status(500).json({ message: "failed" });
        });
};
