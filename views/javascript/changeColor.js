
/* Function takes the id of the specific button and toggles the colour on and off to indicate
 * whether a user has completed an action in the form of visual feedback */

function changeColor(id) {
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
}