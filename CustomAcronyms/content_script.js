const Style = '<style> #gdx-bubble-main,#gdx-arrow-container{background-color:#ffd;z-index:99997}*{box-sizing:border-box}a{color:#11c;text-decoration:none}a:hover{text-decoration:underline}.display-none{display:none!important}#gdx-bubble-main{border:1px solid #999;border-radius:4px;box-shadow:0 0 20px rgba(0,0,0,0.5);color:#222;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:14px;line-height:normal;padding:9px;position:absolute;width:300px}#gdx-bubble-main:after{clear:both;content:"";display:table}#gdx-bubble-close{position:absolute;top:0;right:0;width:16px;height:16px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAYUlEQVQYV12PwQ2AMAwD2w3YBEaAycsIsAkbgC+qowikeyCfHLe31l5xiUM8gm8RQ2x9hmuRECIUNwL2KSwhRCh2BFda4j9CTlbBtQi5ySfy5mzMTXWka3FyEwLPzJv/TR8o8xvGTnBWXwAAAABJRU5ErkJggg==);background-position:center;background-repeat:no-repeat;cursor:pointer;opacity:0.35}#gdx-bubble-close:hover{opacity:0.8}#gdx-bubble-query-row{margin-bottom:9px}#gdx-bubble-query,#gdx-bubble-audio-icon{display:inline-block;height:20px;vertical-align:top}#gdx-bubble-query{font-size:16px;font-weight:bold}#gdx-bubble-audio-icon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAcUlEQVQ4y2P4//8/AyUYQhAH3gNxA7IAIQPmo/H3g/QA8XkgFiBkwHyoYnRQABVfj88AmGZcTuuHyjlgMwBZM7IE3NlQGhQe65EN+I8Dw8MLGgYoFpFqADK/YUAMwOsFigORatFIlYRElaRMWmaiBAMAp0n+3U0kqkAAAAAASUVORK5CYII=);background-position:center;background-repeat:no-repeat;cursor:pointer;margin-left:8px;opacity:0.5;width:16px}#gdx-bubble-audio-icon:hover{opacity:1}#gdx-bubble-meaning{line-height:1.3}#gdx-bubble-options-tip,#gdx-bubble-more,#gdx-bubble-attribution{font-size:12px;line-height:1.3;margin-top:9px}#gdx-bubble-options-tip{color:#c04}#gdx-bubble-more a{float:right;word-break:break-all}#gdx-bubble-attribution{color:#666;float:left;margin-right:9px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:230px}#gdx-bubble-attribution a{color:#073}#gdx-arrow-main{position:absolute;z-index:99998}#gdx-bubble-arrow-inner-up,#gdx-bubble-arrow-inner-down{background:transparent;border-left:10px solid transparent;border-right:10px solid transparent;left:2px;position:absolute;width:0;z-index:99999}#gdx-bubble-arrow-inner-up{border-bottom:10px solid #ffd;top:2px}#gdx-bubble-arrow-inner-down{border-top:10px solid #ffd}#gdx-bubble-arrow-outer-up,#gdx-bubble-arrow-outer-down{background:transparent;border-left:12px solid transparent;border-right:12px solid transparent;left:0px;position:absolute;width:0}#gdx-bubble-arrow-outer-up{border-bottom:12px solid #999}#gdx-bubble-arrow-outer-down{border-top:12px solid #999}.nytd_selection_button{display:none} </style>'
const boxWidth = 300;
const boxHeight = 230;
var definition = "&zwnj;"; // Blank character so the box renders the same size
var acronym = "";
var data = {};
var currentIndex = 0;

// Bind click events to all the div tags on the page
var divs = document.body.childNodes;
for (var i = 0; i < divs.length; i++) {
    //do something to each div like
    divs[i].addEventListener('click', closeDialog);
    divs[i].addEventListener('dblclick', handleDisplayAcronym);
}

/**
 * Create the popup bubble on the user's page
 */
function createPopupBubble(event, boxWidth, acronym, definition) {
    let div = document.createElement('div');

    // Add popup box html to the user's current page
    div.setAttribute('id', 'gdx-bubble-host');
    let shadow = div.attachShadow({ mode: 'open' });
    let html = Style;
    html += '<div id="gdx-bubble-main" style="left:' + getCoordinate(event.pageX, boxWidth, document.body.clientWidth) +
        'px; top: ' + getCoordinate(event.pageY, boxHeight, document.body.scrollHeight) + 'px;">' +
        '<div id="gdx-bubble-close"></div><div id="gdx-bubble-query-row" class="">' +
        '<div id="gdx-bubble-query">' + acronym +
        '</div></div><div id="gdx-bubble-meaning">' + definition + '</div>' +
        '<button id="gdx-bubble-back" style="display: none;">«</button>' +
        '<button id="gdx-bubble-next" style="display: none;">»</button>' +
        '<button id="gdx-bubble-report" style="float: right;">Report</button>' +
        '<button id="gdx-bubble-more" style="display: block;">More »</button></div>';
    shadow.innerHTML = html;
    document.body.appendChild(div);
}

/**
 * Get the coordinates to display the popup only within the display
 * Coordinates are calculated from the top left of the popup box
 * @param {*} clickLocation - location of click event
 * @param {*} boxDim - dimension of the box
 * @param {*} windowSize - size of the page 
 */
function getCoordinate(clickLocation, boxDim, windowSize) {
    let offset = boxDim / 2;
    let coord = clickLocation - offset;
    if (coord > windowSize - boxDim) {
        coord = windowSize - boxDim - 5;
    }
    if (coord < 5) {
        coord = 5;
    }
    return coord
}

/**
 * Handle more button click
 */
function moreClicked(buttonAcronym) {
    chrome.runtime.sendMessage({ "button": "more", "buttonAcronym": acronym });
}

/**
 * Handle back button click
 */
function backClicked() {
    if (currentIndex <= 0) {
        return;
    }
    currentIndex--;
    setDefinitionPopup();
}

/**
 * Handle next button click
 */
function nextClicked() {
    if (currentIndex >= data.length - 1) {
        return;
    }
    currentIndex++;
    setDefinitionPopup();
}

/**
 * Handle next button click
 */
function reportClicked() {
    //TODO: send message for reporting
}

/** 
 * Get the text that is highlighted
*/
function getHighlightedText() {
    let acronym = window.getSelection().toString()
    acronym = acronym.trim();
    console.log(acronym);
    if (!/\w+/.test(acronym)) {
        return '';
    }
    return acronym;
}

/**
 * Get the higlighted acronym, create a popup bubble, bind the click event to exit the bubble.
 */
function handleDisplayAcronym(event) {
    closeDialog();
    currentIndex = 0;
    acronym = getHighlightedText();
    if (!acronym) {
        acronym = "";
        return;
    }
    acronym = acronym.toUpperCase();

    chrome.runtime.sendMessage({ acronym: acronym });

    createPopupBubble(event, boxWidth, acronym, definition);

    //Bind the click event to the more button
    let shadowDOM = document.getElementById('gdx-bubble-host').shadowRoot;
    bindButton("#gdx-bubble-more", moreClicked, shadowDOM);
    bindButton("#gdx-bubble-next", nextClicked, shadowDOM);
    bindButton("#gdx-bubble-back", backClicked, shadowDOM);
    bindButton("#gdx-bubble-close", closeDialog, shadowDOM);
    bindButton("#gdx-bubble-report", reportClicked, shadowDOM);

}
/**
 * Bind button click listeners
 * 
 * @param {*} className - name of html class
 * @param {*} clickActionCallback - callback function 
 * @param {*} element
 */
function bindButton(className, clickActionCallback, element) {
    let button = element.querySelector(className);
    if (button) {
        button.addEventListener('click', clickActionCallback);
    }
}

/**
 * Delete the Popup bubble HTML from the active page
 */
function closeDialog() {
    let bubble = document.getElementById('gdx-bubble-host')
    if (bubble) {
        bubble.remove()
    }
    definition = "&zwnj;"; // Blank character so the box renders the same size
}

/**
 * Adds the acronym-definition pair to the user's local history.
 * @param {string} acronym 
 * @param {[string]} definitions 
 */
function track(acronym, definitions) {
    chrome.storage.local.get('history', function (result) {
        let history = result.history || [];
        history.push({ acronym: acronym, definitions: definitions, time: Date() });
        chrome.storage.local.set({ history: history }, function () {
            console.log('saved pair to storage', acronym, definitions);
        });
    });
}

/**
 * Send message to background script to perform get request.
 * Cannot do the get request within the page due to the same origin policy.
 */
chrome.runtime.onMessage.addListener(
    function (response, sender, sendResponse) {
        data = response;
        console.log(data);
        if (data.length == 0) {
            definition = 'Acronym not defined';
        }
        else {
            definition = data[currentIndex].definition;
            let acronym = data[currentIndex].acronym;
            chrome.storage.local.get('track', function (result) {
                if (result.track !== false) {
                    let definitions = data.map(entry => entry.definition);
                    track(acronym, definitions);
                }
            });
        }

        let shadowDOM = document.getElementById('gdx-bubble-host').shadowRoot;
        let meaning = shadowDOM.querySelector('#gdx-bubble-meaning');
        meaning.innerText = definition;

        if (data.length > 1) {
            let nextButton = shadowDOM.querySelector("#gdx-bubble-next");
            let backButton = shadowDOM.querySelector("#gdx-bubble-back");
            backButton.style.display = 'inline';
            backButton.disabled = true;
            nextButton.style.display = 'inline';
            nextButton.disabled = false;
        }
    }
)
/**
 * Set next and back button state
 */
function setButtonState() {
    let shadowDOM = document.getElementById('gdx-bubble-host').shadowRoot;
    let nextButton = shadowDOM.querySelector("#gdx-bubble-next");
    let backButton = shadowDOM.querySelector("#gdx-bubble-back");
    nextButton.disabled = false;
    backButton.disabled = false;
    if (currentIndex <= 0) {
        nextButton.disabled = false;
        backButton.disabled = true;
    }
    if (currentIndex >= data.length - 1) {
        nextButton.disabled = true;
        backButton.disabled = false;
    }
}

/**
 * Update the definition popup
 */
function setDefinitionPopup() {
    let definition = data[currentIndex].definition;
    let shadowDOM = document.getElementById('gdx-bubble-host').shadowRoot;
    let meaning = shadowDOM.querySelector('#gdx-bubble-meaning');
    meaning.innerText = definition;
    setButtonState();
}