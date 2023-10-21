function updateCB(sernum,ouUpdate,assetUpdate) {
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
      //AdminDirectory.Chromeosdevices.update({ orgUnitPath: ou }, 'my_customer', id);
      // AdminDirectory.Chromeosdevices.update({orgUnitPath:ou, notes:note, annotatedUser:user, annotatedAssetId:asset, annotatedLocation:room},'my_customer',id);
      AdminDirectory.Chromeosdevices.update({orgUnitPath:ouUpdate, annotatedAssetId:assetUpdate},'my_customer',id);

    } catch (err) {
      return [serno, "couldn't be updated"];
    }
  }
  return [serno, "has been updated"];
}
