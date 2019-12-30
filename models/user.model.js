const db = require('../database/mysql');

const tbName = `users`;
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
    allByPermission: async permission => {
        try {
            const sql = `SELECT * FROM ${tbName} WHERE f_Permission = ${permission}`;
            const rows = await db.load(sql);
            return rows;
        } catch (error) {
            console.log("Error Model: Product: all Cat Id", error);
        }
    },
    single: id => db.load(`select * from users where f_ID = ${id}`),
    singleByUsername: async username => {
        const rows = await db.load(`select * from users where f_Username = '${username}'`);
        if (rows.length === 0)
            return null;

        return rows[0];
    },
    add: entity => db.add('users', entity),
    del: id => db.del('users', { f_ID: id }),







};