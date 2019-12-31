const config = require("../config/default.json");
const permission = config.permission;

const mUser = require("../models/user.model");



module.exports = {
    getAll: async(req, res) => {
        try {

            // console.log(permission.seller)
            const sellers = await mUser.allByPermission(permission.seller);

            const users = await mUser.allByPermission(permission.user);

            // console.log(sellers)

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
        const userId = parseInt(req.params.id);
        try {
            const user = await mUser.getDetailById(userId);

            // console.log(user)
            res.render("vwUsers/detail", {
                layout: 'admin',
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
                    message: 'Not able to delete user'
                });
            }

            return res.json({
                id: id,
                name: 'user'
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