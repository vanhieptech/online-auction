const mCat = require("../models/category");
const mPro = require("../models/product");
const mUser = require("../models/user.model");
const config = require("../config/default.json");
const moment = require("moment");

module.exports = {
    getAll: async(req, res) => {
        try {
            const cats = await mCat.all();
            //const products = await mPro.all();
            for (let cat of cats) {
                cat.isActive = false;
            }
            const ps = await mPro.allByCatId("1");
            cats[0].isActive = true;
            console.log(cats);
            res.render("vwProducts/allByCat", {
                title: "Online Auction"
            });
        } catch (error) {
            console.log("Error Controller Category getAll: ", error);
        }
    },
    getTop: async(req, res) => {
        try {
            // Top 5 sản phẩm gần kết thúc
            const psByTimeout = await mPro.getTop5ProductsReadyFinish();
            // Top 5 sản phẩm có nhiều lượt ra giá nhất
            const psByBID = await mPro.getTop5ProductsbyBID();
            // Top 5 sản phẩm có giá cao nhất
            const psByPrice = await mPro.getTop5ProductsbyPrice();

            for (var i = 0; i <= 4; i++) {
                const user = await mUser.getDetailById(psByTimeout[i].UserID);
                psByTimeout[i].TimeFinish = moment(
                    psByTimeout[i].TimeFinish,
                    "YYYY-MM-DD HH:MM:SS"
                ).format("YYYY-MM-DD HH:MM:SS");

                // console.log(user[0]);
                if (user.length != 0) {
                    psByTimeout[i].UserName = user[0].f_Username;
                }
            }
            for (var i = 0; i <= 4; i++) {
                const user = await mUser.getDetailById(psByBID[i].UserID);
                psByBID[i].TimeFinish = moment(
                    psByBID[i].TimeFinish,
                    "YYYY-MM-DD HH:MM:SS"
                ).format("YYYY-MM-DD HH:MM:SS");

                psByBID[i].UserName = user[0].f_Username;
            }
            for (var i = 0; i <= 4; i++) {
                const user = await mUser.getDetailById(psByPrice[i].UserID);
                psByPrice[i].TimeFinish = moment(
                    psByPrice[i].TimeFinish,
                    "YYYY-MM-DD HH:MM:SS"
                ).format("YYYY-MM-DD HH:MM:SS");
                psByPrice[i].UserName = user[0].f_Username;
            }

            res.render("home", {
                title: "Online Auction",
                showList: true,
                psByTimeout: psByTimeout,
                psByBID: psByBID,
                psByPrice: psByPrice
            });
        } catch (error) {
            console.log("Error Controller Category getByCatId", error);
        }
    },
    getByCatId: async(req, res) => {
        try {
            for (const c of res.locals.lcCategories) {
                if (c.CatID === +req.params.id) {
                    c.isActive = true;
                }
            }

            const catId = parseInt(req.params.id);
            const limit = config.paginate.limit;

            const page = req.query.page || 1;
            const offset = (page - 1) * config.paginate.limit;

            const [total, rows] = await Promise.all([
                mPro.countByCat(catId),
                mPro.pageByCat(catId, offset)
            ]);

            for (var i = 0; i < rows.length; i++) {
                const user = await mUser.getDetailById(rows[i].UserID);
                // console.log(user[0]);

                rows[i].TimeFinish = moment(
                    rows[i].TimeFinish,
                    "YYYY-MM-DD HH:MM:SS"
                ).format("YYYY-MM-DD HH:MM:SS");
                rows[i].UserName = user[0].f_Username;
            }

            let nPages = Math.floor(total / limit);
            if (total % limit > 0) nPages++;
            const page_numbers = [];

            for (i = 1; i <= nPages; i++) {
                page_numbers.push({
                    catId: catId,
                    value: i,
                    isCurrentPage: i === +page
                });
            }
            // console.log(page_numbers);
            const navs = {};

            if (page > 1) {
                navs.prev = page - 1;
            }
            if (page < nPages) {
                navs.next = page + 1;
            }

            res.render("vwProducts/allByCat", {
                title: "Online Auction",
                products: rows,
                catId: catId,
                empty: rows.length === 0,
                page_numbers,
                navs: navs
            });
        } catch (error) {
            console.log("Error Controller Category getByCatId", error);
        }
    },
    getByCatIdPaging: async(req, res) => {
        const id = parseInt(req.params.id);
        const page = parseInt(req.query.page) || 1;
        const cats = await mCat.all();
        const rs = await mPro.allByCatIdPaging(id, page);
        for (let cat of cats) {
            cat.isActive = false;
            if (cat.CatID === id) {
                cat.isActive = true;
            }
        }
        const pages = [];
        for (let i = 0; i < rs.pageTotal; i++) {
            pages[i] = { value: i + 1, active: i + 1 === page };
        }
        const navs = {};
        if (page > 1) {
            navs.prev = page - 1;
        }
        if (page < rs.pageTotal) {
            navs.next = page + 1;
        }
        res.render("product/gridView", {
            title: "Products",
            cats: cats,
            ps: rs.products,
            pages: pages,
            navs: navs
        });
    }
};