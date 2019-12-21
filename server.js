const express = require('express'),
    app = express(),
    exphbs = require('express-handlebars');
const dotEnv = require('dotenv');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var flash    = require('connect-flash');
var config            =     require('./config/config')
const FacebookStrategy  =     require('passport-facebook').Strategy
require('./config/passport')(passport);
//config cho express handlebars
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

dotEnv.config();
const PORT = process.env.PORT || 3000

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});


app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));


app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } ));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//điều hướng về controller
app.use('/', require('./routers'));
app.use(express.static(__dirname + '/public'));
app.listen(PORT, () => {
    console.log(`Server listening at PORT: ${PORT}`)
});