/* Imports */
// Requirements
const mongoose = require('mongoose');

// Schema
const Issue = mongoose.model('issues');
const User = mongoose.model('users');
const Opportunity = mongoose.model('opportunities');

/*Search-related methods*/
module.exports.home = function (req, res) {

    // Find the most popular issue
    Issue.find({}).limit(1).sort({"popularity": -1}).exec(function(err, popular_issue) {
        if(!err) {

            let popular = {
                name: popular_issue[0].name,
                categories: popular_issue[0].categories,
                description: popular_issue[0].description,
                url: popular_issue[0]._id,
                image: popular_issue[0].image
            };

            // Find the most recently updated issue
            Issue.find({}).limit(2).sort({"date_update": -1}).exec(function(err, recent_issue) {
                if(err) {
                    res.sendStatus(409);
                    return;
                }
                // Check recent & popular issue are not the same
                if(recent_issue[0]._id === popular_issue[0]._id) {
                    let recent = {
                        name: recent_issue[1].name,
                        categories: recent_issue[1].categories,
                        description: recent_issue[1].description,
                        url: recent_issue[1]._id,
                        image: recent_issue[1].image
                    };

                    res.render('home_page',
                        {popular_issue: popular, recent_issue: recent});
                    return;
                }

                let recent = {
                    name: recent_issue[0].name,
                    categories: recent_issue[0].categories,
                    description: recent_issue[0].description,
                    url: recent_issue[0]._id,
                    image: recent_issue[0].image
                };

                // Render home page with recent & popular issue
                res.render('home_page',
                    {popular_issue: popular, recent_issue: recent, user: req.user});
            });
        }
        else {
            res.sendStatus(409);
        }
    });

    // TODO populate with more issues
};
module.exports.search = function (req, res) {

    // Fetch the whole issues collection
    Issue.find({}, function(err, issues) {
        if(!err) {
            let results = [];

            // Iterate over the documents
            for(i = 0; i < issues.length; i++) {

                // Check each relevant field for the search query
                if(check(issues[i], req.query.query)) {

                    // Add only required fields to the search results
                    results.push({
                        name: issues[i].name,
                        categories: issues[i].categories,
                        description: issues[i].description,
                        url: issues[i]._id
                    });
                }
            }

            sort(results, req.query.sort); // Sort issues according to entered method
            res.render('search_results', {results: results, user: req.user}); // Render the results

        } else {
            res.sendStatus(409);
        }
    });
};
function check(issue, query) {
    const regexp = new RegExp(query, "i"); // Case-insensitive search

    if(query === undefined) { return; } // No query was entered, list all results

    // Check presence of the query in name, description & category
    const in_name = issue.name.search(regexp);
    const in_description = issue.description.search(regexp);
    let in_category = -1;
    for(j = 0; j < issue.categories.length; j++) {
        if(issue.categories[j].search(regexp) > -1) {
            in_category = 0;

        }
    }

    // Add the issue to the search results if the query was in at least one of the fields
    return((in_name + in_description + in_category) > -3);
}
function sort(issues, type) {
    // TODO, could separate into further methods
    if(type === undefined) { return; } // No sort was entered, use default sorting
    console.log("Sort type: " + type);
    return issues;

    /* Do within search page - i.e. just reorders everything?
     * This only works if you can reload the page while keeping the original search term
     * Could pass the search term as a parameter - so can access it in the search results
     * There may be some other way to access it without doing this using JS -
     * if not only rewriting parts of the URL, then just accessing the URL
     * Alternatively having another url path /search?=.../sort/popularity ... ugly*/

    // FUNCTIONAL: Popularity descending
    /*if(type.localeCompare("popularity") === 0) {
        // Descending popularity sort
        results.sort(function(a, b) {

            if (a.popularity > b.popularity) { return -1; } // 1 if ascending & same ordering
            if (a.popularity < b.popularity) { return 1; } // -1 if ascending
            return 0;

        });
    }*/

    /*

    if(!(sort_type === undefined || sort_type.isEmptyObject)) {
        // Ascending alphabetical sort
        if(sort_type.localeCompare("alpha") === 0) {
            results.sort(function(a, b) {
                const name_a = a.name.toLowerCase();
                const name_b = b.name.toLowerCase();

                if(name_a > name_b) { return 1; }
                if(name_a < name_b) { return -1; }
                return 0;
            });
        }
        else if(sort_type.localeCompare("popularity") === 0) {
            // Descending date sort (most recent first)
            results.sort(function(a, b) {
                if (a.popularity > b.popularity) { return 1; }
                if (a.popularity < b.popularity) { return -1; }
                return 0;
            }); // Replace with implementation appropriate to data format

        }
        else if(sort_type.localeCompare("date") === 0) {
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
}
module.exports.random = function (req,res) {
    // Get the number of documents in the issues collection
    Issue.count({}, function(err, count){

        if(err) {
            res.sendStatus(409);
            return;
        }

        // Generate a random index in the issues array
        let random_id = Math.floor(Math.random() * (count));

        res.redirect('../issue/' + random_id);

    });

    //TODO if an issue is deleted, not all indeces in the range of the length will be valid
};

/*Content page-related methods*/
module.exports.issue = function(req,res){

    // Fetch the issue with the given URL/id
    Issue.findOne({_id: req.params.id}, function(err, issue) {
        if(err) {
            res.sendStatus(409);
            return;
        }

        // Issue ID invalid; no results returned by findOne
        // Note: find returns [] if empty, findOne returns null
        if(issue === null) {
            res.sendStatus(404);
            return;
        }

        // Issue with the given id successfully found
        res.render('editor_template', {editor: issue, user: req.user});
        // TODO contributions
    });
};

module.exports.loadContributions = function (req, res) {
    // Fetch the issue with the given URL/id
    Issue.findOne({_id: req.params.id}, function(err, issue) {
        if(err) {
            res.sendStatus(409);
            return;
        }

        // Issue ID invalid; no results returned by findOne
        // Note: find returns [] if empty, findOne returns null
        if(issue === null) {
            res.sendStatus(404);
            return;
        }

        // Issue with the given id successfully found
        res.render('contributions_template', {issue: {name: issue.name}, comments: issue.contributions, user: req.user});
    });
}; // temp; contrib's will be part of issue page in final

module.exports.opportunity = function (req, res) {

    // Fetch the opportunity with the given URL/id
    Opportunity.findOne({_id: req.params.id}, function(err, opportunity) {
        if(err) {
            res.sendStatus(409);
            return;
        }
        // Issue ID invalid; no results returned by findOne
        // Note: find returns [] if empty, findOne returns null
        if(opportunity === null) {
            res.sendStatus(404);
            return;
        }

        // Issue with the given id successfully found
        res.render('opportunity_template', {opportunity: opportunity, user: req.user});

    });

};
module.exports.loadOpportunities = function (req, res) {
    // Fetch the whole opportunities collection
    Opportunity.find({}, function(err, opportunities) {
        if(!err) {
            let results = [];

            // Iterate over the issues documents
            for(i = 0; i < opportunities.length; i++) {

                // Add only required fields to the search results
                results.push({
                    name: opportunities[i].name,
                    categories: opportunities[i].categories,
                    description: opportunities[i].description,
                    url: opportunities[i]._id // id = url
                });
            }

            sort(results, req.query.sort); // Sort issues according to entered method
            res.render('opportunities_landing', {results: results, user: req.user});

        } else {
            res.sendStatus(409);
        }
    });
};

/*Database addition-related pages*/
module.exports.createAccount = function (req, res) {
    // Have to pass user for navbar to work
    // although create account shouldn't be accessible while logged in
    res.render('create_account', {user: req.user});
};
module.exports.newUser = function (req, res) {

    // Get the entered details for the new user from the URL
    let newUser = new User({
        "username": req.query.username,
        "display_name": req.query.username, // Default to == username
        "email": req.query.email,
    });

    // Register the user using passport-local-mongoose, which hashes the password
    User.register(newUser, req.query.password, function(err) {
        if(!err) {
            res.redirect('../home'); // TODO authenticate
            console.log("New user sent.");
        } else{
            res.sendStatus(400);
        }
    });
};
module.exports.createArticle = function (req, res) {
    res.render('create_article', {user: req.user});
};
module.exports.newIssue = function (req, res) {
    // Get the entered details for the new issue from the URL
    let newIssue = new Issue({
        "name": req.query.name,
        "author": req.query.author,
        "description": req.query.description,
        "image": req.query.image,
        "hl_source": req.query.hl_source,
        "r_source": req.query.r_source,
        "o_source": req.query.o_source
    });

    // Add the new issue to the DB
    newIssue.save(function(err,newIssue) {
        if(!err) {
            res.send(newIssue); // TODO replace with appropriate render
            console.log("New issue sent.");
        } else{
            res.sendStatus(400);
        }
    });
};
module.exports.newContribution = function (req, res) {
    // Get the entered details for the new contribution from the URL
    let newContribution = {
        "author": req.query.author,
        "comment": req.query.comment,
        "article_url": req.query.article_url
    };

    // Update the given issue with a new contribution
    Issue.findOneAndUpdate({name: req.query.name}, {$push: {contributions: newContribution}}, function(err) {
        if (err) { res.sendStatus(409); return; }
        console.log("New contribution sent.");
    });

    res.send(newContribution); // TODO replace with appropriate render
};
module.exports.createOpportunity = function (req, res) {
    res.render('opportunities_form', {user: req.user});
};
module.exports.newOpportunity = function (req, res) {
    // Get the entered details for the new opportunity from the URL
    let newOpportunity = new Opportunity({
        "name": req.query.name,
        "organiser": req.query.organiser,
        "description": req.query.description,
        "image": req.query.image,
        "date_event": req.query.date,
        "location": req.query.location,
        "further_info": req.query.further_info
    });

    // Add the new opportunity to the DB
    newOpportunity.save(function(err,newOpportunity) {
        if(!err) {
            res.send(newOpportunity); // TODO replace with appropriate render
            console.log("New opportunity sent.");
        } else{
            res.sendStatus(400);
        }
    });
};
module.exports.editorApplication = function (req, res) {
    res.render('editor_application', {user: req.user});
}; // TODO

/*Landing & simple rendering methods. */
module.exports.landing = function (req, res) {
    res.render('index', {user: req.user});
};
module.exports.login = function (req, res) {
    res.render('login', {user: req.user}); // TODO Remove login button on login page? See createAccount
};
module.exports.loadAbout = function (req, res) {
    res.render('about_page', {user: req.user});
};

/* Test functions used to populate DB in case of reset.
 * Note documents should be deleted manually in mLab. */
module.exports.resetDB = function (req, res) {

    // Add the dummy data to each collection
    resetIssues();
    resetOpportunities();
/*    resetUsers();*/

    res.send("Database reset!");

};
resetIssues = function (req, res) {
    const dummyIssues = require('../models/dummy/dummyIssues');

    // Add issues from dummyIssues.js
    for(i = 0; i < dummyIssues.length; i++) {
        let newIssue = new Issue({
            "name": dummyIssues[i].name,
            "author": dummyIssues[i].author,
            "description": dummyIssues[i].description,
            "image": dummyIssues[i].image,
            "hl_source": dummyIssues[i].hl_source,
            "r_source": dummyIssues[i].r_source,
            "o_source": dummyIssues[i].o_source,
            "date_post": dummyIssues[i].date_post,
            "date_update": dummyIssues[i].date_update,
            "popularity": dummyIssues[i].popularity,
            "categories": dummyIssues[i].categories,
            "contributions": dummyIssues[i].contributions/*,
            "url": dummyIssues[i].url*/
        });
        newIssue.save(function(err) {
            if(!err) {
                console.log("New issue sent.");
            } else{
                res.sendStatus(400);
            }
        });
    }

    console.log("Issues reset");
};
resetOpportunities = function (req, res) {
    const dummyOpportunities = require('../models/dummy/dummyOpportunities');

    // Add opportunities from dummyOpportunities.js
    for(i = 0; i < dummyOpportunities.length; i++) {
        let newOpportunity = new Opportunity({
            "name": dummyOpportunities[i].name,
            "organiser": dummyOpportunities[i].author,
            "description": dummyOpportunities[i].description,
            "image": dummyOpportunities[i].image,
            "date_post": dummyOpportunities[i].date_post,
            "date_event": dummyOpportunities[i].date_event,
            "popularity": dummyOpportunities[i].popularity,
            "categories": dummyOpportunities[i].categories,
            /*"url": dummyOpportunities[i].url,*/
            "location": dummyOpportunities[i].location,
            "further_info": dummyOpportunities[i].further_info
        });
        newOpportunity.save(function(err) {
            if(!err) {
                console.log("New opportunity sent.");
            } else{
                res.sendStatus(400);
            }
        });
    }

    console.log("Opportunities reset");
};
resetUsers = function (req, res) {
    const dummyUsers = require('../models/dummy/dummyUsers');

    // Add users from dummyOpportunities.js
    for(i = 0; i < dummyUsers.length; i++) {
        let newUser = new User({
            "username": dummyUsers[i].username,
            "display_name": dummyUsers[i].display_name,
            "profile_description": dummyUsers[i].profile_description,
            "email": dummyUsers[i].email,
            "is_editor": dummyUsers[i].is_editor
        });

        User.register(newUser, dummyUsers[i].password, function(err, user) {
            if(!err) {
                console.log("New user sent.");
            } else{
                res.sendStatus(400);
            }
        });
    }

    console.log("Users reset.");

};

/* Passport-related methods */
module.exports.logout = function(req, res){
    let name = req.user.username;
    console.log("Logging out " + name + "...");
    req.logout();
    res.redirect('../home'); // Or landing
};


//* User profile
module.exports.userProfile= function (req, res) {
    res.render('user_profile');
};