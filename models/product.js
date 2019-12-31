const db = require("../database/mysql");
const config = require("../config/default.json");

const mysql = require("mysql");

function createConnection() {
    return mysql.createConnection(config.mysql);
}

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
    //Chú ý Tìm cách truy vấn về time thực
    getTop5ProductsReadyFinish: async() => {
        try {
            const sql = `SELECT * FROM ${tbName} ORDER BY Price DESC LIMIT 5`;
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
    }
};