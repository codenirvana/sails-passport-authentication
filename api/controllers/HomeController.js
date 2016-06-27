/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	showHomePage: function(res, req) {
		res.next();
	},
	dashboard: function(req, res) {
		res.redirect('/dashboard');
	}
};
