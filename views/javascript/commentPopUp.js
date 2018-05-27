/* Used to enable the comment popup */

/* Shows Comment*/
function showCommentForm() {
    let form = document.getElementById("enter_comment_bg");
    form.style.display="block";
}

/* Error if User is not Logged in*/
function showError() {
    let form = document.getElementById("error_popup_bg");
    form.style.display="block";
}

window.onclick = function(event) {
    let formComment = document.getElementById("enter_comment_bg");
    let formError = document.getElementById("error_popup_bg");
    if (event.target === formComment) {
        formComment.style.display = "none";
    } else if(event.target === formError) {
        formError.style.display = "none";
    }
}