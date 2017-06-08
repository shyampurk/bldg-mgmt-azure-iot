# Building Simulation - Azure IoT Hub

## Steps to launch the App

### STEP 1 :
Download/fork the source code of this repository and update the keys at the application server side and client side as follows

#### Pubnub Keys: 
Change the PubNub keys in the following files. You can use "demo" as the key name or you can use app keys from your PubNub subscription.

    1. routes/index.js --> line numbers 24,25 -> Update variable pub_key and sub_key with your PubNub publish key and subscribe key
    2. public/javascript/building.js --> line numbers 13,14 -> Update variable pub_key and sub_key with your PubNub publish key and subscribe key

#### Azure Keys:
You have to retrieve your Azure IoT service host name (generated as part of step 6 under "Create Azure IoT Hub service" section of the main README) and device keys for "bulb1" & "bulb2" (generated as part of step 2 under "Register device with Azure IoT" section of the main README).

    1.routes/index.js --> line numbers 18 -> Update the hostname variable with your Azure IoT service hostname 
    2.routes/index.js --> line numbers 86 -> Update the devickey variable with the device key of "bulb1" device 
    3.routes/index.js --> line numbers 88 -> Update the devickey variable with the device key of "bulb2" device
    
### STEP 2 :

To run the server

1.First ensure that the Node.js is installed. To download and install nodejs on the hosting server, follow this link.

    https://nodejs.org/en/download/

2.Open this " azure-building " directory in terminal, install all the node package dependencies and run the node application as

    node azurebuilding.js

3.Open the following link in your browser (assuming that you are running the Node.js on a local server)

    http://127.0.0.1:3020/

Alternatively you can host the application on a cloud server and access it via its IP Address.
