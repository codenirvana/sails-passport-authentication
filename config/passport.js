var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

passport.use('login', new LocalStrategy({
        passReqToCallback: true
    }, function(req, username, password, done) {
        User.findOne({
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
                return done(null, user);
            });
        });
    }));

    passport.use('register', new LocalStrategy({
            passReqToCallback: true
        }, function(req, username, password, done) {
            findOrCreateUser = function() {
                User.findOne({
                    username: username
                }, function(err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        return done(null, false, {message: 'User already exists'});
                    } else {
                        User.create({username:username, password:password}).exec(function createCB(err, user){
                            if (err) {
                                console.log('Error in Saving user: ' + err);
                                throw err;
                            }
                            return done(null, user, {message: 'User Created'});
                        });
                    }
                });
            };
            process.nextTick(findOrCreateUser);
        }));
