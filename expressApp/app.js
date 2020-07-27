const express = require("express");
const app = express();

const path = require("path");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorRoutes = require("./routes/error");
const rootDir = require("./util/path");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);

app.get("/", (req, res) => {
    console.log("HEllO THere!");
    res.send("<h1> Back to home, eh? </h1>");
});

// Handling the not found requests!
// app.use(errorRoutes);

app.use(errorRoutes);

app.listen(3000);
