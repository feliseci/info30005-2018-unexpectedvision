function changeColor(id) {
    const element = document.getElementById(id);
    if (id === "bookmarkButton") {
        element.classList.toggle("bookmarkTick");
    }

    if (id === "likeButton") {
        element.classList.toggle("thumbsupTick");
    }

    if (id === "followButton"){
        element.classList.toggle("followTick");
    }
}


   /* && click === false){
        element.classList.add("bookmarkTick");
        element.classList.remove("bookmark");
        const click = true;
    }

    else if (id === "bookmarkButton" && click === true){
        element.classList.add("bookmark");
        element.classList.remove("bookmarkTick");
        const click = false;
    }


}


    /*let element = document.getElementById(id);
    element.classList.toggle("changeColor")*/
