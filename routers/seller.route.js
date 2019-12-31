const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const db = require("../database/mysql");
const Seller = require("../controllers/seller.C");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.get("/sale-register", function(req, res){
    res.render("./vwSeller/sale_register.hbs");
});
router.get("/myProducts", async function(req,res){
    Seller.LoadPro(req,res);
});
router.post("/myProducts/edit", async function(req,res){
    Seller.EditDes(req,res);
});
router.post("/sale-register", async function(req, res) {
    Seller.AddPro(req, res);
    const sql = `SELECT max(ProID) as'ID' FROM products`;
    var maxID = await db.load(sql);
    var ProID = maxID[0].ID + 1;
    const folderName = `./public/sp/${ProID}`;
    if (!fs.existsSync(folderName)) fs.mkdirSync(folderName);
    var storage2 = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, folderName);
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        }
    });
    var upload = multer({ storage: storage2 });
    router.post(
        "/sale-register-upload",
        upload.array("file_picture", 10),
        function(req, res) {
            res.send("OK");
        }
    );
});
module.exports = router;