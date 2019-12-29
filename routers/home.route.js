const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category");
//Router to home
router.get("/", CategoryController.getTop);

module.exports = router;