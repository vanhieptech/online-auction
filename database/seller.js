const db = require('../database/mysql');
const tbName = 'product'

module.exports = {
    all: async(ProID, product_name, starting_price, step_price, price_tobuynow, pro_description, usersID, extension) => {
        try {
            var exten;
            if(extension=='on') exten=1;
            else exten=0;
            const sql = `INSERT INTO \`products\` VALUES(${ProID},'${product_name}',${starting_price},${step_price},${price_tobuynow},'${pro_description}',${usersID},${exten})`;
            db.load(sql);
        } catch (error) {
            console.log('Error Model: Category: all', error);
        }
    }
};