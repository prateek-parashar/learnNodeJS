const express = require("express");
const app = express();

const path = require("path");

const sequelize = require("./util/database");

const Product = require("./models/product");
const User = require("./models/user");

// Importing the routes from the files
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorRoutes = require("./routes/error");
const rootDir = require("./util/path");
const { userInfo } = require("os");

// Setting the templating engine
// (since ejs comes preconfigured with express, we can add it just like that,
// however, for templating engines like handlebars, we have to create the engine ourselves using app.engine)
app.set("view engine", "ejs");

// This is a middleware that allows us to parse the data sent to the server via forms
app.use(express.urlencoded({ extended: true }));

// This is a middleware that allows us to send static files in response (html files)
app.use(express.static(path.join(rootDir, "public")));

// Middleware added to handle the dummy user
app.use((req, res, next) => {
    User.findById(1)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => console.log(err));
});

// Here, we use the routes **Remember that in express, all middlewares work from top to bottom**
app.use("/admin", adminRoutes);
app.use("/", shopRoutes);

// Handling the not found requests!
app.use(errorRoutes);

