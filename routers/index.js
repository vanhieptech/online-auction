const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const multer  = require("multer");
const fs = require('fs');
const db = require('../database/mysql');
const CategoryController = require("../controllers/category");
const ProductController = require("../controllers/product");
const Seller = require("../controllers/seller");
var passport = require("passport");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
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
    "/signin",
    passport.authenticate("local-login", {
        successRedirect: "/",
        failureRedirect: "/signin",
        failureFlash: true
    })
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
router.post('/sale-register', async function(req,res){
    Seller.AddPro(req,res);
    const sql= `SELECT max(ProID) as'ID' FROM products`;
    var maxID = await db.load(sql);
    var ProID =(maxID[0].ID+1);
    const folderName = `./public/sp/${ProID}`;
    if (!fs.existsSync(folderName))
        fs.mkdirSync(folderName);
    var storage2 = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, folderName);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
    var upload = multer({ storage: storage2 });
    router.post('/sale-register-upload',upload.array("file_picture",10),function(req,res){res.send('OK');});
});
module.exports = router;
