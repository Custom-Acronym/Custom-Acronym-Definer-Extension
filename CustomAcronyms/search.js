
'use strict';

const getAcronymForm = document.getElementById("getAcronym");


function displayDefintion(){

}

getAcronymForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let input = document.getElementById("getAcronymInput");
  getAcronym(displayDefintion, input.value)
});