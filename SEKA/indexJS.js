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

//////facebook

  function statusChangeCallback(response, query) {
    console.log('statusChangeCallback');
    console.log(response);
	alert("statusChangeCallback: "+query);
    if (response.status === 'connected') {
      testAPI(query);
    } else if (response.status === 'not_authorized') {
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
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
		 var text = '';
		 for(var i=0;i<len;i++){
                facebookEntry = response.data[i];
				console.log("concon: " + response[i]);
                //text += '<a href=https://www.facebook.com/' + facebookEntry['id'] + '> ' + facebookEntry["name"] + '</a>'
				body = addNewDiv(body, facebookEntry["name"], "https://www.facebook.com/"+facebookEntry["id"], "Facebook");
            }
            document.getElementById('column').innerHTML += body;
      }
    }
);

  }
  
///////facebook

function parseURL(){
	var url = window.location.href;
	url = url.split("?");
	var query = url[1].split("=");
	duckSearchVar2((query[1]));
	startFbSearch(query[1]);
	
	
}

function duckSearchVar2(query){
	var queryDuck = "https://api.duckduckgo.com/?q=" + query + "&format=json&pretty=1&callback=myCallback"
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
	
	var body = '';
    var len = dataWeGotViaJsonp.RelatedTopics.length;
	//alert(len);
    for(var i=0;i<len;i++){
        duckEntry = dataWeGotViaJsonp.RelatedTopics[i];
		//typeof yourvar != 'undefined'
		if (duckEntry["Topics"] == null) {
			body = addNewDiv(body, duckEntry["Text"], duckEntry["FirstURL"], "DuckDuckGo")
		} else {
			//alert("am gasit Topics!");
			var topicsLen = duckEntry["Topics"].length;
			var topic = duckEntry["Topics"];
			for(var j=0;j<topicsLen;j++){
				body = addNewDiv(body, topic[j]["Text"], topic[j]["FirstURL"], "DuckDuckGo");
			}
			//alert(topicsLen);
		}
        }
    document.getElementById('column').innerHTML += body;
}

function addNewDiv(currentBody, text, url, searchEngine){
	currentBody += '<div id="pin" class="demo-card-wide mdl-card mdl-shadow--2dp">' + 
					  '		<div class="mdl-card__title">' + 
					  '     	<h2 class="mdl-card__title-text">' + searchEngine + '</h2>' +
					  '     </div>' +
					  '     <div class="mdl-card__supporting-text">' + text + 
					  '     </div>' + 
					  '     <div class="mdl-card__actions mdl-card--border">' + 
					  '	         <a href=' + url + ' class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"> View resource' + 
					  '	         </a>' + 
					  '     </div>' + 
					  '     <div class="mdl-card__menu">' + 
					  '			<a data-pocket-align="right" data-save-url=' + url + ' data-pocket-label="pocket" data-pocket-count="none" class="pocket-btn" data-lang="en"></a>'+
					  '         <script type="text/javascript">!function(d,i){if(!d.getElementById(i)){var j=d.createElement("script");j.id=i;j.src="https://widgets.getpocket.com/v1/j/btn.js?v=1";var w=d.getElementById(i);d.body.appendChild(j);}}(document,"pocket-btn-js");</script>' +
					  '			<p> gfdgdf </p>' +
					  '     </div>' + 	
					  '</div>';
	return currentBody;
}

function duckSearch(query){
	var queryDuck = "http://api.duckduckgo.com/?q=" + query + "&format=json";
	
	
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