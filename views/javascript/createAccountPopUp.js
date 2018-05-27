function accountCommentForm() {
    let form = document.getElementById("account-popup-bg");
    form.style.display="block";
    console.log("hello");
}

window.onclick = function(event) {
    let form = document.getElementById("account-popup-bg");
    if (event.target === form) {
        form.style.display = "none";
    }
}