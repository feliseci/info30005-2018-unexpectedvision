/* Function to have submit button on login page  */
document.getElementById("login_submit").onclick = function(){
    log_in()
};

function log_in(){
    /*const element = document.getElementById("login");*/
    document.getElementById("login").style.visibility = "hidden";
    document.getElementById("profile").style.visibility = "visible";
}