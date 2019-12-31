const mCat = require("../models/category");
const mPro = require("../models/product");
const mUser = require("../models/user.model");

module.exports = {
    getAll: async(req, res) => {
        try {
            const cats = await mCat.all();

            const products = await mPro.all();

            var CatIDofProduct = 1;
            for (let product of products) {
                CatIDofProduct = product.CatID;
                product.CatName = cats[CatIDofProduct - 1].CatName;
            }

            // console.log(`cat`, cats[3]);
            // console.log("+++", products)
            res.render("vwAdmin/products", {
                layout: "admin",
                products: products
            });
        } catch (error) {
            console.log("Error Controller Products getAll: ", error);
        }
    },
    getByProId: async(req, res) => {
        const proId = parseInt(req.params.id);
        try {
            const product = await mPro.getDetailById(proId);
            const catId = product[0].CatID;
            const ownerId = product[0].OwnerID;
            const userId = product[0].UserID;
            // console.log(product)
            // console.log(product[0].OwnerID)
            // console.log("ownerId", ownerId)
            const psRelative = await mPro.allByCatId(catId);
            const ownerInfo = await mUser.getDetailById(ownerId);
            const userInfo = await mUser.getDetailById(userId);

            // productDetail = {
            //     product: product,
            //     user: userInfo,
            //     owner: ownerInfo
            // };

            res.render("vwProducts/detail", {
                title: "Chi tiết sản phẩm",
                product: product,
                owner: ownerInfo,
                user: userInfo,
                psRelative: psRelative
            });
        } catch (error) {
            console.log("Error Controller Product getByProId", error);
        }
    },
    delete: async(req, res) => {
        const ProID = parseInt(req.params.id);
        mPro.deleteOne(ProID, (err, result) => {
            if (err) {
                return res.status(501).json({
                    message: "Not able to delete product"
                });
            }

            return res.json({
                id: ProID,
                name: "product"
            });
        });
    }
};