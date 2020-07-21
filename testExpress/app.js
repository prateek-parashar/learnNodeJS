const express = require("express");

app = express();

app.use("/user", (req, res, next) => {
    console.log("Inside users route");
    res.send("<h1> Welcome user! </h1>");
});

app.use("/", (req, res, next) => {
    res.send("<h1> HOEM HOME HLOMES </h1>");
});

app.listen(3001);
