const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category");
var passport = require("passport");
//Router to home
router.get("/", CategoryController.getTop);

router.get("/error", (req, res) => {
    res.render("vwAccount/OTP");

});
router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: "/account/login/infoFB",
        failureRedirect: "/login"
    }),
    function(req, res) {
        res.redirect("/account/login/infoFB");
    }
);

module.exports = router;
