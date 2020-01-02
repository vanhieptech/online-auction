const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const db = require("../database/mysql");
const Seller = require("../controllers/seller.C");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.get("/sale-register", function(req, res) {
    res.render("./vwSeller/sale_register.hbs");
});
router.get("/myProducts/All", async function(req, res) {
    Seller.LoadAll(req, res);
});
router.get("/myProducts/Selling", async function(req, res) {
    Seller.LoadSelling(req, res);
});
router.get("/myProducts/Sold", async function(req, res) {
    Seller.LoadSold(req, res);
});
router.post("/myProducts/Sold/Review", async function(req, res) {
    Seller.AddReview(req, res);
});
router.get("/Waitlist", async function(req, res) {
    Seller.LoadWaitlist(req, res);
});
router.post("/Waitlist/accept", async function(req, res) {
    Seller.Accept(req, res);
});
router.post("/Waitlist/cancel", async function(req, res) {
    Seller.Cancel(req, res);
});
router.post("/myProducts/edit", async function(req, res) {
    Seller.EditDes(req, res);
});
router.post("/sale-register", async function(req, res) {
    const ProID = await Seller.AddPro(req, res);
    //onst sql = `SELECT max(ProID) as'ID' FROM products`;
    //var maxID = await db.loadPIC(sql);
    //var ProID = maxID[0].ID;

    console.log(`++++++++++++++`, ProID);
    const folderName = `./public/sp/${ProID}`;
    var id = 1;
    if (!fs.existsSync(folderName)) fs.mkdirSync(folderName);
    var storage2 = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, folderName);
        },
        filename: function(req, files, cb) {
            cb(null, `1_${id}.jpg`);
            id = id + 1;
        }
    });
    var upload = multer({ storage: storage2 });
    router.post(
        "/sale-register-upload",
        upload.array("file_picture", 10),
        function(req, res) {
            res.redirect("/seller/myProducts/All");
        }
    );
});
module.exports = router;