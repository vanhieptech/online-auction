var LocalStrategy   = require('passport-local').Strategy;
const FacebookStrategy  =     require('passport-facebook').Strategy
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var config = require('../config/config');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    passport.use(
        'local-signup',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
			if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
			return done(null, false, req.flash('loginMessage', 'TÃªn ngÆ°á»i dÃ¹ng khÃ´ng tá»n táº¡i'));}
            connection.query("SELECT * FROM users WHERE f_Username = ?",[username], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'TÃªn ngÆ°á»i dÃ¹ng ÄÃ£ tá»n táº¡i'));
                } else {
                    var newUserMysql = {
                        username: username,
                        password: bcrypt.hashSync(password, null, null)
                    };
					var FN=req.body.fullname;
					var ADDR=req.body.Address;
					var Em=req.body.Email;
					var phone=req.body.phone;
					var bir=req.body.birthday;
                    var insertQuery = "INSERT INTO users ( f_Username,f_Password, f_Name,f_Email,f_DOB,f_phone,f_address,f_Permission ) values (?,?,?,?,?,?,?,?)";
                    connection.query(insertQuery,[newUserMysql.username,newUserMysql.password,FN,Em,bir,phone,ADDR,'0'],function(err, rows) {
                        newUserMysql.id = rows.insertId;
                        return done(null, newUserMysql);
						
                    });
                }
            });
        })
    );

    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
			if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
			return done(null, false);
  }
             connection.query('SELECT * FROM users WHERE f_Username = ?',[username],  function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false);
                }
				
                if (!bcrypt.compareSync(password, rows[0].f_Password))
                    return done(null, false);
				

                return done(null, rows[0]);
            });
        })
    );
	passport.use(new FacebookStrategy({
    clientID: config.facebook_api_key,
    clientSecret:config.facebook_api_secret ,
    callbackURL: config.callback_url
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      //Check whether the User exists or not using profile.id
      if(config.use_database) {
        // if sets to true
        pool.query("SELECT * from users where username="+profile.id, (err,rows) => {
          if(err) throw err;
          if(rows && rows.length === 0) {
              console.log("There is no such user, adding now");
              pool.query("INSERT into user_info(username,fullname) VALUES('"+profile.id+"','"+profile.username+"')");
          } else {
              console.log("User already exists in database");
          }
        });
      }
      return done(null, profile);
    });
  }
));
};
