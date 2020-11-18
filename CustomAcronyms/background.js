'use strict';

/**
 * Listen for key combinations, TODO: Handle these
 *  */
chrome.commands.onCommand.addListener(function (command) {
  console.log('Command:', command);
});

/**
 * Send definition received to the popup bubble tab 
 */
function sendDefinition(data, tabid) {
  let definition = "";
  if (!data) {
    definition = "Acronym not defined"
  }
  else {
    definition = data[0].definition
  }
  chrome.tabs.sendMessage(tabid, { definition: definition });
}

// Listen for a message from the 'More' button
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.acronym) {
      getAcronym(request.acronym)
        .then(response => response.json())
        .then(data => sendDefinition(data, sender.tab.id))
        .catch((error) => {
          sendDefinition(null, sender.tab.id)
        })
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