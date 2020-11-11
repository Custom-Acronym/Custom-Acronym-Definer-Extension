var Style = '<style> #gdx-bubble-main,#gdx-arrow-container{background-color:#ffd;z-index:99997}*{box-sizing:border-box}a{color:#11c;text-decoration:none}a:hover{text-decoration:underline}.display-none{display:none!important}#gdx-bubble-main{border:1px solid #999;border-radius:4px;box-shadow:0 0 20px rgba(0,0,0,0.5);color:#222;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:14px;line-height:normal;padding:9px;position:absolute;width:300px}#gdx-bubble-main:after{clear:both;content:"";display:table}#gdx-bubble-close{position:absolute;top:0;right:0;width:16px;height:16px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAYUlEQVQYV12PwQ2AMAwD2w3YBEaAycsIsAkbgC+qowikeyCfHLe31l5xiUM8gm8RQ2x9hmuRECIUNwL2KSwhRCh2BFda4j9CTlbBtQi5ySfy5mzMTXWka3FyEwLPzJv/TR8o8xvGTnBWXwAAAABJRU5ErkJggg==);background-position:center;background-repeat:no-repeat;cursor:pointer;opacity:0.35}#gdx-bubble-close:hover{opacity:0.8}#gdx-bubble-query-row{margin-bottom:9px}#gdx-bubble-query,#gdx-bubble-audio-icon{display:inline-block;height:20px;vertical-align:top}#gdx-bubble-query{font-size:16px;font-weight:bold}#gdx-bubble-audio-icon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAcUlEQVQ4y2P4//8/AyUYQhAH3gNxA7IAIQPmo/H3g/QA8XkgFiBkwHyoYnRQABVfj88AmGZcTuuHyjlgMwBZM7IE3NlQGhQe65EN+I8Dw8MLGgYoFpFqADK/YUAMwOsFigORatFIlYRElaRMWmaiBAMAp0n+3U0kqkAAAAAASUVORK5CYII=);background-position:center;background-repeat:no-repeat;cursor:pointer;margin-left:8px;opacity:0.5;width:16px}#gdx-bubble-audio-icon:hover{opacity:1}#gdx-bubble-meaning{line-height:1.3}#gdx-bubble-options-tip,#gdx-bubble-more,#gdx-bubble-attribution{font-size:12px;line-height:1.3;margin-top:9px}#gdx-bubble-options-tip{color:#c04}#gdx-bubble-more a{float:right;word-break:break-all}#gdx-bubble-attribution{color:#666;float:left;margin-right:9px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:230px}#gdx-bubble-attribution a{color:#073}#gdx-arrow-main{position:absolute;z-index:99998}#gdx-bubble-arrow-inner-up,#gdx-bubble-arrow-inner-down{background:transparent;border-left:10px solid transparent;border-right:10px solid transparent;left:2px;position:absolute;width:0;z-index:99999}#gdx-bubble-arrow-inner-up{border-bottom:10px solid #ffd;top:2px}#gdx-bubble-arrow-inner-down{border-top:10px solid #ffd}#gdx-bubble-arrow-outer-up,#gdx-bubble-arrow-outer-down{background:transparent;border-left:12px solid transparent;border-right:12px solid transparent;left:0px;position:absolute;width:0}#gdx-bubble-arrow-outer-up{border-bottom:12px solid #999}#gdx-bubble-arrow-outer-down{border-top:12px solid #999}.nytd_selection_button{display:none} </style>'

/*
Create the popup bubble on the user's page
*/
function createPopupBubble(event, boxWidth, acronym, definition) {
    var div = document.createElement('div');

    //Add popup box html to the user's current page
    div.setAttribute('id', 'gdx-bubble-host');
    let shadow = div.attachShadow({ mode: 'open' });
    let html = Style;
    html += '<div id="gdx-bubble-main" style="left:' + getCoordinate(event.pageX, boxWidth / 2, document.body.clientWidth - boxWidth) + 'px; top: ' + getCoordinate(event.pageY, 115, document.body.scrollHeight) + 'px;">' +
        '<div id="gdx-bubble-close"></div><div id="gdx-bubble-query-row" class="">' +
        '<div id="gdx-bubble-query">' + acronym +
        '</div></div><div id="gdx-bubble-meaning">' + definition + '</div>' +
        '<button id="gdx-bubble-more" class="">More »</button></div>';
    shadow.innerHTML = html;
    document.body.appendChild(div);
}

/*
Get the coordinates to display the popup only within the display
*/
function getCoordinate(page, offset, windowSize) {
    let coord = page - offset;
    if (coord < 10) {
        coord = 5;
    }
    if (coord > windowSize) {
        coord = windowSize - 5;
    }
    return coord
}

/*
Handle more button click
*/
function moreClicked(){
    chrome.runtime.sendMessage({button: "more"});
}

/*
Respond to a user highlighting text
*/
function getHighlightedText(event){
    let acronym = window.getSelection().toString()
    console.log(acronym);
    let boxWidth = 300;
    if (!/\w+/.test(acronym)) {
        return;
    }

    let definition = "Acronym not found";

    createPopupBubble(event, boxWidth, acronym, definition);

    //Bind the click event to the more button
    var shadowDOM = document.getElementById('gdx-bubble-host').shadowRoot;
    var button = shadowDOM.querySelector("button");
    if (button){
        button.addEventListener('click', moreClicked);
    }
}

//Delete the HTML from the Popup bubble
closeDialog = () => {
    var bubble = document.getElementById('gdx-bubble-host')
    if (bubble) {
        bubble.remove()
    }
}


document.body.addEventListener('dblclick', getHighlightedText);
document.body.addEventListener('click', closeDialog);