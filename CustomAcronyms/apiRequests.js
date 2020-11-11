/* 
* get Acronym from server.
* on successful get request handle displaying the acronym.
*/
function getAcronym(handleDisplay, acronym) {
    if (!acronym) {
        return;
    }

    const XHR = new XMLHttpRequest();

    XHR.addEventListener("load", handleDisplay);

    XHR.addEventListener("error", function (event) {
        alert('Acronym not found!');
    });

    XHR.open("GET", GET_ACRONYM_URL + acronym);
    XHR.send()
}

/*
* Add acronym to the database 
*/
function addAcronym(form) {
    console.log("Sending Data!")
    const XHR = new XMLHttpRequest();

    const FD = new FormData(form);

    // Define what happens on successful data submission
    XHR.addEventListener("load", function (event) {
        alert(event.target.responseText);
    });

    // Define what happens in case of error
    XHR.addEventListener("error", function (event) {
        alert('Oops! Something went wrong.');
    });

    XHR.open("POST", "https://example.com/cors.php");
    XHR.send(FD);
}
/*
* Update acronym to the database 
*/
function updateAcronym(definition, id) {
    if(!definition){
        alert("Definition cannot be blank");
        return;
    }
    const XHR = new XMLHttpRequest();

    XHR.addEventListener("load", function (event) {
        alert(event.target.responseText);
    });

    XHR.addEventListener("error", function (event) {
        alert('Acronym not found!');
    });

    XHR.open('PUT', PUT_ACRONYM_URL + id);
    console.log(definition);
    XHR.send({'definition': definition});
}

/*
* Delete acronym to the database 
*/
function deleteAcronym(input) {
    const XHR = new XMLHttpRequest();

    XHR.addEventListener("load", function (event) {
        alert(event.target.responseText);
    });

    XHR.addEventListener("error", function (event) {
        alert('Acronym not found!');
    });

    XHR.open('DELETE', DELETE_ACRONYM_URL);
    console.log(input.value);
    XHR.send(input.value);
}