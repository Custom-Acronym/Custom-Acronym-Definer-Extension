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
function addAcronym(acronym, definition) {
    if(!acronym || !definition){
        alert("Acronym or definition is blank");
        return;
    }
    const XHR = new XMLHttpRequest();

    let acronymPayload = {
        'acronym': acronym,
        'definition': definition
    }

    // Define what happens on successful data submission
    XHR.addEventListener("load", function (event) {
        alert(event.target.responseText);
    });

    // Define what happens in case of error
    XHR.addEventListener("error", function (event) {
        alert('Oops! Something went wrong.');
    });
    console.log(acronymPayload);
    XHR.open("POST", POST_ACRONYM_URL);
    XHR.setRequestHeader("Content-Type", "application/json");
    XHR.send(JSON.stringify(acronymPayload));
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
    XHR.setRequestHeader("Content-Type", "application/json");
    console.log(definition);
    XHR.send(JSON.stringify({'definition': definition}));
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