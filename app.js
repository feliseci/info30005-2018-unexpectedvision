// Make sure Node.js is enabled in your Settings before running.
const express = require('express');

/*const path = require('path');
const http = require('http');*/
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
/*const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;*/

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

// Database setup
require('./models/db.js');

// TODO Passport setup
app.use(cookieParser()); // Remove if unnecessary; add secret otherwise
app.use(bodyParser.urlencoded({ extended: true })); // True? False?
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({
    secret: '', saveUninitialized: true, resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Router setup
const router = require('./routes/routes');
app.use(router);
app.use(express.static('./views')); // Needed for CSS to work, there may be a better way

// Starts the server.
app.listen(PORT, function() {
    console.log(`Server started at port ${PORT}`);
});