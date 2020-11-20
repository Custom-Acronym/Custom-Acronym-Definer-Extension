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

document.getElementById('download').addEventListener('click', () => {
    chrome.storage.local.get(null, function (result) {
        let history = result.history || 'History is empty';
        downloadObjectAsJson(history, 'history');
    });
});

document.getElementById('clear').addEventListener('click', () => {
    chrome.storage.local.clear(function () {
        alert('Cleared history')
    });
});

let track = document.getElementById('track');

chrome.storage.local.get('track', function (result) {
    if (result.track !== false) {
        track.checked = true;
    }
});

track.addEventListener('click', () => {
    let shouldTrack = track.checked;
    chrome.storage.local.set({ track: shouldTrack });
});

document.getElementById('submit').addEventListener('click', () => {
    let entries = JSON.parse(document.getElementById('entries').value);
    fetch('http://localhost:3000/api/acronym', {
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

document.getElementById('submitFile').addEventListener('click', () => {
    let file = document.getElementById('file').files[0];
    const formData = new FormData();
    formData.append('file', file);
    fetch('http://localhost:3000/api/acronym', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(err => alert('invalid data'));
});