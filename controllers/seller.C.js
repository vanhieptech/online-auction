const Seller = require('../models/seller.M');
module.exports = {
    AddPro: async function(req, res) 
    {
        res.render('./vwSeller/upload_file.hbs');
        var pro = req.body;
        var date = new Date().toString();
        Seller.add(1, pro.product_name, pro.product_name, '<b>'+date+'</b>' + pro.product_description, pro.starting_price, pro.step_price, pro.price_tobuynow, 1, pro.extension);
    },
    LoadPro: async function(req, res)
    {
        const userId = req.session.authUser.id;
        try {
            const Table = await Seller.load(userId);
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
        console.log(pro);
        var date = new Date().toString();
        Seller.update(pro.ProID, pro.product_description);
        res.redirect("/seller/myProducts");
    }
};