function doGet(e){
  
  var passedInSerial = e.parameter.sn;

  if (passedInSerial == "") 
  {
    // return HtmlService.createHtmlOutput("You forgot to provide a serial number")
    // This can be used if you don't want the fancy error page, pageNoSerial

  var t = HtmlService.createTemplateFromFile("pageNoSerial");
  return t.evaluate().setTitle("CB_QueryDetails No Serial");

  }
  var serialNumber = passedInSerial;
  // console.log(serialNumber);
  // Logger.log(serialNumber);

  var userProperties = PropertiesService.getUserProperties();
  PropertiesService.getUserProperties().setProperty("serialNumberProp", serialNumber);
  // var number = PropertiesService.getUserProperties().getProperty("serialNumberProp");
  // console.log(number);
  // Logger.log(number);

  // return HtmlService.createHtmlOutput(number)
  var t = HtmlService.createTemplateFromFile("pageSerial");
  return t.evaluate().setTitle("CB_QueryDetails");
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
