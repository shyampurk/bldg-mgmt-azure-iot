# Building Management Simulation - Azure IoT hub

## Steps to launch the App
## STEP 1 :
Download/fork the source code of this repository and update the keys at the application server side and client side

### Pubnub Keys: 
Change the PubNub keys in the following files

    1. routes/index.js --> line numbers 24,25
    2. public/javascript/building.js --> line numbers 13,14

### Azure Keys:
Change the Azure keys obtained from executing [createdevice.js](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/createDevice/createdevice.js) program ,in the following files

    1.routes/index.js --> line numbers 18 (host name)
    2.routes/index.js --> line numbers 85,86 (device name ,device key)
    3.routes/index.js --> line numbers 87,88 (device name ,device key)
    
## STEP 2 :

To RUN the server

1.This application require nodejs. To download and install nodejs on the hosting server, follow this link.

    https://nodejs.org/en/download/

2.Open the " azure-building " directory in terminal, install all the node package dependencies and run the node application as

    node azurebuilding.js

3.Open the following link in your browser (assuming that you are running the Node.js on a local server)

    http://127.0.0.1:3020/

Alternatively you can host the application on a cloud server and access it via its IP Address.
