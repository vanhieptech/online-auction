const express = require("express");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const userModel = require("../models/account.M");
const restrict = require("../middlewares/auth.mdw");

const router = express.Router();

router.get("/register", async(req, res) => {
    res.render("vwAccount/register");
});

router.post("/register", async(req, res) => {
    const N = 10;
    const hash = bcrypt.hashSync(req.body.raw_password, N);

    // const dob = req.body.dob;
    const dob = moment(req.body.dob, "DD/MM/YYYY").format("YYYY-MM-DD");
    const entity = req.body;

    entity.f_Password = hash;
    entity.f_Permission = 0;
    entity.f_DOB = dob;

    delete entity.raw_password;
    delete entity.dob;
    if (
        entity.f_Username === "" ||
        entity.f_Password === "" ||
        entity.f_Name === "" ||
        entity.f_Email === "" ||
        entity.f_DOB === "" ||
        entity.f_phone === "" ||
        entity.f_address === ""
    ) {
        return res.redirect("/account/register");
    }
    const result = await userModel.add(entity);
    res.render("vwAccount/register");
});

router.get("/login", (req, res) => {
    res.render("vwAccount/login");
});

router.post("/login", async(req, res) => {
    const user = await userModel.singleByUsername(req.body.f_Username);
    if (user === null) {
        console.log("Invalid username or password.");
        res.redirect("/account/login");
    }
    const rs = bcrypt.compareSync(req.body.f_Password, user.f_Password);
    if (rs === false)
        return res.render("signin", {
            layout: false,
            err_message: "Login failed"
        });
    delete user.f_Password;
    req.session.isAuthenticated = true;
    req.session.authUser = user;

    const url = req.query.retUrl || "/";
    res.redirect(url);
});

router.post("/logout", (req, res) => {
    req.session.isAuthenticated = false;
    req.session.authUser = null;
    res.redirect(req.headers.referer);
});

router.get("/profile", restrict, (req, res) => {
    res.render("vwAccount/profile");
});

module.exports = router;