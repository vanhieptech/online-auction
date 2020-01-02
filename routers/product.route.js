const express = require("express");

const ProductController = require("../controllers/product");

const router = express.Router();

router.get("/:id", ProductController.getByProId);

//Nếu đánh giá lớn hon 80
//Thì thêm yêu cầu vào biddinglist
//Và cập nhật lại sản phẩm với userID vừa bidding

router.post("/:id/bid", ProductController.biddingByUserID);

//Nếu nhỏ hơn 0.8 thì thêm yêu cầu vào danh sách waitinglist

router.post("/:id/wait", ProductController.addWaitingList);

module.exports = router;