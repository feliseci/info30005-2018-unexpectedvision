
module.exports.loadIndex = function (req, res) {
    // Resolve converts to absolute path required for sendFile
    // See https://nodejs.org/api/path.html#path_path_resolve_paths
    const resolve = require('path').resolve;
    res.sendFile(resolve('./views/index.html'));
};

/* TODO: PAGES */
module.exports.landing = function (req, res) {
    const resolve = require('path').resolve;
    res.sendFile(resolve('./views/landing_page.html'));
};

const issues = require('../models/dummyIssues');

module.exports.home = function (req, res) {
    res.render('home_page', {issues: issues});
};

// TODO Clean
module.exports.search = function (req,res) {
    const query = req.query.query;

    //
    if(query.isEmptyObject) {
        this.search_all();
    }

    let results = [];
/*    console.log("Query is " + query);*/

    /*Search issues for the term. */
    for(i = 0; i < issues.length; i++) {
        // Check presence of the query in name, description & category
        const in_name = issues[i].name.search(query); // /query/i? TODO
        const in_description = issues[i].description.search(query);
        let in_category = -1;
        for(j = 0; j < issues[i].categories.length; j++) {
            if(issues[i].categories[j].search(query) > -1) {
                in_category = 0;
            }
        }

/*        console.log("Search initiated: issue " + i + " was at name " + in_name + " , in description " + in_description + " and in categories " + in_category);*/

        // Add the issue to the search results if the query was in one of the fields
        if((in_name + in_description + in_category + in_category) > -3) {
/*            console.log("Result: " + (in_name+in_description));*/
           results.push(issues[i]);
        }

    }

    res.render('search_results', {results: results});
};

module.exports.search_all = function (req,res) {
    res.render('search_results', {results: issues});
};

const contributions = require('../models/dummyContribution');
const editors = require('../models/dummyEditors');

module.exports.contribution = function (req,res) {
    const contribution = contributions[req.params.id];
    res.render('contributions_template', {contribution: contribution});
};


/* Jenny testing how editor_template works */
module.exports.editor = function(req,res){
    const editor = editors[req.params.id];
    res.render('editor_template', {editor: editor})
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

