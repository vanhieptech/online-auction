const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category");
const ProductController = require("../controllers/product");
var passport = require("passport");
const sha = require("sha.js");
const mAccount = require("../models/account.M");

//Router to home
router.get("/", CategoryController.getTop);

//Router to category

router.get("/cat", CategoryController.getAll);
//Router to product category
router.get("/cat/:id/products", CategoryController.getByCatId);
//Router to product detail
router.get("/products/:id", ProductController.getByProId);
router.get("/sale-register", (req, res) => {
    res.render("sale_register.hbs");
});
router.get("/error", (req, res) => {
    res.render("error.hbs");
});



module.exports = router;