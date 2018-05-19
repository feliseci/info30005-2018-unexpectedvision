// When the user scrolls the page, execute myFunction
// Credit: https://www.w3schools.com/howto/howto_js_sticky_header.asp
// Edited by Jenny Croft

window.onscroll = function() {sticky_nav();};


// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function sticky_nav() {

    const navigation = document.getElementById("myNav");

    if (window.pageYOffset !== 0) {
        navigation.classList.add("sticky");
    } else {
        navigation.classList.remove("sticky");
    }
}
