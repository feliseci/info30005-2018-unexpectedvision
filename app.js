// Requirements
const express = require('express');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

// Database setup
require('./models/db.js');

// Passport setup
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({
    secret: '?', saveUninitialized: true, resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Router setup
const router = require('./routes/routes');
app.use(router);
app.use(express.static('./views'));

// Starts the server.
app.listen(PORT, function() {
    console.log(`Server started at port ${PORT}`);
});