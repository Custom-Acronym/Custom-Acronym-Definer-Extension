'use strict';

// Listen for key combinations, TODO: Handle these
chrome.commands.onCommand.addListener(function (command) {
  console.log('Command:', command);
});

/*
Send defition recieved to the popup bubble tab 
*/
function sendDefition(event, tabid) {
  let definition = "";
  if (event.target.responseText == '[]') {
    definition = "Acronym not defined"
  }
  else {
    definition = JSON.parse(event.target.responseText)[0].definition
  }
  chrome.tabs.sendMessage(tabid, { definition: definition });
}

// Listen for a message from the 'More' button
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.acronym) {
      const XHR = new XMLHttpRequest();
      XHR.addEventListener("load", function (event) {
        sendDefition(event, sender.tab.id)
      });
      XHR.open("GET", GET_ACRONYM_URL + request.acronym);
      XHR.send();
    }
    else if (request.button) {
      chrome.windows.create({
        url: chrome.runtime.getURL('morePage.html'),
        type: 'popup',
        height: 710,
        width: 470
      })
    }
  });