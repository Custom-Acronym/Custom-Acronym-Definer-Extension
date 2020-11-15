/* 
* get Acronym from server.
* return Promise with the data
*/
function getAcronym(acronym) {
    if (!acronym) {
        return;
    }
    return fetch(ACRONYM_URL + acronym,
        {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        });
}

/*
* Add acronym to the database
* return promise
*/
function addAcronym(acronym, definition) {
    if (!acronym || !definition) {
        alert("Acronym or definition is blank");
        return;
    }

    let acronymPayload = [{
        'acronym': acronym,
        'definition': definition
    }]

    return fetch(ACRONYM_URL,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(acronymPayload)
        });
}
/*
* Update acronym to the database 
* return promise
*/
function updateAcronym(definition, id) {
    if (!definition) {
        alert("Definition cannot be blank");
        return;
    }

    return fetch(ACRONYM_URL + id,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "definition": definition })
        });
}

/*
* Delete acronym to the database 
* return promise
*/
function deleteAcronym(id) {
    return fetch(ACRONYM_URL + id,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
}