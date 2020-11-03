getHighlightedText=function(){
    let acronym = window.getSelection().toString()
    console.log(acronym);

 }
 document.body.addEventListener('dblclick',getHighlightedText);