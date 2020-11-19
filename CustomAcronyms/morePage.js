var acronym = "test";
var data = {};
var currentIndex = 0;
chrome.runtime.onMessage.addListener(function (request) {

  console.log(request); // request has the payload from the parent window

  if (request.buttonAcronym) {
    acronym = request.buttonAcronym;
    console.log(request); // request has the payload from the parent window
  }
});

/**
  * Handle submission of the text area 
  */
function handleUpdateSubmission(id) {

}

// /**
//  * Build Text area to display definition and allow the user edit and send an update request,
//  * @param {*} definition - definition of the acronym
//  * @param {*} id - database id
//  */
// function buildUpdateTextArea(definition, id) {
//   let getForm = document.getElementById('getAcronymNewWindow');
//   let div = document.createElement('div');
//   let textarea = document.createElement('textarea');
//   let updateButton = document.createElement('button');
//   let h1 = document.createElement('h1');
//   let linebreak = document.createElement("br");

//   div.classList = "form-group";
//   div.id = "updateArea";
//   h1.innerText = "Update Acronym";
//   div.appendChild(h1);
//   div.appendChild(textarea);
//   div.appendChild(linebreak);
//   textarea.classList = 'md-textarea form-control';
//   textarea.id = 'updateTextArea';
//   textarea.rows = '4';
//   textarea.innerText = definition;
//   updateButton.id = 'updateButton';
//   updateButton.innerText = "UPDATE ACRONYM";
//   updateButton.classList = "btn btn-primary";

//   div.appendChild(updateButton);
//   getForm.parentNode.insertBefore(div, getForm.nextSibling);
// }

/**
 *  Display get the acronym
 */
function handleGetAcronym(data) {
  console.log(data);
  currentIndex = 0;
  if (data.length === 0) {
    alert("Acronym not found!");
    document.getElementById("updateTextArea").value = "";
    document.getElementById("updateTextArea").innerText = "";
    document.getElementById("updateTextArea").disabled = true;
    document.getElementById("updateButton").disabled = true;
    document.getElementById("nextButton").style.display = 'none';
    document.getElementById("backButton").style.display = 'none';
    return;
  }
  let definition = data[currentIndex].definition;

  document.getElementById("updateTextArea").value = definition;
  document.getElementById("updateTextArea").innerText = definition;
  document.getElementById("updateButton").disabled = false;
  document.getElementById("updateTextArea").disabled = false;


  if (data.length > 1) {
    let nextButton = document.getElementById("nextButton");
    let backButton = document.getElementById("backButton");
    backButton.style.display = 'inline';
    backButton.disabled = true;
    nextButton.style.display = 'inline';
    nextButton.disabled = false;
}
else{
  backButton.style.display = 'none';
  nextButton.style.display = 'none';
}

}

const addAcronymForm = document.getElementById("addAcronym");
const getAcronymFormNewWindow = document.getElementById("getAcronymNewWindow");
const updateButton = document.getElementById("updateButton");
const nextButton = document.getElementById("nextButton");
const backButton = document.getElementById("backButton");

nextButton.addEventListener('click', function(event){
  event.preventDefault();
  if(currentIndex >= data.length - 1){ 
    return;
  }
  currentIndex++;
  setDefinition();
})
backButton.addEventListener('click', function(event){
  event.preventDefault();
  if(currentIndex <= 0){ 
    return;
  }
  currentIndex--;
  setDefinition();
})


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
  // const getAcronymInput = document.getElementById("getAcronymInput");
  // getAcronymInput.innerText = acronym;
  // getAcronymInput.value = acronym;
  getAcronymFormNewWindow.addEventListener("submit", function (event) {
    event.preventDefault();
    let input = document.getElementById("getAcronymInput");
    getAcronym(input.value)
      .then(response => response.json())
      .then((jsonData) => {
        data = jsonData;
        handleGetAcronym(jsonData);
      })
      .catch((e) => {
        console.log(e);
        alert("Acronym not found");
      })
  });
}

if (updateButton) {

  updateButton.addEventListener('click', function (event) {
    event.preventDefault()
    updateAcronym(document.getElementById("updateTextArea").value, data[currentIndex]._id)
      .then(() => alert("Acronym updated successfully"))
      .catch(() => {
        alert("Acronym could not be updated");
      })
  });
}


/**
 * Set next and back button state
 */
function setButtonState() {
  let nextButton = document.getElementById("nextButton");
  let backButton = document.getElementById("backButton");
  nextButton.disabled = false;
  backButton.disabled = false;
  if (currentIndex <= 0) {
      nextButton.disabled = false;
      backButton.disabled = true;
  }
  if (currentIndex >= data.length - 1) {
      nextButton.disabled = true;
      backButton.disabled = false;
  }
}

/**
* Update the definition popup
*/
function setDefinition() {
  let definition = data[currentIndex].definition;
  document.getElementById("updateTextArea").value = definition;
  document.getElementById("updateTextArea").innerText = definition;
  setButtonState();
}