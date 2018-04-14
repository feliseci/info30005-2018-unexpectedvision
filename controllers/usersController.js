
module.exports.loadIndex = function (req, res) {
    // Resolve converts to absolute path required for sendFile
    // See https://nodejs.org/api/path.html#path_path_resolve_paths
    const resolve = require('path').resolve;
    res.sendFile(resolve('./views/index.html'));
};

/* TODO: PAGES */
const issues = require('../models/dummyIssues');

module.exports.home = function (req, res) {
    res.render('home_page', {issues: issues});
};

module.exports.search = function (req,res) {
    const query = req.params.query;
    res.render('search_results', {results: issues});
};

module.exports.search_all = function (req,res) {
    res.render('search_results', {results: issues});
};

const contributions = require('../models/dummyContribution');

module.exports.contribution = function (req,res) {
    const contribution = contributions[req.params.id];
    res.render('contributions_template', {contribution: contribution});
};


/* LECTURE / WORKSHOP CODE - FOR REFERENCE*/
//Only the controller should have access to the data in the models.
const users = require('../models/usersArray');

module.exports.sayHello = function (req, res) {
    res.send("Hello World!");
};

module.exports.fetchAllUsers = function (req, res) {
    //res.render('./views/user_template',{user : db[0]});
    res.render('user_template', {user: users});
};

module.exports.fetchUser =  function (req,res) {
    res.render('user_template', {user: users[req.params.id]});
};

