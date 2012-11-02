// ==UserScript==
// @name Trello Bugzilla Integration
// @namespace http://www.navicon.dk/
// @version 0.1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @description Looks for card titles with 'Bug \d+' and adds badge/links to bugzilla. Also autocompletes new card titles that starts with 'Bug \d+' from bugzilla. Autocomplete is actived when pressing spacebar after 'Bug \d+'.
// @match https://trello.com/board/*
// @copyright 2012+, Carsten Madsen
// ==/UserScript==


// red bugz icon
var bugzillaImgRed = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHWSURBVHj aYvz//z8DJQAggJiQOe/fv2fv7Oz8rays/N+VkfG/iYnJfyD/1+rVq7ffu3dPFpsBAAHEAHIBCJ85c8bN2Nj4vwsDw/8zQLwKiO8CcRoQu0DxqlWrdsHUwzBAAIGJmTNnPgYa9j8UqhFElwPxf2MIDeIrKSn9FwSJoRkAEEAM0DD4DzMAyPi/G+QKY4hh5WAXGf8PDQ0FGwJ22d27CjADAAIIrLmjo+MXA9R2kAHvGBA2wwx6B8W7od6CeQcggKCmCEL8bgwxYCbUIGTDVkHDBia+CuotgACCueD3TDQN75D4xmAvCoK9ARMHBzAw0AECiBHkAlC0Mdy7x9ABNA3obAZXIAa6iKEcGlMVQHwWyjYuL2d4v2cPg8vZswx7gHyAAAK7AOif7SAbOqCmn4Ha3AHFsIDtgPq/vLz8P4MSkJ2W9h8ggBjevXvHDo4FQUQg/kdypqCg4H8lUIACnQ/SOBMYI8bAsAJFPcj1AAEEjwVQqLpAbXmH5BJjqI0gi9DTAAgDBBCcAVLkgmQ7yKCZxpCQxqUZhAECCJ4XgMl493ug21ZD+aDAXH0WLM4A9MZPXJkJIIAwTAR5pQMalaCABQUULttBGCCAGCnNzgABBgAMJ5THwGvJLAAAAABJRU5ErkJggg==" />';

// grey bugz icon
var bugzillaImg = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAAAFzUkd CAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAABIAAAASABGyWs+AAABQUlEQVQoz32RzUoCcQDEf/9NMbwsbSu0glZq0N6CLTp5qEMG9Rweons9Qegj1AsE9gCFEV0Liq4dsg+LPBTadhB1g+lQUXRw5jCHGeYwY8RwWF/SSVSjvFKaV3VwcHib+ZMQ4mIlkKuiAi0rK1euanXxRcTuI/IUyFNBGyrIU05x/QSMMAKPgFfyXBMyicMlY9Smc/dgGVUiSAM25zyzyBvvzBBn6e6gDkaMyKFESJMsENHAJokNtOhgGe18pAmJ6BIB8MIVE0SAzRSWzF7shhZx3mgCcVI4nDJHl5AbLKPKUY8u4JOlQYNZCqTYZ4EHVjHthNNL4uMB0OWKPmvkOKHP5lM5A6oManVXvkpaV1G2ttRO/KwgYjKwLcgDDfKMszU61v/3RXA8SQvwOCPgr/39hRC1uq+CLJX1W/899XB8Ah4WmVffqvqqAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEyLTEwLTE0VDE2OjQ3OjUwKzAyOjAw79+6cgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMi0wMi0wMlQwMDoyODoxOSswMTowMHxV1nwAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC" />';

var bugzillaLink = 'http://bugzilla.navicon.dk/show_bug.cgi?id=';

var addBugzillaBadge = function() {
    $(".list-card-title").each(function(i,val){
        console.log($(this).html());
        if ($(this).html().match(/Bug \d+/)) {
            var regExpMatch = $(this).html().match(/Bug (\d+)/);
            //console.log("match found " + $(this).parent().children('.badges'));
            //console.log("bugz found " + $(this).parent().find(".bugz").length);
            if ($(this).parent().find(".bugz").length < 1){
                $(this).parent().children('.badges').append('<a class="bugz" href="'+ bugzillaLink + regExpMatch[1] +'">'+bugzillaImg+'</a>');}
        }
    });
};

// intercept spacebar press when creating new cards and look in
// bugzilla to do possible autocomplete

unsafeWindow.$("body").delegate(".js-card-title", "keypress", function(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    console.log("code="+code);
    if(code == 32) { //Enter keycode
        var text = $(this).val();
        console.log("text="+text);
        var regExpMatch = text.match(/Bug (\d+)/);
        var textarea = $(this);
        console.log(regExpMatch);
        if (regExpMatch) {
            // see http://stackoverflow.com/questions/11007605/gm-xmlhttprequest-why-is-it-never-firing-the-onload-in-firefox
            setTimeout(function() {GM_xmlhttpRequest({
                method: "GET",
                url: bugzillaLink+regExpMatch[1],
                onload: function(response) {
                    //console.log( response.responseText);
                    var jq = $(response.responseText);
                    console.log($("#short_desc_nonedit_display", response.responseText).text());
                    textarea.val(jq.find(".bz_alias_short_desc_container b").text().replace(String.fromCharCode(160)," ")+ " - " + jq.find("#short_desc_nonedit_display").text());
                },
                onerror: function(response) {
                    console.log("Error " +response.responseText);
                },
                onabort: function(response) {
                    console.log("Error " +response.responseText);
                }
            })}, 0);
        }   
    }
});

setInterval(addBugzillaBadge, 5000);
