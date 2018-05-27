/* Imports */
// Requirements
const mongoose = require('mongoose');
const passport = require('passport');

// Schema
const Issue = mongoose.model('issues');
const User = mongoose.model('users');
const Opportunity = mongoose.model('opportunities');

/*Search-related methods*/
module.exports.home = function (req, res) {
    // The home page is populated with content: the most popular & recent issue, plus three more recent issues

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
            // 6 issues are fetched: the 1st and 2nd most recent (in case the any
            // are the same as the most popular), and 3 extra for populating the home page.
            Issue.find({}).limit(6).sort({"date_update": -1}).exec(function(err, recent_issue) {
                if(err) {
                    res.sendStatus(409);
                    return;
                }

                let recent;

                // Check recent & popular issue are not the same
                if(recent_issue[0]._id === popular_issue[0]._id) {
                    recent = {
                        name: recent_issue[1].name,
                        categories: recent_issue[1].categories,
                        description: recent_issue[1].description,
                        url: recent_issue[1]._id,
                        image: recent_issue[1].image
                    };
                }
                else {
                    recent = {
                        name: recent_issue[0].name,
                        categories: recent_issue[0].categories,
                        description: recent_issue[0].description,
                        url: recent_issue[0]._id,
                        image: recent_issue[0].image
                    };
                }

                // Populate the homepage with the rest of the recent issues
                let issues = []; // the extra issues
                let indeces = []; // the indeces of the issues that aren't recent or popular

                // Find the issues to be added from recent
                for(i = 1; i < 6; i ++) {
                    // Check from index 1 (as 1, as either the most popular or most recent is the first
                    // (any of the indeces may be popular; recent may be 0th or 1st)
                    if(popular.url !== recent_issue[i]._id && recent.url !== recent_issue[i].id) {
                        indeces.push(i);
                    }
                }

                // Add the 3 most recent of the non-popular, non-recent issues using their indeces above
                for(i=0;i<3;i++) {
                    issues[i] = {
                        name: recent_issue[indeces[i]].name,
                        categories: recent_issue[indeces[i]].categories,
                        description: recent_issue[indeces[i]].description,
                        url: recent_issue[indeces[i]]._id,
                        image: recent_issue[indeces[i]].image
                    }
                }

                // Render home page with the found issues
                res.render('home_page',
                    {popular_issue: popular, recent_issue: recent, user: req.user, more_issues: issues});
            });
        }
        else {
            res.sendStatus(409);
        }
    });
};
module.exports.search = function (req, res) {

    // Define the sort order (ascending or descending) on the variable given
    let sort = {};
    if(req.query.asc === "true") {
        sort[req.query.sort] = 1;
    }
    else {
        sort[req.query.sort] = -1; // Descending is default
    }

    // Fetch the whole issues collection, sorted by the parameters above
    Issue.find({}).sort(sort).exec(function(err, issues) {
        if(!err) {
            let results = [];

            // Iterate over the documents
            for(i = 0; i < issues.length; i++) {

                // Check each relevant field for the search query
                if(check(issues[i], req.query.query, req.query.category)) {

                    // If the issue passes the check, add only required fields to the search results
                    results.push({
                        name: issues[i].name,
                        categories: issues[i].categories,
                        description: issues[i].description,
                        image: issues[i].image,
                        author: issues[i].author,
                        url: issues[i]._id
                    });
                }
            }

            // Render the results
            res.render('search_results', {results: results, user: req.user, query: req.query.query});

        } else {
            res.sendStatus(409);
        }
    });
};
function check(issue, query, category) {
    // Checks a given issue's name, category and description for the search query
    // No query was entered: Every issue will return true.
    // Required category was given: Issues with the category will return true.

    const regexp = new RegExp(query, "i"); // Case-insensitive search

    if(query === undefined) { return; } // No query was entered, list all results

    // Category search: return true if issue has the category
    if(category !== undefined) {
        let got_category = false;
        for(j = 0; j < issue.categories.length; j++) {
            if(issue.categories[j] === category) {
                got_category = true;
            }
        }

        if(got_category === false) {
            return false; // Lack of the category automatically fails
        }
    }

    // Normal search: check presence of the query in name, description & category list
    const in_name = issue.name.search(regexp); // search will return -1 if unsuccessful
    const in_description = issue.description.search(regexp);
    let in_category = -1;
    for(j = 0; j < issue.categories.length; j++) {
        if(issue.categories[j].search(regexp) > -1) {
            in_category = 0;
        }
    }

    // Add the issue to the search results if the query was in at least one of the fields
    // (Query was found: returns true)
    return((in_name + in_description + in_category) > -3);
}
module.exports.random = function (req,res) {
    // Generates a random issue from the collection and redirects to that page.
    // (Because issues cannot be deleted, this method is valid)

    // Get the number of documents in the issues collection
    Issue.count({}, function(err, count){

        if(err) {
            res.sendStatus(409);
            return;
        }

        // Generate a random index in the issues array
        let random_id = Math.floor(Math.random() * (count));

        // Redirect to this issue
        res.redirect('../issue/' + random_id);

    });

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
        res.render('editor_template', {editor: issue, comments: issue.contributions, user: req.user});

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
        // Opportunity ID invalid; no results returned by findOne
        // Note: find returns [] if empty, findOne returns null
        if(opportunity === null) {
            res.sendStatus(404);
            return;
        }

        // Opportunity with the given id successfully found
        res.render('opportunity_template', {opportunity: opportunity, user: req.user});

    });

};
module.exports.loadOpportunities = function (req, res) {
    // Fetch the whole opportunities collection
    Opportunity.find({}, function(err, opportunities) {
        if(!err) {
            let results = [];

            // Iterate over the opportunities documents
            for(i = 0; i < opportunities.length; i++) {

                // Add only required fields to the search results
                results.push({
                    name: opportunities[i].name,
                    categories: opportunities[i].categories,
                    description: opportunities[i].description,
                    image: opportunities[i].image,
                    organiser: opportunities[i].organiser,
                    url: opportunities[i]._id // id = url
                });
            }

            res.render('opportunities_landing', {results: results, user: req.user});

        } else {
            res.sendStatus(409);
        }
    });
};

/*Database addition-related pages*/
module.exports.newUser = function (req, res, next) {

    // Get the entered details for the new user from the POST
    let newUser = new User({
        "username": req.body.username,
        "display_name": req.body.username, // Default to == username
        "email": req.body.email,
    });

    // Register the user using passport-local-mongoose, which hashes the password
    User.register(newUser, req.body.password, function(err) {
        if(!err) {

            // Login (authenticate) the new user
            passport.authenticate('local', function(err, user) {
                if (err) { return next(err); }
                req.logIn(user, function(err) {
                    if (err) { return next(err); }
                    return res.redirect('../home');
                });
            })(req, res, next);

            console.log("New user sent.");
        } else{
            res.sendStatus(400);
        }
    });

};
module.exports.newIssue = function (req, res) {
    let hlSource = [];
    let rSource = [];
    let oSource = [];

    // Construct the source objects
    for(i = 0; i < req.body.source_type.length; i++) {
        console.log(req.body.source_type);

        let type = req.body.source_type[i];

        console.log("Type "  + type);

        let link = req.body.link[i];
        let description = req.body.article_description[i];
        if(type === "hl") {
            hlSource.push({
                description: description,
                link: link
            });
        } else if(type === "r") {
            rSource.push({
                description: description,
                link: link
            });
        } else if(type === "o") {
            oSource.push({
                description: description,
                link: link
            });
        } else {
            // Error
            res.sendStatus(400);
        }

    }

    // Get the entered details for the new issue from the URL
    let newIssue = new Issue({
        "name": req.body.name,
        "author": req.body.author,
        "description": req.body.description,
        "image": req.body.image,
        "hl_source": hlSource,
        "r_source": rSource,
        "o_source": oSource,
        "categories": req.body.c_source
    });

    // Get the details for the user activity update
    let updateUser = {
        date: Date.now(),
        updateType: "article",
        updateContent: "",
        articleName: newIssue.name
    };
    let article = {
        articleName: newIssue.name,
        description: newIssue.description
    };

    // Add the new issue to the DB
    newIssue.save(function(err,newIssue) {
        if(!err) {

            // Add the issue id to the user activity update
            updateUser.updateLink = newIssue._id;
            article.id = newIssue._id;

            // Update the user's activity
            User.findOneAndUpdate({username: req.user.username},
                {$push: {articles: article}, $set: {recent_update: updateUser}}, function(err) {

                if (err) {
                    res.sendStatus(409);
                    return;
                }

                console.log("User activity updated.");
            });

            // Redirect to new issue
            res.redirect('../issue/' + newIssue._id);
            console.log("New issue sent.");
        } else{
            res.sendStatus(400);
        }
    });
};
module.exports.newContribution = function (req, res) {
    // Get the entered details for the new contribution from the URL
    let newContribution = {
        "author": req.body.author,
        "comment": req.body.comment,
        "article_url": req.body.article_url
    };

    // Set the user's most recent "action" to this comment
    // (only editors' will be visible in their following user's walls/profiles)
    let updateUser = {
        date: Date.now(),
        updateType: "comment",
        updateContent: req.body.comment,
    };
    let post = {
        comment: req.body.comment,
    }; // The permanent version
    let updateIssue = {
        date: Date.now(),
        updateType: "comment",
        updateContent: req.body.comment,
    };

    // Update the given issue with a new contribution
    Issue.findOneAndUpdate({name: req.body.name},
        {$push: {contributions: newContribution}, $set: {recent_update: updateIssue}}, function(err, issue) {

        if (err) { res.sendStatus(409); return; }
        console.log("New contribution sent.");

        // Add the issue name to the user activity update
        updateUser.articleName = issue.name;
        post.article = issue.name;
        updateUser.updateLink = issue._id;
        post.link = issue._id;

        // Update the user's activity
        User.findOneAndUpdate({username: req.user.username},
            {$push: {posts: post}, $set: {recent_update: updateUser}}, function(err) {
            console.log("Post: " + JSON.stringify(post));

            if (err) {
                res.send(err);
                return;
            }

            console.log("User activity updated.");
            //  Redirect the user back to the issue page at the comments section
            res.redirect('../issue/' + issue._id + '/#contributions_grid');
        });
    });

};
module.exports.newOpportunity = function (req, res) {
    // Get the entered details for the new opportunity from the URL
    let newOpportunity = new Opportunity({
        "name": req.body.name[0].toUpperCase() + req.body.name.substr(1),
        "organiser": req.body.organiser,
        "description": req.body.description,
        "image": req.body.image,
        "date_event": req.body.date,
        "location": req.body.location,
        "further_info": req.body.further_info
    });

    // Get the details for the user activity update
    let updateUser = {
        date: Date.now(),
        updateType: "opportunity",
        updateContent: "",
        articleName: newOpportunity.name
    };
    let opportunity = {
        name: newOpportunity.name
    };

    // Add the new opportunity to the DB
    newOpportunity.save(function(err,newOpportunity) {
        if(!err) {

            // Add the issue id to the user activity update
            updateUser.updateLink = newOpportunity._id;
            opportunity.link = newOpportunity._id;

            // Update the user's activity
            User.findOneAndUpdate({username: req.user.username},
                {$push: {opportunities: opportunity}, $set: {recent_update: updateUser}}, function(err) {

                    if (err) {
                        res.sendStatus(409);
                        return;
                    }

                    console.log("User activity updated.");
                });

            res.redirect('../opportunity/' + newOpportunity._id);
            console.log("New opportunity sent.");
        } else{
            res.sendStatus(400);
        }
    });
};

module.exports.confirmEditor = function (req, res) {
    res.render('confirm_editor_app', {user: req.user});
};

/* User profile */
module.exports.userProfile = function (req, res) {
    let updates;

    // Profile is the current user's: Get the details for their wall
    if(req.user && (req.params.name === req.user.username)) {
        let bookmarkUpdates = [];
        let followUpdates = [];

        // Get the list of issue IDs for the user's likes
        let ids = [];
        for(i=0; i < req.user.bookmarks.length; i++) {
            ids.push(req.user.bookmarks[i].id);
        }

        // Get update objects from all the user's liked issues
        User.find({username: {$in: req.user.followedUsers}}, 'username recent_update', function(err, users) {
            if(err) {
                res.sendStatus(409);
                return;
            }

            followUpdates = users;

            // Get update objects from all the user's liked issues
            Issue.find({_id: {$in: ids}}, '_id name recent_update', function(err, issues) {
                if(err) {
                    res.sendStatus(409);
                    return;
                }

                bookmarkUpdates = issues;

                // Get the final updates to appear on the user's page
                updates = getRecent(bookmarkUpdates, followUpdates);

                // Load the rest of the information for the profile
                loadProfile(req, res, updates);
            });
        });
    } else {
        // Load the profile
        loadProfile(req, res, []);
    }
};
function loadProfile(req, res, updates) {
    User.findOne({username: req.params.name}, function(err, user) {
        if(err) {
            res.sendStatus(409);
            return;
        }

        // Issue ID invalid; no results returned by findOne
        // Note: find returns [] if empty, findOne returns null
        if(user === null) {
            res.sendStatus(404);
            return;
        }

        let userDetails = {
            username: user.username,
            is_editor: user.is_editor,
            display_name: user.display_name,
            profile_description: user.profile_description,
            likes: user.likes,
            followedUsers: user.followedUsers,
            followingUsers: user.followingUsers,
            bookmarks: user.bookmarks,
            posts: user.posts,
            opportunities: user.opportunities,
            articles: user.articles,
            updates: updates
        };

        res.render('user_profile', {profile: userDetails, user: req.user});

    });
}
function getRecent(recentComments, editorChanges) {
    let results = editorChanges.concat(recentComments);

    // Sort the results
    results.sort(compareDates);

    // Return the top 5 most recent results
    return results.slice(0,5);
}
function compareDates(a, b) {
    // Compare two dates; returns a descending array
    if(a.recent_update.date > b.recent_update.date) {
        return -1;
    }
    if(a.recent_update.date < b.recent_update.date) {
        return 1;
    }
    return 0;
}

/* Article banner (AJAX) */
module.exports.likeIssue = function (req, res) {
    let id = req.body.id;
    let like = {
        id: Number(req.body.id),
        name: req.body.issueName
    };
    let username = req.body.username;
    let add = Number(req.body.type);

    // Update the given issue's popularity
    Issue.findOneAndUpdate({_id: id}, {$inc: {popularity: add}}, function(err) {
        if (err) { res.sendStatus(409); return; }
        console.log("Popularity changed.");

        // Add the like
        if(add === 1) {
            User.findOneAndUpdate({username: username}, {$push: {"likes": like}}, function(err) {
                if (err) { res.sendStatus(409); return; }
                console.log("Added to likes.");

                // The browser's user object is updated by fetching an updated user in deserializeUser, which
                // is called at each HTTP request
            });
        }
        // Alternatively, remove the like
        else {
            User.findOneAndUpdate({username: username}, {$pull: {"likes": {id: like.id}}}, function(err) {
                if (err) { res.sendStatus(409); return; }
                console.log("Removed from likes.");
            });
        }

    });
};
module.exports.bookmarkIssue = function (req, res) {
    let bookmark = {
        id: Number(req.body.id),
        name: req.body.issueName
    };
    let username = req.body.username;
    let add = Number(req.body.type);

    // Add the bookmark
    if(add === 1) {
        User.findOneAndUpdate({username: username}, {$push: {"bookmarks": bookmark}}, function(err) {
            if (err) { res.sendStatus(409); return; }
            console.log("Added to bookmarks.");
        });
    }
    else {
        // Alternatively, remove the bookmark
        User.findOneAndUpdate({username: username}, {$pull: {"bookmarks": {id: bookmark.id}}}, function(err) {
            if (err) { res.sendStatus(409); return; }
            console.log("Removed from bookmarks.");
        });
    }
};
module.exports.followEditor = function (req, res) {
    let editor = req.body.editor;
    let username = req.body.username;
    let add = Number(req.body.type);

    if(add === 1) {
        User.findOneAndUpdate({username: editor}, {$push: {followingUsers: username}}, function(err) {
            if (err) { res.sendStatus(409); return; }
            console.log("Following user added.");

            User.findOneAndUpdate({username: username}, {$push: {followedUsers: editor}}, function(err) {
                if (err) { res.sendStatus(409); return; }
                console.log("Added to followed.");
            });
        });
    } else {
        User.findOneAndUpdate({username: editor}, {$pull: {followingUsers: username}}, function(err) {
            if (err) { res.sendStatus(409); return; }
            console.log("Following user removed.");

            User.findOneAndUpdate({username: username}, {$pull: {followedUsers: editor}}, function(err) {
                if (err) { res.sendStatus(409); return; }
                console.log("Removed from followed.");
            });
        });

    }
};

/*Landing & simple rendering methods. */
module.exports.landing = function (req, res) {
    if(req.user) {
        res.redirect('../home'); // Not allowed to visit the login page as a logged-in user
        return;
    }
    res.render('index', {user: req.user, failure: req.query.failure});
};
module.exports.login = function (req, res) {
    res.redirect("../");
};
module.exports.loadAbout = function (req, res) {
    res.render('about_page', {user: req.user});
};
module.exports.logout = function(req, res){
    // Logout the user, or redirect them away if not logged in
    if(!req.user) {
        res.redirect('../');
        return;
    }

    let name = req.user.username;
    console.log("Logging out " + name + "...");
    req.logout();
    res.redirect('../');
};
module.exports.editorApplication = function (req, res) {
    if(!req.user || req.user.is_editor) {
        res.redirect('../home'); // Not allowed to visit this page as a non-user or editor
        return;
    }

    res.render('editor_application', {user: req.user});
};
module.exports.createArticle = function (req, res) {
    if(!req.user || !req.user.is_editor) {
        res.redirect('../home'); // Not allowed to visit this page as a non-editor
        return;
    }
    res.render('create_article', {user: req.user});
};
module.exports.createOpportunity = function (req, res) {
    if(!req.user) {
        res.redirect('../home'); // Not allowed to visit this page as a non-user
        return;
    }
    res.render('create_opportunity', {user: req.user});
};
module.exports.createAccount = function (req, res) {
    res.redirect("../");
};