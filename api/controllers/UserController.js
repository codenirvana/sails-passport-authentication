/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');

module.exports = {
	index: function (req, res) {
		res.view('homepage');
	},
	login: function (req, res) {
		passport.authenticate('login', function(err, user, info){
			if((err)||(!user)){
				res.status(403);
				return res.send({message: info.message});
			}
			req.session.authenticated = true;
			res.redirect('/app');
			return res.ok();
		})(req, res);
	},
	register: function (req, res) {
		passport.authenticate('register', function(err, user, info){
			if((err)||(!user)){
				res.status(403);
				return res.send({message: info.message});
			}

			res.redirect('/login');
			return res.ok();
		})(req, res);
	},
	logout: function(req, res) {
		req.logout();
		req.session.destroy();
        res.redirect('/');
	}
};
