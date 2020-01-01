const express = require("express");
const ProductController = require("../controllers/product");

const router = express.Router();

// router.get("/:id", ProductController.getByProId);

router.get("/wishlist", ProductController.getAllWishListByUserID);

// router.delete('/wishlist/delete/:id', ProductController.delete);

router.post("/wishlist/add", ProductController.addToWishList);

module.exports = router;