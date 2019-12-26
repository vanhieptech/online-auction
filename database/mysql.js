const mysql = require("mysql");

function createConnection() {
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "12345678",
        database: "qlbh"
    });
}

exports.load = sql => {
    return new Promise((resole, reject) => {
        const con = createConnection();
        con.connect(err => {
            if (err) {
                reject(err);
            }
        });
        con.query(sql, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            resole(results);
        });
        con.end();
    });
};

exports.add = (tbName, entity) => {
    return new Promise((resole, reject) => {
        const con = createConnection();
        con.connect(err => {
            if (err) {
                reject(err);
            }
        });
        const sql = `INSERT INTO ${tbName} SET ?`;
        con.query(sql, entity, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            resole(results.insertId);
        });
        con.end();
    });
};
exports.mysql = (sql, params) => {
    return new Promise((resole, reject) => {
        //Something that i dont know :)
    });
};