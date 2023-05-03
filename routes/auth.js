var express = require("express");
var router = express.Router();
var User = require("../models/users");
var bcrypt = require("bcrypt");
var passport = require("passport");

router.get("/signin", (req, res, next) => {
    if (req.user) return res.redirect("/tasks");
    res.render("signin");
});

router.post(
    "/signin",
    passport.authenticate("local", {
        failureRedirect: "/auth/signin",
        failureMessage: true,
    }),
    (req, res, next) => {
        res.redirect("/tasks");
    }
);

router.get("/signup", (req, res, next) => {
    if (req.user) return res.redirect("/tasks");
    res.render("signup");
});

router.post("/signup", async (req, res, next) => {
    var userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
        return res.redirect("/auth/singup");
    }
    try {
        var salt = await bcrypt.genSalt(10);
        var hashedPassword = await bcrypt.hash(req.body.password, salt);
        var user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        user = await user.save();
    } catch (err) {
        console.error(err);
    }
    req.login(user, (err) => {
        if (err) {
            return res.redirect("/auth/singup");
        }
        return res.redirect("/tasks");
    });
});

router.get("/signout", function (req, res, next) {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

module.exports = router;
