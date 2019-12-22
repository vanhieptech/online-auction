const express = require("express");
const router = express.Router();
const sha = require("sha.js");
const mAccount = require("../models/account");

const hashLength = 64;

router.get("/login", async(req, res) => {
    res.redirect("/");
});

router.get("/register", (req, res) => {
    res.redirect("/");
});

router.get("/profile", (req, res) => {
    if (!req.session.user) {
        res.redirect("/account/login");
    }
    res.redirect("/");
});

router.post("/login", async(req, res) => {
    const username = req.body.username;
    const passport = req.body.password;
    const user = await mAccount.getByUsername(username);
    if (user === null) {
        res.redirect("/");
        return;
    }
    // thực hiện các thao tác xử lý password bản rõ

    const pwDb = user.f_Password;
    const salt = pwDb.substring(hashLength, pwDb.length);
    const preHash = hash + salt;

    //kiểm tra password co hop lệ hay không
    if (pwHash === pwDb) {
        req.session.user = user.f_ID;
        res.redirect('/');
    }


});


router.post('/createAccount', async(req, res) => {
    const username = req.body.username;
    const passport = req.body.password;

    //thực hiện các thao tac xử lý password bản rõ

    const salt = Date.now().toString(16);
    const preHash = password + salt;
    const hash = sha('sha256').update(preHash).digest('hex');
    const pwHash = hash + salt;
    const user = {
            f_Username: username,
            f_Password: pwHash,
            f_Name: req.body.name,
            f_Email: req.body.email,
            f_DOB: req.body.dob,
            f_Permission: 0,
        },
        const uId = await mAccount.add(user);
});

//Thuc hiện xác thực đơn giản 

router.get('/profile', (req, res) => {
    if (!req.session.uid) {
        res.redirect('/account/profile');
    } else {
        res.render('account/profile', {
            layout: 'account',
        })
    }
})

module.export = router;