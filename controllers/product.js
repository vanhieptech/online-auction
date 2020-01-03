const mCat = require("../models/category");
const mPro = require("../models/product");
const mUser = require("../models/user.model");
const moment = require("moment");

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
            //const userId = product[0].UserID;

            const psRelative = await mPro.allByCatId(catId);

            for (let ps of psRelative) {
                ps.TimeFinish = moment(ps.TimeFinish, "YYYY-MM-DD HH:MM:SS").format(
                    "YYYY-MM-DD"
                );
            }

            const ownerInfo = await mUser.getDetailById(ownerId);
            var userInfo = await mPro.getTopUser(proId);
            for (var i = 0; i < userInfo.length; i++) {
                var a = userInfo[i].f_Username.length - 3; {
                    var temp = "";
                    for (var j = 0; j < a; j++) {
                        temp += "*";
                    }
                    userInfo[i].f_Username = temp + userInfo[i].f_Username.substr(a, 3);
                }
            }
            //Kiểm tra đăng nhập chưa khi click vào button đấu giá
            product[0].isAuthenticated = req.session.isAuthenticated;

            const checkRatedPoint = false;
            //Mặc  định userID không tồn tại khi chưa đăng nhập
            //Và mặc định đánh giá là 0 khi chưa ai đăng nhập
            product[0].UserIDCurrent = 0;
            product[0].RatedUserIDCurrent = 0;
            product[0].SuggestPrice = product[0].Price + product[0].Step;
            //Kiệm tra user hiện tại có đang dấu giá sản phẩm này hay không
            //và kiểm tra user đó đã thắng sản phẩm đó hay chưa
            //Tạo thể hiện button khác với các user khác
            //Kiểm tra đang yêu cầu đấu giá

            product[0].checkUserInWaitingList = false;
            if (req.session.isAuthenticated === true) {
                const id = req.session.authUser.id;
                const rated = req.session.authUser.f_Evaluate;

                //Thêm thông tin ID và đánh giá của mỗi user khi đăng nhập
                product[0].UserIDCurrent = id;
                product[0].RatedUserIDCurrent = rated;
                const UsertoCheck = await mUser.getWaitingById(id, proId);
                product[0].checkUserInWaitingList = UsertoCheck.length;
                // console.log(`+++++++`, req.session.authUser.f_Evaluate);
            }

            product[0].TimeFinish = moment(
                product[0].TimeFinish,
                "YYYY-MM-DD HH:MM:SS"
            ).format("YYYY-MM-DD HH:MM:SS");
            product[0].TimeStart = moment(
                product[0].TimeStart,
                "YYYY-MM-DD HH:MM:SS"
            ).format("YYYY-MM-DD HH:MM:SS");
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

        // console.log(entity);

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
    biddingByUserID: async(req, res) => {
        //Thêm user ID current
        const entity = req.body;
        entity.UserID = req.session.authUser.id;
        entity.UserName = req.session.authUser.f_Username;

        // console.log(`+++++++++++`, entity);

        mPro.insertOneToBiddingList(entity, async(error, results) => {
            if (error) {
                return res.status(401).json({
                    message: "Not able to add to biddling list!"
                });
            }
            const entityPro = {};
            entityPro.ProID = entity.ProID;
            entityPro.Price = entity.Price;
            entityPro.UserID = entity.UserID;
            //Cập nhật lại thông tin về giá và UserID trong sản phẩm
            const result = await mPro.update(entityPro);
            // Cập nhật lại trạng thái của các user khác đang đấu giá sản phẩm đó thành 0

            //Lấy thông tin user vừa biding để append vào top
            const user = await mUser.getDetailById(entity.UserID);

            return res.json({
                //Trả về Price, ProID, UserDetail trong bidding list của sản phẩm đó
                ProID: entity.ProID,
                Price: entity.Price,
                UserBID: user[0]
            });
        });
    },
    addWaitingList: async(req, res) => {
        //Thêm user ID current

        const entity = {};
        entity.UserID = req.session.authUser.id;
        entity.ProID = req.body.ProID;
        entity.Price = req.body.Price;

        // console.log(entity);

        mPro.insertOneToWaitingist(entity, (error, product) => {
            if (error) {
                return res.status(401).json({
                    message: "Not able to add Waiting List!"
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