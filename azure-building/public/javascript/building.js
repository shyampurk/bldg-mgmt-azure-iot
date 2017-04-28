/****************************************************************

		BUILDING MGMT - AZURE IOT - CHAT

****************************************************************/

var DELAY = 700,
    clicks = 0,
    timer = null;

// Initialize Pubnub keys

var pub_key = 'pub-c-929488ef-0e05-44de-88b7-c90159bcc8ba',
	sub_key = 'sub-c-ca91f508-297f-11e7-a5a9-0619f8945a4f';

var pubnub = new PubNub({
    subscribeKey: sub_key,
    publishKey: pub_key,
    ssl: true
})

/***************************************************************
	function 	: pub_publish()
	Params 		: pub_msg --> publish message
	Channel 	: 'devicePublishChannel'
	Description : Publishes the bulb status to the nodejs server

****************************************************************/
function pub_publish(pub_msg){
	pubnub.publish({
        message: pub_msg,
        channel: 'devicePublishChannel',
        storeInHistory: true, //override default storage options
    });
};

$(document).ready(function() {


// Initial bulb states 
// 0 - Off
// 1 - On
// 2 - Malfunction

	var bulb1State = 0;
	var bulb2State = 0;

	var bulb1 = $('#systemAdmin');
	var bulb2 = $('#mainHall');

/*******************************************************************
	Events 		: Click
	Description : Turn on/off the bulb and Sends the
					status to the nodejs server

	**********************************************************

	Events 		: DoubleClick
	Description : Malfunction the bulb and Sends the
					status to the nodejs server
*******************************************************************/

	bulb1
	    .on("click", function(e){
	        clicks++;  //count clicks
	        if(clicks === 1) {
	            timer = setTimeout(function() {
	                
	                if(bulb1State == 0){
	                	bulb1State = 1;
	                	bulb1Status = 'ON';
	                	bulb1.attr("src", "img/bulbon.svg");
	                }else if(bulb1State == 1){
	                	bulb1State = 0;
	                	bulb1Status = 'OFF';
	                	bulb1.attr("src", "img/bulboff.svg");
	                }else if(bulb1State == 2){
	                	bulb1State = 1;
	                	bulb1Status = 'ON';
	                	bulb1.attr("src", "img/bulbon.svg");
	                }

	            	var data = { deviceId: 'bulb1', lightstatus: bulb1Status};
				    pub_publish(data);
				    clicks = 0;  
	            }, DELAY);
	        } else {
	            clearTimeout(timer); 

	            var data = { deviceId: 'bulb1', lightstatus:'Malfunction' };
	            bulb1.attr("src", "img/malfunction.svg");
	            bulb1State = 2;
			    pub_publish(data);
	            clicks = 0;  //after action performed, reset counter
	        }
	    })
	    .on("dblclick", function(e){
	        e.preventDefault();  //cancel system double-click event
	    });


///////////////////////////////////////////////////////////////////////////////////////////////////

 
    bulb2
	    .on("click", function(e){
	        clicks++;  //count clicks
	        if(clicks === 1) {
	            timer = setTimeout(function() {
	                
	            	if(bulb2State == 0){
	                	bulb2State = 1;
	                	bulb2Status = 'ON';
	                	bulb2.attr("src", "img/bulbon.svg");
	                }else if(bulb2State == 1){
	                	bulb2State = 0;
	                	bulb2Status = 'OFF';
	                	bulb2.attr("src", "img/bulboff.svg");
	                }else if(bulb2State == 2){
	                	bulb2State = 1;
	                	bulb2Status = 'ON';
	                	bulb2.attr("src", "img/bulbon.svg");
	                }

	            	var data = { deviceId: 'bulb2', lightstatus: bulb2Status };
				    pub_publish(data);
	                clicks = 0;  
	            }, DELAY);
	        } else {
	            clearTimeout(timer); 

	            var data = { deviceId: 'bulb2', lightstatus:'Malfunction' };
	            bulb2.attr("src", "img/malfunction.svg");
	            bulb2State = 2;
			    pub_publish(data);
	            clicks = 0;  //after action performed, reset counter
	        }
	    })
	    .on("dblclick", function(e){
	        e.preventDefault();  //cancel system double-click event
	    });

});


