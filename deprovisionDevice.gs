function deprovisionCB(sernum) {
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
      AdminDirectory.Chromeosdevices.update({ orgUnitPath: "/_Chromebooks/_deprovisioned_chromebooks", notes: "Deprovisioned" }, 'my_customer', id);
    } catch (err) {
      return [serno, "couldn't be moved", '#ffc90e'];
    }
    try {
      AdminDirectory.Customer.Devices.Chromeos.issueCommand({ 'commandType': ('REMOTE_POWERWASH') }, 'my_customer', id)
    } catch (err) {
      return [serno, "couldn't be reset", '#ffc90e'];
    }
    try {
      AdminDirectory.Chromeosdevices.action({ 'action': 'deprovision', 'deprovisionReason': 'retiring_device' }, 'my_customer', id);
      // If the update fails for some reason, log the error
    } catch (err) {
      return [serno, "couldn't be deprovisioned", '#ffc90e'];
    }
  }
  return [serno, "has been moved and deprovisioned, reset requested", '#ba68c8'];
}