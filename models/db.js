/* Accessing the information from MLAB. */
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const autoIncrement = require('mongoose-auto-increment');

/* Connect to MongoDB.*/
// DB Username: multiview, DB password: unexpectedvision
mongoose.connect('mongodb://multiview:unexpectedvision@ds161529.mlab.com:61529/unexpectedvision', function(err){
    if(!err) {

        console.log('Connected to mongo.');
    }
    else {
        console.log('Failed to connect to mongo.');
    }
});

autoIncrement.initialize(mongoose.connection);

require('./issues.js');
require('./users.js');
require('./opportunities.js');

// Authentication
const User = mongoose.model('users');
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                console.log("Incorrect username");
                return done(null, false, { message: 'Incorrect username.' });
            }
            if(user.password !== password) {
                console.log("Incorrect password");
                return done(null, false, { message: 'Incorrect password.' });
            }
            /*            if (!user.validPassword(password)) {*/
            // if (!user.verifyPassword(password)) { return done(null, false); }
            console.log("Success");
            return done(null, user);
        });
    }
));

// Needed for persistent sessions
passport.serializeUser( function(user, done) {
    return done(null, user);
});

passport.deserializeUser( function(user, done) {
    return done(null, user);
}); // Are the fields correct?
