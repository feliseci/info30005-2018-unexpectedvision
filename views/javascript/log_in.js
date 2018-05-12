/* Function to have submit button on login page  */

function log_in(){
    console.log("login_submit has been pressed")
    var button = document.getElementById("login_nav");
    if (button.style.display === "none") {
        button.style.display = "block";
        document.getElementById("profile_nav").style.display = "none";
    } else {
        button.style.display = "none";
        document.getElementById("profile_nav").style.display = "block";
    }
}


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showDropDown(){
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}