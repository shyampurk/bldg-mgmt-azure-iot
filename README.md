# IoT Chatbot for Facilities Management using Azure IoT Hub

This is a concept demonstration for building a human to machine chat interface using the Microsoft Azure IoT Hub.
This repository contains the accompanying source code for this [blog post](http://radiostud.io/facilities-management-iot-chatbot-azure-iot) which explains this concept.

There are four major tasks to launch this application. 

1. Create Azure IoT Hub service

2. Register device with Azure IoT

3. Launch building simulation

4. Launch chat UI

Refer the steps in each of the sections below to launch the application. Refer to the blog post for a screencast demo of the application in action. 


## Before you begin

For trying out this application, you should first meet these prerequisites. 

	- Clone this repository under a build system
	- Ensure that the build system is connected to the internet and you have Node.js installed on it
	- You should have a valid Microsoft Azure account.
	- You should have a PubNub account.

## Create Azure IoT Hub service

### Step 1 : 
After logging into your Azure Account, click on the “+” symbol to create a new IoT hub service. 

![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/azure/acb_1.png)

### Step 2 :
Select “IoT Hub” under “Internet of Things”.

![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/azure/acb_2.png)

### Step 3 : 
Fill in the following fields to create the service

	1.Name - Give any name for your IotHub.
	2.Pricing and scale tier - For Free accounts default is “S1-standard”, you can go for other options by choosing them.
	3.IoT Hub units - IoT Hub units determine your daily message quota. If you want more you can purchase them, but for free trail default is 1.
	4.Device-to-cloud partitions - The number of partitions for device-to-cloud messages by default it will be 4. You can leave it at that.
	5.Subscription - Select subscription type ,for trial account it will be Free Trial.
	6.Resource group - Create a new Resource group for your service. You can choose "default-group" as the name.
	7.Location - Select a location that is nearest to you. You cna also leave it to the default setting.
	8.You can choose the option “Pin to dashboard” to show it on the dashboard.
	
Then click on the “Create” button

![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/azure/acb_3.png)

![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/azure/acb_4.png)


After some time, you can see the Created service.

![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/azure/acb_5.png)


### Step 4 : 
Get the generated keys of your newly created IoT service. 
	
	1. Click on the service you have created.
	2. Click on the “Shared access policies”.
	3. Select “iothubowner” to see your keys.

![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/azure/acb_6.png)

### Step 5 : 
Copy those keys and connection strings into a text file and save them. These will be used later.

![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/azure/acb_7.png)


### Step 6 : 
Open the newly created iothub, and click on the "Overview", and save the "Hostname".
![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/azure/acb_8.png)


## Register device with Azure IoT

We have two light sockets as our devices for this application. We are now going to create those two devices and also register them with our IoT service. 

### Step 1 : 
Open the device creation code, createDevice/[createdevice.js](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/createDevice/createdevice.js)

	1.In line number 6, enter the Hostname you got in the step 6 under "Create Azure IoT Hub service" section.
	2.In line number 8, enter the "primarykey" out of those keys that you got in step 5 under "Create Azure IoT Hub service" section.

### Step 2 : 
Then run the code using Node.js command

		sudo npm install -g azure-iothub ## This is to install azure-iothub node package 

		node createdevice.js ## This node script will create and register the devices 

![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/code/azc1.png)

### Step 3 : 
Save those device keys appearing in the console output in the text file.

![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/azure/acb_9.png)
 
If you now click on the "Device Explorer" in the side menu, you can see that the devices "bulb1" and "bulb2" are created in you Azure IoT service.

## Launch building simulation

The building simulation web page is serverd by a Node.js instance. Check out the [building simulation Node.js project source](https://github.com/shyampurk/bldg-mgmt-azure-iot/tree/master/azure-building).

Refer this [README file](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/azure-building/README.md) and follow the steps to launch the server. 

## Launch chat UI

The chat UI web page is serverd by yet another Node.js instance. Check out the [chat UI Node.js project source](https://github.com/shyampurk/bldg-mgmt-azure-iot/tree/master/azure-chat).

Refer this [README file](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/azure-chat/README.md) and follow the steps to launch the server.



## Application Demo

Here is how two users interact with two devices via the chat UI of this application. 

![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/IoT-Chatbot-Interaction.gif)

For more information regarding the creation of the IoT Hub please go through this [page](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-node-node-getstarted)



