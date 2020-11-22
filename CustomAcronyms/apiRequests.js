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
            headers: HEADERS,
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
            headers: HEADERS,
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
            headers: HEADERS,
            body: JSON.stringify({ "definition": definition })
        });
}

/*
* Delete acronym to the database 
* return promise
* @param {*} id - mongodb id 
*/
function deleteAcronym(id) {
    return fetch(ACRONYM_URL + id,
        {
            method: "DELETE",
            headers: HEADERS
        });
}

/**
 * Report the acronym to the database
 * @param {*} id - mongodb id 
 */
function reportAcronym(id) {
    return fetch(REPORT_URL + id,
        {
            method: "PATCH",
            headers: HEADERS,
        });
}


/**
 * Report the acronym to the database
 * @param {*} id - mongodb id 
 */
function likeAcronym(id) {
    let vote = [{
        vote: '-1'
    }]
    return fetch(VOTE_URL + id,
        {
            method: "PATCH",
            headers: HEADERS,
            body: JSON.stringify(vote)
        });
}