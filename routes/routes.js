const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

// do NOT use the brackets which come with the auto-fill (sayHello() does not work)
router.get('/', controller.sayHello);

// How to bring up user databased
router.get('/user', controller.fetchAllUsers);

// bringing up specific user based on id
router.get('/user/:id', controller.fetchUser);

module.exports = router;


