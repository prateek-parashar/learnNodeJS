const express = require("express");
const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(express.urlencoded({ extended: true }));

app.use(adminRoutes);
app.use(shopRoutes);

// Handling the not found requests!
app.use((req, res, next) => {
    res.status(404).send("<img src='https://http.cat/404'/>");
});

app.listen(3000);
