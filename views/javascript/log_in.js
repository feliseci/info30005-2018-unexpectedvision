/* Function to have submit button on login page  */

document.getElementById("login_submit").onclick = function() {
    alert("button has been clicked");
    log_in()
};

function log_in(){
     var button = document.getElementById("login_nav");
    if (button.style.display == "none") {
        button.style.display = "block";
        document.getElementById("profile_nav").style.display = "none";
    } else {
        button.style.display = "none";
        document.getElementById("profile_nav").style.display = "block";
    }
}