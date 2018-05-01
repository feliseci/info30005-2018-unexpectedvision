//Only the controller should have access to the data in the models.
const issues = require('../models/dummyIssues');
const contributions = require('../models/dummyContribution');
const editors = require('../models/dummyEditors');
const opportunities = require('../models/dummyOpportunities');

module.exports.landing = function (req, res) {
    res.render('index');
};

module.exports.login = function (req, res) {
    res.render('login');
};

module.exports.create_account = function (req, res) {
     res.render('create_account');
};

module.exports.home = function (req, res) {
    // Pass the issues to be displayed on the home page & load.
    let popular_issue = issues[0];
    let recent_issue = issues[0];
    let popular_index = 0;

    // Get most popular issue
    for(i = 0; i < issues.length; i++) {
        if (issues[i].popularity > popular_issue.popularity) {
            popular_issue = issues[i];
            popular_index = i;
        }
    }

    // Get most recent issue
    for(i = 0; i < issues.length; i++) {
        if (issues[i].date > recent_issue.date) {
            // If it's the same as the most popular issue, ignore
            // NOTE: Only works if issues can't have the same name; compare URL & type instead

            if(i !== popular_index) {
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
        res.render('search_results', {results: issues});
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
    const sort_type = req.query.sort;
    console.log("Sort type: " + sort_type);

    // TODO
    /* Do within search page - i.e. just reorders everything?
     * This only works if you can reload the page while keeping the original search term
     * Could pass the search term as a parameter - so can access it in the search results
     * There may be some other way to access it without doing this using JS -
     * if not only rewriting parts of the URL, then just accessing the URL
     * Alternatively having another url path /search?=.../sort/popularity ... ugly*/
    // Popularity descending //TODO assumes popularity ordered by most points = more popular
    if(sort_type.localeCompare("popularity") == 0) {
        // Descending popularity sort
        results.sort(function(a, b) {

            if (a.popularity > b.popularity) { return -1; } // 1 if ascending & same ordering
            if (a.popularity < b.popularity) { return 1; } // -1 if ascending
            return 0;

        });
    }

    /*

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

module.exports.contribution = function (req,res) {
    const contribution = contributions[req.params.id];
    res.render('contributions_template', {contribution: contribution});
};

module.exports.random = function (req,res) {
    // Generate a random index in the issues array
    let random_id = Math.floor(Math.random() * (issues.length));

    // Check the type, fetch the issue contents depending on the type.
    if(issues[random_id].type.localeCompare("editor")) {
        res.render('editor_template', {editor: editors[issues[random_id].url]});
    }
    else {
        res.render('contributions_template', {contribution: contributions[issues[random_id].url]});
    }

};

/* Editor Page - Jenny testing how editor_template works */
module.exports.editor = function(req,res){
    const editor = editors[req.params.id];
    res.render('editor_template', {editor: editor})
};

module.exports.opportunity = function (req, res) {
    const opportunity = opportunities[req.params.id];
    res.render('opportunity_template', {opportunity: opportunity})
};

module.exports.loadOpportunities = function (req, res) {
    res.render('opportunities_landing', {results: opportunities});
};

module.exports.loadArticles = function (req, res) {
    let results = [];
    for(i = 0; i < issues.length; i++ ) {
        if("contributor".localeCompare(issues[i].type) == 0) {
            results.push(issues[i]);
        }
    }
    // Technically, if the display methods are
    // the same this should just lead to the search with only editor articles selected.
    // So leave the above but load search_results instead res.render('search_results', {results: results});

    res.render('articles_landing', {results: results});
};

module.exports.loadAbout = function (req, res) {
    res.render('about_page');
};


module.exports.editorApplication = function (req, res) {
    res.render('editor_application');
};

module.exports.createArticle = function (req, res) {
    res.render('create_article');
};