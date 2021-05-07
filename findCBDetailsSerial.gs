function findCBOUs() {
  // Stopped using this library as it gave me thw wrong minutes and seconds!
  // eval(UrlFetchApp.fetch('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js').getContentText());
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
    Logger.log(chromebooklist[0].lastSync); // Logging the lastSync value so you can see what it looks like
    // Replacing this lastsync variable as it didn't take into account timezones
    // if (chromebooklist[0].lastSync) {var lastsync = chromebooklist[0].lastSync.substring(0, 16).replace(/T/g, " ")} else {var lastsync = ""};
    // Changing the dateformat to get correct time, adjusted for timezone
    if (chromebooklist[0].lastSync) {var lastsync = new Date(chromebooklist[0].lastSync)} else {var lastsync = ""};
    Logger.log(lastsync); // Logging the lastSync value after new Date so you can see what it looks like
    // This was the fist attempt to cut the new Date format shorter, but that risked cutting info if the 25 chars wasn't always true
    // var LastSyncTs = lastsync.toString().substring(0, 25)
    // Logger.log(LastSyncTs);
    // Now, this bit is weird. I installed the moment.js library (disabled now) to eaily create date & time format, and it displayed beautifulkly, but INCORRECT! Minutes and seconds display wrong. No clue why. Luckily I found the longer formating below.
    // var LastSyncT = moment(lastsync).format('YYYY-MM-DD HH:MM:SS');
    // Logger.log(LastSyncT);
    // Finally figured out the correct code to format the date & time to my liking. Just like with AUE below, you will need to change to your language and format
    var LastSyncProper = lastsync.toLocaleString("sv-SE", {  year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    Logger.log(LastSyncProper); // Logging the LastSyncProper value so you can see what it looks like
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
  
  // return [serno,serial, ou, status, lastsync, osversion, asset, user, note, macAddress, aue, recentUser, recentUsers];  
  return [serno,serial, ou, status, LastSyncProper, osversion, asset, user, note, macAddress, aue, recentUser, recentUsers];  
}
