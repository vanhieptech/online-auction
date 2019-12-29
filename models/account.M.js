const db = require("../database/mysql");
const tbName = "users";

module.exports = {
    add: async user => {
        const id = await db.add(tbName, user);
        return id;
    },
    singleByUsername: async username => {
        const rows = await db.load(
            `select * from users where f_Username = '${username}'`
        );
        if (rows.length === 0) return null;

        return rows[0];
    },
	singleByEmail: async email => {
        const rows = await db.load(
            `select * from users where f_Email = '${email}'`
        );
        if (rows.length === 0) return null;

        return rows[0];
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
