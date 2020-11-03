// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.tabs.onActivated.addListener(tab => {
  chrome.tabs.get(tab.tabId, current_tab_info => {
    if(/^https?:\/\//.test(current_tab_info.url)){
      chrome.tabs.executeScript(null, {file: './foreground.js'}, () => console.log("injected"))
    }
  })
});

chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);
});