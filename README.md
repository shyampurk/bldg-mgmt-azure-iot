# Azure Device chat bot

Prerequisites - You should have a Valid Microsoft Azure account.

Step 1 : After logging into your Account Click on the “+” symbol to create new iot hub service. 
![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/azure/acb_1.png)

Step 2 : Select “IoT Hub” under “Internet of Things”.
![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/azure/acb_2.png)

Step 3 : Fill the following fields to create the service
	Name - Give any name for your IotHub.
	Pricing and scale tier - For Free accounts default is “S1-standard”, you can go for other options by choosing them.
	IoT Hub units - IoT Hub units determine your daily message quota. If you want more you can purchase them, for free trail default is 1.
	Device-to-cloud partitions - The number of partitions for device-to-cloud messages by default it will be 4.
	Subscription - Select subscription type ,for trial account it will be Free Trial.
	Resource group - Create a new Resource group for your service.
	Location - Select a location that is near to you.
	You can choose the option “Pin to dashboard” to show it on the dashboard.
Then click on the “Create” button

![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/azure/acb_3.png)

![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/azure/acb_4.png)

You can see the Created service.

![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/azure/acb_5.png)


Step 4 ) Getting the keys of your service.
	Click on the service you have created
Step 5) Click on the “Shared access policies”
Step 6) Select “iothubowner” to see your keys.

![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/azure/acb_6.png)

Step 7 ) Copy those keys and connection strings.
This connection string we are going to use it in the codes.

![alt-tag](https://github.com/shyampurk/bldg-mgmt-azure-iot/blob/master/screenshots/azure/acb_7.png)

For more information regarding the creation of the IoT Hub please go through this [page](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-node-node-getstarted)

