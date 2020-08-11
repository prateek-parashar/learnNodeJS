const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");

const app = express();

const path = require("path");

const User = require("./models/user");

const MONGODB_URI = "mongodb+srv://prateek:i06ph4rYHQNkTIAf@cluster0.kybvw.mongodb.net/shop?retryWrites=true&w=majority";

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: "session",
});

const csrfProtection = csrf();

// Importing the routes from the files
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
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

// Initializing the session middleware
app.use(session({ secret: "test secret", resave: false, saveUninitialized: false, store: store }));

// Initializing the csrf protection middleware
app.use(csrfProtection);

// This middleware is a hack to create a user and pass it around until we create authentication
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => console.log(err));
});

// Here, we use the routes **Remember that in express, all middlewares work from top to bottom**
app.use(authRoutes);
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// Handling the not found requests!
app.use(errorRoutes);

mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => console.log(err));
