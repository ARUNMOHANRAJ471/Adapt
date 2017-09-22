const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('../server/users/userEntity').user;
const connectFlash = require('connect-flash');

passport.use(new LocalStrategy(function(username, password, cb) {
  users.findOne({"username": username}, function(err, user)
  {
    if (err) { return cb(err); }
    if (!user) {return cb(null, false); }
    if (user.password != password) {return cb(null, false); }
    return cb(null, user);
  });
}));

passport.serializeUser(function(user, done) {
  console.log('serializeUser');
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
console.log("deserializeUser");
users.findById(id, function(err, user) {
  done(err, user);
});
});

module.exports = passport;
