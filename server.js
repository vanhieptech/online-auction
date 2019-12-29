const express = require("express"),
    app = express(),
    exphbs = require("express-handlebars");
const dotEnv = require("dotenv");
var session = require("express-session");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var morgan = require("morgan");
var passport = require("passport");
var flash = require("connect-flash");

const FacebookStrategy = require("passport-facebook").Strategy;

const PORT = process.env.PORT || 3000;

//config cho express handlebars
//app.use(morgan('dev'));
app.use(cookieParser());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

//Config session to setting login
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true
    })
);

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
});
// config view engine using handlebars
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
//Config dir to using multi css, js
app.use(express.static(__dirname + "/public"));

app.use(flash());
//điều hướng về controller

app.use("/", require("./routers/index"));

require("./middlewares/locals.mdw")(app);
require("./middlewares/routes.mdw")(app);

//báo lôi
app.use((req, res, next) => {
    // res.render('vwError/404');
    res.send("You're lost");
});
app.use((err, req, res, next) => {
    // res.render('vwError/index');
    console.error(err.stack);
    res.status(500).send("View error on console.");
});

app.listen(PORT, () => {
    console.log(`Server listening at PORT: ${PORT}`);
});