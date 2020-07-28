const express = require("express");

const errorController = require("../controllers/error");

const router = express.Router();

router.use("/", errorController.getError404);

// Here, we are basically exporting an object whose keys will be the keys we set here for the exports object.
module.exports = router;
