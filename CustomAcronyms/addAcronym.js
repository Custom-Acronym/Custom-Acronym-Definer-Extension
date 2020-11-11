window.addEventListener("load", function () {

  /* 
  Build Text area to display definition and allow the user edit
  and send an update request
  */
  function buildUpdateTextArea(definition) {
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
      updateAcronym(document.getElementById("updateTextArea"));
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
    let definition = data[0].definition

    // If the element is already present don't build a new one.
    if (!document.getElementById('updateTextArea')) {
      buildUpdateTextArea(definition);
    }
    else {
      let updateTextArea = document.getElementById('updateTextArea')
      updateTextArea.innerText = definition;
    }
  }

  /*
  Add acronym to the database 
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

  function updateAcronym(input) {
    const XHR = new XMLHttpRequest();

    XHR.addEventListener("load", function (event) {
      alert(event.target.responseText);
    });

    XHR.addEventListener("error", function (event) {
      alert('Acronym not found!');
    });

    XHR.open('PUT', PUT_ACRONYM_URL);
    console.log(input.value);
    XHR.send(input.value);
  }

  function getAcronym(input) {
    const XHR = new XMLHttpRequest();

    XHR.addEventListener("load", handleUpdateAcronym);

    XHR.addEventListener("error", function (event) {
      alert('Acronym not found!');
    });

    XHR.open("GET", GET_ACRONYM_URL + input.value);
    XHR.send()
  }

  const addAcronymForm = document.getElementById("addAcronym");
  const getAcronymForm = document.getElementById("getAcronym");


  addAcronymForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addAcronym(document.getElementById("addAcronymInput"));
  });

  getAcronymForm.addEventListener("submit", function (event) {
    event.preventDefault();
    getAcronym(document.getElementById("getAcronymInput"));
  });
});


