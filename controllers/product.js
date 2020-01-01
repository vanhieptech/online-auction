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
                title: "Danh sách sản phẩm",
                layout: "admin",
                products: products
            });
        } catch (error) {
            console.log("Error Controller Products getAll: ", error);
        }
    },
    getAllWishListByUserID: async(req, res) => {
        try {
            const userID = req.session.authUser.id;

            const list = await mPro.allByUserId(userID);

            res.render("vwBidder/wishlist", {
                layout: "main",
                list: list,
                empty: list.length === 0
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

            // console.log(`++++++++++`, catId);
            // console.log(`++++++++++`, psRelative);

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

    addToWishList: async(req, res) => {
        //Thêm user ID current
        const entity = req.body;
        entity.UserID = req.session.authUser.id;

        console.log(entity);

        mPro.insertOneToWishList(entity, (error, product) => {
            if (error) {
                return res.status(401).json({
                    message: "Not able to add favorite!"
                });
            }

            return res.json({
                ProID: entity.ProID
            });
        });
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