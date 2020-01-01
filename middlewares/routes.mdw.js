const restrict = require("../middlewares/auth.mdw");
const isAdmin = require("../middlewares/admin.mdw");
const isSeller = require("../middlewares/seller.mdw");
const isBidder = require("../middlewares/bidder.mdw");

const setting = require("../middlewares/data.mdw");

module.exports = function(app) {
    app.use("/", setting, require("../routers/home.route"));
    app.use("/account", require("../routers/account.route"));
    app.use("/cat", require("../routers/category.route"));
    app.use("/products", require("../routers/product.route"));
    app.use("/bd", restrict, isBidder, require("../routers/bidder.route"));
    app.use("/seller", restrict, isSeller, require("../routers/seller.route"));
    // app.use("/admin", require("../routers/admin/home.route"));
    // app.use("/admin/categories", require("../routers/admin/category.route"));
    // app.use("/admin/products", require("../routers/admin/product.route"));
    // app.use("/admin/users", require("../routers/admin/user.route"));
    app.use("/admin", restrict, isAdmin, require("../routers/admin/home.route"));
    app.use(
        "/admin/categories",
        restrict,
        isAdmin,
        require("../routers/admin/category.route")
    );
    app.use(
        "/admin/products",
        restrict,
        isAdmin,
        require("../routers/admin/product.route")
    );
    app.use(
        "/admin/users",
        restrict,
        isAdmin,
        require("../routers/admin/user.route")
    );
};