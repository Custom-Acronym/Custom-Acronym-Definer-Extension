window.addEventListener("load", function () {

  /* 
  Build Text area to display definition and allow the user edit
  and send an update request
  */
  function buildUpdateTextArea(definition, id) {
    let getForm = document.getElementById('getAcronym');
    let div = document.createElement('div');
    let textarea = document.createElement('textarea');
    let updateButton = document.createElement('button');
    let h1 = document.createElement('h1');
    let linebreak = document.createElement("br");


    div.classList = "form-group";
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
      event.preventDefault();
      console.log(document.getElementById("updateTextArea").value)
      updateAcronym(document.getElementById("updateTextArea").value, id);
    });
    div.appendChild(updateButton);
    getForm.parentNode.insertBefore(div, getForm.nextSibling);
  }

  /* 
  Handle a successful update request 
  */
  function handleUpdateAcronym(event) {
    if (event.target.responseText == '[]') {
      alert("Acronym not found!");
      return;
    }

    let data = JSON.parse(event.target.responseText);
    let definition = data[0].definition;
    let id = data[0]._id;

    // If the element is already present don't build a new one.
    if (!document.getElementById('updateTextArea')) {
      buildUpdateTextArea(definition, id);
    }
    else {
      let updateTextArea = document.getElementById('updateTextArea')
      updateTextArea.innerText = definition;
      updateTextArea.value = definition;
    }
  }

  const addAcronymForm = document.getElementById("addAcronym");
  const getAcronymForm = document.getElementById("getAcronym");

  addAcronymForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let acronym = document.getElementById("addAcronymInput").value;
    let definition = document.getElementById("definition").value;
    addAcronym(acronym, definition);
  });

  getAcronymForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let input = document.getElementById("getAcronymInput");
    getAcronym(handleUpdateAcronym, input.value)
  });
});

