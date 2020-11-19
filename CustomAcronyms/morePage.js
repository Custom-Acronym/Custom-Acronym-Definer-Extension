  /**
   * Handle submission of the text area 
   */
  function handleUpdateSubmission(id) {
    updateAcronym(document.getElementById("updateTextArea").value, id)
      .then(() => alert("Acronym updated successfully"))
      .catch(() => {
        alert("Acronym could not be updated");
      })
  }

  /**
   * Build Text area to display definition and allow the user edit and send an update request,
   * @param {*} definition - definition of the acronym
   * @param {*} id - database id
   */
  function buildUpdateTextArea(definition, id) {
    let getForm = document.getElementById('getAcronymNewWindow');
    let div = document.createElement('div');
    let textarea = document.createElement('textarea');
    let updateButton = document.createElement('button');
    let h1 = document.createElement('h1');
    let linebreak = document.createElement("br");

    div.classList = "form-group";
    div.id = "updateArea";
    h1.innerText = "Update Acronym";
    div.appendChild(h1);
    div.appendChild(textarea);
    div.appendChild(linebreak);
    textarea.classList = 'md-textarea form-control';
    textarea.id = 'updateTextArea';
    textarea.rows = '4';
    textarea.innerText = definition;
    updateButton.id = 'updateButton';
    updateButton.innerText = "UPDATE ACRONYM";
    updateButton.classList = "btn btn-primary";
    updateButton.addEventListener('click', function (event) {
      event.preventDefault()
      handleUpdateSubmission(id);
    });
    div.appendChild(updateButton);
    getForm.parentNode.insertBefore(div, getForm.nextSibling);
  }

  /**
   *  Display the Update acronym form area on the page
   */
  function handleUpdateAcronym(data) {
    console.log(data);
    if (!data) {
      alert("Acronym not found!");
      return;
    }
    let definition = data[0].definition;
    let id = data[0]._id;

    // If the element is already present don't build a new one.
    var updateDiv = document.getElementById('updateArea')

    if (updateDiv) {
      updateDiv.remove();
    }
    buildUpdateTextArea(definition, id);

  }

  const addAcronymForm = document.getElementById("addAcronym");
  const getAcronymFormNewWindow = document.getElementById("getAcronymNewWindow");

  if (addAcronymForm) {
    addAcronymForm.addEventListener("submit", function (event) {
      event.preventDefault();
      let acronym = document.getElementById("addAcronymInput").value;
      let definition = document.getElementById("definition").value;
      addAcronym(acronym, definition)
        .then(() => alert("Acronym added successfully"))
        .catch(() => {
          alert("Acronym could not be added");
        })
    });
  }

  if (getAcronymFormNewWindow) {
    getAcronymFormNewWindow.addEventListener("submit", function (event) {
      event.preventDefault();
      let input = document.getElementById("getAcronymInput");
      getAcronym(input.value)
        .then(response => response.json())
        .then(data => handleUpdateAcronym(data))
        .catch(() => {
          alert("Acronym not found");
        })
    });
  }

