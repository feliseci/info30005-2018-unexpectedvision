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
    done(null, user.id);
});
passport.deserializeUser( function(id, done) {
    // Decide which details are stored by the session
    // See https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
    // See https://stackoverflow.com/questions/37516863/auth-using-passport-js-confusion-with-syntax
    // Simply passing user would include the salt and hashed password, and is insecure

    // TODO increases loading time, unfortunately
    User.findOne({_id: id}, function(err, user) {
        let user_details = {
            username: user.username,
            is_editor: user.is_editor,
            display_name: user.display_name,
            likes: user.likes,
            followed_users: user.followed_users,
            followed_articles: user.followed_articles
        };

        done(err, user_details);
    });

});