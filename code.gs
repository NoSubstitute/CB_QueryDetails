function doGet(e){
  
  var passedInSerial = e.parameter.sn;

  if (passedInSerial == "") 
  {
    // Alternative, super simple error page
    // return HtmlService.createHtmlOutput("You forgot to povide a serial number")

  // Nicer looking and editable error page
  var t = HtmlService.createTemplateFromFile("pageNoSerial");
  return t.evaluate().setTitle("CB_QueryDetails No Serial");

  }
  var serialNumber = passedInSerial;
  Logger.log(serialNumber);

  // Store the provided serial number in PS so we can retrieve it later.
  var userProperties = PropertiesService.getUserProperties();
  PropertiesService.getUserProperties().setProperty("serialNumberProp", serialNumber);
  // var number = PropertiesService.getUserProperties().getProperty("serialNumberProp");
  // Logger.log(number);

  // If you only wanted to display the provided serial number, used while debugging
  // return HtmlService.createHtmlOutput(number)
  
  // Nice and editable results page
  var t = HtmlService.createTemplateFromFile("pageSerial");
  return t.evaluate().setTitle("CB_QueryDetails");
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
