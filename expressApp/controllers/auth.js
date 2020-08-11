const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const User = require("../models/user");

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: "wilhelmine.cronin@ethereal.email",
        pass: "66zMsRRAQuwRDhUyKj",
    },
});

exports.getLogin = (req, res, next) => {
    let flashMessage = req.flash("errMessage");

    if (flashMessage.length > 0) {
        flashMessage = flashMessage[0];
    } else {
        flashMessage = null;
    }

    res.render("auth/login", {
        path: "/login",
        pageTitle: "Login",
        flashMessage: flashMessage,
    });
};

exports.getSignup = (req, res, next) => {
    let flashMessage = req.flash("errMessage");

    if (flashMessage.length > 0) {
        flashMessage = flashMessage[0];
    } else {
        flashMessage = null;
    }
    res.render("auth/signup", {
        path: "/signup",
        pageTitle: "Signup",
        flashMessage: flashMessage,
    });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                req.flash("errMessage", "Invalid email or password");
                return res.redirect("/login");
            }

            bcrypt
                .compare(password, user.password)
                .then((result) => {
                    if (!result) {
                        req.flash("errMessage", "Invalid email or password");
                        return res.redirect("/login");
                    } else {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save((err) => {
                            if (err) {
                                console.log(err);
                            }
                            res.redirect("/");
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    return res.redirect("/login");
                });
        })
        .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({ email: email })
        .then((user) => {
            if (user) {
                req.flash("errMessage", "User already exists");
                return res.redirect("/signup");
            } else {
                return bcrypt
                    .hash(password, 12)
                    .then((hashedPassword) => {
                        const user = new User({
                            email: email,
                            password: hashedPassword,
                            cart: { items: [] },
                        });

                        return user.save();
                    })
                    .then((result) => {
                        res.redirect("/login");
                        return transporter.sendMail({
                            from: '"Fred Foo 👻" <foo@example.com>', // sender address
                            to: "bar@example.com, baz@example.com", // list of receivers
                            subject: "Hello ✔", // Subject line
                            text: "Hello world?", // plain text body
                            html: "<b>Hello world?</b>", // html body
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        })

        .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect("/");
    });
};
