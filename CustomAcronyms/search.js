
'use strict';

window.resizeTo(500, 500);

const getAcronymForm = document.getElementById("getAcronym");


function displayDefintion(data) {
  console.log(data);
  if (data.length == 0) {
    alert("Acronym not found!");
    return;
  }
  let p = document.getElementById('definitionText');
  p.innerText = "";
  for(var i = 0; i < data.length; i++){
    p.innerText += i+1 + ". " + data[i].definition + '\n'
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