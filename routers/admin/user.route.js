const express = require("express");

const router = express.Router();

const userController = require("../../controllers/user.C");

router.get("/", userController.getAll);

router.get("/:id", userController.getByUserId);

router.put("/:id/:value", userController.setPermission);

router.delete("/delete/:id", userController.delete);
router.delete("/delete/request/:id", userController.deleteRequest);

module.exports = router;