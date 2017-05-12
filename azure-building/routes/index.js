/****************************************************************

		BUILDING MGMT - AZURE IOT - CHAT

****************************************************************/

// Require node modules 
var express = require('express');
var router  = express.Router();
var path	= require('path');
var PubNub  = require('pubnub');

// Require Azure IOT modules
var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;

// Host Name of the Azure-IoT service
var hostname = 'Azure-IoT-ChatBot.azure-devices.net';
var devickey = '';
var lightstatus = '';
var deviceId = '';

// Initialize Pubnub Keys
var pub_key = 'pub-c-929488ef-0e05-44de-88b7-c90159bcc8ba',
    sub_key = 'sub-c-ca91f508-297f-11e7-a5a9-0619f8945a4f';

var pubnub = new PubNub({
    subscribeKey: sub_key,
    publishKey: pub_key,
    ssl: true
})

/*************************************************************
	Function 	: Pubnub Listener Function
	Channel  	: 'publish_device_status'
	Description : Listens on the subscribed channel and passes 
				  received message to sendToAzure function 
**************************************************************/
pubnub.addListener({    
    message: function(m) {
        // handle message
        var channelName = m.channel; // The channel for which the message belongs
        var msg = m.message; // The Payload
        console.log(msg)
        sendToAzure(msg)
    }
})

/*************************************************************
	Function 	: printResultFor
	Description : Helper function to print results in the console
**************************************************************/

function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}

/****************************************************************
	Function 	: Load Home page (building)
	Channel  	: 'publish_device_status'
	Description : Listens on the subscribed channel and 
				  when get request received loads the home page
*****************************************************************/

router.get('/',function(request,response){
	pubnub.subscribe({
	    channels: ['publish_device_status']
	})
	response.status(200).render('building');
});

/******************************************************************
	Function 	: sendToAzure()
	Description : Pushes the received message to Azure IOT Cloud 
*******************************************************************/

function sendToAzure(m){

	lightstatus = m.lightstatus
	deviceId = m.deviceId;
	
	if(deviceId == 'bulb1'){
		devickey = '4ntOnHMto/ODiviexh3AXgERmfajuv5GGPz3pZpeaHI=';
	}else if(deviceId == 'bulb2'){
		devickey = 'CkJ7L6XEDSQoOmh+ocONM51xhL8YTU1WKeHn557Q+Lk=';
	}

	var connectionString = 'HostName='+hostname+';DeviceId='+deviceId+';SharedAccessKeyName=iothubowner;SharedAccessKey='+devickey;
	var client = clientFromConnectionString(connectionString);
	
	var data = JSON.stringify({ deviceId: deviceId, lightstatus: lightstatus });
    var message = new Message(data);
    
    console.log("Sending message: " + message.getData());

	var connectCallback = function (err) {
	    if (err) {
	    	console.error('Could not connect: ' + err.message);
	    }else {
		    console.log('Client connected');
		    
		    client.on('message', function (msg) {
		        console.log('Id: ' + msg.messageId + ' Body: ' + msg.data);
		        client.complete(msg, printResultFor('completed'));
		    });

		    client.sendEvent(message, printResultFor('send'));
		    
		    client.on('error', function (err) {
		        console.error(err.message);
		    });
		}
	}
	
	client.open(connectCallback);
}

module.exports = router;