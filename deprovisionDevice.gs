function deprovisionCB(sernum){
      var serno = sernum;
      // Since we provided serial numbers, convert each to device-id
      var sernoquery = "id:"+serno;
      // Use AdminSDK API to check if the cros device exists. Else the update will fail
      var chromebooklist = AdminDirectory.Chromeosdevices.list('my_customer', {query: sernoquery}).chromeosdevices;
        if (!chromebooklist) {
          Logger.log([serno, "not found"]);
          // console.log([serno, "not found"]);
        } else if (chromebooklist.length !== 1) {
          Logger.log([serno, chromebooklist.length+" found"]);
          // console.log([serno, chromebooklist.length+" found"]);
        } else {
          var id = chromebooklist[0].deviceId;
          // For each line, try to update the device with given data, and log the result
            try {
              AdminDirectory.Chromeosdevices.update({orgUnitPath:"/Ω_adm/Ω_devices/Ω_deprovisioned", notes:"Deprovisioned"},'my_customer',id);

              AdminDirectory.Chromeosdevices.action({'action': 'deprovision','deprovisionReason': 'retiring_device'},'my_customer',id);
              Logger.log([new Date(), serno, "Device deprovisioned"]);
              // console.log([new Date(), serno, "Device deprovisioned"]);

              // If the update fails for some reason, log the error
            } catch (err) {
              Logger.log([serno, err]);
              // console.log([serno, err]);
            }
        }
        return [serno];
    }
