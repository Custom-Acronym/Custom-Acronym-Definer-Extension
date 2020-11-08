// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// Listen for key combinations, TODO: Handle these
chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);
});

// Listen for a message from the 'More' button
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.windows.create({
      url: chrome.runtime.getURL('addAcronym.html'),
      type: 'popup'
    })
  });