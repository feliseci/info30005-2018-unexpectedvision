/* Used to enable the Create Account popup */

/* Shows Comment*/
function accountCommentForm() {
    let form = document.getElementById("account-popup-bg");
    form.style.display="block";
    console.log("hello");
}

/* Show and/or Hide Comment - enables Pop Up effect*/
window.onclick = function(event) {
    let form = document.getElementById("account-popup-bg");
    if (event.target === form) {
        form.style.display = "none";
    }
}