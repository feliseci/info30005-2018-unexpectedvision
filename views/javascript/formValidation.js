/* Methods for client-side validation of all forms. */
function validateLogin() {
    let form = document.getElementsByClassName("account");


    if(form[0].value.length === 0 || form[1].value.length === 0) {
        document.getElementById("error").innerHTML = "Please complete all fields.";
        return false;
    }

    return true;
} // Can also using autovalidation ("required" attribute; not on Safari?)

function validateUser() {
    let form = document.getElementsByClassName("account");

    // Check all fields have been completed
    for(i = 0; i < form.length; i++) {
        if(form[i].value.length === 0) {
            document.getElementById("error").innerHTML = "Please complete all fields.";
            return false;
        }
    }

    // Check password & repeat password fields are equal
    let passwords = document.querySelectorAll("input[type=password]");
    if(passwords[0].value !== passwords[1].value) {
        document.getElementById("error").innerHTML = "Passwords do not match.";
        return false;
    }

    // Check password is of requisite length
    if(passwords[0].value.length < 6) {
        document.getElementById("error").innerHTML = "Passwords must be at least 6 characters.";
        return false;
    }

    // Check email is valid (for Safari etc. without <type="email"> compatibility)
    // Uses regular expression from W3C: https://www.w3.org/TR/html5/forms.html#valid-e-mail-address
    let email = document.querySelector("input[type=email]").value;
    let re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if(!re.test(email.toLowerCase())) {
        document.getElementById("error").innerHTML = "Invalid email.";
        return false;
    }

    // Validation of username requires database use; carried out in back-end.
    return true;
}

function validateArticle() {

    let form = document.getElementsByClassName("form-input");
    // Check all fields have been completed
    for(i = 0; i < form.length; i++) {
        if(form[i].value.length === 0) {
            document.getElementById("error").innerHTML = "Please complete all fields.";
            return false;
        }
    }

    // Check name meets the minimum length
    let name = document.querySelector("input[name=name]").value;
    if(name.length < 6) {
        document.getElementById("error").innerHTML = "Name must be at least 6 characters.";
        return false;
    }

    // Check name contains no special characters
    let regexp = /[a-zA-Z ]*/;
    if(!regexp.test(name)) {
        document.getElementById("error").innerHTML = "Invalid name: name must not contain numeric or special characters.";
        return false;
    }

    // Check description length
    let description = document.querySelector("textarea[name=description]").value;
    if(description.length < 300) {
        document.getElementById("error").innerHTML = "Description must be over 300 characters.";
        return false;
    } // The description (the editor's essay) is allowed to be long; it is manually shortened in search results etc.

    // Check image is a link to Unsplash TODO other sites
    let image = document.querySelector("input[name=image]").value;
    let regexpImage = /https:\/\/source.unsplash.com\/[^\s]+/;
    if(!regexpImage.test(image)) {
        document.getElementById("error").innerHTML = "Invalid image url: must be an Unsplash source URL.";
        return false;
    }

    // Check for one link of each type
    let sources = document.getElementsByName("source_type");

    let hasHL = findValue(sources, "hl");
    let hasR = findValue(sources, "r");
    let hasO = findValue(sources, "o");
    if(!hasHL || !hasR || !hasO) {
        document.getElementById("error").innerHTML = "Must have at least one link of each type.";
        return false;
    }

    // Check article links are links
    let regexpURL = /http[s]*:\/\/[^\s]+/;
    let links = document.getElementsByName("link");

    for(i = 0; i < links.length; i++) {
        if(!regexpURL.test(links[i].value)) {
            document.getElementById("error").innerHTML = "Invalid url: Article number " + (i+1);
            return false;
        }
    }

    // Check article descriptions are of appropriate length
    let articleDescription = document.getElementsByName("article_description");

    for(i = 0; i < articleDescription.length; i++) {
        if(articleDescription[i].length < 10 || articleDescription[i].length > 800) {
            document.getElementById("error").innerHTML = "Description must be between 10 and 800 characters.";
            return false;
        }
    }

    return true;
}

function findValue(array, value) {
    for(i = 0; i < array.length; i++) {
        if(array[i].value === value) {
            return true;
        }
    }
    return false;
}

// Adds additional text entry fields with name (type)_source to a form
function addSource(type) {
    let container = document.getElementById("container_"+type);
    let newSource;

    if(type==="source") {
        let source = container.childNodes[1];
        newSource = source.cloneNode(true);

        // Reset the values of all the inputs
        newSource.querySelector("select[name=source_type]").value = "hl";
        newSource.querySelector("input[name=link]").value = "";
        newSource.querySelector("textarea[name=article_description]").value = "";
    }
    else {
        let source = container.childNodes[1];
        newSource = source.cloneNode(true);
    }

    container.appendChild(document.createElement("br"));
    container.appendChild(newSource);
    // Could check for max. number of sources here by checking no. of child nodes
}

function validateComment() {
    //TODO dynamically only allow comment to be submitted once a certain length
    // (constant check function) once length > ...  <submit> valid
    // if length > ... <p id="warning"></p> .innerHTML = "Comment too long by xChars!"
    // if length > ... <p id="warning"></p> .innerHTML = "Comment too short by xChars!"
    alert("testing comment");
    let form = document.getElementsByClassName("comment-field");
    // Check all fields have been completed
    for(i = 0; i < form.length; i++) {
        if(form[i].value.length === 0) {
            document.getElementById("error").innerHTML = "*Please complete all fields.";
            return false;
        }
    }

     // TODO: CODE IS NOT TESTING THIS BIT. not sure why - the alert isn't made
    // Check length of comment
    let comment = document.querySelector("input[name=comment]").value;
    alert("hey");
    if(comment.length < 6) {
        alert("less than 6 characters")
        document.getElementById("error").innerHTML = "*Comment must be at least 6 characters.";
        return false;
    }
    else if(comment.length > 480) {
        // 480 is a tested value from use of lorem ipsum.
        document.getElementById("error").innerHTML = "*Comment must be <480 characters.";
        return false;
    }

    // Check article link is valid URL
    let article = document.querySelector("input[name=article_url]").value;
    let regexpURL = /http[s]*:\/\/[^\s]+/;
    if(!regexpURL.test(article)) {
        document.getElementById("error").innerHTML = "*Invalid URL.";
        return false;
    }
} // TODO integrate with current comment form

function validateOpportunity() {

    let form = document.getElementById("opportunity_form");

    // Check all fields have been completed
    for(i = 0; i < form.length; i++) {
        if(form[i].value.length === 0) {
            document.getElementById("error").innerHTML = "Please complete all fields.";
            return false;
        }
    }

    // Check name meets the minimum length
    let name = document.querySelector("input[name=name]").value;
    if(name.length < 6) {
        document.getElementById("error").innerHTML = "Name must be at least 6 characters.";
        return false;
    }

    // Check name contains no special characters
    let regexp = /[a-zA-Z ]*/;
    if(!regexp.test(name)) {
        document.getElementById("error").innerHTML = "Invalid name: name must not contain numeric or special characters.";
        return false;
    }

    // Check description length
    let description = document.querySelector("textarea[name=description]").value;
    if(description.length < 50 || description.length > 1000) {
        document.getElementById("error").innerHTML = "Description must be between 50 and 1000 characters.";
        return false;
    }

    // Check image is a link is an image format
    let image = document.querySelector("input[name=image]").value;
    if(!checkURL(image)){
        return false;
    }


    /*let regexpImage = /https:\/\/source.unsplash.com\/[^\s]+/;
    if(!regexpImage.test(image)) {
        document.getElementById("error").innerHTML = "Invalid image url: must be an Unsplash source URL.";
        return false;
    }*/

    // Check link to further info is a link
    let regexpURL = /http[s]*:\/\/[^\s]+/;
    let furtherInfo = document.getElementsByName("further_info");

    if(!regexpURL.test(furtherInfo.value)) {
        document.getElementById("error").innerHTML = "Invalid url: Further info";
        return false;
    }

    // Location, date not checked. (Date is auto-validated by browser)
} // TODO categories

/*TODO*/
function checkCompleted(form) {
} // Helper function


/*Sourced from: https://stackoverflow.com/questions/9714525/javascript-image-url-verify
* Credit to: jfriend00*/
function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}



