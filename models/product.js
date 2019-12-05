const db = require('../database/mysql')
const tbName = `Products`;

module.exports = {
    all: async() => {
        try {
            const sql = `SELECT * FROM ${tbName}`;
            const rows = await db.load(sql);

            return rows;

        } catch (error) {
            console.log('Error Model: Product: all', error);
        }
    },
    allByCatId: async(id) => {
        try {
            const sql = `SELECT * FROM ${tbName} WHERE CatID = ${id}`;
            const rows = await db.load(sql);
            return rows;

        } catch (error) {
            console.log('Error Model: Product: all Cat Id', error);
        }
    },
    getDetailById: async(id) => {
        try {
            const sql = `SELECT * FROM ${tbName} WHERE ProID = ${id}`;
            const rows = await db.load(sql);
            return rows;

        } catch (error) {
            console.log('Error Model: Product: all Pro Id', error);
        }
    }
}