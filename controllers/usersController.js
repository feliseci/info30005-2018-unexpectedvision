//Only the controller should have access to the data in the models.
const users = require('../models/usersArray');

module.exports.sayHello = function (req, res) {
    res.send('Hello World');
};

module.exports.fetchAllUsers = function (req, res) {
    //res.render('./views/user_template',{user : db[0]});
    res.render('user_template', {user: users});
};

module.exports.fetchUser =  function (req,res) {
    res.render('user_template', {user: users[req.params.id]});
};

