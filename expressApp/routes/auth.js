const express = require("express");
const { check } = require("express-validator");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post("/login", authController.postLogin);

router.post(
    "/signup",
    [
        check("email")
            .isEmail()
            .withMessage("Enter a valid email please")
            .custom((value, { req }) => {
                return User.findOne({ email: value }).then((user) => {
                    if (user) {
                        return Promise.reject("The user already exists!");
                    }
                });
            }),

        // Here you can see another way to use the same method
        check("password", "Please input a valid password which is atleast 5 character")
            .isLength({ min: 5 })
            .isAlphanumeric(),

        check("confirmPassword").custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("The passwords should match");
            }

            return true;
        }),
    ],
    authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset-password", authController.getReset);

router.post("/reset-password", authController.postReset);

router.get("/update-password/:token", authController.getUpdate);

router.post("/update-password", authController.postUpdate);

module.exports = router;
