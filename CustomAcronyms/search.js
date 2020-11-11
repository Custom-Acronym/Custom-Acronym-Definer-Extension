
'use strict';

const getAcronymForm = document.getElementById("getAcronym");


addAcronymForm.addEventListener("submit", function (event) {
  event.preventDefault();
  addAcronym(document.getElementById("addAcronymInput"));
});