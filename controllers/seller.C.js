const Seller = require('../models/seller.M');
module.exports = {
    AddPro: async function(req, res) 
    {
        res.render('./vwSeller/upload_file.hbs');
        var pro = req.body;
        var date = new Date().toString();
        Seller.add(1, pro.product_name, pro.product_name, '<b>'+date+'</b>' + pro.product_description, pro.starting_price, pro.step_price, pro.price_tobuynow, 1, pro.extension);
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
            console.log("Error Controller Product getByProId", error);
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
            console.log("Error Controller Product getByProId", error);
        }
    },
    LoadSold: async function(req, res)
    {
        const userId = req.session.authUser.id;
        try {
            const Table = await Seller.load(userId, 3);
            res.render("./vwSeller/myProducts", {
                title: "My Product",
                Table: Table,
            });
        } catch (error) {
            console.log("Error Controller Product getByProId", error);
        }
    },
    EditDes: async function(req, res)
    {
        var pro = req.body;
        var date = new Date().toString();
        Seller.update(pro.ProID, pro.product_description);
        res.redirect("/myProducts/All");
    }
};