const db = require("../database/mysql"),
    run = db.errorHandle;

const tbName = "Categories",
    idFields = "CatID";

module.exports = {
    all: async() => {
        const sql = `SELECT * FROM ${tbName}`;
        const [rows, err] = await run(db.load(sql));

        if (err) {
            console.log("Error Model: Category: all", err);
            throw err;
        }
        return rows;
    }
};