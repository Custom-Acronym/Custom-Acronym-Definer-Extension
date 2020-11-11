'use strict';

// Listen for key combinations, TODO: Handle these
chrome.commands.onCommand.addListener(function (command) {
  console.log('Command:', command);
});

function sendDefition(event){
  let definition = "";
  if(event.target.responseText == '[]'){
    definition = "Acronym not defined"
  }
  else{
    definition = JSON.parse(event.target.responseText)[0].definition
  }
  chrome.tabs.sendMessage(sender.tab.id, { definition: definition});
}

// Listen for a message from the 'More' button
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.acronym) {
      const XHR = new XMLHttpRequest();
      XHR.addEventListener("load", sendDefition);
      XHR.open("GET", GET_ACRONYM_URL + request.acronym);
      XHR.send();
    }
    else if (request.button) {
      chrome.windows.create({
        url: chrome.runtime.getURL('addAcronym.html'),
        type: 'popup',
        height: 680,
        width: 470
      })
    }

  });