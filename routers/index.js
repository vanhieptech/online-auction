const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category");
const ProductController = require("../controllers/product");
var passport = require("passport");

//Router to home
router.get("/", CategoryController.getTop);

//Router to category

router.get("/cat", CategoryController.getAll);
//Router to product category
router.get("/cat/:id/products", CategoryController.getByCatId);
//Router to product detail
router.get("/products/:id", ProductController.getByProId);

//Router to signin
router.get("/signin", (req, res) => {
    res.render("signin");
});

router.post(
    "/login",
    passport.authenticate("local-login", {
        successRedirect: "/",
        failureRedirect: "/signin",
        failureFlash: true
    }),
    function(req, res) {
        console.log("hello");

        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
        } else {
            req.session.cookie.expires = false;
        }
        res.redirect("/");
    }
);

//Router to sign up

router.get("/signup", function(req, res) {
    res.render("signup", { message: req.flash("signupMessage") });
});

router.post(
    "/signup",
    passport.authenticate("local-signup", {
        successRedirect: "/",
        failureRedirect: "/signup",
        failureFlash: true
    })
);

router.get("/sale-register", (req, res) => {
    res.render("sale_register.hbs");
});
router.get("/error", (req, res) => {
    res.render("error.hbs");
});

//Using facebook to login/logout

router.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: "email" })
);

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