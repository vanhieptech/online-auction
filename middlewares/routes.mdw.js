const restrict = require("../middlewares/auth.mdw");

module.exports = function(app) {
    app.use("/", require("../routers/home.route"));
    app.use("/account", require("../routers/account.route"));
    app.use("/cat", require("../routers/category.route"));
    app.use("/products", require("../routers/product.route"));
    app.use("/seller", require("../routers/seller.route"));
    app.use(
        "/admin/categories",
        restrict,
        require("../routers/admin/category.route")
    );
};