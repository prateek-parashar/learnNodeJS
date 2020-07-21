const express = require("express");
const { text } = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use("/welcome", (req, res, next) => {
    res.send("<h1> Hello From ExpressJS </h1>");
});

app.get("/add-product", (req, res, next) => {
    res.send(
        "<form action ='/product' method='POST'><input type='text' name = 'productName'> <button type='submit'> Add Product </button> </form>"
    );
});

app.post("/product", (req, res, next) => {
    console.log(req.body);
    res.redirect("/");
});

app.get("/", (req, res) => {
    console.log("HEllO THere!");
    res.send("<h1> Back to home, eh? </h1>");
});

app.listen(3000);
