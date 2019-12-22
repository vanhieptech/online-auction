const db = require("../database/mysql");
const tbName = "users";

module.exports = {
    add: async user => {
        const id = await db.add(tbName, user);
        return id;
    },
    getByUserName: async username => {
        let sql = `SELECT * FROM ?? WHERE ?? = ?`;
        const params = [tbName, "f_Username", username];
        sql = db.mysql.format(sql, params);
        console.log("accountM/getByUsername sql= ", sql);
        const rs = await db.load(sql);
        if (rs.length > 0) {
            return rs[0];
        }
        return null;
    }
};