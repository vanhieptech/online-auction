const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category");
var passport = require("passport");
const userModel = require("../models/account.M");
//Router to home
router.get("/", CategoryController.getTop);

router.get("/error", (req, res) => {
    res.render("vwAccount/OTP");

});
router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
        failureRedirect: "/login"
    }),
    async function(req, res) {
        req.session.FB = req.user;
        const user = await userModel.singleByUsername(req.session.FB.id);
        if (user != null) {
            console.log("Đãng dùng FB này đăng kí rồi");
            req.session.isAuthenticated = true;
            req.session.authUser = user;
            return res.redirect("/")
        } else {
            res.redirect("/account/login/infoFB");
        }
    }
);

module.exports = router;