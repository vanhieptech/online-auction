const restrict = require("../middlewares/auth.mdw");

module.exports = function(app) {
    app.use("/", require("../routers/home.route"));
    app.use("/account", require("../routers/account.route"));
    app.use("/cat", require("../routers/category.route"));
    app.use("/products", require("../routers/product.route"));
    app.use("/seller", require("../routers/seller.route"));
    app.use("/admin", require("../routers/admin/home.route"));
    app.use("/admin/categories", require("../routers/admin/category.route"));
    app.use("/admin/products", require("../routers/admin/product.route"));
    app.use("/admin/users", require("../routers/admin/user.route"));
};