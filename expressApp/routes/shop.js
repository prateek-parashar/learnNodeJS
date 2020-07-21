const express = require("express");

const router = express.Router();

router.use("/welcome", (req, res, next) => {
    res.send("<h1> Hello From ExpressJS </h1>");
});



module.exports = router;
