/**********************************************************

        BUILDING MGMT - AZURE IOT - CHAT

***********************************************************/

// Require node modules
var express        = require('express');
var router         = express.Router();
var path	       = require('path');
var PubNub         = require('pubnub');

// Reqiure AZURE IOT event hub
var EventHubClient = require('azure-event-hubs').Client;

// You can get in the Azure created service 
var hostname = 'Azure-IoT-ChatBot.azure-devices.net';

// Give the primary key here
var accesskey = 'eCnj21YBoKXNf9c/MxD+liIxVbfNUNg7W1xRq2TMi8E=';
var connectionString = 'HostName='+hostname+';SharedAccessKeyName=iothubowner;SharedAccessKey='+accesskey;

// Initialize pubnub & keys
var pub_key = 'pub-c-929488ef-0e05-44de-88b7-c90159bcc8ba',
    sub_key = 'sub-c-ca91f508-297f-11e7-a5a9-0619f8945a4f';

var pubnub = new PubNub({
    subscribeKey: sub_key,
    publishKey: pub_key,
    ssl: true
})

/**********************************************************************
    Function   : printError()
    Descrption : prints the error message received from Azure iot hub
***********************************************************************/
var printError = function (err) {
	console.log(err.message);
};

/*************************************************************
    Function    : sendMessage()
    Channel     : 'building_device_status_chat'
    Description : Publishes the device status to chat window
**************************************************************/
var sendMessage = function (message) {
    var chatMessage = {
                        "command":"message",
                        "user":message.body.deviceId,
                        "role":"device",
                        "userMessage":message.body.lightstatus,
                    }

    pubnub.publish({
        message: chatMessage,
        channel: 'building_device_status_chat',
        storeInHistory: true,
    });
	console.log('Message received: ',JSON.stringify(message.body));
};

/*******************************************************************************
    Function   : Azure Message Receive
    Descrption : Receives the message from azure cloud and 
                 forwards to the pubnub channel
********************************************************************************/
var client = EventHubClient.fromConnectionString(connectionString);
client.open()
    .then(client.getPartitionIds.bind(client))
    .then(function (partitionIds) {
        return partitionIds.map(function (partitionId) {
            return client.createReceiver('$Default', partitionId, { 'startAfterTime' : Date.now()}).then(function(receiver) {
                console.log('Created partition receiver: ' + partitionId)
                receiver.on('errorReceived', printError);
                receiver.on('message', sendMessage);
            });
        });
    })
    .catch(printError);
/*******************************************************************
    Function   : Get method
    Descrption : On receiving get request , displays the chat page
********************************************************************/
router.get('/',function(request,response){
    response.status(200).render('chat');
});

module.exports = router;