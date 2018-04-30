// Heroku link: https://powerful-ravine-40272.herokuapp.com/ (Note that Frida has to update it - use nodemon to test)
const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

router.get('/', controller.landing);
router.get('/home', controller.home);
router.get('/login', controller.login);
router.get('/create-account', controller.create_account);

router.get('/search/', controller.search);
router.get('/contributor/:id', controller.contribution);
router.get('/editor/:id', controller.editor);
router.get('/opportunity/:id', controller.opportunity);

router.get('/opportunities', controller.loadOpportunities);
router.get('/contributions', controller.loadContributions);
router.get('/editors',controller.loadEditors);
router.get('/about', controller.loadAbout);
router.get('/random', controller.random);
router.get('/editor-application', controller.editorApplication);

/* Permission based option - only for Editors*/
router.get('/create-article', controller.createArticle);

//TODO - DB testing
router.get('/test', controller.testDB);
router.get('/new_issue', controller.new_issue);
router.get('/new_contribution', controller.new_contribution);
router.get('/new_user', controller.new_user);
router.get('/test_opp', controller.testDBopp);
router.get('/new_opportunity', controller.new_opportunity);

module.exports = router;