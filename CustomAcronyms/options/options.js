'use strict';

/**
 * Downloads the input object as a json file.
 * https://stackoverflow.com/a/30800715
 * @param {object} exportObj - the object that will be downloaded
 * @param {string} exportName - the name of the output file
 */
function downloadObjectAsJson(exportObj, exportName) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

let trigger = document.getElementById('trigger');

// set initial value for trigger
chrome.storage.local.get('trigger', function (result) {
    if (result.trigger != undefined) {
        trigger.value = result.trigger;
    }
});

// set trigger on change
trigger.addEventListener('change', () => {
    let triggerVal = trigger.value;
    chrome.storage.local.set({ trigger: triggerVal });
});

// download history as json file
document.getElementById('download').addEventListener('click', () => {
    chrome.storage.local.get(null, function (result) {
        let history = result.history || 'History is empty';
        downloadObjectAsJson(history, 'history');
    });
});

// clear history
document.getElementById('clear').addEventListener('click', () => {
    chrome.storage.local.clear(function () {
        alert('Cleared history')
    });
});

let track = document.getElementById('track');

// set initial value for tracking history
chrome.storage.local.get('track', function (result) {
    if (result.track !== false) {
        track.checked = true;
    }
});

// set tracking on change
track.addEventListener('click', () => {
    let shouldTrack = track.checked;
    chrome.storage.local.set({ track: shouldTrack });
});

// send entries to server
document.getElementById('submit').addEventListener('click', () => {
    try {
        var entries = JSON.parse(document.getElementById('entries').value);
    } catch {
        alert('invalid data');
        return;
    }

    fetch(ACRONYM_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entries)
    })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(err => alert('invalid data'));
});

// send file to server
document.getElementById('submitFile').addEventListener('click', () => {
    let file = document.getElementById('file').files[0];
    const formData = new FormData();
    formData.append('file', file);
    fetch(ACRONYM_URL, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(err => alert('invalid data'));
});