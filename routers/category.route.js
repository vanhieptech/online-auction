const express = require("express");

const CategoryController = require("../controllers/category");

const router = express.Router();

//

router.get("/", CategoryController.getAll);

// xem ds sản phẩm thuộc danh mục :id

router.get("/:id/products", CategoryController.getByCatId);

module.exports = router;