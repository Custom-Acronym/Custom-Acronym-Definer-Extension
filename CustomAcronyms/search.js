
'use strict';

window.resizeTo(500, 500);

const getAcronymForm = document.getElementById("getAcronym");


function displayDefintion(data) {
  console.log(data);
  if (!data) {
    alert("Acronym not found!");
    return;
  }
  let definition = data[0].definition;
  let p = document.getElementById('definitionText')
  if (!p) {
    let p = document.createElement('p');
    p.id = "definitionText";
    p.innerText = definition;
    document.body.appendChild(p);
  }
  else {
    p.innerText = definition;
  }

}

getAcronymForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let input = document.getElementById("getAcronymInput");
  getAcronym(input.value)
    .then(response => response.json())
    .then(data => displayDefintion(data))
    .catch((error) => {
      alert("Acronym not found");
    })
});