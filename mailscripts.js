// Copyright 2012 by Nick Simmonds, all rights reserved. http://it.nicksimmonds.com

var gMailUrl = "https://mail.google.com/?view=cm&fs=1&tf=1&source=mailto&to=";
var gMailSub = "&su=";
var yMailUrl = "http://compose.mail.yahoo.com?to=";
var lMailUrl = "http://mail.live.com/?rru=compose&to=";
var owaHTTP = localStorage["owaUrl"];
var owaUrl = "https://"+owaHTTP+"/owa/?ae=Item&a=New&t=IPM.Note&to=";
var subject = "&subject=";
var url = "";
var toggle;
var def;
var mailUrl;

// Send a request to the extension for toggle status
chrome.extension.sendMessage("toggle", function(response){
	toggle = response;
    })

//send a request to the extension for the default mail type
chrome.extension.sendMessage(("default"), function(response){
	def = response;
	switch (def) {
		case "g":
			mailUrl = gMailUrl;
			// Gmail uses a different subject identifier
			subject = gMailSub;
			break;
			
		case "y":
			mailUrl = yMailUrl;
			break;
			
		case "l":
			mailUrl = lMailUrl;
			break;
			
		case "o":
			mailUrl = owaUrl;
			break;
		
		// use Gmail as the default option, just in case.	
		default:
			mailUrl = gMailUrl;
			subject = gMailSub;
	}
});





// note (for debugging/learning purposes) that the function above doesn't fire until
// the script is fully loaded.  This is clearly a bug.  Luckily, the way the below
// function is written, it doesn't take place until after the page is fully loaded.
$("a").click(function() {
	if (toggle === "on") {
		var url = this.href;
		url = url.replace("mailto:",mailUrl);
		url = url.replace("?subject=",subject);
		$(this).attr("href",url);
	}
});
