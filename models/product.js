const db = require("../database/mysql"),
    run = db.errorHandle;
const config = require("../config/default.json");

const tbName = `Products`;
const idField = `ProID`;
module.exports = {
    all: async() => {
        try {
            const sql = `SELECT * FROM ${tbName}`;
            const rows = await db.load(sql);

            return rows;
        } catch (error) {
            console.log("Error Model: Product: all", error);
        }
    },
    allByCatId: async id => {
        try {
            const sql = `SELECT * FROM ${tbName} WHERE CatID = ${id} LIMIT 5`;
            const rows = await db.load(sql);
            return rows;
        } catch (error) {
            console.log("Error Model: Product: all User Id", error);
        }
    },
    allByUserId: async id => {
        try {
            const sql = `SELECT * FROM wishlist WHERE UserID = ${id}`;
            const rows = await db.load(sql);
            return rows;
        } catch (error) {
            console.log("Error Model: Product: all Cat Id", error);
        }
    },
    allByCatIdPaging: async(id, page) => {
        let sql = `SELECT count(*) AS total FROM ${tbName} WHERE CatID=${id}`;
        const rs = await db.load(sql);
        const totalP = rs[0].total;
        const pageTotal = Math.floor(totalP / pageSize) + 1;
        const offset = (page - 1) * pageSize;
        sql = `SELECT * FROM ${tbName} WHERE CatID=${id} LIMIT ${pageSize} OFFSET ${offset}`;
        const rows = await db.load(sql);
        return {
            pageTotal: pageTotal,
            product: rows
        };
    },
    getDetailById: async id => {
        try {
            const sql = `SELECT * FROM ${tbName} WHERE ProID = ${id}`;
            const rows = await db.load(sql);
            return rows;
        } catch (error) {
            console.log("Error Model: Product: all Pro Id", error);
        }
    },
    countByCat: async catId => {
        const rows = await db.load(
            `select count(*) as total from products where CatID = ${catId}`
        );
        return rows[0].total;
    },
    pageByCat: (catId, offset) =>
        db.load(
            `select * from products where CatID = ${catId} limit ${config.paginate.limit} offset ${offset}`
        ),
    add: entity => db.add("products", entity),

    del: id => db.del(tbName, idField, id),

    patch: entity => {
        const condition = { ProID: entity.ProID };
        delete entity.ProID;
        return db.patch("products", entity, condition);
    },
    update: async entity => {
        const [nr, err] = await run(db.update(tbName, idField, entity));
        if (err) {
            console.log("Error Model: Product: update", err);
            throw err;
        }
        return nr;
    },
    //Chú ý Tìm cách truy vấn về time thực
    getTop5ProductsReadyFinish: async() => {
        try {
            const sql = `SELECT * FROM ${tbName} ORDER BY DATEDIFF(TimeFinish, TimeStart) ASC LIMIT 5`;
            const rows = await db.load(sql);

            return rows;
        } catch (error) {
            console.log("Error Model: Product: all", error);
        }
    },

    //Chú ý sửa lại top 5 sản phẩm CÓ NHIỀU LƯỢT RA GIÁ NHẤTTTTT THAY COLUMN Voted
    getTop5ProductsbyBID: async() => {
        try {
            const sql = `SELECT * FROM ${tbName} ORDER BY Voted DESC LIMIT 5`;
            const rows = await db.load(sql);

            return rows;
        } catch (error) {
            console.log("Error Model: Product: all", error);
        }
    },
    getTop5ProductsbyPrice: async() => {
        try {
            const sql = `SELECT * FROM ${tbName} ORDER BY Price DESC LIMIT 5`;
            const rows = await db.load(sql);

            return rows;
        } catch (error) {
            console.log("Error Model: Product: all", error);
        }
    },

    //Working with client

    deleteOne: async(id, cb) => {
        try {
            const rows = await db.del(tbName, idField, id);
            cb(null, rows);
        } catch (error) {
            cb(error, null);
            console.log("Error Model: Product: all", error);
        }
    },

    insertOneToWishList: async(entity, cb) => {
        try {
            const rows = await db.add(`wishlist`, entity);
            // console.log(rows);
            cb(null, rows);
        } catch (error) {
            cb(error, null);
            console.log("Error Model: Product: insertOneToWishList", error);
        }
    },
    insertOneToWaitingist: async(entity, cb) => {
        try {
            const rows = await db.add(`waitinglist`, entity);
            // console.log(rows);
            cb(null, rows);
        } catch (error) {
            cb(error, null);
            console.log("Error Model: Product: insertOneToWaitingList", error);
        }
    },
    insertOneToBiddingList: async(entity, cb) => {
        try {
            const rows = await db.add(`biddinglist`, entity);
            // console.log(rows);
            cb(null, rows);
        } catch (error) {
            cb(error, null);
            console.log("Error Model: Product: insertOneToBiddingList", error);
        }
    },
    getTopUser: async id => {
        try {
            const sql = `SELECT u.id, u.f_Username, u.f_Evaluate, b.Price, b.Time FROM biddinglist b, users u WHERE b.ProID=${id} and b.UserID=u.id and b.Status!=2 order by Price desc`;
            const rows = await db.load(sql);
            return rows;
        } catch (error) {
            console.log("Error Model: Product: all Pro Id", error);
        }
    }
};