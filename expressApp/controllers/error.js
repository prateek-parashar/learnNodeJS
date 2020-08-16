exports.getError404 = (req, res, next) => {
    res.status(404).render("error/404", {
        pageTitle: "It's All Empty here",
        path: "/error",
        isAuthenticated: req.session.isLoggedIn,
    });
};

exports.getError500 = (req, res, next) => {
    res.status(500).render("error/500", {
        pageTitle: "Oops!",
        path: "/error",
        isAuthenticated: req.session.isLoggedIn,
    });
};
