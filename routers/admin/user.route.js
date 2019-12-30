const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("vwAdmin/home", {
        layout: "admin"
    });
});


module.exports = router;