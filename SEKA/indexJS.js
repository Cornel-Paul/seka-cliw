/**
 */
 
function changeCSS(cssFile, cssLinkIndex) {

    SetCookie("cssFile",cssFile,5);
    SetCookie("cssLinkIndex",cssLinkIndex,5);
    var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", cssFile);

    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}

function SetCookie(cookieName,cookieValue,nDays) {
    var today = new Date();
    var expire = new Date();
    if (nDays==null || nDays==0) nDays=1;
    expire.setTime(today.getTime() + 3600000*24*nDays);
    document.cookie = cookieName+"="+escape(cookieValue)
        + ";expires="+expire.toGMTString();
}

function ReadCookie(cookieName) {
    var theCookie=" "+document.cookie;
    var ind=theCookie.indexOf(" "+cookieName+"=");
    if (ind==-1) ind=theCookie.indexOf(";"+cookieName+"=");
    if (ind==-1 || cookieName=="") return "";
    var ind1=theCookie.indexOf(";",ind+1);
    if (ind1==-1) ind1=theCookie.length;
    return unescape(theCookie.substring(ind+cookieName.length+2,ind1));
}

function loadCss(){
	localStorage.setItem("ddgCheckBox", "true");
	localStorage.setItem("facebookCheckBox", "true");
	localStorage.setItem("twitterCheckBox", "true");
	
    var cssFile = ReadCookie("cssFile");
    var cssLinkIndex = ReadCookie("cssLinkIndex");

    if (cssFile != null || cssLinkIndex != null)
    {
        changeCSS(cssFile,cssLinkIndex)

    }
    else
    {
        alert('hello');
        changeCSS("https://storage.googleapis.com/code.getmdl.io/1.0.6/material.yellow-light_blue.min.css",0)
    }
}

//////facebook

  function statusChangeCallback(response, query) {
    console.log('statusChangeCallback');
    console.log(response);
	//alert("statusChangeCallback: "+query);
    if (response.status === 'connected') {
      testAPI(query);
    } else if (response.status === 'not_authorized') {
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      document.location.href = "facebookLoginTest.html";
    }
  }

  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response, query);
    });
  }

  function startFbSearch(query) {
  FB.init({
    appId      : '1106827712685541',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response, query);
  });

  };

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  function testAPI(query) {
    console.log('Welcome!  Fetching your information.... ');
	var body = "";
	var url = "/search?q="+ query +"&type=page&access_token=";
	FB.api(url,
    function (response) {
      if (response && !response.error) {
        console.log(response);
		 var len = response.data.length;
		 for(var i=0;i<len;i++){
                facebookEntry = response.data[i];
				addNewDivToBody(facebookEntry["name"], "https://www.facebook.com/"+facebookEntry["id"], "Facebook");
            }
      }
    }
);

  }
  
///////facebook

function ddgCheckBoxHandler(){
	if (document.getElementById("checkbox-1").checked == true){
		//alert("trutruesda");
		localStorage.setItem("ddgCheckBox", "true");
	} else {
		//alert("falsefalse");
		localStorage.setItem("ddgCheckBox", "false");
	}

}

function facebookCheckBoxHandler(){
	if (document.getElementById("checkbox-2").checked == true){
		localStorage.setItem("facebookCheckBox", "true");
	} else {
		localStorage.setItem("facebookCheckBox", "false");
	}
}

function twitterCheckBoxHandler(){
	if (document.getElementById("checkbox-3").checked == true){
		localStorage.setItem("twitterCheckBox", "true");
	} else {
		localStorage.setItem("twitterCheckBox", "false");
	}
}


function parseURL(){
	//alert("ddgCheckBox = " + localStorage.getItem("ddgCheckBox"));
	//alert("facebookCheckBox = " + localStorage.getItem("facebookCheckBox"));
	var url = window.location.href;
	url = url.split("?");
	var query = url[1].split("=");
	
	if (localStorage.getItem("ddgCheckBox") == "true"){
		duckSearchVar2((query[1]));
	}
	
	if (localStorage.getItem("facebookCheckBox") == "true"){
		startFbSearch(query[1]);
	}
	
}

function duckSearchVar2(query){
	var queryDuck = "https://api.duckduckgo.com/?q=" + query + "&format=json&pretty=1&callback=myCallback";
	var script = document.createElement('script');
	script.setAttribute('src', queryDuck);
	document.head.appendChild(script);
	
}

function myCallback(dataWeGotViaJsonp){
    var len = dataWeGotViaJsonp.RelatedTopics.length;
    for(var i=0;i<len;i++){
        duckEntry = dataWeGotViaJsonp.RelatedTopics[i];
		if (duckEntry["Topics"] == null) 
		{
			addNewDivToBody(duckEntry["Text"], duckEntry["FirstURL"], "DuckDuckGo");
		} 
		else 
		{
			var topicsLen = duckEntry["Topics"].length;
			var topic = duckEntry["Topics"];
			for(var j=0;j<topicsLen;j++){
				addNewDivToBody(topic[j]["Text"], topic[j]["FirstURL"], "DuckDuckGo");
		}
		}
    }
}


function addNewDivToBody(text, url, searchEngine ){
	//div pin
	var divPin = document.createElement('div');
	var attID = document.createAttribute("id");       
	attID.value = "pin";                           
	divPin.setAttributeNode(attID); 
	var attClass = document.createAttribute("class");       
	attClass.value = "demo-card-wide mdl-card mdl-shadow--2dp";                           
	divPin.setAttributeNode(attClass);
	
	//div inner1
	var divInner1 = document.createElement('div');
	var attClass = document.createAttribute("class");       
	attClass.value = "mdl-card__title";                           
	divInner1.setAttributeNode(attClass);
	var h2 = document.createElement('h2');
	var attClass = document.createAttribute("class");       
	attClass.value = "mdl-card__title-text";                           
	h2.setAttributeNode(attClass);
	var txt = document.createTextNode(searchEngine);     // Create a text node
	h2.appendChild(txt);     
	divInner1.appendChild(h2);
	
	//div inner2
	var divInner2 = document.createElement('div');
	var attClass = document.createAttribute("class");       
	attClass.value = "mdl-card__supporting-text";                           
	divInner2.setAttributeNode(attClass);
	var txt = document.createTextNode(text);     // Create a text node
	divInner2.appendChild(txt);     
	
	//div inner3
	var divInner3 = document.createElement('div');
	var attClass = document.createAttribute("class");       
	attClass.value = "mdl-card__actions mdl-card--border";                           
	divInner3.setAttributeNode(attClass);
	
	var aElement = document.createElement('a');
	var attHref = document.createAttribute("href");       
	attHref.value = url; 
	aElement.setAttributeNode(attHref);
	var attClass = document.createAttribute("class");
	attClass.value = "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect";
	aElement.setAttributeNode(attClass);
	var txt = document.createTextNode("View resource");     // Create a text node
	aElement.appendChild(txt); 

	divInner3.appendChild(aElement);
	
	//div inner4
	var divInner4 = document.createElement('div');
	
	var attClass = document.createAttribute("class");       
	attClass.value = "mdl-card__menu";                           
	divInner4.setAttributeNode(attClass);
	
	divInner4.innerHTML = '<a data-pocket-align="right" data-save-url="'+ url +'" data-pocket-label="pocket" data-pocket-count="none" class="pocket-btn" data-lang="en"></a>';
	
	var script = document.createElement('script');
    script.type = 'text/javascript';
	script.text = '(function(d,i){if(!d.getElementById(i)){var j=d.createElement("script");j.id=i;j.src="https://widgets.getpocket.com/v1/j/btn.js?v=1";var w=d.getElementById(i);d.body.appendChild(j);}})(document,"pocket-btn-js");';
	divInner4.appendChild(script);
	
	divPin.appendChild(divInner1);
	divPin.appendChild(divInner2);
	divPin.appendChild(divInner3);
	divPin.appendChild(divInner4);
	var column = document.getElementById('column');
	column.appendChild(divPin);
}

/*
function duckSearch(query){
	var queryDuck = "http://api.duckduckgo.com/?q=" + query + "&format=json";
	
	
	var xmlhttp = new XMLHttpRequest();
	
	xmlhttp.open("GET", queryDuck, true);
	xmlhttp.send();
	
	xmlhttp.addEventListener("readystatechange", processRequest(xmlhttp), false);
	alert(queryDuck)
}

function processRequest(xmlhttp){
	alert(xmlhttp.readyState)
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
		alert("OKOKOK!");
	}
}

function testResults(form) {
    var TestVar = document.getElementById('sample1').value
    alert("You typed: " + TestVar);
}
*/
