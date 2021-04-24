function disableCB(sernum){
      var serno = sernum;
      // Since we provide a serial number, convert to device-id in query
      var sernoquery = "id:"+serno;
      // Use AdminSDK API to check if the cros device exists. Else the update will fail
      var chromebooklist = AdminDirectory.Chromeosdevices.list('my_customer', {query: sernoquery}).chromeosdevices;
        if (!chromebooklist) {
          Logger.log([serno, "not found"]);
        } else if (chromebooklist.length !== 1) {
          Logger.log([serno, chromebooklist.length+" found"]);
        } else {
          var id = chromebooklist[0].deviceId;
          // For each line, try to update the device with given data, and log the result
            try {
              var result = AdminDirectory.Chromeosdevices.action({'action': 'disable'},'my_customer',id);
              Logger.log([serno, "Device disabled"]);

              // If the update fails for some reason, log the error
            } catch (err) {
              Logger.log([serno, err]);
            }
        }
        return [serno];
    }
