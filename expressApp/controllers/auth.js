const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const User = require("../models/user");
const { request } = require("http");

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
        flashMessage = undefined;
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
        flashMessage = undefined;
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

exports.getReset = (req, res, next) => {
    let flashMessage = req.flash("errMessage");

    if (flashMessage.length > 0) {
        flashMessage = flashMessage[0];
    } else {
        flashMessage = undefined;
    }
    res.render("auth/reset-password", {
        path: "/reset-password",
        pageTitle: "Reset Password",
        flashMessage: flashMessage,
    });
};

exports.postReset = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            return res.redirect("/reset-password");
        }
        const token = buffer.toString("hex");
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (!user) {
                    req.flash("error", "No account with that email found.");
                    return res.redirect("/reset-password");
                }
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 36000000;
                return user.save().then((result) => {
                    res.redirect("/");
                    transporter.sendMail({
                        to: req.body.email,
                        from: "shop@node-complete.com",
                        subject: "Password reset",
                        html: `
                  <p>You requested a password reset</p>
                  <p>Click this <a href="http://localhost:3000/update-password/${token}">link</a> to set a new password.</p>
                `,
                    });
                });
            })
            .catch((err) => {
                console.log(err);
            });
    });
};

exports.getUpdate = (req, res, next) => {
    const token = req.params.token;
    // $gt ==> Greater than (we are finding the value as we are filtering it! Cool!)
    User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
        .then((user) => {
            if (!user) {
                return res.redirect("/login");
            } else {
                let flashMessage = req.flash("errMessage");

                if (flashMessage.length > 0) {
                    flashMessage = flashMessage[0];
                } else {
                    flashMessage = undefined;
                }
                res.render("auth/update-password", {
                    path: "/update-password",
                    pageTitle: "Update Password",
                    flashMessage: flashMessage,
                    id: user._id.toString(),
                    resetToken: token,
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postUpdate = (req, res, next) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const token = req.body.resetToken;
    const userId = req.body.userID;
    bcrypt.hash(password, 32).then().catch();
    let resetUser;

    User.findOne({ _id: userId, resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
        .then((user) => {
            resetUser = user;
            return bcrypt.hash(password, 12);
        })
        .then((hashedPassword) => {
            resetUser.password = hashedPassword;
            resetUser.resetToken = undefined;
            resetUser.resetTokenExpiration = undefined;
            return resetUser.save();
        })
        .then((result) => {
            res.redirect("/login");
        })
        .catch((err) => {
            console.log(err);
        });
};
