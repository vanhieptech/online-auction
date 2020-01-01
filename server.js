const express = require("express"),
    app = express(),
    exphbs = require("express-handlebars");
const dotEnv = require("dotenv");
const hbs_sections = require("express-handlebars-sections");
var session = require("express-session");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var morgan = require("morgan");
var passport = require("passport");
var flash = require("connect-flash");
const FacebookStrategy = require("passport-facebook").Strategy;
const config = require('./config/keyloginFB');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keyloginGG');
const PORT = process.env.PORT || 3000;

//passport cấu hình

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

// Use the FacebookStrategy within Passport.
passport.use(new FacebookStrategy({
        clientID: config.facebook_api_key,
        clientSecret: config.facebook_api_secret,
        callbackURL: config.callback_url
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            console.log(accessToken, refreshToken, profile, done);
            return done(null, profile);
        });
    }
));
// passport gg
passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        process.nextTick(function() {
            console.log(accessToken, refreshToken, profile, done);
            return done(null, profile);
        });
    })
);
app.use(passport.initialize());
app.use(passport.session());

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
    extname: "hbs",
    helpers: {
        section: hbs_sections(),
        format: val => numeral(val).format("0,0")
    }
});
// config view engine using handlebars
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
//Config dir to using multi css, js
app.use(express.static(__dirname + "/public"));

app.use(flash());
//điều hướng về controller

require("./middlewares/locals.mdw")(app);
require("./middlewares/routes.mdw")(app);

//báo lôi
// app.use((req, res, next) => {
//     res.render("vwError/404");
// });
// app.use((err, req, res, next) => {
//     // res.render('vwError/index');
//     res.render("vwError/500");
//     console.error(err.stack);
// });
//a
app.listen(PORT, () => {
    console.log(`Server listening at PORT: ${PORT}`);
});