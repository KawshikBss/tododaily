var express = require("express");
var router = express.Router();

router.get("/signin", (req, res, next) => {
    res.render("signin");
});

router.get("/signup", (req, res, next) => {
    res.render("signup");
});

module.exports = router;
