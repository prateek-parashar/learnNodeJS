const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");
const multer = require("multer");

const app = express();

const path = require("path");

const User = require("./models/user");

const MONGODB_URI =
    "mongodb+srv://prateek:i06ph4rYHQNkTIAf@cluster0.kybvw.mongodb.net/shop?retryWrites=true&w=majority";

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: "session",
});

// This object contains configurations which mutler uses to store the uploaded image
const fileStorageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().slice(0, 10) + "-" + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "inage/jpg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

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

// This is a middleware that allows us to parse the multipart data (images) sent to the server via forms
app.use(multer({ storage: fileStorageConfig, fileFilter: fileFilter }).single("image"));

// This is a middleware that allows us to send static files in response (html files)
app.use(express.static(path.join(rootDir, "public")));

// Initializing the session middleware
app.use(session({ secret: "test secret", resave: false, saveUninitialized: false, store: store }));

// Initializing the csrf protection middleware
app.use(csrfProtection);

// Initializing the flash middleware
app.use(flash());

// Setting the user for the session
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then((user) => {
            if (!user) {
                return next();
            }
            req.user = user;
            next();
        })
        .catch((err) => {
            console.log(err);
            next();
        });
});

// Setting the local variables which are sent to each and every rendered view
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();

    next();
});

// Here, we use the routes **Remember that in express, all middlewares work from top to bottom**
app.use(authRoutes);
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// Handling the not found requests!
app.use(errorRoutes);

app.use((err, req, res, next) => {
    res.redirect("/500");
});

mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => {
        throw new Error(err);
    });
