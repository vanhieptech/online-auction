const config = require("../config/default.json");
const permission = config.permission;

const mUser = require("../models/user.model");

module.exports = {
    getAll: async(req, res) => {
        try {
            // console.log(permission.seller)
            const sellers = await mUser.allByPermission(permission.seller);

            const bidders = await mUser.allByPermission(permission.bidder);

            const requests = await mUser.allByRequest();

            const users = [];

            for (let rq of requests) {
                const user = await mUser.getDetailById(rq.UserID);
                users.push(user[0]);
            }

            console.log(users);

            res.render("vwUsers/index", {
                layout: "admin",
                sellers: sellers,
                users: users,
                bidders: bidders,
                emptyUser: users.length === 0,
                emptySeller: sellers.length === 0,
                emptyBidder: bidders.length === 0
            });
        } catch (error) {
            console.log("Error Controller Products getAll: ", error);
        }
    },
    getByUserId: async(req, res) => {
        const userId = parseInt(req.params.id);
        try {
            const user = await mUser.getDetailById(userId);

            // console.log(user)
            res.render("vwUsers/detail", {
                layout: "admin",
                user: user
            });
        } catch (error) {
            console.log("Error Controller Product getByProId", error);
        }
    },

    delete: async(req, res) => {
        const id = parseInt(req.params.id);
        mUser.deleteOne(id, (err, result) => {
            if (err) {
                return res.status(501).json({
                    message: "Not able to delete user"
                });
            }

            return res.json({
                id: id,
                name: "user"
            });
        });
    },

    deleteRequest: async(req, res) => {
        const id = parseInt(req.params.id);
        mUser.deleteOneRequest(id, (err, result) => {
            if (err) {
                return res.status(501).json({
                    message: "Not able to delete user"
                });
            }

            return res.json({
                id: id,
                name: "user"
            });
        });
    },

    setPermission: async(req, res) => {
        const id = req.params.id;
        const value = JSON.parse(req.params.value);
        const entity = {
            f_Permission: value,
            id: id
        };
        mUser.updateOne(entity, function(error, burger) {
            if (error) {
                return res.status(501).json({
                    message: "Not able to change Permission of User"
                });
            }
            return res.json({
                id: id,
                permission: value
            });
        });
    },
    review: async function(req, res)
    {
        const userId = req.session.authUser.id;
        try {
            const Table = await mUser.loadReview(userId);
            for(let tb of Table){
                tb.Rate = tb.Rate === 1 ? 1:0;
            }
            res.render("vwAccount/review",{
                title: "Review",
                Table: Table,
            });
        } catch (error) {
            console.log("Error Controller Seller All", error);
        }
    },
    Bidding: async function(req, res)
    {
        const userId = req.session.authUser.id;
        try {
            const Table = await mUser.loadBidding(userId);
            res.render("vwBidder/bidder",{
                title: "Bidding",
                Table: Table,
            });
        } catch (error) {
            console.log("Error Controller Seller All", error);
        }
    },
    Bidded: async function(req, res)
    {
        const userId = req.session.authUser.id;
        try {
            const Table = await mUser.loadBidded(userId);
            res.render("vwBidder/bidder",{
                title: "Bidded",
                Table: Table,
            });
        } catch (error) {
            console.log("Error Controller Seller All", error);
        }
    },
};