var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

passport.use(new LocalStrategy(function(username, password, done) {
        Users.findOne({
            username: username
        }, function (err, user) {
            if(err) {
                return done(err);
            }
            if(!user) {
                return done(null, false, {message: 'Credentials not recognised!'});
            }

            bcrypt.compare(password, user.password, function(err, res){
                if(!res) {
                    return done(null, false, {message: 'Password wrong!'});
                }
                return done(null, user, 'Signin success');
            });
        });
    }));
