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
passport.use(new LocalStrategy(User.authenticate())); // Automatically uses the local-mongoose strategy
passport.serializeUser( function(user, done) {
    return done(null, user);
});
passport.deserializeUser( function(user, done) {
    return done(null, user);
});