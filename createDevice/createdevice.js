'use strict';
var iothub = require('azure-iothub');


// You can get in the Azure created service 
var hostname = 'Azure-IoT-ChatBot.azure-devices.net';
// Give the primary key here
var accesskey = 'eCnj21YBoKXNf9c/MxD+liIxVbfNUNg7W1xRq2TMi8E=';


var connectionString = 'HostName='+hostname+';SharedAccessKeyName=iothubowner;SharedAccessKey='+accesskey;

var registry = iothub.Registry.fromConnectionString(connectionString)

// Give your device names here to register in the Azure iot hub
var DeviceList = ['bulb1','bulb2'];

for (var i=0;i<2;i++){
   var device = new iothub.Device(null);
   console.log(device);
   device.deviceId = DeviceList[i];

  registry.list(function (err, deviceList) {
    deviceList.forEach(function (device) {
      var key = device.authentication ? device.authentication.symmetricKey.primaryKey : '<no primary key>';
      console.log(device.deviceId + ': ' + key);
    });

  });

   registry.create(device, function(err, deviceInfo, res) {
     if (err) {
       registry.get(device.deviceId, printDeviceInfo);
     }
     if (deviceInfo) {
       printDeviceInfo(err, deviceInfo, res)
     }
   });

   function printDeviceInfo(err, deviceInfo, res) {
     if (deviceInfo) {
       console.log('Device ID: ' + deviceInfo.deviceId);
       console.log('Device key: ' + deviceInfo.authentication.symmetricKey.primaryKey);
     }
   }
   
}
 