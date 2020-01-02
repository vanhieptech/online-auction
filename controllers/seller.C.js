const Seller = require('../models/seller.M');
module.exports = {
    AddPro: async function(req, res) {
        res.render('./vwSeller/upload_file.hbs');
        var entity = {};

        entity.OwnerID = req.session.authUser.id;
        entity.UserID = req.session.authUser.id;
        entity.ProName = req.body.product_name;
        entity.TinyDes = req.body.product_name;
        entity.FullDes = req.body.product_description;
        entity.Price = req.body.starting_price;
        entity.Step = req.body.step_price;
        entity.PriceToBuy = req.body.price_tobuynow;
        entity.CatID = 1;
        entity.Voted = 0;
        entity.Rate = 0;
        entity.TimeStart = "2020-01-03 08:00:21";
        entity.TimeFinish = "2020-01-03 20:00:21";
        if (req.body.extension == 'on') entity.Extension = 1;
        else entity.Extension = 0;
        //console.log(entity);
        //var date = new Date().toString();
        const ProID = Seller.add(entity);
        return ProID;
    },
    LoadAll: async function(req, res) {
        const userId = req.session.authUser.id;
        try {
            const Table = await Seller.load(userId, 1);
            res.render("./vwSeller/myProducts", {
                title: "My Product",
                Table: Table,
            });
        } catch (error) {
            console.log("Error Controller Seller All", error);
        }
    },
    LoadSelling: async function(req, res) {
        const userId = req.session.authUser.id;
        try {
            const Table = await Seller.load(userId, 2);
            res.render("./vwSeller/myProducts", {
                title: "My Selling",
                Table: Table,
            });
        } catch (error) {
            console.log("Error Controller Seller Selling", error);
        }
    },
    LoadSold: async function(req, res) {
        const userId = req.session.authUser.id;
        try {
            const Table = await Seller.load(userId, 3);
            res.render("./vwSeller/Sold.hbs", {
                title: "My Sold",
                Table: Table,
            });
        } catch (error) {
            console.log("Error Controller Seller Sold", error);
        }
    },
    LoadWaitlist: async function(req, res) {
        const userId = req.session.authUser.id;
        try {
            const Table = await Seller.load(userId, 4);
            console.log(Table);
            res.render("./vwSeller/myWaitlist", {
                title: "My Waitlist",
                Table: Table,
            });
        } catch (error) {
            console.log("Error Controller Seller Waitlist", error);
        }
    },
    EditDes: async function(req, res) {
        var pro = req.body;
        var date = new Date().toString();
        Seller.update(pro.ProID, pro.product_description);
        res.redirect("/myProducts/All");
    },
    Accept: async function(req, res) {
        var b = req.body;
        Seller.deleteWait(b.WaitID);
        var Price = await Seller.loadMaxPrice(b.ProID);
        if (b.Price > Price) {
            console.log("gia lon hon gia hien tai")
            Seller.alterStatus(b.ProID);
            Seller.addBidding(b.UserID, b.UserName, b.ProID, b.Price, 1);
        } else {
            console.log("gia be hon gia hien tai");
            Seller.addBidding(b.UserID, b.UserName, b.ProID, b.Price, 0);
        }
        res.redirect("/seller/Waitlist");
    },
    Cancel: async function(req, res) {
        var b = req.body;
        Seller.deleteWait(b.WaitID);
        Seller.addBidding(b.UserID, b.UserName, b.ProID, b.Price, -1);
        res.redirect("/seller/Waitlist")
    },
    AddReview: async function(req, res) {
        var r = req.body;
        const userId = req.session.authUser.id;
        Seller.reviewUser(r.UserID, userId, r.Rate, r.reviewUser)
        res.redirect("/seller/myProducts/Sold");
    },
};