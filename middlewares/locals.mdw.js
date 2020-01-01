const categoryModel = require("../models/category");
const mUser = require("../models/user.model");

module.exports = function(app) {
    app.use(async(req, res, next) => {
        const rows = await categoryModel.allWithDetails();
        res.locals.lcCategories = rows;

        if (typeof req.session.isAuthenticated === "undefined") {
            req.session.isAuthenticated = false;
        }
        //Thấy thông tin user từ db

        if (
            typeof req.session.authUser != "undefined" &&
            req.session.authUser != null
        ) {
            // console.log("Im checkingggg!!!", req.session.authUser.id);
            const users = await mUser.getDetailById(req.session.authUser.id);
            // console.log("Im checkingggg!!!", users);

            req.session.authUser = users[0];
        }
        res.locals.isAuthenticated = req.session.isAuthenticated;
        res.locals.authUser = req.session.authUser;

        next();
    });
};