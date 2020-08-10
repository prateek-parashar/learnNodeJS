exports.getError404 = (req, res, next) => {
    res.status(404).render("404", {
        pageTitle: "It's All Empty here",
        path: "/",
        isAuthenticated: req.session.isLoggedIn,
    });
};
