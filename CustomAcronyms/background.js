// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// chrome.tabs.onActivated.addListener(tab => {
//   chrome.tabs.get(tab.tabId, current_tab_info => {
//     if(/^https?:\/\//.test(current_tab_info.url)){
//       chrome.tabs.executeScript(null, {file: './content_script.js'}, () => console.log(tab))
//     }
//   })
// });

chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.windows.create({
      url: chrome.runtime.getURL('addAcronym.html'),
      type: 'popup'
    })
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });