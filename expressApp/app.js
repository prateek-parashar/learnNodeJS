const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
    console.log("This always runs");
    next();
});


app.use("/welcome", (req, res, next) => {
    console.log("In another middleWare!");
    res.send("<h1> Hello From ExpressJS </h1>");
});

app.use("/", (req, res) => {
    console.log("HEllO THere!");
});

app.listen(3000);
