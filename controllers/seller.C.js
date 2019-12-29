const AddProduct = require('../models/seller.M');
module.exports = {
    AddPro: async function(req, res) 
    {
        res.render('./vwSeller/upload_file.hbs');
        var pro = req.body;
        AddProduct.add(1, pro.product_name, pro.product_name, pro.product_description, pro.starting_price, pro.step_price, pro.price_tobuynow, 1, pro.extension);
    }
};