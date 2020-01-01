const config = require("../config/default.json");

module.exports = (req, res, next) => {
    if (req.session.isAuthenticated === true) {
        //Các tính năng của bidder
        if (res.locals.authUser.f_Permission === config.permission.bidder) {
            const id = res.locals.authUser.id;

            res.locals.isSeller = false;
            //Cần check yêu cầu ở đây

            res.locals.isRequested = true;
            res.locals.viewBidder = true;

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