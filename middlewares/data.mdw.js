const config = require("../config/default.json");
const mUser = require("../models/user.model");

module.exports = async(req, res, next) => {
    if (req.session.isAuthenticated === true) {
        //Các tính năng của bidder
        // console.log("Im data++++++++++++++++++++");
        // console.log("req", req.session.authUser);
        // console.log("res", res.locals.authUser);

        if (res.locals.authUser.f_Permission === config.permission.bidder) {
            const id = res.locals.authUser.id;

            res.locals.isSeller = false;

            res.locals.isRequested = true;

            res.locals.viewBidder = true;

            //Cần check yêu cầu ở đây
            try {
                const user = await mUser.getRequestById(id);

                // const checkRated = await mUser.getRatedById(id);

                if (user.length === 0) {
                    res.locals.isRequested = false;
                }
            } catch (error) {
                console.log("Error Middlewares data getByUserId", error);
            }

            //Cần check danh sách ưa thích
        }
        //Các tính năng của seller
        if (res.locals.authUser.f_Permission === config.permission.seller) {
            const id = res.locals.authUser.id;
            res.locals.isSeller = true;
            res.locals.viewBidder = false;
            res.locals.isRequested = false;
        }
    }

    next();
};