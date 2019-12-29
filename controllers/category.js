const mCat = require("../models/category");
const mPro = require("../models/product");
const config = require("../config/default.json");

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

            // const cats = await mCat.all();
            // const ps = await mPro.allByCatId(id);
            // //console.log(ps)
            // for (let cat of cats) {
            //     cat.isActive = false;
            //     if (cat.CatID === id) {
            //         cat.isActive = true;
            //     }
            // }

            // res.render("categories", {
            //     title: "Online Auction",
            //     cats: cats,
            //     showList: true,
            //     ps: ps
            // });
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