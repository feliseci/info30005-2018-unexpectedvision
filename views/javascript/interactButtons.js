/*let $ = require('jquery');*/
/*let jsdom = require("jsdom").jsdom;
jsdom.env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
    global.$ = require("jquery")(window);
});*/

/* Default action: Update the DB, and change the colour of the button to reflect this.
 * (changeColour is used on its own on page load to reflect initial DB state.)*/
function interactButtons(id, username, issue) {
    changeColour(id);
    updateDB(id, username, issue._id, issue.name);
}

/* */
function updateDB(button, username, issueId, issueName) {
    console.log("here we IS bitch!!!");

    // TODO CURRENT
    if (button === "likeButton") {
        $.ajax({
            // URL to send request to
            type: 'POST',
            url: '../like',
            // Data to be passed to server
            data: {username: username, id: issueId, issueName: issueName},
            dataType: 'json'
        }).done(function(data){
            // As the button colour is changed above, nothing else needs to be done
            console.log('GET response: ', JSON.stringify(data));
        }).fail(function(jqXHR, textStatus, err) {
            console.log('AJAX error response: ', textStatus);
        });

        /*$.ajax({
            url: "/like?=true",
            data: {...},
            type: "GET", // if you want to send data via the "data" property change this to "POST". This can be omitted otherwise
            success: function(responseData) {
            },
            error: console.error
        });*/

    }

    // Get whether +/- from previous function
    // issue.popularity ++; / --;
    // user.likes.push([issueId, issueName]);

    // Remove code:
    // someArray = [{name:"Kristian", lines:"2,5,10"},
    //              {name:"John", lines:"1,19,26,96"},
    //              {name:"Brian",lines:"3,9,62,36" }];
    // johnRemoved = someArray.filter(function(el) {
    //     return el.name !== "John";
    // });
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
        console.log('button was clicked');
        element.classList.toggle("likeOn");
        element.classList.toggle("likeOff");
    }

    if (id === "followButton"){
        element.classList.toggle("followTick");
    }
}