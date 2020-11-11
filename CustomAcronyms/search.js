
'use strict';

const getAcronymForm = document.getElementById("getAcronym");


function displayDefintion(event){
  if (event.target.responseText == '[]') {
    alert("Acronym not found!");
    return;
  }
  let data = JSON.parse(event.target.responseText);
  let definition = data[0].definition
  let p = document.getElementById('definitionText')
  if(!p){
    let p = document.createElement('p');
    p.id = "definitionText";
    p.innerText = definition;
    document.body.appendChild(p);
  }
  else{
    p.innerText = definition;
  }


}

getAcronymForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let input = document.getElementById("getAcronymInput");
  getAcronym(displayDefintion, input.value)
});