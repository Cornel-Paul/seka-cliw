/**
 * Created with JetBrains PhpStorm.
 * User: alexa
 * Date: 1/24/16
 * Time: 6:58 PM
 * To change this template use File | Settings | File Templates.
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
    var cssFile = ReadCookie("cssFile");
    var cssLinkIndex = ReadCookie("cssLinkIndex");

    if (cssFile != null || cssLinkIndex != null)
    {
        //alert(cssFile);
        //alert(cssLinkIndex);
        changeCSS(cssFile,cssLinkIndex)

    }
    else
    {
        //alert(cssLinkIndex)
    }
}

function parseURL(){
	var url = window.location.href;
	url = url.split("?");
	var query = url[1].split("=");
	duckSearchVar2((query[1]));
}

function duckSearchVar2(query){
	var queryDuck = "http://api.duckduckgo.com/?q=" + query + "&format=json&pretty=1&callback=myCallback"
	var script = document.createElement('script');
	script.setAttribute('src', queryDuck);
	document.head.appendChild(script);
	
}

function myCallback(dataWeGotViaJsonp){
	/*
	<div id="pin" class="demo-card-wide mdl-card mdl-shadow--2dp">
				<div class="mdl-card__title">
					<h2 class="mdl-card__title-text">Welcome</h2>
				</div>
				<div class="mdl-card__supporting-text">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Mauris sagittis pellentesque lacus eleifend lacinia...
				</div>
				<div class="mdl-card__actions mdl-card--border">
					<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
						Get Started
					</a>
				</div>
				<div class="mdl-card__menu">
					<button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
						<i class="material-icons">share</i>
					</button>
				</div>	
			</div>
	*/
	
	var newDiv = '';
    var len = dataWeGotViaJsonp.RelatedTopics.length;
	alert(len);
    for(var i=0;i<len;i++){
        duckEntry = dataWeGotViaJsonp.RelatedTopics[i];
        newDiv += '<div id="pin" class="demo-card-wide mdl-card mdl-shadow--2dp">' + 
				  '		<div class="mdl-card__title">' + 
				  '     	<h2 class="mdl-card__title-text">DuckDuckGo</h2>' +
				  '     </div>' +
				  '     <div class="mdl-card__supporting-text">' + duckEntry["Text"] + 
				  '     </div>' + 
				  '     <div class="mdl-card__actions mdl-card--border">' + 
				  '	         <a href=' + duckEntry["FirstURL"] + ' class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"> View resource' + 
				  '	         </a>' + 
				  '     </div>' + 
				  '     <div class="mdl-card__menu">' + 
			      '			<button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">' + 
				  '				<i class="material-icons">share</i>' + 
				  '     	</button>' + 
				  '     </div>' + 	
			      '</div>'
        }
    document.getElementById('column').innerHTML = newDiv;
}

function duckSearch(query){
	var queryDuck = "http://api.duckduckgo.com/?q=" + query;
	
	
	var xmlhttp = new XMLHttpRequest();
	
	xmlhttp.open("GET", queryDuck, true);
	xmlhttp.send();
	
	xmlhttp.addEventListener("readystatechange", processRequest(xmlhttp), false);
	alert(queryDuck)
	//xmlhttp.onreadystatechange = processRequest(xmlhttp);
	/*xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = JSON.parse(xmlhttp.responseText);
			processRequest(myArr);
		}
	};
	*/
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