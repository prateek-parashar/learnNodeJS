const express = require("express");
const app = express();

const path = require("path");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);

app.get("/", (req, res) => {
    console.log("HEllO THere!");
    res.send("<h1> Back to home, eh? </h1>");
});

// Handling the not found requests!
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "views", "error404.html"));
});

app.listen(3000);
