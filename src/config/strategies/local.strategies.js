const passport = require('passport');
const { Strategy } = require('passport-local');

module.exports = function localStrategy() {
    passport.use(new Strategy);
}