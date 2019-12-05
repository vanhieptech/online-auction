const express = require('express'),
    app = express(),
    exphbs = require('express-handlebars');
const dotEnv = require('dotenv');



//config cho express handlebars

dotEnv.config();
const PORT = process.env.PORT || 3000


const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));
/*
app.get('/', (req, res) => {
    res.render('home');
});
*/

//điều hướng về controller
app.use('/', require('./routers'));

app.listen(PORT, () => {
    console.log(`Server listening at PORT: ${PORT}`)
});