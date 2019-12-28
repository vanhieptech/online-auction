const db = require('../database/mysql');
const tbName = 'product';

module.exports = {
    add: async(UserID, ProName, TinyDes, FullDes, StartPrice, Step, PriceToBuy, CatID, Extension) => {
        try {
            var exten;
            if(Extension=='on') exten=1;
            else exten=0;
            const sql = `INSERT INTO \`products\` VALUES(NULL, NULL, ${UserID}, '${ProName}', '${TinyDes}', '${FullDes}', ${StartPrice}, ${Step}, ${PriceToBuy}, ${CatID}, NULL, NULL, now(), now())`;
            db.load(sql);
        } catch (error) {
            console.log('Error Add Product: ', error);
        }
    }
};