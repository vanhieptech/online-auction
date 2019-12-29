const db = require('../database/mysql');
module.exports = {
    add: async function(UserID, ProName, TinyDes, FullDes, StartPrice, Step, PriceToBuy, CatID, Extension){
        try {
            var exten;
            if(Extension=='on') exten=1;
            else exten=0;
            const sql = `INSERT INTO \`products\` VALUES(NULL, NULL, ${UserID}, '${ProName}', '${TinyDes}', '${FullDes}', ${StartPrice}, ${Step}, ${PriceToBuy}, ${CatID}, NULL, NULL, now(), now())`;
            db.load(sql);
        }
        catch (error) {
            console.log('Error Add Product: ', error);
        }
    },
    load: async function(UserID){
        try {
            const sql = `SELECT * FROM products WHERE UserID=${UserID}`;
            const table = await db.load(sql);
            return table;
        }
        catch (error) {
            console.log('Error Load Product: ', error);
        }
    }
};