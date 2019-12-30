const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("vwAdmin/home", {
        layout: "admin"
    });
});

router.get("/login", (req, res) => {
    console.log("View admin in here");
    res.render("vwAdmin/login", { layout: false });
});

module.exports = router;