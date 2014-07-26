// ==UserScript==
// @name          GetBootstrapImporter
// @namespace     http://github.com/Arven/arven-design
// @description	  Imports a style to Bootstrap Customizer at getbootstrap.com
// @include       http://getbootstrap.com/customize/*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)

GM_registerMenuCommand( "Set values for Bootstrap", setvalues );

var testfile = prompt("Please enter the path to your less variables data", "http://github.com/Arven/arven-design/testfile.less");
if (testfile != null) {

  // Create a request, asking the server for a JSON response via the Accept header
  // Also logging whenever the state of the request changes
  var ret = GM_xmlhttpRequest({
    method: "GET",
    headers: {"Accept": "application/json"},
    url: testfile,
    onreadystatechange: function(res) {
      GM_log("Request state changed to: " + res.readyState);
    },
    onload: function(res) {
      // Lets assume we get Text back...
      var text = res.responseText;
      lines = text.split("\n");
      for(var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if(line.substr(0, 1) == "@") {
          // We are actually parsing a variable.
          var m = line.match(/@([\w-]+):\s*(value)/);
          alert(m[0] + " set value to " + m[1]);
        }
      }
    }
  });

}