const Seller = require('../models/seller.M');
module.exports = {
    AddPro: async function(req, res) 
    {
        res.render('./vwSeller/upload_file.hbs');
        var pro = req.body;
        Seller.add(1, pro.product_name, pro.product_name, pro.product_description, pro.starting_price, pro.step_price, pro.price_tobuynow, 1, pro.extension);
    },
    LoadPro: async function(req, res) 
    {
        try {
            const Table = await Seller.load(1);
            console.log(Table);
            res.render("./vwSeller/myProducts", {
                title: "My Product",
                Table: Table
            });
        } catch (error) {
            console.log("Error Controller Product getByProId", error);
        }
    }
};