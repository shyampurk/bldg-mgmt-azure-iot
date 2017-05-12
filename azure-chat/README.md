# Building Management Chat - Azure IoT hub

## Steps to launch the App
## STEP 1 :
Download/fork the source code of this repository and update the keys at the application server side and client side

### Pubnub Keys: 
Change the PubNub keys in the following files

    1. routes/index.js --> line numbers 24,25
    2. public/javascript/chat.js --> line numbers 21,22

### Azure Keys:
Change the Azure keys obtained from executing [createdevice.js](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/createDevice/createdevice.js) program ,in the following files

    1.routes/index.js --> line numbers 17 (host name)
    2.routes/index.js --> line numbers 20 (primary key)
    
## STEP 2 :

To RUN the server

1.This application require nodejs. To download and install nodejs on the hosting server, follow this link.

    https://nodejs.org/en/download/

2.Open the " azure-chat " directory in terminal, install all the node package dependencies and run the node application as

    node azurechat.js

3.Open the following link in your browser (assuming that you are running the Node.js on a local server)

    http://127.0.0.1:3021/

Alternatively you can host the application on a cloud server and access it via its IP Address.
