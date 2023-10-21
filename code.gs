function doGet(e) {
  var passedInSerial = e.parameter.sn;
  if (passedInSerial == "") {
    var t = HtmlService.createTemplateFromFile("pageNoSerial");
    return t.evaluate().setTitle("CB_QueryDetails No Serial");
  }
  var serialNumber = passedInSerial;
  var userProperties = PropertiesService.getUserProperties();
  PropertiesService.getUserProperties().setProperty("serialNumberProp", serialNumber);
  var t = HtmlService.createTemplateFromFile("pageSerial");
  return t.evaluate().setTitle("CB_QueryDetails").setFaviconUrl('https://docs.google.com/drawings/d/1z6XM6zDn9tT8NKmaSephC_VUL87tCIdrid_ghJmE1_8/export/png');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}