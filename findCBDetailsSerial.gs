function findCBOUs() {
  var serno = PropertiesService.getUserProperties().getProperty("serialNumberProp");
  var sernoquery = "id:"+serno;
  // Use AdminSDK API to check if the cros device exists. Else the extraction of OU will fail.
  var chromebooklist = AdminDirectory.Chromeosdevices.list('my_customer', {query: sernoquery}).chromeosdevices;
  if (!chromebooklist) {{var serno = "Wrong serial or outside your school/s"};} 
  else {
    // Only grab the first matching device, if it isn't an exact match
    var serial = chromebooklist[0].serialNumber;
    if (chromebooklist[0].orgUnitPath) {var ou = chromebooklist[0].orgUnitPath} else {var ou = ""};
    if (chromebooklist[0].status) {var status = chromebooklist[0].status} else {var status = ""};
    if (chromebooklist[0].lastSync) {var lastsync = chromebooklist[0].lastSync.substring(0, 16).replace(/T/g, " ")} else {var lastsync = ""};
    if (chromebooklist[0].osVersion) {var osversion = chromebooklist[0].osVersion} else {var osversion = ""};
    if (chromebooklist[0].annotatedLocation) {var location = chromebooklist[0].annotatedLocation} else {var location = ""};
    if (chromebooklist[0].annotatedAssetId) {var asset = chromebooklist[0].annotatedAssetId} else {var asset = ""};
    if (chromebooklist[0].annotatedUser) {var user = chromebooklist[0].annotatedUser} else {var user = ""};
    if (chromebooklist[0].notes) {var note = chromebooklist[0].notes} else {var note = ""};
    if (chromebooklist[0].macAddress) {var macAddress = chromebooklist[0].macAddress} else {var macAddress = ""};
    if (chromebooklist[0].autoUpdateExpiration) {var autoUpdateExpiration = chromebooklist[0].autoUpdateExpiration} else {var autoUpdateExpiration = ""};
    // Swedish SI date format of AUE, YYYY-MM-DD
    // var aue = new Date(parseInt(autoUpdateExpiration)).toLocaleString("sv-SE", {  year: 'numeric', month: 'numeric', day: 'numeric' }) + " (" + autoUpdateExpiration + ")";
    // Simple Swedish date format of AUE, showing only "month year"
    // If you want US format replace .toLocaleString("en-US", {  year: 'numeric', month: 'short' }) 
    var aue = new Date(parseInt(autoUpdateExpiration)).toLocaleString("sv-SE", {  year: 'numeric', month: 'short' }) + " (" + autoUpdateExpiration + ")";

    // This one does a double check, as one can be undefined while the other isn't, giving wrong result.
    if (chromebooklist[0].recentUsers && chromebooklist[0].recentUsers[0].email) {
      var recentUser = chromebooklist[0].recentUsers[0].email
      var recentUsers = chromebooklist[0].recentUsers} else {
        var recentUsers = ""
        var recentUser = ""};
  }
  
  return [serno,serial, ou, status, lastsync, osversion, asset, user, note, macAddress, aue, recentUser, recentUsers];  
}
