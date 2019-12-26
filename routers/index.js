const express = require("express");
const multer  = require("multer");
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const CategoryController = require("../controllers/category");
const ProductController = require("../controllers/product");
const AddProduct = require('../database/seller');
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

var ProID = Math.floor((Math.random() * 1000000) + 1);
const folderName = `./public/sp/${ProID}`;
try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName)
  }
} catch (err) {
  console.error(err)
}
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, folderName)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
var upload = multer({ storage: storage });
router.post('/sale-register', upload.array("file_picture",10), function (req, res, next) 
{
    res.send('THANH CONG');
    var pro = req.body;
    console.log(pro);
    console.log(req.files);
    AddProduct.all(ProID, pro.product_name, pro.starting_price, pro.step_price, pro.price_tobuynow, pro.pro_description, ProID, pro.extension);
});
module.exports = router;