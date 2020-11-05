appendHTML = (el, str, className) => {
    var div = document.createElement('div')
    div.className = className
    div.innerHTML=str;
    while (div.children.length > 0) {
        el.appendChild(div.children[0]);
      }
}

getHighlightedText = () => {
    let acronym = window.getSelection().toString()
    console.log(acronym);


    var style = document.createElement('style');
    style.innerHTML =
    '.popupBubble{' +
        'position:relative;' +
        'display:inline;' +
    '} '+
    '.popup{' +
        'position:absolute;' +
        'display:block;' +
        'border:1px solid #AAA;' +
        'background:#FFF;' +
        'padding:5px;' +
        'width:300px;' +
    '};'
    var ref = document.querySelector('script');

    // Insert our new styles before the first script tag
    ref.parentNode.insertBefore(style, ref);
    
    // var popup = document.getElementById("myPopup");
    html = '<div class="popup" id="myPopup">' + acronym + '</div>'
    className = "popupBubble";
    appendHTML(document.body, html, className)
    var popup = document.getElementById('myPopup')
        
    }
document.body.addEventListener('dblclick', getHighlightedText);
