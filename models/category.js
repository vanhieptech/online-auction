const db = require("../database/mysql");
const tbName = "Categories";

module.exports = {
    all: async() => {
        try {
            const sql = `SELECT * FROM ${tbName}`;
            const rows = await db.load(sql);
            return rows;
        } catch (error) {
            console.log("Error Model: Category: all", error);
        }
    }
};