window.addEventListener("load", function () {

  /* 
  Build Text area to display definition and allow the user edit
  and send an update request
  */
  function buildUpdateTextArea(definition, id) {
    let getForm = document.getElementById('getAcronym');
    let updateForm = document.createElement('form');
    let div = document.createElement('div');
    let textarea = document.createElement('textarea');
    let updateButton = document.createElement('button');
    let h1 = document.createElement('h1');

    updateForm.id = 'updateForm';
    updateForm.appendChild(div);
    div.classList = "md-form";
    h1.innerText = "Update Acronym";
    div.appendChild(h1);
    div.appendChild(textarea);
    textarea.classList = 'md-textarea form-control';
    textarea.id = 'updateTextArea';
    textarea.rows = '4';
    textarea.innerText = definition;
    updateButton.id = 'updateButton';
    updateButton.innerText = "UPDATE ACRONYM";
    updateButton.classList = "btn btn-primary";
    updateButton.type = 'submit';
    updateForm.appendChild(updateButton);
    updateButton.addEventListener('submit', function (event) {
      event.preventDefault();
      updateAcronym(document.getElementById("updateTextArea").value, id);
    });
    getForm.parentNode.insertBefore(updateForm, getForm.nextSibling);
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

