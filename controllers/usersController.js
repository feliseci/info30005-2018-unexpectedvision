
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
    // Pass the issues to be displayed on the home page & load.
    let popular_issue = issues[0];
    let recent_issue = issues[0];

    // Get most popular issue
    for(i = 0; i < issues.length; i++) {
        if (issues[i].popularity > popular_issue.popularity) {
            popular_issue = issues[i];
        }
    }

    // Get most recent issue
    for(i = 0; i < issues.length; i++) {
        if (issues[i].date > recent_issue.date) {
            // If it's the same as the most popular issue, ignore
            if(issues[i] != popular_issue) {
                recent_issue = issues[i];
            }
        }
    }

    res.render('home_page', {popular_issue: popular_issue, recent_issue: recent_issue});
};

module.exports.search = function (req,res) {
    // req.query.var accesses the "stuff" in /URLend?var=stuff
    // See http://expressjs.com/en/api.html#req.query
    const query = req.query.query;

    // If no query was entered, display all objects.
    if(query.isEmptyObject) {
        this.search_all();
        return;
    }

    // TODO change to test: syntax regexp.test(string to be searched in); returns true/false
    // unless want to highlight the searched term https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test

    const regexp = new RegExp(query, "i");

    let results = [];

    /*Search issues for the term. */
    for(i = 0; i < issues.length; i++) {
        // Check presence of the query in name, description & category
        const in_name = issues[i].name.search(regexp); // /query/i? TODO
        const in_description = issues[i].description.search(regexp);
        let in_category = -1;
        for(j = 0; j < issues[i].categories.length; j++) {
            if(issues[i].categories[j].search(regexp) > -1) {
                in_category = 0;
            }
        }

        // Add the issue to the search results if the query was in one of the fields
        if((in_name + in_description + in_category) > -3) {
           results.push(issues[i]);
        }

    }

    /* Sort the array if a sorting method was entered. Default sorting TBD at back-end. */
    /*const sort_type = req.query.sort;

    if(!(sort_type === undefined || sort_type.isEmptyObject)) {
        // Ascending alphabetical sort
        if(sort_type.localeCompare("alpha") == 0) {
            results.sort(function(a, b) {
                const name_a = a.name.toLowerCase();
                const name_b = b.name.toLowerCase();

                if(name_a > name_b) { return 1; }
                if(name_a < name_b) { return -1; }
                return 0;
            });
        }
        else if(sort_type.localeCompare("popularity") == 0) {
            // Descending date sort (most recent first)
            results.sort(function(a, b) {
                if (a.popularity > b.popularity) { return 1; }
                if (a.popularity < b.popularity) { return -1; }
                return 0;
            }); // Replace with implementation appropriate to data format

        }
        else if(sort_type.localeCompare("date") == 0) {
            // Descending popularity sort
            results.sort(function(a, b) {

                if (a.date > b.date) { return 1; }
                if (a.date < b.date) { return -1; }
                return 0;

            }); // Replace with implementation appropriate to data format

            for(k = 0; k < results.length; k++) {
                console.log(results[k].date);
            }

        }

    }*/

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
