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
    let email = document.querySelectorAll("input[type=email]")[0].value;
    let re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if(!re.test(email.toLowerCase())) {
        document.getElementById("error").innerHTML = "Invalid email.";
        return false;
    }

    // Validation of username requires database use; carried out in back-end.
    return true;
}

function validateArticle() {
    let form = document.getElementsByClassName("account");

    // Check all fields have been completed
    for(i = 0; i < form.length; i++) {
        if(form[i].value.length === 0) {
            document.getElementById("error").innerHTML = "Please complete all fields.";
            return false;
        }
    }

    // Check name meets the minimum length
    let name = document.querySelectorAll("input[name=name]")[0].value; // TODO just querySelector?
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
    let description = document.querySelectorAll("textarea[name=description]")[0].value;
    if(description.length < 10 || description.length > 300) {
        document.getElementById("error").innerHTML = "Description must be between 10 and 300 characters.";
        return false; // TODO better values
    } // TODO short description & long argument

    // Check image is a link to Unsplash TODO other sites
    let image = document.querySelectorAll("textarea[name=image]")[0].value;
    let regexpImage = /https:\/\/source.unsplash.com\/[^\s]+/;
    if(!regexpImage.test(image)) {
        document.getElementById("error").innerHTML = "Invalid image url: must be an Unsplash source URL.";
        return false;
    }

    // Check article links are links TODO to accepted news sites
    let regexpURL = /http[s]*:\/\/[^\s]+/;
    let hl_sources = document.getElementsByName("hl_source");
    let r_sources = document.getElementsByName("r_source");
    let o_sources = document.getElementsByName("o_source");

    for(i = 0; i < hl_sources.length; i++) {
        if(!regexpURL.test(hl_sources[i].value)) {
            document.getElementById("error").innerHTML = "Invalid url: High-level link number" + (i+1);
            return false;
        }
    }
    for(i = 0; i < r_sources.length; i++) {
        if(!regexpURL.test(r_sources[i].value)) {
            document.getElementById("error").innerHTML = "Invalid url: Report link number" + (i+1);
            return false;
        }
    }
    for(i = 0; i < o_sources.length; i++) {
        if(!regexpURL.test(o_sources[i].value)) {
            document.getElementById("error").innerHTML = "Invalid url: Opinion link number" + (i+1);
            return false;
        }
    }

    // TODO check no links & categories are repeated

    return true;
}

// Adds additional text entry fields with name (type)_source to a form
function addSource(type) {
    let container = document.getElementById("container_"+type);
    let newSource = document.createElement("input");
    newSource.type="text";
    newSource.name= type+ "_source";
    newSource.class="account";
    container.appendChild(document.createElement("br"));
    container.appendChild(newSource);
    // Could check for max. number of sources here by checking no. of child nodes
}


/*TODO*/
function checkCompleted(form) {

} // Helper function
function validateComment() {
    //TODO dynamically only allow comment to be submitted once a certain length
    // (constant check function) once length > ...  <submit> valid
    // if length > ... <p id="warning"></p> .innerHTML = "Comment too long by xChars!"
    // if length > ... <p id="warning"></p> .innerHTML = "Comment too short by xChars!"

    // Check length of comment
    let comment = document.querySelectorAll("input[name=comment]")[0].value;
    if(comment.length < 6) {
        document.getElementById("error").innerHTML = "Comment must be at least 6 characters.";
        return false;
    }
    else if(comment.length > 480) {
        // 480 is a tested value from use of lorem ipsum.
        document.getElementById("error").innerHTML = "Comment must be <480 characters.";
        return false;
    }

    // Check article link is valid URL
    let article = document.querySelectorAll("input[name=article_url]")[0].value;
    let regexpURL = /http[s]*:\/\/[^\s]+/;
    if(!regexpURL.test(article)) {
        document.getElementById("error").innerHTML = "Invalid URL.";
        return false;
    }
}