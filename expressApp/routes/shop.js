const express = require("express");

const router = express.Router();

router.use("/welcome", (req, res, next) => {
    res.send("<h1> Hello From ExpressJS </h1>");
});

router.get("/", (req, res) => {
    console.log("HEllO THere!");
    res.send("<h1> Back to home, eh? </h1>");
});

module.exports = router;
