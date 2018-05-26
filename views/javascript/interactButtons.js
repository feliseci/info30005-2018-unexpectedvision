/*let $ = require('jquery');*/
/*let jsdom = require("jsdom").jsdom;
jsdom.env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
    global.$ = require("jquery")(window);
});*/

/* Update the DB, and change the colour of the button to reflect this.
 * (changeColour is used on its own on page load to reflect initial DB state.)*/
function interactButtons(id, username, issue) {
    // Change the colour of the button; store the resulting state (class) of the button
    let buttonState = changeColour(id);

    // Process the resulting state into a + or -
    let button = {
        id: id,
        type: getChangeType(buttonState)
    };

    updateDB(button, username, issue._id, issue.name, issue.author);
}

/* Update the DB depending on pressed button, logged in user & issue details */
function updateDB(button, username, issueId, issueName, issueAuthor) {
    let url;
    if(button.id === "likeButton") {
        url = '../like';
    } else if(button.id === "bookmarkButton") {
        url = '../bookmark';
    } else if(button.id === "followButton") {
        url = '../follow';
    }

    $.ajax({
        // URL to send request to
        type: 'POST',
        url: url,
        // Data to be passed to server
        data: {username: username, id: issueId, issueName: issueName, type: button.type, editor: issueAuthor},
        dataType: 'json'
    }).fail(function(jqXHR, textStatus, err) {
        console.log('AJAX error response: ', textStatus);
    });
}

/* Function takes the id of the specific button and toggles the colour on and off to indicate
 * whether a user has completed an action in the form of visual feedback */
function changeColour(id) {
    const element = document.getElementById(id);
    if (id === "bookmarkButton") {
        element.classList.toggle("bookmarkOn");
        element.classList.toggle("bookmarkOff");
    }

    if (id === "likeButton") {
        element.classList.toggle("likeOn");
        element.classList.toggle("likeOff");
    }

    if (id === "followButton"){
        element.classList.toggle("followTick");
    }

    return element.className;
}

/* Get whether the button has changed to On or Off */
function getChangeType(state) {

    // If the last two characters of the string === "On", the popularity change will be +
    if (state.slice(-2) === "On") {
        return 1;
    } else if(state.slice(-4) === "Tick") { // Follow button case
        return 1;
    }

    return -1;
}