// Copyright (c) 2012 by Nick Simmonds.  All rights reserved.

function setStorage() {
	if (localStorage["toggle"] === null) {
		localStorage["toggle"] === "no";
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
	};
})

//respond to any requests with the state of toggle
function toggleReq (request, sender, sendResponse) {
	sendResponse(localStorage["toggle"]+" "+localStorage["default"]);
}

// calls the toggleReq function whenever a request is sent
chrome.extension.onRequest.addListener(toggleReq);
