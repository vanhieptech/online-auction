const db = require('../database/mysql');

const tbName = `users`;
const idField = `id`;
module.exports = {

    all: async() => {
        try {
            const sql = `SELECT * FROM ${tbName}`;
            const rows = await db.load(sql);

            return rows;
        } catch (error) {
            console.log("Error Model: User: all", error);
        }
    },
    allByPermission: async permission => {
        try {
            const sql = `SELECT * FROM ${tbName} WHERE f_Permission = ${permission}`;
            const rows = await db.load(sql);
            return rows;
        } catch (error) {
            console.log("Error Model: User: allByPermission", error);
        }
    },

    getDetailById: async id => {
        try {
            const sql = `SELECT * FROM ${tbName} WHERE ${idField} = ${id}`;

            // console.log(`====`, sql)

            const rows = await db.load(sql);
            return rows;
        } catch (error) {
            console.log("Error Model: User: Detail Pro Id", error);
        }
    },
    singleByUsername: async username => {
        const rows = await db.load(`select * from users where f_Username = '${username}'`);
        if (rows.length === 0)
            return null;

        return rows[0];
    },
    add: entity => db.add('users', entity),
    del: id => db.del('users', { f_ID: id }),

    updateOne: async(entity, cb) => {
        try {
            const rows = await db.update(tbName, idField, entity);
            cb(null, rows);
        } catch (error) {
            cb(error, null);
            console.log("Error Model: User: updateOne", error);
        }
    },
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