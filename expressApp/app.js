const express = require("express");
const mongoose = require("mongoose");

const app = express();

const path = require("path");

const User = require("./models/user");

// Importing the routes from the files
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorRoutes = require("./routes/error");
const rootDir = require("./util/path");
const user = require("./models/user");

// Setting the templating engine
// (since ejs comes preconfigured with express, we can add it just like that,
// however, for templating engines like handlebars, we have to create the engine ourselves using app.engine)
app.set("view engine", "ejs");

// This is a middleware that allows us to parse the data sent to the server via forms
app.use(express.urlencoded({ extended: true }));

// This is a middleware that allows us to send static files in response (html files)
app.use(express.static(path.join(rootDir, "public")));

// This middleware is a hack to create a user and pass it around until we create authentication
app.use((req, res, next) => {
    User.findById("5f2ee8394ce47b1d98b327f3")
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => {
            console.log(err);
        });
});

// Here, we use the routes **Remember that in express, all middlewares work from top to bottom**
app.use("/admin", adminRoutes);
app.use("/", shopRoutes);

// Handling the not found requests!
app.use(errorRoutes);

mongoose
    .connect("mongodb+srv://prateek:i06ph4rYHQNkTIAf@cluster0.kybvw.mongodb.net/shop?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        User.findOne().then((user) => {
            if (!user) {
                const user = new User({
                    name: "Leslie",
                    email: "knope@parcsandrec.com",
                    cart: {
                        items: [],
                    },
                });
                user.save();
            }
        });

        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });
