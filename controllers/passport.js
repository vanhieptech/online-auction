const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    accountM = require('../models/account.M'),
    hash = require('../utils/hash');



passport.serializeUser(function(users, done) {
    done(null, users.f_ID);
});
passport.deserializeUser(async(id, done) => {
    const [users, err] = await run(accountM.getById(id));
    done(err, users);
});
passport.use('local', new LocalStrategy(

    async(username, password, done) => {
        const [users, err] = await run(accountM.getByUsername(username));
        if (err) {
            return done(err);
        }
        if (users === null) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (fthash.comparePassword(password, users.f_Password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, users);
    }
));