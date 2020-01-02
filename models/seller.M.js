const db = require('../database/mysql');
module.exports = {
    add: async function(OwnerID, ProName, TinyDes, FullDes, StartPrice, Step, PriceToBuy, CatID, Extension){
        try {
            var exten;
            if(Extension=='on') exten=1;
            else exten=0;
            const sql = `INSERT INTO \`products\` VALUES(NULL, ${OwnerID}, NULL, '${ProName}', '${TinyDes}', '${FullDes}', ${StartPrice}, ${Step}, ${PriceToBuy}, ${CatID}, NULL, NULL, now(), addtime(now(),'12:0:0'), ${exten})`;
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
                const sql = `SELECT p.ProID,p.ProName, b. UserID, b.UserName, b.Price AS 'Sold' FROM biddinglist b, products p WHERE p.OwnerID=${OwnerID} AND (now()>p.TimeFinish) AND p.ProID=b.ProID AND b.Status=1 `; 
                const table = await db.load(sql);
                return table;
            }
            else if(option==4)
            {
                const sql = `SELECT w.WaitID, u.id, u.f_Username, p.ProID, p.ProName, w.Price FROM waitinglist w, products p, users u 
                WHERE p.OwnerID=${OwnerID} AND p.ProID=w.ProID AND w.UserID = u.id `;
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
    },
    addBidding: async function(UserID, UserName, ProID, Price, Stt)
    {
        try {
            const sql = `INSERT INTO biddinglist VALUES(NULL, ${UserID}, '${UserName}', ${ProID}, ${Price}, now(), ${Stt})`;
            await db.load(sql);
        }
        catch (error) {
            console.log('Error Add Bidding: ', error);
        }
    },
    deleteWait: async function(WaitID){
        try {
            const sql = `DELETE FROM waitinglist WHERE WaitID=${WaitID}`;
            await db.load(sql);
        }
        catch (error) {
            console.log('Error Delete Wait: ', error);
        }
    },
    loadMaxPrice: async function(ProID){
        try {
            const sql = `SELECT Price FROM products WHERE ProID=${ProID}`;
            const rows = await db.load(sql);
            return rows[0].Price;
        }
        catch (error) {
            console.log('Error load price: ', error);
        }
    },
    alterStatus: async function(ProID){
        try {
            const sql = `UPDATE biddinglist SET Status=0 WHERE ProID=${ProID} AND Status=1`;
            await db.load(sql);
        }
        catch (error) {
            console.log('Error update stt: ', error);
        }
    },
    reviewUser: async function(UserID, RatedID, Rate, Comment)
    {
        try {
            const sql = `INSERT INTO reviews VALUES(NULL, ${UserID}, ${RatedID}, ${Rate}, '${Comment}', now())`;
            await db.load(sql);
        }
        catch (error) {
            console.log('Error Add Bidding: ', error);
        }
    }
};