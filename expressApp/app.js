const express = require("express");
const app = express();
const expressHbs = require("express-handlebars");

const path = require("path");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const rootDir = require("./util/path");

//Setting the values of the templating engine
app.engine("hbs", expressHbs());

app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminRoutes.routes);
app.use("/shop", shopRoutes);

app.get("/", (req, res) => {
    console.log("HEllO THere!");
    res.send("<h1> Back to home, eh? </h1>");
});

// Handling the not found requests!
app.use((req, res, next) => {
    res.status(404).render("404", { pageNotFound: "It's All Empty here" });
});

app.listen(3000);
