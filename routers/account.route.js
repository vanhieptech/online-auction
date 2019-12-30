const express = require("express");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const userModel = require("../models/account.M");
const restrict = require("../middlewares/auth.mdw");

const router = express.Router();

router.get("/register", async(req, res) => {
    res.render("vwAccount/register");
});

router.get("/login", (req, res) => {
    res.render("vwAccount/login");
});

router.get("/profile", restrict, (req, res) => {
    res.render("vwAccount/profile");
});
router.get("/update", restrict, (req, res) => {
    res.render("vwAccount/update");
});
router.get("/changePassword", restrict, (req, res) => {
    res.render("vwAccount/changePassword");
});
router.post("/update", async(req, res) => {

    const dob = req.body.dob;
    // const dob = moment(req.body.dob, "DD/MM/YYYY").format("YYYY-MM-DD");
    const entity = req.body;
    entity.f_DOB = dob;
    delete entity.raw_password;
    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.redirect("/account/update");
    }
    if (
        entity.f_Name === "" ||
        entity.f_DOB === "" ||
        entity.f_phone === "" ||
        entity.f_address === ""
    ) {
        return res.redirect("/account/update");
    }
    entity.f_Username = req.session.authUser.f_Username;
    delete entity.dob;
    delete entity['g-recaptcha-response'];
    const result = await userModel.UpdateInformationUser(entity);
    if (result) {
        req.session.authUser.f_Name = entity.f_Name;
        req.session.authUser.f_DOB = entity.f_DOB;
        req.session.authUser.f_address = entity.f_address;
        req.session.authUser.f_phone = entity.f_phone;
        res.redirect("/account/profile")
    } else {
        res.render("vwAccount/update");
    }
});
router.post("/changePassword", async(req, res) => {
    const user = await userModel.singleByUsername(req.session.authUser.f_Username);
    const rs = bcrypt.compareSync(req.body.Old_password, user.f_Password);
    if (rs === false)
        return res.render("vwAccount/changePassword", {
            err_message: "Change failed"
        });
    const N = 10;
    const New_hash = bcrypt.hashSync(req.body.raw_Password, N);
    const entity = req.body;
    entity.f_Password = New_hash;
    entity.f_Username = req.session.authUser.f_Username;
    delete entity.raw_password;

    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.redirect("/account/changePassword");
    }
    delete entity['g-recaptcha-response'];


    const result = await userModel.changePassword(entity);
    if (result) {
        res.redirect("/")
    } else {
        res.render("vwAccount/changePassword");
    }
});

router.post("/register", async(req, res) => {
    const N = 10;
    const hash = bcrypt.hashSync(req.body.raw_password, N);

    const dob = req.body.dob;
    // const dob = moment(req.body.dob, "DD/MM/YYYY").format("YYYY-MM-DD");
    const entity = req.body;

    entity.f_Password = hash;
    entity.f_Permission = 0;
    entity.f_DOB = dob;

    delete entity.raw_password;
    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.redirect("/account/register");
    }


    //check user name và email
    const user = await userModel.singleByUsername(req.body.f_Username);
    if (user != null) {
        console.log("Username Exists");
        return res.redirect("/account/register");
    }
    const email = await userModel.singleByEmail(req.body.f_Email);
    if (email != null) {
        console.log("Email Exists");
        return res.redirect("/account/register");
    }
    //console.log(`++++++++account route add entity`, entity['g-recaptcha-response']);
    delete entity.dob;
    delete entity['g-recaptcha-response'];

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

    console.log(`entity---`, entity)
    const result = await userModel.add(entity);
    if (result) {

        res.redirect("/account/login")
    } else {
        res.render("vwAccount/register");
    }

});

router.post("/login", async(req, res) => {
    const user = await userModel.singleByUsername(req.body.f_Username);
    if (user === null) {
        console.log("Invalid username or password.");
        return res.redirect("/account/login");
    }
    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.redirect("/account/login");
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

module.exports = router;