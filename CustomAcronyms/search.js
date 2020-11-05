// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function submitSearch(event) {
  log.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;
  console.log(event);
  event.preventDefault();
}
const form = document.getElementById('search')

form.addEventListener('submit', submitSearch)
