# Chat UI - Azure IoT hub

## Steps to launch the Chat UI App

### STEP 1 :
Download/fork the source code of this repository and update the keys at the application server side and client side as follows.

#### Pubnub Keys: 
Change the PubNub keys in the following files. You can use "demo" as the key name or you can use app keys from your PubNub subscription.

    1. routes/index.js --> line numbers 24,25
    2. public/javascript/chat.js --> line numbers 21,22

#### Azure service Keys:
You have to retrieve your Azure IoT service host name and primary key which were generated as part of step 5 & 6 under "Create Azure IoT Hub service" section of the main README. 

Update the following files in this Node.js package as follows

    1.routes/index.js --> line numbers 17 -> Update the hostname variable with your Azure IoT service hostname 
    2.routes/index.js --> line numbers 20 -> Update the accesskey variable with your Azure IoT service primary key
    
### STEP 2 :

To the server

1.First ensure that the Node.js is installed. To download and install nodejs on the hosting server, follow this link.

    https://nodejs.org/en/download/

2.Open the " azure-chat " directory in terminal, install all the node package dependencies and run the node application as

    node azurechat.js

3.Open the following link in your browser (assuming that you are running the Node.js on a local server)

    http://127.0.0.1:3021/

Alternatively you can also host the application on a cloud server and access it via its IP Address.
