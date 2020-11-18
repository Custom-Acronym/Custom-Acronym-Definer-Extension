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
  let acronym = data.acronym;
  let result = data.result;
  let definition = "";
  if (!result) {
    definition = "Acronym not defined"
  }
  else {
    definition = result[0].definition
  }
  chrome.tabs.sendMessage(tabid, { acronym: acronym, definition: definition });
}

// Listen for a message from the 'More' button
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.acronym) {
      getAcronym(request.acronym)
        .then(response => response.json())
        .then(data => sendDefinition({ acronym: request.acronym, result: data }, sender.tab.id))
        .catch((error) => {
          sendDefinition({ acronym: request.acronym, result: null }, sender.tab.id)
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