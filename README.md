TrelloBugzilla
==============

Trello Bugzilla Integration -  simplistic integration of [Bugzilla](http://www.bugzilla.org/) into [Trello.com](http://trello.com) using [GreaseMonkey](https://addons.mozilla.org/da/firefox/addon/greasemonkey/) (GM) <br />

It will save alot of typing in case many of the Trello cards you create originates from bugzilla issues.

![Trello card with bugzilla badge](http://2.bp.blogspot.com/-kLmS1gyjZ7k/UH8iPRqralI/AAAAAAAAA3o/Wv9wNUegxyQ/s400/trello.png "Trello card with bugzilla badge")

So far it supports:

  * Decorating cards that have 'Bug \d+' in their card title with a badge that is a hyper link to Bugzilla.

  * Auto-completion of new card titles starting with 'Bug \d+' followed by space. You have to be logged into bugzilla<br /> 
  in the browser before auto completion will work.

The script also works in Chrome with the [Tampermonkey](http://www.chromeextensions.org/appearance-functioning/tampermonkey/) extension installed.

Installation
===

You have to edit the line

    var bugzillaLink = 'http://...';
    
in the GM script to point at your own bugzilla installation before or after installing the script.