const db = require('../database/mysql');
module.exports = {
    add: async function(OwnerID, ProName, TinyDes, FullDes, StartPrice, Step, PriceToBuy, CatID, Extension){
        try {
            var exten;
            if(Extension=='on') exten=1;
            else exten=0;
            const sql = `INSERT INTO \`products\` VALUES(NULL, ${OwnerID}, NULL, '${ProName}', '${TinyDes}', '${FullDes}', ${StartPrice}, ${Step}, ${PriceToBuy}, ${CatID}, NULL, NULL, now(), addtime(now(),'12:0:0)', ${exten})`;
            await db.load(sql);
        }
        catch (error) {
            console.log('Error Add Product: ', error);
        }
    },
    load: async function(OwnerID, option){
        try {
            if(option==1)
            {
                const sql = `SELECT * FROM products WHERE OwnerID=${OwnerID}`; // tất cả sản phẩm
                const table = await db.load(sql);
                return table;
            }
            else if(option==2)
            {
                const sql = `SELECT * FROM products WHERE OwnerID=${OwnerID} AND (now()<TimeFinish)`; // còn hạn đấu giá
                const table = await db.load(sql);
                return table;
            }
            else if(option==3)
            {
                const sql = `SELECT * FROM products WHERE OwnerID=${OwnerID} AND (now()>TimeFinish) AND (UserID IS NOT NULL)`; //đã có chủ và hết hạn đấu giá
                const table = await db.load(sql);
                return table;
            }
        }
        catch (error) {
            console.log('Error Load Product: ', error);
        }
    },
    update: async function(ProID, Des){
        try {
            const sql = `UPDATE products SET FullDes='${Des}' WHERE ProID=${ProID}`;
            await db.load(sql);
        }
        catch (error) {
            console.log('Error Load Product: ', error);
        }
    }
};