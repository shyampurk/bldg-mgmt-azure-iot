# Azure Device chat bot

Prerequisites - You should have a Valid Microsoft Azure account.

## Step 1 : 
After logging into your Account Click on the “+” symbol to create new iot hub service. 

![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/azure/acb_1.png)

## Step 2 :
Select “IoT Hub” under “Internet of Things”.

![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/azure/acb_2.png)

## Step 3 : 
Fill the following fields to create the service

	1.Name - Give any name for your IotHub.
	2.Pricing and scale tier - For Free accounts default is “S1-standard”, you can go for other options by choosing them.
	3.IoT Hub units - IoT Hub units determine your daily message quota. If you want more you can purchase them, for free trail default is 1.
	4.Device-to-cloud partitions - The number of partitions for device-to-cloud messages by default it will be 4.
	5.Subscription - Select subscription type ,for trial account it will be Free Trial.
	6.Resource group - Create a new Resource group for your service.
	7.Location - Select a location that is near to you.
	8.You can choose the option “Pin to dashboard” to show it on the dashboard.
	
Then click on the “Create” button

![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/azure/acb_3.png)

![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/azure/acb_4.png)

You can see the Created service.

![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/azure/acb_5.png)


## Step 4 : 
Getting the keys of your service.
	Click on the service you have created
## Step 5 : 
Click on the “Shared access policies”

## Step 6 :
Select “iothubowner” to see your keys.

![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/azure/acb_6.png)

## Step 7 : 
Copy those keys and connection strings.
This connection string we are going to use it in the codes.

![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/azure/acb_7.png)


## Step 8 : 
Open the newly created iothub, and click on the overview, and save the "Hostname".
![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/azure/acb_8.png)


# Creating the Devices

## Step 1 : 
Open the code createDevice/[createdevice.js](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/createDevice/createdevice.js)

	1.In line number 6 enter the Hostname you got in the above step 8.
	2.In line number 8 enter the "primarykey" out of those keys you got it in the above step 7.

## Step 2 : 
Then run the code using command

		node createdevice.js

![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/code/azc1.png)

## Step 3 : 
Save those device keys

![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/azure/acb_9.png)
 
You can see the Devices created in the azure iot hub.

# code changes

Open the code azure-chat/routes/[index.js](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/azure-chat/routes/index.js)

	1) line number 17 - hostname
	2) line number 20 - primarykey
	
Open the code azure-building/routes/[index.js](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/azure-building/routes/index.js)

	1) line number 18 - hostname
	2) line number 86 - deviceid 1 (bulb 1)
	3) line number 88 - deviceid 2 (bulb 2)


For more information regarding the creation of the IoT Hub please go through this [page](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-node-node-getstarted)



