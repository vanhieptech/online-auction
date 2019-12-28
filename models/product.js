const db = require("../database/mysql");
const tbName = `Products`;

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
            const sql = `SELECT * FROM ${tbName} WHERE CatID = ${id}`;
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
};