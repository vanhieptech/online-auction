const Seller = require('../models/seller.M');
module.exports = {
    AddPro: async function(req, res) 
    {
        res.render('./vwSeller/upload_file.hbs');
        var pro = req.body;
        const userId = req.session.authUser.id;
        var date = new Date().toString();
        Seller.add(userId, pro.product_name, pro.product_name, '<b>'+date+'</b>' + pro.product_description, pro.starting_price, pro.step_price, pro.price_tobuynow, 1, pro.extension);
    },
    LoadAll: async function(req, res)
    {
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
    LoadSelling: async function(req, res)
    {
        const userId = req.session.authUser.id;
        try {
            const Table = await Seller.load(userId, 2);
            res.render("./vwSeller/myProducts", {
                title: "My Product",
                Table: Table,
            });
        } catch (error) {
            console.log("Error Controller Seller Selling", error);
        }
    },
    LoadSold: async function(req, res)
    {
        const userId = req.session.authUser.id;
        try {
            const Table = await Seller.load(userId, 3);
            res.render("./vwSeller/Sold.hbs", {
                title: "My Product",
                Table: Table,
            });
        } catch (error) {
            console.log("Error Controller Seller Sold", error);
        }
    },
    LoadWaitlist: async function(req, res)
    {
        const userId = req.session.authUser.id;
        try {
            const Table = await Seller.load(userId, 4);
            console.log(Table);
            res.render("./vwSeller/myWaitlist", {
                title: "My Product",
                Table: Table,
            });
        } catch (error) {
            console.log("Error Controller Seller Wishlist", error);
        }
    },
    EditDes: async function(req, res)
    {
        var pro = req.body;
        var date = new Date().toString();
        Seller.update(pro.ProID, pro.product_description);
        res.redirect("/myProducts/All");
    },
    Accept: async function(req, res) 
    {
        var b = req.body;
        console.log(b);
        Seller.deleteWait(b.WaitID);
        Seller.addBidding(b.UserID, b.UserName, b.ProID, b.Price, 1);
        res.redirect("/seller/Waitlist")
    },
    Cancel: async function(req,res)
    {
        var b = req.body;
        console.log(b);
        Seller.deleteWait(b.WaitID);
        Seller.addBidding(b.UserID, b.UserName, b.ProID, b.Price, -1);
        res.redirect("/seller/Waitlist")
    }
};