const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category");
var passport = require("passport");
const userModel = require("../models/account.M");
const db = require("../database/mysql");
var mysql = require("mysql");
const config = require("../config/default.json");
var connection = mysql.createConnection(config.mysql);

connection.connect();

router.get("/search", function(req, res) {
    connection.query(
        `select* from products p, categories c where c.CatID=p.CatID and p.ProName like N'%` +
        req.query.key +
        `%'`,
        function(err, rows, fields) {
            if (err) throw err;
            var data = [];
            for (i = 0; i < rows.length; i++) {
                data.push(rows[i].CatName);
                data.push(rows[i].ProName);
            }
            console.log(data);
            res.end(JSON.stringify(data));
        }
    );
});
router.post("/", async function(req, res) {
    var Proname = console.log(req.body.typeahead);
    console.log(req.body.typeahead);
    var sql =
        `select* from products p, categories c where c.CatID=p.CatID and p.ProName like N'%` +
        req.body.typeahead +
        `%'`;
    const products = await db.load(sql);

    console.log(products);

    res.render("vwSearch/search", {
        title: req.body.typeahead,
        products: products
    });
});
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
            const url = req.query.retUrl || "/";
            res.redirect(url);
        } else {
            res.redirect("/account/login/infoFB");
        }
    }
);
router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login"
    }),
    async function(req, res) {
        req.session.GG = req.user;
        const user = await userModel.singleByUsername(req.session.GG.id);
        if (user != null) {
            console.log("Đãng dùng GG này đăng kí rồi");
            req.session.isAuthenticated = true;
            req.session.authUser = user;
            const url = req.query.retUrl || "/";
            res.redirect(url);
        } else {
            res.redirect("/account/login/infoGG");
        }
    }
);
module.exports = router;