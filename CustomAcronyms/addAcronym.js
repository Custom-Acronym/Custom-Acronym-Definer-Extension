window.addEventListener("load", function () {

  /* 
  Build Text area to display definition and allow the user edit
  and send an update request
  */
  function buildUpdateTextArea(definition, id) {
    let form = document.getElementById('getAcronym');
    let div = document.createElement('div');
    let textarea = document.createElement('textarea');
    let updateButton = document.createElement('button');
    let h1 = document.createElement('h1');

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
    div.appendChild(updateButton);
    updateButton.addEventListener('submit', function (event) {
      event.preventDefault();
      updateAcronym(document.getElementById("updateTextArea"), id);
    });
    form.parentNode.insertBefore(div, form.nextSibling);
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
    addAcronym(document.getElementById("addAcronymInput"));
  });

  getAcronymForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let input = document.getElementById("getAcronymInput");
    getAcronym(handleUpdateAcronym, input.value)
  });
});

