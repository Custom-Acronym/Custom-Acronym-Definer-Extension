'use strict';

// Listen for a message from the 'More' button
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.acronym) {
      getAcronym(request.acronym)
        .then(response => response.json())
        .then(data => chrome.tabs.sendMessage(sender.tab.id, data))
        .catch(() => {
          chrome.tabs.sendMessage(sender.tab.id, data)
        })
    }
    else if (request.button == "more") {
      chrome.windows.create({
        url: chrome.runtime.getURL('morePage.html'),
        type: 'popup',
        height: 750,
        width: 470
      }, function (window) {
        chrome.tabs.sendMessage(window.id, { "buttonAcronym": request.buttonAcronym })
      })
    }
    else if (request.button == "report") {
      console.log('report')
    }
    else if (request.button == "like") {
      console.log('like')
    }
  });