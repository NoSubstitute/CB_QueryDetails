function resetCB(sernum) {
  var serno = sernum;
  // Since we provided serial numbers, convert each to device-id
  var sernoquery = "id:" + serno;
  // Use AdminSDK API to check if the cros device exists. Else the update will fail
  var chromebooklist = AdminDirectory.Chromeosdevices.list('my_customer', { query: sernoquery }).chromeosdevices;
  if (!chromebooklist) {
  } else if (chromebooklist.length !== 1) {
  } else {
    var id = chromebooklist[0].deviceId;
    // For each line, try to update the device with given data, and log the result
    try {
      AdminDirectory.Customer.Devices.Chromeos.issueCommand({ 'commandType': ('REMOTE_POWERWASH') }, 'my_customer', id)
      console.log(err)
    } catch (err) {
}
  }
  return [serno];
}