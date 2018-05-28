/* Methods for client-side validation of all forms. */
function validateLogin() {
    let form = document.getElementsByClassName("account");


    if(form[0].value.length === 0 || form[1].value.length === 0) {
        document.getElementById("error").innerHTML = "Please complete all fields.";
        return false;
    }

    return true;
}

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

    // Check image is a link to Unsplash
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

function validateComment() {

    // Check length of comment
    let comment = document.querySelector("input[name=comment]").value;

    if(comment.length < 6) {
        alert("less than 6 characters");
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
}

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

    // Check link to further info is a link
    let regexpURL = /http[s]*:\/\/[^\s]+/;
    let furtherInfo = document.getElementsByName("further_info");

    if(!regexpURL.test(furtherInfo.value)) {
        document.getElementById("error").innerHTML = "Invalid url: Further info";
        return false;
    }

    // Location, date not checked. (Date is auto-validated by browser)
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
}


