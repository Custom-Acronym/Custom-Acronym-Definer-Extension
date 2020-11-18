'use strict';

/**
 * Downloads the input object as a json file.
 * https://stackoverflow.com/a/30800715
 * @param {object} exportObj 
 * @param {string} exportName 
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
