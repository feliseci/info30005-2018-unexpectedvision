// Heroku link: https://powerful-ravine-40272.herokuapp.com/ (Note that Frida has to update it - use nodemon to test)
const express = require('express');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/', controller.landing);
router.get('/?failure=true', controller.landing);
router.get('/home', controller.home);
router.get('/login', controller.login);
router.get('/create-account', controller.createAccount);

router.get('/search/', controller.search);
router.get('/issue/:id', controller.issue);
router.get('/opportunity/:id', controller.opportunity);

router.get('/opportunities', controller.loadOpportunities);
router.get('/about', controller.loadAbout);
router.get('/random', controller.random);
router.get('/editor-application', controller.editorApplication);
router.get('/confirm-application', controller.confirmEditor);


router.post('/new-issue', controller.newIssue);
router.post('/new-contribution', controller.newContribution);
router.post('/new-opportunity', controller.newOpportunity);

// Issue banner
router.post('/like', controller.likeIssue);
router.post('/bookmark', controller.bookmarkIssue);
router.post('/follow', controller.followEditor);

// User Profile
router.get('/profile/:name', controller.userProfile);

// Permission based options - only for Editors
router.get('/create-article', controller.createArticle);
router.get('/create-opportunity', controller.createOpportunity);

// Passport-related
router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/?failure=true'
}));
router.post('/create-account', controller.newUser);
router.get('/logout', controller.logout);

module.exports = router;