const productsArray = [];

exports.getAddProduct = (req, res, next) => {
    res.render("add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
    });
};

exports.postProduct = (req, res, next) => {
    productsArray.push({ title: req.body.title });
    res.redirect("/shop");
};

exports.getProductList = (req, res, next) => {
    res.render("shop", {
        pageTitle: "Shop",
        products: productsArray,
        hasProducts: productsArray.length > 0,
        path: "/shop",
    });
};
