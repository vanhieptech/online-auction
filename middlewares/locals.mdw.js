const categoryModel = require("../models/category");

module.exports = function(app) {
    app.use(async(req, res, next) => {
        const rows = await categoryModel.allWithDetails();
        res.locals.lcCategories = rows;

        if (typeof req.session.isAuthenticated === "undefined") {
            req.session.isAuthenticated = false;
        }
        res.locals.isAuthenticated = req.session.isAuthenticated;
        res.locals.authUser = req.session.authUser;

        next();
    });
    //Các tính năng của bidder

    //Các tính năng của seller
};