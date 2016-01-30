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
        alert(cssFile);
        alert(cssLinkIndex);
        changeCSS(cssFile,cssLinkIndex)

    }
    else
    {
        alert(cssLinkIndex)
    }


}