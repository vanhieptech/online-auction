const config = require("../config/default.json");
const permission = config.permission;

const mUser = require("../models/user.model");



module.exports = {
    getAll: async(req, res) => {
        try {

            console.log(permission.seller)
            const sellers = await mUser.allByPermission(permission.seller);

            const users = await mUser.allByPermission(permission.user);

            console.log(sellers)

            res.render("vwUsers/index", {
                layout: "admin",
                sellers: sellers,
                users: users
            });
        } catch (error) {
            console.log("Error Controller Products getAll: ", error);
        }
    },
    getByUserId: async(req, res) => {
        const proId = parseInt(req.params.id);
        try {
            const product = await mPro.getDetailById(proId);

            res.render("vwProducts/detail", {
                title: "Product Detail",
                product: product
            });
        } catch (error) {
            console.log("Error Controller Product getByProId", error);
        }
    },
    delete: async(req, res) => {
        const ProID = parseInt(req.params.id);
        mPro.deleteOne(ProID, (err, result) => {
            if (err) {
                return res.status(501).json({
                    message: 'Not able to delete user'
                });
            }

            return res.json({
                ProID
            });
        });
    },

    setPermission: async(req, res) => {
        const id = req.params.id;
        const value = JSON.parse(req.params.value);
        const entity = {
            f_Permission: value,
            id: id
        }
        mUser.updateOne(entity, function(error, burger) {
            if (error) {
                return res.status(501).json({
                    message: 'Not able to change Permission of User'
                });
            }
            return res.json({
                id: id,
                permission: value
            });
        });
    }
};