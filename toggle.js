// Copyright (c) 2012 by Nick Simmonds.  All rights reserved.

function setStorage() {
	if (localStorage["toggle"] === undefined) {
		localStorage["toggle"] = "no"
	}
        if (localStorage["gmail"] === undefined){
            localStorage["gmail"] = true
        }
        if (localStorage["owa"] === undefined){
            localStorage["owa"] = false
        }
}

function setIcon() {
	if (localStorage["toggle"] === "on") {
		chrome.browserAction.setIcon({path:"midicon.png"});
	} else {
		chrome.browserAction.setIcon({path:"disicon.png"});
	}
}

function toggle() {
	if (localStorage["toggle"] === "on") {
		chrome.browserAction.setIcon({path:"disicon.png"});
		localStorage["toggle"] = "no";
	} else {
		chrome.browserAction.setIcon({path:"midicon.png"});
		localStorage["toggle"] = "on";
	}
}

setStorage();
setIcon();

// swap the icon whenever it is clicked, then change the status of toggle.
// Then, relaod the page to reload scripts.
chrome.browserAction.onClicked.addListener(function (tab) {
	if (localStorage["toggle"] === "on") {
		chrome.browserAction.setIcon({path:"disicon.png"});
		localStorage["toggle"] = "no";
	} else {
		chrome.browserAction.setIcon({path:"midicon.png"});
		localStorage["toggle"] = "on";
	}
})

chrome.extension.onMessage.addListener(
    function(message, sender, sendResponse) {
    	sendResponse(localStorage[message.sendMe]);
    });