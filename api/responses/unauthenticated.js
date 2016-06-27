module.exports = function unauthenticated() {
    var res = this.res;
    res.status(401);
    res.redirect('/login');
}
