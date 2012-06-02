// Copyright (c) 2012 by Nick Simmonds.  All rights reserved.

var gMailUrl = "https://mail.google.com/?view=cm&fs=1&tf=1&source=mailto&to=";
var gMailSub = "&su=";
var yMailUrl = "http://compose.mail.yahoo.com?to=";
var lMailUrl = "http://mail.live.com/?rru=compose&to=";
var owaHTTP = localStorage["owaUrl"];
var owaUrl = "https://"+owaHTTP+"/owa/?ae=Item&a=New&t=IPM.Note&to=";
var subject = "&subject=";

//Context menu entry for Gmail fires this block
function clickHandleGmail(){
	// info starts out undefined, so this returns the whole function
	// when the context menu item is clicked
	return function mailToGoogle (info) {
			var link = info.linkUrl;
            link = link.replace("mailto:",gMailUrl);
			link = link.replace("?subject=","&su=");
			window.open(link);
	}
}

//same as the previous block, but for Yahoo!
function clickHandleYmail() {
    return function mailToYahoo (info) {
        var link = info.linkUrl;
        link = link.replace("mailto:",yMailUrl);
        link = link.replace("?subject=",subject);
        window.open(link);
    }
}

function clickHandleLmail() {
    return function mailToLive (info) {
        var link = info.linkUrl;
        link = link.replace("mailto:",lMailUrl);
        link = link.replace("?subject=",subject);
        window.open(link);
    }
}

function clickHandleOWA() {
    return function mailToOWA (info) {
        var link = info.linkUrl;
        link = link.replace("mailto:",owaUrl);
        link = link.replace("?subject=",subject);
        window.open(link);
    }
}



// create the context menu items

function createMenuGmail() {
    if (localStorage["gmail"] === "true") {
        chrome.contextMenus.create({
	    "title" : "Send via Gmail",
	    "contexts" :["link"],
	    "onclick" : clickHandleGmail()
	    });
	};
};

function createMenuYahoo() {
	if (localStorage["yahoo"] === "true") {
		chrome.contextMenus.create({
			"title" : "Send via Yahoo!",
			"contexts" : ["link"],
			"onclick" : clickHandleYmail()
		});
	};
};

function createMenuLive() {
	if (localStorage["live"] === "true") {
		chrome.contextMenus.create({
			"title" : "Send via Microsoft Live Mail",
			"contexts" : ["link"],
			"onclick" : clickHandleLmail()
		});
	};
};

function createMenuOWA() {
	if (localStorage["owa"] === "true") {
			chrome.contextMenus.create({
			"title" : "Send via OWA",
			"contexts" : ["link"],
			"onclick" : clickHandleOWA()
		});
	};
};

createMenuGmail();
createMenuYahoo();
createMenuLive();
createMenuOWA();