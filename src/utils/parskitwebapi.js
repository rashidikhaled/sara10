/* eslint-disable no-useless-escape */
/* eslint-disable no-eval */
/* eslint-disable no-redeclare */
/* eslint-disable no-tabs */
/* eslint-disable eqeqeq */
/* eslint-disable no-extend-native */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/// //////////////////////////////////////////////////////////////////////////////////
// This file is created by Amnafzar Co. to facilitate access to ParsKit Web API.   //
// Contact ParsKey Web API support services by parskey@amnafzar.ir.	               //
//                                                                                 //
// Version 0.61 Release 960712_1                                                   //
/// //////////////////////////////////////////////////////////////////////////////////
var PK_PROJECT = true

// The connection port of ParsKit Web API service is configurable.
// The connection port can be changed via ParsKit Web API configuration file.
// You can use other parskit instance in different port that is defined in here.

var PK_HTTP_PORT = "58185" // ParsKit Web API web Service App In Http Protocol
var PK_HTTPS_PORT = "58085" // ParsKit Web API web Service App In Https Protocol

var PK_SW_HTTP_PORT = "48184" // ParsKit Web API Slot Watcher Service In Http Protocol
var PK_SW_HTTPS_PORT = "48084" // ParsKit Web API Slot Watcher Service In Https Protocol

var PK_SRV_HTTP_PORT = "38183" // ParsKit Web API Watch Dog Service In Http Protocol
var PK_SRV_HTTPS_PORT = "38083" // ParsKit Web API Watch Dog Service In Https Protocol

if (!PK_PROJECT) {
  PK_HTTP_PORT = "57175"
  PK_HTTPS_PORT = "57075"

  PK_SW_HTTP_PORT = "47174"
  PK_SW_HTTPS_PORT = "47074"

  PK_SRV_HTTP_PORT = "37173"
  PK_SRV_HTTPS_PORT = "37073"
}

var PK_HTTP_ADDR = "http://localhost:" + PK_HTTP_PORT + "/ParsKitWebAPI/"
var PK_HTTPS_ADDR = "https://localhost:" + PK_HTTPS_PORT + "/ParsKitWebAPI/"

var PK_SW_HTTP_ADDR = "http://localhost:" + PK_SW_HTTP_PORT + "/ParsKitWebAPI/"
var PK_SW_HTTPS_ADDR =
  "https://localhost:" + PK_SW_HTTPS_PORT + "/ParsKitWebAPI/"

var PK_SRV_HTTP_ADDR =
  "http://localhost:" + PK_SRV_HTTP_PORT + "/ParsKitWebAPI/"
var PK_SRV_HTTPS_ADDR =
  "https://localhost:" + PK_SRV_HTTPS_PORT + "/ParsKitWebAPI/"

var PK_ADDR = PK_HTTPS_ADDR
var PK_SW_ADDR = PK_SW_HTTPS_ADDR
var PK_SRV_ADDR = PK_SRV_HTTPS_ADDR

var EM_DEFAULT_LANGUAGE = "en"
var EM_DEFAULT_DISPLAY = false

var DEFAULT_TIMEOUT = 10000

// --- Define Event Number ---
var PK_JS_SERVICE_CONNECTION_PROBLEM = 3000
var PK_JS_INVALID_OUTPUT_JS_STR = 3002

// --- Global Variables ----
var DEFAULT_TIMEOUT = 10000
var g_isIE11 = !window.ActiveXObject && "ActiveXObject" in window
var g_isSafari =
  navigator.vendor &&
  navigator.vendor.indexOf("Apple") > -1 &&
  navigator.userAgent &&
  !navigator.userAgent.match("CriOS")
var g_ServiceConnectionState = false
var g_connectTimeOut
var g_timeout = DEFAULT_TIMEOUT
var request
var g_isHttpsOriginHttpService = false
// --- End of Global Variables ---

/// ///////////////////////////////////////////////////////////
// The following code describes that how to connect to      //
// ParsKit Web API web-methods and send/receive commands    //
/// ///////////////////////////////////////////////////////////

function addEvent (evnt, elem, func) {
  if (elem.addEventListener)
  // W3C DOM
  { elem.addEventListener(evnt, func, false) }
  else if (elem.attachEvent) {
    // IE DOM
    elem.attachEvent("on" + evnt, func)
  } else {
    // No much to do
    elem[evnt] = func
  }
}

// Returns the version of Internet Explorer or a -1 that indicates to use another browser.
function getInternetExplorerVersion () {
  var rv = -1 // Return value assumes failure

  if (navigator.appName == "Microsoft Internet Explorer") {
    var ua = navigator.userAgent
    var re = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})")
    if (re.exec(ua) != null) rv = parseFloat(RegExp.$1)
  }
  return rv
}

function createIframe (IeVersion, pk_webMethodName, ipJSON) {
  var compatibleUrl = null

  if (
    IeVersion == 7 ||
    IeVersion == 8 ||
    IeVersion == 9 ||
    IeVersion == 10 ||
    g_isIE11 ||
    g_isSafari ||
    g_isHttpsOriginHttpService
  ) {
    compatibleUrl = PK_ADDR + "PK_BrowserCompatible"
  } else {
    alert("Invalid version  : " + IeVersion)
    return null
  }

  var randomNumber = Math.floor(Math.random() * 1000 + 1)
  var iframe = document.createElement("iframe")

  iframe.style.display = "none"
  iframe.src = compatibleUrl
  iframe.id = "ssw_iframe_requester" + randomNumber

  id = iframe.id
  var onErrorFunction =
    "var onError= function()" +
    "{" +
    '	var idTemp = "' +
    id +
    '";' +
    '	var webMethodName = "' +
    pk_webMethodName +
    '";' +
    "	var iframeID = document.getElementById(idTemp);" +
    "	if(iframeID)" +
    "   {" +
    "		clearTimeout(g_connectTimeOut);" +
    '   	var retJSON = \'{"pk_opErrorCode": 3000, "pk_opErrorMessage": "There is a problem in communicating with the PK_Service"}\';' +
    '       eval(webMethodName+".callBack(retJSON)");' +
    "   }" +
    "   else" +
    "   	g_ServiceConnectionState = true;" +
    "}"
  eval(onErrorFunction)
  var onLoadFunction = function () {
    var code = ""
    code =
      iframe.id +
      '.postMessage(pk_webMethodName + "#@!" + ipJSON + "#@!" + ' +
      randomNumber +
      ',  "*")'
    eval(code)
    g_connectTimeOut = setTimeout(onError, g_timeout)
  }

  g_connectTimeOut = setTimeout(onError, g_timeout)
  if (IeVersion == 8 || IeVersion == 7) {
    iframe.attachEvent("onload", onLoadFunction)
  } else {
    iframe.onload = onLoadFunction
  }
  // if(document.body != null){ document.body.appendChild(iframe); }
  document.body.appendChild(iframe)

  return randomNumber
}

function registerEventListener (IeVersion, opCallback, randomNumber) {
  var callbackMethod =
    'var eventCallback = function(e) { var id = "' +
    randomNumber +
    "\";//alert(id + '\\n'+ e.data);\nvar inputID = e.data.split(\"#@!\")[1];if(id != inputID){return 0;	} var elem = document.getElementById('ssw_iframe_requester' + id);	if(elem)elem.parentElement.removeChild(elem);if(window.detachEvent)window.detachEvent('onmessage',  eventCallback);if(window.removeEventListener)window.removeEventListener('message' , eventCallback, false);clearTimeout(g_connectTimeOut);opCallback(e.data.split(\"#@!\")[0]);return 1;}"
  eval(callbackMethod)

  addEvent("message", window, eventCallback)
  // clearTimeout(g_connectTimeOut);
  return 1
}

// ---- Internal Functions ----
String.prototype.escapeSpecialChars = function () {
  return this.replace(/\n/g, "\\n")
    .replace(/\'/g, "\\'")
    .replace(/\&/g, "\\&")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t")
    .replace(/\f/g, "\\f")
}

function createXDRequest (url, handler) {
  if (window.XDomainRequest) {
    request = new XDomainRequest()
  } else {
    request = new XMLHttpRequest()
  }
  return request
}

function call_pk_compatible_method (
  IeVersion,
  pk_webMethodName,
  ipJSON,
  opCallback
) {
  var iframe = createIframe(IeVersion, pk_webMethodName, ipJSON)

  if (!registerEventListener(IeVersion, opCallback, iframe)) {
    clearTimeout(g_connectTimeOut)
    var retJSON =
      '{"pk_opErrorCode": 3005, "pk_opErrorMessage": "Registering event listener for web service callback has been failed."}'
    opCallback(retJSON)
    return false
  }

  return true
}

function reject () {
  var retJSON =
    '{"pk_opErrorCode": 3000, "pk_opErrorMessage": "There is a problem in communicating with the PK_Service"}'
  pk_webMethodName + ".callBack(retJSON)"()
  return false
}

var lock = false

function call_pk_general_method (pk_webMethodName, ipJSON, opCallback) {
  // if(!lock)
  // {
  // lock = true;
  return new Promise(function () {
    request = createXDRequest()
    request.onload = function () {
      if (request.readyState == 4) {
        if (request.status == 200) {
          var response = request.responseText
          request = null
          // lock = false;
          opCallback(response)
        } else {
          // lock = false;
          var retJSON =
            '{"pk_opErrorCode": 3002, "pk_opErrorMessage": "Invocation Error is Occurred"}'
          pk_webMethodName + ".callBack(retJSON)"()
          return false
        }
      }
      /* else
				{
					var retJSON = '{\"pk_opErrorCode\": 3004, \"pk_opErrorMessage\": \"pk_service is stop\"}';
					pk_webMethodName+".callBack(retJSON)"();
					return false;
				} */
    }
    const pk_webMethodURL = PK_ADDR + pk_webMethodName
    request.onerror = function () {
      // lock = false;
      var retJSON =
        '{"pk_opErrorCode": 3000, "pk_opErrorMessage": "There is a problem in communicating with the PK_Service"}'
      pk_webMethodName + ".callBack(retJSON)"()
      return false
    }
    request.open("POST", pk_webMethodURL, true)
    try {
      request.send(ipJSON)
    } catch (e) {
      // lock = false;
      var retJSON =
        '{"pk_opErrorCode": 3000, "pk_opErrorMessage": "There is a problem in communicating with the PK_Service"}'
      pk_webMethodName + ".callBack(retJSON)"()
      return false
    }
  })
  // }
}

function call_pk_method (pk_webMethodName, ipJSON, opCallback) {
  var IeVersion = getInternetExplorerVersion()

  if (
    IeVersion == 7 ||
    IeVersion == 8 ||
    IeVersion == 9 ||
    IeVersion == 10 ||
    g_isIE11 ||
    g_isSafari
  )
  { return call_pk_compatible_method(
    IeVersion,
    pk_webMethodName,
    ipJSON,
    opCallback
  ) }
  else {
    // var pos_http = -1;
    // pos_http = PK_ADDR.toLowerCase().indexOf("http");

    // var origon = location.origin;
    // var pos_origin_http = -1;
    // pos_origin_https = origon.toLowerCase().indexOf("https");

    // if(pos_http>=0 && pos_origin_https>=0) // use https service
    // {
    //	g_isHttpsOriginHttpService = true;
    //	return call_pk_compatible_method(g_isHttpsOriginHttpService, pk_webMethodName, ipJSON, opCallback);
    // }
    // else
    return call_pk_general_method(pk_webMethodName, ipJSON, opCallback)
  }
}

function resetTimeout () {
  g_timeout = DEFAULT_TIMEOUT
}

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj, fromIndex) {
    if (fromIndex == null) {
      fromIndex = 0
    } else if (fromIndex < 0) {
      fromIndex = Math.max(0, this.length + fromIndex)
    }
    for (var i = fromIndex, j = this.length; i < j; i++) {
      if (this[i] === obj) return i
    }
    return -1
  }
}
// --- End of Internal Functions ---

/// ///////////////////////////////////////////////////////////////
// Each of web method class is defined in the following code    //
/// ///////////////////////////////////////////////////////////////
//               ParsKit Web Method Classes                     //
/// ///////////////////////////////////////////////////////////////

// --- PK_ServiceConnection Class ---
const PK_ServiceConnection = new function () {
  // --- Define Public Output Variables ---
  this.pk_opErrorCode = -1
  this.pk_opErrorMessage = ""

  // --- Define Common Public Variables ---
  this.isCalled = false
  this.success = false
  this.rootMethod
  this.showErrorAlert = EM_DEFAULT_DISPLAY
  this.errMsgLanguage = EM_DEFAULT_LANGUAGE

  // --- Define Reset Method To Reset All Flags ---
  this.reset = function () {
    PK_ServiceConnection.isCalled = false
    PK_ServiceConnection.success = false
    PK_ServiceConnection.showErrorAlert = EM_DEFAULT_DISPLAY
    resetTimeout()

    return true
  }

  // --- Define Call Back Method For Getting Response ---
  this.callBack = function (opJSON) {
    var result = ""
    try {
      result = JSON.parse(opJSON)
    } catch (e) {
      PK_ServiceConnection.pk_opErrorCode = PK_JS_INVALID_OUTPUT_JS_STR
      PK_ServiceConnection.pk_opErrorMessage =
        "Operation has been failed in PK_ServiceConnection function due to::  " +
        "JSON format of the response is invalid." +
        " (" +
        PK_ServiceConnection.pk_opErrorCode +
        ")"
      PK_ServiceConnection.success = false

      if (PK_ServiceConnection.errMsgLanguage == "fa")
      { PK_ServiceConnection.pk_opErrorMessage =
          "عمليات به علت خطا متوقف شده است:: " +
          getFaEventLog(PK_JS_INVALID_OUTPUT_JS_STR) +
          " (" +
          PK_ServiceConnection.pk_opErrorCode +
          ")" }

      if (PK_ServiceConnection.showErrorAlert)
      { alert(PK_ServiceConnection.pk_opErrorMessage) }

      PK_ServiceConnection.rootMethod()
      return false
    }

    if (
      result.pk_opErrorCode == PK_JS_SERVICE_CONNECTION_PROBLEM &&
      PK_ADDR == PK_HTTP_ADDR
    ) {
      eval('PK_ServiceConnection.call("https")')
      return false
    }

    if (
      result.pk_opErrorCode == PK_JS_SERVICE_CONNECTION_PROBLEM &&
      PK_ADDR == PK_HTTPS_ADDR
    ) {
      PK_ServiceConnection.isCalled = true
      PK_ServiceConnection.success = false

      if (PK_ServiceConnection.errMsgLanguage == "fa")
      { PK_ServiceConnection.pk_opErrorMessage =
          "عمليات به علت خطا متوقف شده است:: " +
          result.pk_opErrorMessage +
          " (" +
          result.pk_opErrorCode +
          ")" }
      else
      { PK_ServiceConnection.pk_opErrorMessage =
          "Operation has been failed in PK_ServiceConnection function due to :: " +
          result.pk_opErrorMessage +
          " (" +
          result.pk_opErrorCode +
          ")" }

      if (PK_ServiceConnection.showErrorAlert)
      { alert(PK_ServiceConnection.pk_opErrorMessage) }

      PK_ServiceConnection.pk_opErrorCode = result.pk_opErrorCode
      PK_ServiceConnection.rootMethod()
      return false
    }

    if (
      g_ServiceConnectionState ||
      result.pk_opErrorMessage == "ParsKit Web API is running"
    ) {
      PK_ServiceConnection.isCalled = true
      PK_ServiceConnection.pk_opErrorCode = 0
      PK_ServiceConnection.pk_opErrorMessage = PK_ADDR

      PK_ServiceConnection.success = true
      PK_ServiceConnection.rootMethod()
      return true
    }

    if (result.pk_opErrorCode) {
      PK_ServiceConnection.isCalled = true
      PK_ServiceConnection.success = false

      if (PK_ServiceConnection.errMsgLanguage == "fa")
      { PK_ServiceConnection.pk_opErrorMessage =
          "عمليات به علت خطا متوقف شده است:: " +
          result.pk_opErrorMessage +
          " (" +
          result.pk_opErrorCode +
          ")" }
      else
      { PK_ServiceConnection.pk_opErrorMessage =
          "Operation has been failed in PK_ServiceConnection function due to :: " +
          result.pk_opErrorMessage +
          " (" +
          result.pk_opErrorCode +
          ")" }

      if (PK_ServiceConnection.showErrorAlert)
      { alert(PK_ServiceConnection.pk_opErrorMessage) }

      PK_ServiceConnection.pk_opErrorCode = result.pk_opErrorCode
      PK_ServiceConnection.rootMethod()
      return false
    }
  }

  this.call = function (srviceURL) {
    g_timeout = 5000

    // --- Set Service URI ---

    if (srviceURL == "http") PK_ADDR = PK_HTTP_ADDR
    else if (srviceURL == "https" || srviceURL == undefined)
    { PK_ADDR = PK_HTTPS_ADDR }
    else PK_ADDR = srviceURL

    // --- Call Web Method ---
    if (
      !call_pk_method("PK_ServiceConnection", "", PK_ServiceConnection.callBack)
    )
    { return false }

    return true
  }
}()

// ---- End of PK_ServiceConnection Class ----

// --- PK_SetCryptoki Class ---
const PK_SetCryptoki = new function () {
  // --- Define Public Input Variables ---
  this.pk_ipCryptokiType = 0
  this.pk_ipCryptoki = ""

  // --- Define Public Output Variables ---
  this.pk_opErrorCode = 0
  this.pk_opErrorMessage = ""

  // --- Define Common Public Variables ---
  this.isCalled = false
  this.success = false
  this.rootMethod
  this.showErrorAlert = EM_DEFAULT_DISPLAY
  this.errMsgLanguage = EM_DEFAULT_LANGUAGE

  // --- Define Reset Method To Reset All Flags ---
  this.reset = function () {
    PK_SetCryptoki.isCalled = false
    PK_SetCryptoki.success = false
    PK_SetCryptoki.showErrorAlert = EM_DEFAULT_DISPLAY
    resetTimeout()

    return true
  }

  // --- Define Call Back Method For Getting Response ---
  this.callBack = function (opJSON) {
    var result = ""
    PK_SetCryptoki.isCalled = true

    try {
      result = JSON.parse(opJSON)
    } catch (e) {
      PK_SetCryptoki.pk_opErrorCode = PK_JS_INVALID_OUTPUT_JS_STR
      PK_SetCryptoki.pk_opErrorMessage =
        "Operation has been failed in PK_SetCryptoki function due to::  " +
        "JSON format of the response is invalid." +
        " (" +
        PK_SetCryptoki.pk_opErrorCode +
        ")"
      PK_SetCryptoki.success = false

      if (PK_SetCryptoki.errMsgLanguage == "fa")
      { PK_SetCryptoki.pk_opErrorMessage =
          "عمليات به علت خطا در متد PK_SetCryptoki متوقف شده است:: " +
          getFaEventLog(PK_JS_INVALID_OUTPUT_JS_STR) +
          " (" +
          PK_SetCryptoki.pk_opErrorCode +
          ")" }

      if (PK_SetCryptoki.showErrorAlert)
      { alert(PK_SetCryptoki.pk_opErrorMessage) }

      PK_SetCryptoki.rootMethod()
      return false
    }

    PK_SetCryptoki.pk_opErrorCode = result.pk_opErrorCode
    PK_SetCryptoki.pk_opErrorMessage = result.pk_opErrorMessage

    if (result.pk_opErrorCode == 0) {
      PK_SetCryptoki.success = true
      PK_SetCryptoki.rootMethod()
      return true
    }

    PK_SetCryptoki.success = false

    if (PK_SetCryptoki.errMsgLanguage == "fa")
    { PK_SetCryptoki.pk_opErrorMessage =
        "عمليات به علت خطا در متد PK_SetCryptoki متوقف شده است:: " +
        getFaEventLog(result.pk_opErrorCode) +
        " (" +
        result.pk_opErrorCode +
        ")" }
    else
    { PK_SetCryptoki.pk_opErrorMessage =
        "Operation has been failed in PK_SetCryptoki function due to:: " +
        result.pk_opErrorMessage +
        " (" +
        result.pk_opErrorCode +
        ")" }

    if (PK_SetCryptoki.showErrorAlert) alert(PK_SetCryptoki.pk_opErrorMessage)

    PK_SetCryptoki.rootMethod()
    return false
  }

  // --- Define Call Method To Invocate The Web Method ---
  this.call = function () {
    var ipJSON = ""

    // --- Set Input JSON String ---
    ipJSON = '{ "pk_ipCryptokiType": 0, "pk_ipCryptoki": ""}'
    var ipJSON_tmp = JSON.parse(ipJSON)

    ipJSON_tmp.pk_ipCryptokiType = PK_SetCryptoki.pk_ipCryptokiType
    ipJSON_tmp.pk_ipCryptoki = PK_SetCryptoki.pk_ipCryptoki

    ipJSON = JSON.stringify(ipJSON_tmp)
    ipJSON = ipJSON.escapeSpecialChars()

    // --- Cryptoki Loading Operation ---
    if (!call_pk_method("PK_SetCryptoki", ipJSON, PK_SetCryptoki.callBack))
    { return false }

    return true
  }
}()

// ---- End of PK_SetCryptoki Class ----

// --- PK_InitializeToken Class ---
const PK_InitializeToken = new function () {
  // --- Define Public Input Variables ---
  this.pk_ipSlotId = 0
  this.pk_ipLabel = ""
  this.pk_ipSOPIN = ""

  // --- Define Public Output Variables ---
  this.pk_opErrorCode = 0
  this.pk_opErrorMessage = ""

  // --- Define Common Public Variables ---
  // --- They are common in all Class ---
  this.isCalled = false
  this.success = false
  this.rootMethod
  this.showErrorAlert = EM_DEFAULT_DISPLAY
  this.errMsgLanguage = EM_DEFAULT_LANGUAGE

  // --- Define Reset Method To Reset All Flags ---
  this.reset = function () {
    PK_InitializeToken.isCalled = false
    PK_InitializeToken.success = false
    PK_InitializeToken.showErrorAlert = EM_DEFAULT_DISPLAY
    resetTimeout()

    return true
  }

  // --- Define Call Back Method For Getting Response ---
  this.callBack = function (opJSON) {
    var result = ""

    PK_InitializeToken.isCalled = true

    try {
      result = JSON.parse(opJSON)
    } catch (e) {
      PK_InitializeToken.pk_opErrorCode = PK_JS_INVALID_OUTPUT_JS_STR
      PK_InitializeToken.pk_opErrorMessage =
        "Operation has been failed in PK_InitializeToken function due to::  " +
        "JSON format of the response is invalid." +
        " (" +
        PK_InitializeToken.pk_opErrorCode +
        ")"
      PK_InitializeToken.success = false

      if (PK_InitializeToken.errMsgLanguage == "fa")
      { PK_InitializeToken.pk_opErrorMessage =
          "عمليات به علت خطا در متد PK_InitializeToken متوقف شده است:: " +
          getFaEventLog(PK_JS_INVALID_OUTPUT_JS_STR) +
          " (" +
          PK_InitializeToken.pk_opErrorCode +
          ")" }

      if (PK_InitializeToken.showErrorAlert)
      { alert(PK_InitializeToken.pk_opErrorMessage) }

      PK_InitializeToken.rootMethod()
      return false
    }

    PK_InitializeToken.pk_opErrorCode = result.pk_opErrorCode
    PK_InitializeToken.pk_opErrorMessage = result.pk_opErrorMessage

    if (result.pk_opErrorCode == 0) {
      PK_InitializeToken.success = true
      PK_InitializeToken.rootMethod()
      return true
    }

    PK_InitializeToken.success = false

    if (PK_InitializeToken.errMsgLanguage == "fa")
    { PK_InitializeToken.pk_opErrorMessage =
        "عمليات به علت خطا در متد PK_InitializeToken متوقف شده است:: " +
        getFaEventLog(result.pk_opErrorCode) +
        " (" +
        result.pk_opErrorCode +
        ")" }
    else
    { PK_InitializeToken.pk_opErrorMessage =
        "Operation has been failed in PK_InitializeToken function due to:: " +
        result.pk_opErrorMessage +
        " (" +
        result.pk_opErrorCode +
        ")" }

    if (PK_InitializeToken.showErrorAlert)
    { alert(PK_InitializeToken.pk_opErrorMessage) }

    PK_InitializeToken.rootMethod()
    return false
  }

  // --- Define Call Method To Invocate The Web Method ---
  this.call = function () {
    var ipJSON = ""

    // --- Set Input JSON String ---
    ipJSON = '{ "pk_ipSlotId": "", "pk_ipLabel": "", "pk_ipSOPIN": ""}'
    var ipJSON_tmp = JSON.parse(ipJSON)

    ipJSON_tmp.pk_ipSlotId = PK_InitializeToken.pk_ipSlotId
    ipJSON_tmp.pk_ipLabel = PK_InitializeToken.pk_ipLabel
    ipJSON_tmp.pk_ipSOPIN = PK_InitializeToken.pk_ipSOPIN

    ipJSON = JSON.stringify(ipJSON_tmp)

    // --- Call Web Method ---
    if (
      !call_pk_method("PK_InitializeToken", ipJSON, PK_InitializeToken.callBack)
    )
    { return false }

    return true
  }
}()

// ---- End of PK_InitializeToken Class ----

// --- PK_Login Class ---
const PK_Login = new function () {
  // --- Define Public Input Variables ---
  this.pk_ipLoginType = 0
  this.pk_ipUserType = 1
  this.pk_ipSlotId = 0
  this.pk_ipPincode = ""

  // --- Define Public Output Variables ---
  this.pk_opErrorCode = 0
  this.pk_opErrorMessage = ""

  // --- Define Common Public Variables ---
  // --- They are common in all Class ---
  this.isCalled = false
  this.success = false
  this.rootMethod
  this.showErrorAlert = EM_DEFAULT_DISPLAY
  this.errMsgLanguage = EM_DEFAULT_LANGUAGE

  // --- Define Reset Method To Reset All Flags ---
  this.reset = function () {
    PK_Login.isCalled = false
    PK_Login.success = false
    PK_Login.showErrorAlert = EM_DEFAULT_DISPLAY
    resetTimeout()

    return true
  }

  // --- Define Call Back Method For Getting Response ---
  this.callBack = function (opJSON) {
    var result = ""
    PK_Login.isCalled = true

    try {
      result = JSON.parse(opJSON)
    } catch (e) {
      PK_Login.pk_opErrorCode = PK_JS_INVALID_OUTPUT_JS_STR
      PK_Login.pk_opErrorMessage =
        "Operation has been failed in PK_Login function due to::  " +
        "JSON format of the response is invalid." +
        " (" +
        PK_Login.pk_opErrorCode +
        ")"
      PK_Login.success = false

      if (PK_Login.errMsgLanguage == "fa")
      { PK_Login.pk_opErrorMessage =
          "عمليات به علت خطا در متد PK_Login متوقف شده است:: " +
          getFaEventLog(PK_JS_INVALID_OUTPUT_JS_STR) +
          " (" +
          PK_Login.pk_opErrorCode +
          ")" }

      if (PK_Login.showErrorAlert) alert(PK_Login.pk_opErrorMessage)

      PK_Login.rootMethod()
      return false
    }

    PK_Login.pk_opErrorCode = result.pk_opErrorCode
    PK_Login.pk_opErrorMessage = result.pk_opErrorMessage

    if (result.pk_opErrorCode == 0) {
      PK_Login.success = true
      PK_Login.rootMethod()
      return true
    }

    PK_Login.success = false

    if (PK_Login.errMsgLanguage == "fa")
    { PK_Login.pk_opErrorMessage =
        "عمليات به علت خطا در متد PK_Login متوقف شده است:: " +
        getFaEventLog(result.pk_opErrorCode) +
        " (" +
        result.pk_opErrorCode +
        ")" }
    else
    { PK_Login.pk_opErrorMessage =
        "Operation has been failed in PK_Login function due to:: " +
        result.pk_opErrorMessage +
        " (" +
        result.pk_opErrorCode +
        ")" }

    if (PK_Login.showErrorAlert) alert(PK_Login.pk_opErrorMessage)

    PK_Login.rootMethod()
    return false
  }

  // --- Define Call Method To Invocate The Web Method ---
  this.call = function () {
    var ipJSON = ""

    // --- Set Input JSON String ---
    ipJSON =
      '{ "pk_ipLoginType": 0, "pk_ipUserType": 1, "pk_ipSlotId": 0, "pk_ipPincode": ""}'
    var ipJSON_tmp = JSON.parse(ipJSON)

    ipJSON_tmp.pk_ipLoginType = PK_Login.pk_ipLoginType
    ipJSON_tmp.pk_ipUserType = PK_Login.pk_ipUserType
    ipJSON_tmp.pk_ipSlotId = PK_Login.pk_ipSlotId
    ipJSON_tmp.pk_ipPincode = PK_Login.pk_ipPincode

    ipJSON = JSON.stringify(ipJSON_tmp)
    ipJSON = ipJSON.escapeSpecialChars()

    // --- Call Web Method ---
    if (!call_pk_method("PK_Login", ipJSON, PK_Login.callBack)) return false

    return true
  }
}()

// ---- End of PK_Login Class ----

// --- PK_Logout Class ---
const PK_Logout = new function () {
  // --- Define Public Input Variables ---
  this.pk_ipSlotId = 0

  // --- Define Public Output Variables ---
  this.pk_opErrorCode = 0
  this.pk_opErrorMessage = ""

  // --- Define Common Public Variables ---
  // --- They are common in all Class ---
  this.isCalled = false
  this.success = false
  this.rootMethod
  this.showErrorAlert = EM_DEFAULT_DISPLAY
  this.errMsgLanguage = EM_DEFAULT_LANGUAGE

  // --- Define Reset Method To Reset All Flags ---
  this.reset = function () {
    PK_Logout.isCalled = false
    PK_Logout.success = false
    PK_Logout.showErrorAlert = EM_DEFAULT_DISPLAY
    resetTimeout()

    return true
  }

  // --- Define Call Back Method For Getting Response ---
  this.callBack = function (opJSON) {
    var result = ""
    PK_Logout.isCalled = true

    try {
      result = JSON.parse(opJSON)
    } catch (e) {
      PK_Logout.pk_opErrorCode = PK_JS_INVALID_OUTPUT_JS_STR
      PK_Logout.pk_opErrorMessage =
        "Operation has been failed in PK_Logout function due to::  " +
        "JSON format of the response is invalid." +
        " (" +
        PK_Logout.pk_opErrorCode +
        ")"
      PK_Logout.success = false

      if (PK_Logout.errMsgLanguage == "fa")
      { PK_Logout.pk_opErrorMessage =
          "عمليات به علت خطا در متد PK_Logout متوقف شده است:: " +
          getFaEventLog(PK_JS_INVALID_OUTPUT_JS_STR) +
          " (" +
          PK_Logout.pk_opErrorCode +
          ")" }

      if (PK_Logout.showErrorAlert) alert(PK_Logout.pk_opErrorMessage)

      PK_Logout.rootMethod()
      return false
    }

    PK_Logout.pk_opErrorCode = result.pk_opErrorCode
    PK_Logout.pk_opErrorMessage = result.pk_opErrorMessage

    if (result.pk_opErrorCode == 0) {
      PK_Logout.success = true
      PK_Logout.rootMethod()
      return true
    }

    PK_Logout.success = false

    if (PK_Logout.errMsgLanguage == "fa")
    { PK_Logout.pk_opErrorMessage =
        "عمليات به علت خطا در متد PK_Logout متوقف شده است:: " +
        getFaEventLog(result.pk_opErrorCode) +
        " (" +
        result.pk_opErrorCode +
        ")" }
    else
    { PK_Logout.pk_opErrorMessage =
        "Operation has been failed in PK_Logout function due to:: " +
        result.pk_opErrorMessage +
        " (" +
        result.pk_opErrorCode +
        ")" }

    if (PK_Logout.showErrorAlert) alert(PK_Logout.pk_opErrorMessage)

    PK_Logout.rootMethod()
    return false
  }

  // --- Define Call Method To Invocate The Web Method ---
  this.call = function () {
    var ipJSON = ""

    // --- Set Input JSON String ---
    ipJSON = '{ "pk_ipSlotId": 0 }'
    var ipJSON_tmp = JSON.parse(ipJSON)

    ipJSON_tmp.pk_ipSlotId = PK_Logout.pk_ipSlotId
    ipJSON = JSON.stringify(ipJSON_tmp)

    // --- Call Web Method ---
    if (!call_pk_method("PK_Logout", ipJSON, PK_Logout.callBack)) return false

    return true
  }
}()
// ---- End of PK_Logout Class ----

// --- PK_CheckToken Class ---
const PK_CheckToken = new function () {
  // --- Define Public Input Variables ---
  this.pk_ipSlotId = 0

  // --- Define Public Output Variables ---
  this.pk_opPresent = ""
  this.pk_opErrorCode = 0
  this.pk_opErrorMessage = ""

  // --- Define Common Public Variables ---
  // --- They are common in all Class ---
  this.isCalled = false
  this.success = false
  this.rootMethod
  this.showErrorAlert = EM_DEFAULT_DISPLAY
  this.errMsgLanguage = EM_DEFAULT_LANGUAGE

  // --- Define Reset Method To Reset All Flags ---
  this.reset = function () {
    PK_CheckToken.isCalled = false
    PK_CheckToken.success = false
    PK_CheckToken.showErrorAlert = EM_DEFAULT_DISPLAY
    resetTimeout()

    return true
  }

  // --- Define Call Back Method For Getting Response ---
  this.callBack = function (opJSON) {
    var result = ""
    PK_CheckToken.isCalled = true

    try {
      result = JSON.parse(opJSON)
    } catch (e) {
      PK_CheckToken.pk_opErrorCode = PK_JS_INVALID_OUTPUT_JS_STR
      PK_CheckToken.pk_opErrorMessage =
        "Operation has been failed in PK_CheckToken function due to::  " +
        "JSON format of the response is invalid." +
        " (" +
        PK_CheckToken.pk_opErrorCode +
        ")"
      PK_CheckToken.success = false

      if (PK_CheckToken.errMsgLanguage == "fa")
      { PK_CheckToken.pk_opErrorMessage =
          "عمليات به علت خطا در متد PK_CheckToken متوقف شده است:: " +
          getFaEventLog(PK_JS_INVALID_OUTPUT_JS_STR) +
          " (" +
          PK_CheckToken.pk_opErrorCode +
          ")" }

      if (PK_CheckToken.showErrorAlert) alert(PK_CheckToken.pk_opErrorMessage)

      PK_CheckToken.rootMethod()
      return false
    }

    PK_CheckToken.pk_opPresent = result.pk_opPresent
    PK_CheckToken.pk_opErrorCode = result.pk_opErrorCode
    PK_CheckToken.pk_opErrorMessage = result.pk_opErrorMessage

    if (result.pk_opErrorCode == 0) {
      PK_CheckToken.success = true
      PK_CheckToken.rootMethod()
      return true
    }

    PK_CheckToken.success = false

    if (PK_CheckToken.errMsgLanguage == "fa")
    { PK_CheckToken.pk_opErrorMessage =
        "عمليات به علت خطا در متد PK_CheckToken متوقف شده است:: " +
        getFaEventLog(result.pk_opErrorCode) +
        " (" +
        result.pk_opErrorCode +
        ")" }
    else
    { PK_CheckToken.pk_opErrorMessage =
        "Operation has been failed in PK_CheckToken function due to:: " +
        result.pk_opErrorMessage +
        " (" +
        result.pk_opErrorCode +
        ")" }

    if (PK_CheckToken.showErrorAlert) alert(PK_CheckToken.pk_opErrorMessage)

    PK_CheckToken.rootMethod()
    return false
  }

  // --- Define Call Method To Invocate The Web Method ---
  this.call = function () {
    var ipJSON = ""

    // --- Set Input JSON String ---
    ipJSON = '{ "pk_ipSlotId": 0 }'
    var ipJSON_tmp = JSON.parse(ipJSON)

    ipJSON_tmp.pk_ipSlotId = PK_CheckToken.pk_ipSlotId
    ipJSON = JSON.stringify(ipJSON_tmp)

    // --- Call Web Method ---
    if (!call_pk_method("PK_CheckToken", ipJSON, PK_CheckToken.callBack))
    { return false }

    return true
  }
}()

// ---- End of PK_CheckToken Class ----

// --- PK_GetSlotCount Class ---
const PK_GetSlotCount = new function () {
  // --- Define Public Output Variables ---
  this.pk_opSlotCount = 0
  this.pk_opErrorCode = 0
  this.pk_opErrorMessage = ""

  // --- Define Common Public Variables ---
  // --- They are common in all Class ---
  this.isCalled = false
  this.success = false
  this.rootMethod
  this.showErrorAlert = EM_DEFAULT_DISPLAY
  this.errMsgLanguage = EM_DEFAULT_LANGUAGE

  // --- Define Reset Method To Reset All Flags ---
  this.reset = function () {
    PK_GetSlotCount.isCalled = false
    PK_GetSlotCount.success = false
    PK_GetSlotCount.showErrorAlert = EM_DEFAULT_DISPLAY
    resetTimeout()

    return true
  }

  // --- Define Call Back Method For Getting Response ---
  this.callBack = function (opJSON) {
    var result = ""
    PK_GetSlotCount.isCalled = true

    try {
      result = JSON.parse(opJSON)
    } catch (e) {
      PK_GetSlotCount.pk_opErrorCode = PK_JS_INVALID_OUTPUT_JS_STR
      PK_GetSlotCount.pk_opErrorMessage =
        "Operation has been failed in PK_GetSlotCount function due to::  " +
        "JSON format of the response is invalid." +
        " (" +
        PK_GetSlotCount.pk_opErrorCode +
        ")"
      PK_GetSlotCount.success = false

      if (PK_GetSlotCount.errMsgLanguage == "fa")
      { PK_GetSlotCount.pk_opErrorMessage =
          "عمليات به علت خطا در متد PK_GetSlotCount متوقف شده است:: " +
          getFaEventLog(PK_JS_INVALID_OUTPUT_JS_STR) +
          " (" +
          PK_GetSlotCount.pk_opErrorCode +
          ")" }

      if (PK_GetSlotCount.showErrorAlert)
      { alert(PK_GetSlotCount.pk_opErrorMessage) }

      PK_GetSlotCount.rootMethod()
      return false
    }

    PK_GetSlotCount.pk_opSlotCount = result.pk_opSlotCount
    PK_GetSlotCount.pk_opErrorCode = result.pk_opErrorCode
    PK_GetSlotCount.pk_opErrorMessage = result.pk_opErrorMessage

    if (result.pk_opErrorCode == 0) {
      PK_GetSlotCount.success = true
      PK_GetSlotCount.rootMethod()
      return true
    }

    PK_GetSlotCount.success = false

    if (PK_GetSlotCount.errMsgLanguage == "fa")
    { PK_GetSlotCount.pk_opErrorMessage =
        "عمليات به علت خطا در متد PK_GetSlotCount متوقف شده است:: " +
        getFaEventLog(result.pk_opErrorCode) +
        " (" +
        result.pk_opErrorCode +
        ")" }
    else
    { PK_GetSlotCount.pk_opErrorMessage =
        "Operation has been failed in PK_GetSlotCount function due to:: " +
        result.pk_opErrorMessage +
        " (" +
        result.pk_opErrorCode +
        ")" }

    if (PK_GetSlotCount.showErrorAlert)
    { alert(PK_GetSlotCount.pk_opErrorMessage) }

    PK_GetSlotCount.rootMethod()
    return false
  }

  // --- Define Call Method To Invocate The Web Method ---
  this.call = function () {
    var ipJSON = ""

    // --- Call Web Method ---
    if (!call_pk_method("PK_GetSlotCount", ipJSON, PK_GetSlotCount.callBack))
    { return false }

    return true
  }
}()

// ---- End of PK_GetSlotCount Class ----

// --- PK_GetSlotInfo Class ---
const PK_GetSlotInfo = new function () {
  // --- Define Public Input Variables ---
  this.pk_ipSlotId = 0

  // --- Define Public Output Variables ---
  this.pk_opLabel = ""
  this.pk_opManufacturerID = ""
  this.pk_opModel = ""
  this.pk_opSerialNumber = ""
  this.pk_opErrorCode = 0

  // --- Define Common Public Variables ---
  // --- They are common in all Class ---
  this.isCalled = false
  this.success = false
  this.rootMethod
  this.showErrorAlert = EM_DEFAULT_DISPLAY
  this.errMsgLanguage = EM_DEFAULT_LANGUAGE

  // --- Define Reset Method To Reset All Flags ---
  this.reset = function () {
    PK_GetSlotInfo.isCalled = false
    PK_GetSlotInfo.success = false
    PK_GetSlotInfo.showErrorAlert = EM_DEFAULT_DISPLAY
    resetTimeout()

    return true
  }

  // --- Define Call Back Method For Getting Response ---
  this.callBack = function (opJSON) {
    var result = ""
    PK_GetSlotInfo.isCalled = true

    try {
      result = JSON.parse(opJSON)
    } catch (e) {
      PK_GetSlotInfo.pk_opErrorCode = PK_JS_INVALID_OUTPUT_JS_STR
      PK_GetSlotInfo.pk_opErrorMessage =
        "Operation has been failed in PK_GetSlotInfo function due to::  " +
        "JSON format of the response is invalid." +
        " (" +
        PK_GetSlotInfo.pk_opErrorCode +
        ")"
      PK_GetSlotInfo.success = false

      if (PK_GetSlotInfo.errMsgLanguage == "fa")
      { PK_GetSlotInfo.pk_opErrorMessage =
          "عمليات به علت خطا در متد PK_GetSlotInfo متوقف شده است:: " +
          getFaEventLog(PK_JS_INVALID_OUTPUT_JS_STR) +
          " (" +
          PK_GetSlotInfo.pk_opErrorCode +
          ")" }

      if (PK_GetSlotInfo.showErrorAlert)
      { alert(PK_GetSlotInfo.pk_opErrorMessage) }

      PK_GetSlotInfo.rootMethod()
      return false
    }

    PK_GetSlotInfo.pk_opLabel = result.pk_opLabel
    PK_GetSlotInfo.pk_opManufacturerID = result.pk_opManufacturerID
    PK_GetSlotInfo.pk_opModel = result.pk_opModel
    PK_GetSlotInfo.pk_opSerialNumber = result.pk_opSerialNumber
    PK_GetSlotInfo.pk_opErrorCode = result.pk_opErrorCode
    PK_GetSlotInfo.pk_opErrorMessage = result.pk_opErrorMessage

    if (result.pk_opErrorCode == 0) {
      PK_GetSlotInfo.success = true
      PK_GetSlotInfo.rootMethod()
      return true
    }

    PK_GetSlotInfo.success = false

    if (PK_GetSlotInfo.errMsgLanguage == "fa")
    { PK_GetSlotInfo.pk_opErrorMessage =
        "عمليات به علت خطا در متد PK_GetSlotInfo متوقف شده است:: " +
        getFaEventLog(result.pk_opErrorCode) +
        " (" +
        result.pk_opErrorCode +
        ")" }
    else
    { PK_GetSlotInfo.pk_opErrorMessage =
        "Operation has been failed in PK_GetSlotInfo function due to:: " +
        result.pk_opErrorMessage +
        " (" +
        result.pk_opErrorCode +
        ")" }

    if (PK_GetSlotInfo.showErrorAlert) alert(PK_GetSlotInfo.pk_opErrorMessage)

    PK_GetSlotInfo.rootMethod()
    return false
  }

  // --- Define Call Method To Invocate The Web Method ---
  this.call = function () {
    var ipJSON = ""

    // --- Set Input JSON String ---
    ipJSON = '{ "pk_ipSlotId": 0 }'
    var ipJSON_tmp = JSON.parse(ipJSON)

    ipJSON_tmp.pk_ipSlotId = PK_GetSlotInfo.pk_ipSlotId
    ipJSON = JSON.stringify(ipJSON_tmp)

    // --- Call Web Method ---
    if (!call_pk_method("PK_GetSlotInfo", ipJSON, PK_GetSlotInfo.callBack))
    { return false }

    return true
  }
}()

// ---- End of PK_GetSlotInfo Class ----

// --- PK_GetCerts Class ---
const PK_GetCerts = new function () {
  // --- Define Public Input Variables ---
  this.pk_ipSlotId = 0

  // --- Define Public Output Variables ---
  this.pk_opCerts = ""
  this.pk_opKeyIDs = ""
  this.pk_opSubjects = ""
  this.pk_opPublicKeys = ""
  this.pk_opErrorCode = 0
  this.pk_opErrorMessage = ""

  // --- Define Common Public Variables ---
  this.isCalled = false
  this.success = false
  this.rootMethod
  this.showErrorAlert = EM_DEFAULT_DISPLAY
  this.errMsgLanguage = EM_DEFAULT_LANGUAGE

  // --- Define Reset Method To Reset All Flags ---
  this.reset = function () {
    PK_GetCerts.isCalled = false
    PK_GetCerts.success = false
    PK_GetCerts.showErrorAlert = EM_DEFAULT_DISPLAY
    resetTimeout()

    return true
  }

  // --- Define Call Back Method For Getting Response ---
  this.callBack = function (opJSON) {
    var result = ""
    PK_GetCerts.isCalled = true

    var retJSON = opJSON.escapeSpecialChars()

    try {
      result = eval("(" + retJSON + ")")
    } catch (e) {
      PK_GetCerts.pk_opErrorCode = PK_JS_INVALID_OUTPUT_JS_STR
      PK_GetCerts.pk_opErrorMessage =
        "Operation has been failed in PK_GetCerts function due to::  " +
        "JSON format of the response is invalid." +
        " (" +
        PK_GetCerts.pk_opErrorCode +
        ")"
      PK_GetCerts.success = false

      if (PK_GetCerts.errMsgLanguage == "fa")
      { PK_GetCerts.pk_opErrorMessage =
          "عمليات به علت خطا در متد PK_GetCerts متوقف شده است:: " +
          getFaEventLog(PK_JS_INVALID_OUTPUT_JS_STR) +
          " (" +
          PK_GetCerts.pk_opErrorCode +
          ")" }

      if (PK_GetCerts.showErrorAlert) alert(PK_GetCerts.pk_opErrorMessage)

      PK_GetCerts.rootMethod()
      return false
    }

    PK_GetCerts.pk_opCerts = result.pk_opCerts
    PK_GetCerts.pk_opKeyIDs = result.pk_opKeyIDs
    PK_GetCerts.pk_opSubjects = result.pk_opSubjects
    PK_GetCerts.pk_opPublicKeys = result.pk_opPublicKeys
    PK_GetCerts.pk_opErrorCode = result.pk_opErrorCode
    PK_GetCerts.pk_opErrorMessage = result.pk_opErrorMessage

    if (result.pk_opErrorCode == 0) {
      PK_GetCerts.success = true
      PK_GetCerts.rootMethod()
      return true
    }

    PK_GetCerts.success = false

    if (PK_GetCerts.errMsgLanguage == "fa")
    { PK_GetCerts.pk_opErrorMessage =
        "عمليات به علت خطا در متد PK_GetCerts متوقف شده است:: " +
        getFaEventLog(result.pk_opErrorCode) +
        " (" +
        result.pk_opErrorCode +
        ")" }
    else
    { PK_GetCerts.pk_opErrorMessage =
        "Operation has been failed in PK_GetCerts function due to:: " +
        result.pk_opErrorMessage +
        " (" +
        result.pk_opErrorCode +
        ")" }

    if (PK_GetCerts.showErrorAlert) alert(PK_GetCerts.pk_opErrorMessage)

    PK_GetCerts.rootMethod()
    return false
  }

  // --- Define Call Method To Invocate The Web Method ---
  this.call = function () {
    var ipJSON = ""

    // --- Set Input JSON String ---
    ipJSON = '{ "pk_ipSlotId": 0 }'
    var ipJSON_tmp = JSON.parse(ipJSON)

    ipJSON_tmp.pk_ipSlotId = PK_GetCerts.pk_ipSlotId
    ipJSON = JSON.stringify(ipJSON_tmp)

    // --- Call Web Method ---
    if (!call_pk_method("PK_GetCerts", ipJSON, PK_GetCerts.callBack))
    { return false }

    return true
  }
}()

// ---- End of PK_GetCerts Class --

// --- PK_GetCertById Class ---
const PK_GetCertById = new function () {
  // --- Define Public Input Variables ---
  this.pk_ipPubKey = ""

  // --- Define Public Output Variables ---
  this.pk_opCertificate = ""
  this.pk_opErrorCode = 0
  this.pk_opErrorMessage = ""

  // --- Define Common Public Variables ---
  this.isCalled = false
  this.success = false
  this.rootMethod
  this.showErrorAlert = EM_DEFAULT_DISPLAY
  this.errMsgLanguage = EM_DEFAULT_LANGUAGE

  // --- Define Reset Method To Reset All Flags ---
  this.reset = function () {
    PK_GetCertById.isCalled = false
    PK_GetCertById.success = false
    PK_GetCertById.showErrorAlert = EM_DEFAULT_DISPLAY
    resetTimeout()

    return true
  }

  // --- Define Call Back Method For Getting Response ---
  this.callBack = function (opJSON) {
    var result = ""
    PK_GetCertById.isCalled = true

    // result = JSON.parse(opJSON);
    try {
      result = eval("(" + opJSON + ")")
    } catch (e) {
      PK_GetCertById.pk_opErrorCode = PK_JS_INVALID_OUTPUT_JS_STR
      PK_GetCertById.pk_opErrorMessage =
        "Operation has been failed in PK_GetCertById function due to::  " +
        "JSON format of the response is invalid." +
        " (" +
        PK_GetCertById.pk_opErrorCode +
        ")"
      PK_GetCertById.success = false

      if (PK_GetCertById.errMsgLanguage == "fa")
      { PK_GetCertById.pk_opErrorMessage =
          "عمليات به علت خطا در متد PK_GetCertById متوقف شده است:: " +
          getFaEventLog(PK_JS_INVALID_OUTPUT_JS_STR) +
          " (" +
          PK_GetCertById.pk_opErrorCode +
          ")" }

      if (PK_GetCertById.showErrorAlert)
      { alert(PK_GetCertById.pk_opErrorMessage) }

      PK_GetCertById.rootMethod()
      return false
    }

    PK_GetCertById.pk_opCertificate = result.pk_opCertificate
    PK_GetCertById.pk_opErrorCode = result.pk_opErrorCode
    PK_GetCertById.pk_opErrorMessage = result.pk_opErrorMessage

    if (result.pk_opErrorCode == 0) {
      PK_GetCertById.success = true
      PK_GetCertById.rootMethod()
      return true
    }

    PK_GetCertById.success = false

    if (PK_GetCertById.errMsgLanguage == "fa")
    { PK_GetCertById.pk_opErrorMessage =
        "عمليات به علت خطا در متد PK_GetCertById متوقف شده است:: " +
        getFaEventLog(result.pk_opErrorCode) +
        " (" +
        result.pk_opErrorCode +
        ")" }
    else
    { PK_GetCertById.pk_opErrorMessage =
        "Operation has been failed in PK_GetCertById function due to:: " +
        result.pk_opErrorMessage +
        " (" +
        result.pk_opErrorCode +
        ")" }

    if (PK_GetCertById.showErrorAlert) alert(PK_GetCertById.pk_opErrorMessage)

    PK_GetCertById.rootMethod()
    return false
  }

  // --- Define Call Method To Invocate The Web Method ---
  this.call = function () {
    var ipJSON = ""

    // --- Set Input JSON String ---
    ipJSON = '{ "pk_ipPubKey": "" }'
    var ipJSON_tmp = JSON.parse(ipJSON)

    ipJSON_tmp.pk_ipPubKey = PK_GetCertById.pk_ipPubKey
    ipJSON = JSON.stringify(ipJSON_tmp)

    // --- Call Web Method ---
    if (!call_pk_method("PK_GetCertById", ipJSON, PK_GetCertById.callBack))
    { return false }

    return true
  }
}()

// ---- End of PK_GetCertById Class ----

// --- PK_CheckCertUsage Class ---
const PK_CheckCertUsage = new function () {
  // --- Define Public Input Variables ---
  this.pk_ipCertificate = ""
  this.pk_ipUsage = ""

  // --- Define Public Output Variables ---
  this.pk_opErrorCode = 0
  this.pk_opErrorMessage = ""

  // --- Define Common Public Variables ---
  this.isCalled = false
  this.success = false
  this.rootMethod
  this.showErrorAlert = EM_DEFAULT_DISPLAY
  this.errMsgLanguage = EM_DEFAULT_LANGUAGE

  // --- Define Reset Method To Reset All Flags ---
  this.reset = function () {
    PK_CheckCertUsage.isCalled = false
    PK_CheckCertUsage.success = false
    PK_CheckCertUsage.showErrorAlert = EM_DEFAULT_DISPLAY
    resetTimeout()

    return true
  }

  // --- Define Call Back Method For Getting Response ---
  this.callBack = function (opJSON) {
    var result = ""
    PK_CheckCertUsage.isCalled = true

    try {
      result = JSON.parse(opJSON)
    } catch (e) {
      PK_CheckCertUsage.pk_opErrorCode = PK_JS_INVALID_OUTPUT_JS_STR
      PK_CheckCertUsage.pk_opErrorMessage =
        "Operation has been failed in PK_CheckCertUsage function due to::  " +
        "JSON format of the response is invalid." +
        " (" +
        PK_CheckCertUsage.pk_opErrorCode +
        ")"
      PK_CheckCertUsage.success = false

      if (PK_CheckCertUsage.errMsgLanguage == "fa")
      { PK_CheckCertUsage.pk_opErrorMessage =
          "عمليات به علت خطا در متد PK_CheckCertUsage متوقف شده است:: " +
          getFaEventLog(PK_JS_INVALID_OUTPUT_JS_STR) +
          " (" +
          PK_CheckCertUsage.pk_opErrorCode +
          ")" }

      if (PK_CheckCertUsage.showErrorAlert)
      { alert(PK_CheckCertUsage.pk_opErrorMessage) }

      PK_CheckCertUsage.rootMethod()
      return false
    }

    PK_CheckCertUsage.pk_opErrorCode = result.pk_opErrorCode
    PK_CheckCertUsage.pk_opErrorMessage = result.pk_opErrorMessage

    if (result.pk_opErrorCode == 0) {
      PK_CheckCertUsage.success = true
      PK_CheckCertUsage.rootMethod()
      return true
    }

    PK_CheckCertUsage.success = false

    if (PK_CheckCertUsage.errMsgLanguage == "fa")
    { PK_CheckCertUsage.pk_opErrorMessage =
        "عمليات به علت خطا در متد PK_CheckCertUsage متوقف شده است:: " +
        getFaEventLog(result.pk_opErrorCode) +
        " (" +
        result.pk_opErrorCode +
        ")" }
    else
    { PK_CheckCertUsage.pk_opErrorMessage =
        "Operation has been failed in PK_CheckCertUsage function due to:: " +
        result.pk_opErrorMessage +
        " (" +
        result.pk_opErrorCode +
        ")" }

    if (PK_CheckCertUsage.showErrorAlert)
    { alert(PK_CheckCertUsage.pk_opErrorMessage) }

    PK_CheckCertUsage.rootMethod()
    return false
  }

  // --- Define Call Method To Invocate The Web Method ---
  this.call = function () {
    var ipJSON = ""

    // --- Set Input JSON String ---
    ipJSON = '{ "pk_ipCertificate": "", "pk_ipUsage": "" }'
    var ipJSON_tmp = JSON.parse(ipJSON)

    ipJSON_tmp.pk_ipCertificate = PK_CheckCertUsage.pk_ipCertificate
    ipJSON_tmp.pk_ipUsage = PK_CheckCertUsage.pk_ipUsage
    ipJSON = JSON.stringify(ipJSON_tmp)

    // --- Call Web Method ---
    if (
      !call_pk_method("PK_CheckCertUsage", ipJSON, PK_CheckCertUsage.callBack)
    )
    { return false }

    return true
  }
}()

// ---- End of PK_CheckCertUsage Class ----

// --- PK_GetPubKeys Class ---
const PK_GetPubKeys = new function () {
  // --- Define Public Input Variables ---
  this.pk_ipSlotId = 0

  // --- Define Public Output Variables ---
  this.pk_opSubjects = ""
  this.pk_opPublicKeys = ""
  this.pk_opErrorCode = 0
  this.pk_opErrorMessage = ""

  // --- Define Common Public Variables ---
  this.isCalled = false
  this.success = false
  this.rootMethod
  this.showErrorAlert = EM_DEFAULT_DISPLAY
  this.errMsgLanguage = EM_DEFAULT_LANGUAGE

  // --- Define Reset Method To Reset All Flags ---
  this.reset = function () {
    PK_GetPubKeys.isCalled = false
    PK_GetPubKeys.success = false
    PK_GetPubKeys.showErrorAlert = EM_DEFAULT_DISPLAY
    resetTimeout()

    return true
  }

  // --- Define Call Back Method For Getting Response ---
  this.callBack = function (opJSON) {
    var result = ""
    PK_GetPubKeys.isCalled = true

    var retJSON = opJSON.escapeSpecialChars()

    try {
      result = eval("(" + retJSON + ")")
    } catch (e) {
      PK_GetPubKeys.pk_opErrorCode = PK_JS_INVALID_OUTPUT_JS_STR
      PK_GetPubKeys.pk_opErrorMessage =
        "Operation has been failed in PK_GetPubKeys function due to::  " +
        "JSON format of the response is invalid." +
        " (" +
        PK_GetPubKeys.pk_opErrorCode +
        ")"
      PK_GetPubKeys.success = false

      if (PK_GetPubKeys.errMsgLanguage == "fa")
      { PK_GetPubKeys.pk_opErrorMessage =
          "عمليات به علت خطا در متد PK_GetPubKeys متوقف شده است:: " +
          getFaEventLog(PK_JS_INVALID_OUTPUT_JS_STR) +
          " (" +
          PK_GetPubKeys.pk_opErrorCode +
          ")" }

      if (PK_GetPubKeys.showErrorAlert) alert(PK_GetPubKeys.pk_opErrorMessage)

      PK_GetPubKeys.rootMethod()
      return false
    }

    PK_GetPubKeys.pk_opSubjects = result.pk_opSubjects
    PK_GetPubKeys.pk_opPublicKeys = result.pk_opPublicKeys
    PK_GetPubKeys.pk_opErrorCode = result.pk_opErrorCode
    PK_GetPubKeys.pk_opErrorMessage = result.pk_opErrorMessage

    if (result.pk_opErrorCode == 0) {
      PK_GetPubKeys.success = true
      PK_GetPubKeys.rootMethod()
      return true
    }

    PK_GetPubKeys.success = false

    if (PK_GetPubKeys.errMsgLanguage == "fa")
    { PK_GetPubKeys.pk_opErrorMessage =
        "عمليات به علت خطا در متد PK_GetPubKeys متوقف شده است:: " +
        getFaEventLog(result.pk_opErrorCode) +
        " (" +
        result.pk_opErrorCode +
        ")" }
    else
    { PK_GetPubKeys.pk_opErrorMessage =
        "Operation has been failed in PK_GetPubKeys function due to:: " +
        result.pk_opErrorMessage +
        " (" +
        result.pk_opErrorCode +
        ")" }

    if (PK_GetPubKeys.showErrorAlert) alert(PK_GetPubKeys.pk_opErrorMessage)

    PK_GetPubKeys.rootMethod()
    return false
  }

  // --- Define Call Method To Invocate The Web Method ---
  this.call = function () {
    var ipJSON = ""

    // --- Set Input JSON String ---
    ipJSON = '{ "pk_ipSlotId": 0 }'
    var ipJSON_tmp = JSON.parse(ipJSON)

    ipJSON_tmp.pk_ipSlotId = PK_GetPubKeys.pk_ipSlotId
    ipJSON = JSON.stringify(ipJSON_tmp)

    // --- Call Web Method ---
    if (!call_pk_method("PK_GetPubKeys", ipJSON, PK_GetPubKeys.callBack))
    { return false }

    return true
  }
}()

// ---- End of PK_GetPubKeys Class ----

// --- PK_GetCertInfo Class ---
const PK_GetCertInfo = new function () {
  // --- Define Public Input Variables ---
  this.pk_ipCertificate = ""
  this.pk_ipSel = 0

  // --- Define Public Output Variables ---
  this.pk_opSubject = ""
  this.pk_opPubKey = ""
  this.pk_opKeyId = ""
  this.pk_opErrorCode = 0
  this.pk_opErrorMessage = ""

  // --- Define Common Public Variables ---
  this.isCalled = false
  this.success = false
  this.rootMethod
  this.showErrorAlert = EM_DEFAULT_DISPLAY
  this.errMsgLanguage = EM_DEFAULT_LANGUAGE

  // --- Define Reset Method To Reset All Flags ---
  this.reset = function () {
    PK_GetCertInfo.isCalled = false
    PK_GetCertInfo.success = false
    PK_GetCertInfo.showErrorAlert = EM_DEFAULT_DISPLAY
    resetTimeout()

    return true
  }

  // --- Define Call Back Method For Getting Response ---
  this.callBack = function (opJSON) {
    var result = ""
    PK_GetCertInfo.isCalled = true

    var retJSON = opJSON.escapeSpecialChars()
    // result = JSON.parse(opJSON);
    try {
      result = eval("(" + retJSON + ")")
    } catch (e) {
      PK_GetCertInfo.pk_opErrorCode = PK_JS_INVALID_OUTPUT_JS_STR
      PK_GetCertInfo.pk_opErrorMessage =
        "Operation has been failed in PK_GetCertInfo function due to::  " +
        "JSON format of the response is invalid." +
        " (" +
        PK_GetCertInfo.pk_opErrorCode +
        ")"
      PK_GetCertInfo.success = false

      if (PK_GetCertInfo.errMsgLanguage == "fa")
      { PK_GetCertInfo.pk_opErrorMessage =
          "عمليات به علت خطا در متد PK_GetCertInfo متوقف شده است:: " +
          getFaEventLog(PK_JS_INVALID_OUTPUT_JS_STR) +
          " (" +
          PK_GetCertInfo.pk_opErrorCode +
          ")" }

      if (PK_GetCertInfo.showErrorAlert)
      { alert(PK_GetCertInfo.pk_opErrorMessage) }

      PK_GetCertInfo.rootMethod()
      return false
    }

    PK_GetCertInfo.pk_opSubject = result.pk_opSubject
    PK_GetCertInfo.pk_opPubKey = result.pk_opPubKey
    PK_GetCertInfo.pk_opKeyId = result.pk_opKeyId
    PK_GetCertInfo.pk_opErrorCode = result.pk_opErrorCode
    PK_GetCertInfo.pk_opErrorMessage = result.pk_opErrorMessage

    if (result.pk_opErrorCode == 0) {
      PK_GetCertInfo.success = true
      PK_GetCertInfo.rootMethod()
      return true
    }

    PK_GetCertInfo.success = false

    if (PK_GetCertInfo.errMsgLanguage == "fa")
    { PK_GetCertInfo.pk_opErrorMessage =
        "عمليات به علت خطا در متد PK_GetCertInfo متوقف شده است:: " +
        getFaEventLog(result.pk_opErrorCode) +
        " (" +
        result.pk_opErrorCode +
        ")" }
    else
    { PK_GetCertInfo.pk_opErrorMessage =
        "Operation has been failed in PK_GetCertInfo function due to:: " +
        result.pk_opErrorMessage +
        " (" +
        result.pk_opErrorCode +
        ")" }

    if (PK_GetCertInfo.showErrorAlert) alert(PK_GetCertInfo.pk_opErrorMessage)

    PK_GetCertInfo.rootMethod()
    return false
  }

  // --- Define Call Method To Invocate The Web Method ---
  this.call = function () {
    var ipJSON = ""

    // --- Set Input JSON String ---
    ipJSON = '{ "pk_ipCertificate": "", "pk_ipSel": 1 }'
    var ipJSON_tmp = JSON.parse(ipJSON)

    ipJSON_tmp.pk_ipCertificate = PK_GetCertInfo.pk_ipCertificate
    ipJSON_tmp.pk_ipSel = PK_GetCertInfo.pk_ipSel

    ipJSON = JSON.stringify(ipJSON_tmp)

    // --- Call Web Method ---
    if (!call_pk_method("PK_GetCertInfo", ipJSON, PK_GetCertInfo.callBack))
    { return false }

    return true
  }
}()

// ---- End of PK_GetCertInfo Class ----

// --- PK_GetCN Class ---
const PK_GetCN = new function () {
  // --- Define Public Input Variables ---
  this.pk_ipCertificate = ""

  // --- Define Public Output Variables ---
  this.pk_opCN = ""
  this.pk_opErrorCode = 0
  this.pk_opErrorMessage = ""

  // --- Define Common Public Variables ---
  this.isCalled = false
  this.success = false
  this.rootMethod
  this.showErrorAlert = EM_DEFAULT_DISPLAY
  this.errMsgLanguage = EM_DEFAULT_LANGUAGE

  // --- Define Reset Method To Reset All Flags ---
  this.reset = function () {
    PK_GetCN.isCalled = false
    PK_GetCN.success = false
    PK_GetCN.showErrorAlert = EM_DEFAULT_DISPLAY
    resetTimeout()

    return true
  }

  // --- Define Call Back Method For Getting Response ---
  this.callBack = function (opJSON) {
    var result = ""
    PK_GetCN.isCalled = true

    var retJSON = opJSON.escapeSpecialChars()

    try {
      result = JSON.parse(retJSON)
    } catch (e) {
      PK_GetCN.pk_opErrorCode = PK_JS_INVALID_OUTPUT_JS_STR
      PK_GetCN.pk_opErrorMessage =
        "Operation has been failed in PK_GetCN function due to::  " +
        "JSON format of the response is invalid." +
        " (" +
        PK_GetCN.pk_opErrorCode +
        ")"
      PK_GetCN.success = false

      if (PK_GetCN.errMsgLanguage == "fa")
      { PK_GetCN.pk_opErrorMessage =
          "عمليات به علت خطا در متد PK_GetCN متوقف شده است:: " +
          getFaEventLog(PK_JS_INVALID_OUTPUT_JS_STR) +
          " (" +
          PK_GetCN.pk_opErrorCode +
          ")" }

      if (PK_GetCN.showErrorAlert) alert(PK_GetCN.pk_opErrorMessage)

      PK_GetCN.rootMethod()
      return false
    }

    PK_GetCN.pk_opCN = result.pk_opCN
    PK_GetCN.pk_opErrorCode = result.pk_opErrorCode
    PK_GetCN.pk_opErrorMessage = result.pk_opErrorMessage

    if (result.pk_opErrorCode == 0) {
      PK_GetCN.success = true
      PK_GetCN.rootMethod()
      return true
    }

    PK_GetCN.success = false

    if (PK_GetCN.errMsgLanguage == "fa")
    { PK_GetCN.pk_opErrorMessage =
        "عمليات به علت خطا در متد PK_GetCN متوقف شده است:: " +
        getFaEventLog(result.pk_opErrorCode) +
        " (" +
        result.pk_opErrorCode +
        ")" }
    else
    { PK_GetCN.pk_opErrorMessage =
        "Operation has been failed in PK_GetCN function due to:: " +
        result.pk_opErrorMessage +
        " (" +
        result.pk_opErrorCode +
        ")" }

    if (PK_GetCN.showErrorAlert) alert(PK_GetCN.pk_opErrorMessage)

    PK_GetCN.rootMethod()
    return false
  }

  // --- Define Call Method To Invocate The Web Method ---
  this.call = function () {
    var ipJSON = ""

    // --- Set Input JSON String ---
    ipJSON = '{ "pk_ipCertificate": "" }'
    var ipJSON_tmp = JSON.parse(ipJSON)

    ipJSON_tmp.pk_ipCertificate = PK_GetCN.pk_ipCertificate

    ipJSON = JSON.stringify(ipJSON_tmp)

    // --- Call Web Method ---
    if (!call_pk_method("PK_GetCN", ipJSON, PK_GetCN.callBack)) return false

    return true
  }
}()

// ---- End of PK_GetCN Class ----

// --- PK_SetSignMech Class ---
const PK_SetSignMech = new function () {
  // --- Define Public Input Variables ---
  this.pk_ipSignatureFormat = 0
  this.pk_ipSignHashAlg = 0
  this.pk_ipSignMechanism = 0
  this.pk_ipSaltLen = 0
  this.pk_ipMgf = 0

  // --- Define Public Output Variables ---
  this.pk_opErrorCode = 0 //= new intObject();
  this.pk_opErrorMessage = ""

  // --- Define Common Public Variables ---
  this.isCalled = false
  this.success = false
  this.rootMethod
  this.showErrorAlert = EM_DEFAULT_DISPLAY
  this.errMsgLanguage = EM_DEFAULT_LANGUAGE

  // --- Define Reset Method To Reset All Flags ---
  this.reset = function () {
    PK_SetSignMech.isCalled = false
    PK_SetSignMech.success = false
    PK_SetSignMech.showErrorAlert = EM_DEFAULT_DISPLAY
    resetTimeout()

    return true
  }

  // --- Define Call Back Method For Getting Response ---
  this.callBack = function (opJSON) {
    var result = ""

    PK_SetSignMech.isCalled = true

    try {
      result = JSON.parse(opJSON)
    } catch (e) {
      PK_SetSignMech.pk_opErrorCode = PK_JS_INVALID_OUTPUT_JS_STR
      PK_SetSignMech.pk_opErrorMessage =
        "Operation has been failed in PK_SetSignMech function due to::  " +
        "JSON format of the response is invalid." +
        " (" +
        PK_SetSignMech.pk_opErrorCode +
        ")"
      PK_SetSignMech.success = false

      if (PK_SetSignMech.errMsgLanguage == "fa")
      { PK_SetSignMech.pk_opErrorMessage =
          "عمليات به علت خطا در متد PK_SetSignMech متوقف شده است:: " +
          getFaEventLog(PK_JS_INVALID_OUTPUT_JS_STR) +
          " (" +
          PK_SetSignMech.pk_opErrorCode +
          ")" }

      if (PK_SetSignMech.showErrorAlert)
      { alert(PK_SetSignMech.pk_opErrorMessage) }

      PK_SetSignMech.rootMethod()
      return false
    }

    PK_SetSignMech.pk_opErrorCode = result.pk_opErrorCode
    PK_SetSignMech.pk_opErrorMessage = result.pk_opErrorMessage

    if (result.pk_opErrorCode == 0 || result.pk_opErrorCode == 1) {
      PK_SetSignMech.success = true
      PK_SetSignMech.rootMethod()
      return true
    }

    PK_SetSignMech.success = false

    if (PK_SetSignMech.errMsgLanguage == "fa")
    { PK_SetSignMech.pk_opErrorMessage =
        "عمليات به علت خطا در متد PK_SetSignMech متوقف شده است:: " +
        getFaEventLog(result.pk_opErrorCode) +
        " (" +
        result.pk_opErrorCode +
        ")" }
    else
    { PK_SetSignMech.pk_opErrorMessage =
        "Operation has been failed in PK_SetSignMech function due to:: " +
        result.pk_opErrorMessage +
        " (" +
        result.pk_opErrorCode +
        ")" }

    if (PK_SetSignMech.showErrorAlert) alert(PK_SetSignMech.pk_opErrorMessage)

    PK_SetSignMech.rootMethod()
    return false
  }

  // --- Define Call Method To Invocate The Web Method ---
  this.call = function () {
    var ipJSON = ""

    // --- Set Input JSON String ---
    ipJSON =
      '{ "pk_ipSignatureFormat": 0, "pk_ipSignHashAlg": 0 , "pk_ipSignMechanism": 0, "pk_ipSaltLen": 0 , "pk_ipMgf": 0}'
    var ipJSON_tmp = JSON.parse(ipJSON)

    ipJSON_tmp.pk_ipSignatureFormat = PK_SetSignMech.pk_ipSignatureFormat
    ipJSON_tmp.pk_ipSignHashAlg = PK_SetSignMech.pk_ipSignHashAlg
    ipJSON_tmp.pk_ipSignMechanism = PK_SetSignMech.pk_ipSignMechanism
    ipJSON_tmp.pk_ipSaltLen = PK_SetSignMech.pk_ipSaltLen
    ipJSON_tmp.pk_ipMgf = PK_SetSignMech.pk_ipMgf

    ipJSON = JSON.stringify(ipJSON_tmp)
    ipJSON = ipJSON.escapeSpecialChars()

    // --- Call Web Method ---
    if (!call_pk_method("PK_SetSignMech", ipJSON, PK_SetSignMech.callBack))
    { return false }

    return true
  }
}()

// ---- End of PK_SetSignMech Class ----

// --- PK_Sign Class ---
const PK_Sign = new function () {
  // --- Define Public Input Variables ---
  this.pk_ipSignMethodType = 0
  this.pk_ipLogoutAfterSign = 0
  this.pk_ipTokenFilterParams = ""
  this.pk_ipResetSignMechFlag = 0
  this.pk_ipTbsType = 0
  this.pk_ipTbsHashAlg = 0
  this.pk_ipTbs = 0
  this.pk_ipUsage = 0
  this.pk_ipUserType = 1
  this.pk_ipSignerKeyId = 0

  // --- Define Public Output Variables ---
  this.pk_opSignerCertificate = ""
  this.pk_opSignature = ""
  this.pk_opSlotId = -1
  this.pk_opTokenInfo = ""
  this.pk_opErrorCode = 0
  this.pk_opErrorMessage = ""

  // --- Define Common Public Variables ---
  this.isCalled = false
  this.success = false
  this.rootMethod
  this.showErrorAlert = EM_DEFAULT_DISPLAY
  this.errMsgLanguage = EM_DEFAULT_LANGUAGE

  // --- Define Reset Method To Reset All Flags ---
  this.reset = function () {
    PK_Sign.isCalled = false
    PK_Sign.success = false
    PK_Sign.showErrorAlert = EM_DEFAULT_DISPLAY
    resetTimeout()

    return true
  }

  // --- Define Call Back Method For Getting Response ---
  this.callBack = function (opJSON) {
    var result = ""
    PK_Sign.isCalled = true

    var retJSON = opJSON.escapeSpecialChars()

    try {
      result = JSON.parse(retJSON)
    } catch (e) {
      PK_Sign.pk_opErrorCode = PK_JS_INVALID_OUTPUT_JS_STR
      PK_Sign.pk_opErrorMessage =
        "Operation has been failed in PK_Sign function due to::  " +
        "JSON format of the response is invalid." +
        " (" +
        PK_Sign.pk_opErrorCode +
        ")"
      PK_Sign.success = false

      if (PK_Sign.errMsgLanguage == "fa")
      { PK_Sign.pk_opErrorMessage =
          "عمليات به علت خطا در متد PK_Sign متوقف شده است:: " +
          getFaEventLog(PK_JS_INVALID_OUTPUT_JS_STR) +
          " (" +
          PK_Sign.pk_opErrorCode +
          ")" }

      if (PK_Sign.showErrorAlert) alert(PK_Sign.pk_opErrorMessage)

      PK_Sign.rootMethod()
      return false
    }

    PK_Sign.pk_opSignerCertificate = result.pk_opSignerCertificate
    PK_Sign.pk_opSignature = result.pk_opSignature
    PK_Sign.pk_opSlotId = result.pk_opTokenInfo.pk_opSlotId
    PK_Sign.pk_opTokenInfo = result.pk_opTokenInfo.pk_opTokenInfo
    PK_Sign.pk_opErrorCode = result.pk_opErrorCode
    PK_Sign.pk_opErrorMessage = result.pk_opErrorMessage

    if (result.pk_opErrorCode == 0) {
      PK_Sign.success = true
      PK_Sign.rootMethod()
      return true
    }

    PK_Sign.success = false

    if (PK_Sign.errMsgLanguage == "fa")
    { PK_Sign.pk_opErrorMessage =
        "عمليات به علت خطا در متد PK_Sign متوقف شده است:: " +
        getFaEventLog(result.pk_opErrorCode) +
        " (" +
        result.pk_opErrorCode +
        ")" }
    else
    { PK_Sign.pk_opErrorMessage =
        "Operation has been failed in PK_Sign function due to:: " +
        result.pk_opErrorMessage +
        " (" +
        result.pk_opErrorCode +
        ")" }

    if (PK_Sign.showErrorAlert) alert(PK_Sign.pk_opErrorMessage)

    PK_Sign.rootMethod()
    return false
  }

  // --- Define Call Method To Invocate The Web Method ---
  this.call = function () {
    var ipJSON = ""
    g_timeout = 300000

    // --- Set Input JSON String ---
    ipJSON =
      '{ "pk_ipSignMethodType": 0, "pk_ipLogoutAfterSign": 0, "pk_ipTokenFilterParams": ["", "", "", "", "", ""], "pk_ipResetSignMechFlag": 1, "pk_ipTbsType": 0, "pk_ipTbsHashAlg": 0, "pk_ipTbs": "", "pk_ipUsage": "", "pk_ipUserType": 1, "pk_ipSignerKeyId" : "" }'
    var ipJSON_tmp = JSON.parse(ipJSON)

    ipJSON_tmp.pk_ipSignMethodType = PK_Sign.pk_ipSignMethodType
    ipJSON_tmp.pk_ipLogoutAfterSign = PK_Sign.pk_ipLogoutAfterSign
    ipJSON_tmp.pk_ipTokenFilterParams = PK_Sign.pk_ipTokenFilterParams
    ipJSON_tmp.pk_ipResetSignMechFlag = PK_Sign.pk_ipResetSignMechFlag
    ipJSON_tmp.pk_ipTbsType = PK_Sign.pk_ipTbsType
    ipJSON_tmp.pk_ipTbsHashAlg = PK_Sign.pk_ipTbsHashAlg
    ipJSON_tmp.pk_ipTbs = PK_Sign.pk_ipTbs
    ipJSON_tmp.pk_ipUsage = PK_Sign.pk_ipUsage
    ipJSON_tmp.pk_ipUserType = PK_Sign.pk_ipUserType
    ipJSON_tmp.pk_ipSignerKeyId = PK_Sign.pk_ipSignerKeyId

    ipJSON = JSON.stringify(ipJSON_tmp)
    ipJSON = ipJSON.escapeSpecialChars()

    // --- Call Web Method ---
    if (!call_pk_method("PK_Sign", ipJSON, PK_Sign.callBack)) return false

    return true
  }
}()

// ---- End of PK_Sign Class ----

// --- PK_GenRandom Class ---
const PK_GenRandom = new function () {
  // --- Define Public Input Variables ---
  this.pk_ipSlotId = 0
  this.pk_ipSize = 0

  // --- Define Public Output Variables ---
  this.pk_opHexRnadomString = ""
  this.pk_opErrorCode = 0
  this.pk_opErrorMessage = ""

  // --- Define Common Public Variables ---
  this.isCalled = false
  this.success = false
  this.rootMethod
  this.showErrorAlert = EM_DEFAULT_DISPLAY
  this.errMsgLanguage = EM_DEFAULT_LANGUAGE

  // --- Define Reset Method To Reset All Flags ---
  this.reset = function () {
    PK_GenRandom.isCalled = false
    PK_GenRandom.success = false
    PK_GenRandom.showErrorAlert = EM_DEFAULT_DISPLAY
    resetTimeout()

    return true
  }

  // --- Define Call Back Method For Getting Response ---
  this.callBack = function (opJSON) {
    var result = ""
    PK_GenRandom.isCalled = true

    try {
      result = JSON.parse(opJSON)
    } catch (e) {
      PK_GenRandom.pk_opErrorCode = PK_JS_INVALID_OUTPUT_JS_STR
      PK_GenRandom.pk_opErrorMessage =
        "Operation has been failed in PK_GenRandom function due to::  " +
        "JSON format of the response is invalid." +
        " (" +
        PK_GenRandom.pk_opErrorCode +
        ")"
      PK_GenRandom.success = false

      if (PK_GenRandom.errMsgLanguage == "fa")
      { PK_GenRandom.pk_opErrorMessage =
          "عمليات به علت خطا در متد PK_GenRandom متوقف شده است:: " +
          getFaEventLog(PK_JS_INVALID_OUTPUT_JS_STR) +
          " (" +
          PK_GenRandom.pk_opErrorCode +
          ")" }

      if (PK_GenRandom.showErrorAlert) alert(PK_GenRandom.pk_opErrorMessage)

      PK_GenRandom.rootMethod()
      return false
    }

    PK_GenRandom.pk_opHexRnadomString = result.pk_opHexRnadomString
    PK_GenRandom.pk_opErrorCode = result.pk_opErrorCode
    PK_GenRandom.pk_opErrorMessage = result.pk_opErrorMessage

    if (result.pk_opErrorCode == 0) {
      PK_GenRandom.success = true
      PK_GenRandom.rootMethod()
      return true
    }

    PK_GenRandom.success = false

    if (PK_GenRandom.errMsgLanguage == "fa")
    { PK_GenRandom.pk_opErrorMessage =
        "عمليات به علت خطا در متد PK_GenRandom متوقف شده است:: " +
        getFaEventLog(result.pk_opErrorCode) +
        " (" +
        result.pk_opErrorCode +
        ")" }
    else
    { PK_GenRandom.pk_opErrorMessage =
        "Operation has been failed in PK_GenRandom function due to:: " +
        result.pk_opErrorMessage +
        " (" +
        result.pk_opErrorCode +
        ")" }

    if (PK_GenRandom.showErrorAlert) alert(PK_GenRandom.pk_opErrorMessage)

    PK_GenRandom.rootMethod()
    return false
  }

  // --- Define Call Method To Invocate The Web Method ---
  this.call = function () {
    var ipJSON = ""

    // --- Set Input JSON String ---
    ipJSON = '{ "pk_ipSlotId": 0, "pk_ipSize": 0 }'
    var ipJSON_tmp = JSON.parse(ipJSON)

    ipJSON_tmp.pk_ipSlotId = PK_GenRandom.pk_ipSlotId
    ipJSON_tmp.pk_ipSize = PK_GenRandom.pk_ipSize
    ipJSON = JSON.stringify(ipJSON_tmp)

    // --- Call Web Method ---
    if (!call_pk_method("PK_GenRandom", ipJSON, PK_GenRandom.callBack))
    { return false }

    return true
  }
}()

// ---- End of PK_GenRandom Class ----

export {
  PK_ServiceConnection,
  PK_SetCryptoki,
  PK_InitializeToken,
  PK_Login,
  PK_Logout,
  PK_CheckToken,
  PK_GetSlotCount,
  PK_GetSlotInfo,
  PK_GetCerts,
  PK_GetCertById,
  PK_CheckCertUsage,
  PK_GetPubKeys,
  PK_GetCertInfo,
  PK_GetCN,
  PK_SetSignMech,
  PK_Sign,
  PK_GenRandom
}
