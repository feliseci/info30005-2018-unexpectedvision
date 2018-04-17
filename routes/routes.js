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

/* Editor page route - Jenny test*/
router.get('/editor/:id', controller.editor);
router.get('/opportunities', controller.loadOpportunities);
router.get('/contributions', controller.loadContributions);
router.get('/editors',controller.loadEditors);
router.get('/about', controller.loadAbout);


/* LECTURE / WORKSHOP CODE - FOR REFERENCE*/
router.get('/coming-soon', controller.loadIndex); // do NOT use the brackets which come with the auto-fill (sayHello() does not work)
router.get('/hello', controller.sayHello);
router.get('/user', controller.fetchAllUsers); // How to bring up user database
router.get('/user/:id', controller.fetchUser); // bringing up specific user based on id


module.exports = router;


