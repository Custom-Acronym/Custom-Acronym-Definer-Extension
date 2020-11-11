window.addEventListener("load", function () {

  function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  function handleUpdateAcronym(event) {

    // Display the acronym definition recieved
    if (!document.getElementById('updateTextArea')) {
      var form = document.getElementById('getAcronym');
      var div = document.createElement('div');
      var textarea = document.createElement('textarea');
      var updateButton = document.createElement('updateButton');

      div.classList = "form-group";
      div.appendChild(textarea);
      textarea.classList = 'form-control rounded-0';
      textarea.id = 'updateTextArea';
      textarea.rows = '4';
      data = JSON.parse(event.target.responseText);
      textarea.innerText = data[0].definition;
      updateButton.id = 'updateButton';
      updateButton.innerText = "UPDATE ACRONYM";
      updateButton.classList = "btn btn-primary";
      div.appendChild(updateButton);
      insertAfter(div, form)
    }
  }

  function addAcronym(form) {
    console.log("Sending Data!")
    const XHR = new XMLHttpRequest();

    // Bind the FormData object and the form element
    const FD = new FormData(form);

    // Define what happens on successful data submission
    XHR.addEventListener("load", function (event) {
      alert(event.target.responseText);
    });

    // Define what happens in case of error
    XHR.addEventListener("error", function (event) {
      alert('Oops! Something went wrong.');
    });

    // Set up our request
    XHR.open("POST", "https://example.com/cors.php");

    // The data sent is what the user provided in the form
    XHR.send(FD);
  }

  function getAcronym(input) {
    const XHR = new XMLHttpRequest();

    // Define what happens on successful data submission
    XHR.addEventListener("load", handleUpdateAcronym);

    // Define what happens in case of error
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