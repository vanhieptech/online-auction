const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category");
var passport = require("passport");
//Router to home
router.get("/", CategoryController.getTop);

router.get("/error", (req, res) => {
    res.render("error.hbs");
});

router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: "/",
        failureRedirect: "/login"
    }),
    function(req, res) {
        res.redirect("/");
    }
);

module.exports = router;