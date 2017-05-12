$(document).ready(function () {

// Initializing Variables

	var chatPublishChannel = 'pubsub_device_status_chat',
		chatSubscribeChannel = 'pubsub_device_status_chat',
	    
	    inputMessage = $('#inputMessage'),
	    inputMessageSubmit = $("#inputMessageSubmit"),
	    messageList = $("#message-list"),
	    onlineUsersList = $("#onlineUsers"),
	    AzureUserName = $("#AzureUserName"),
	    AzureUserRole = 'Facility Mgmt Team',
	    Azurelogin = $("#Azurelogin"),
	    Azureleave = $("#leave"),
	    LoginScreen = $(".overlay"),

	    bulb1 = $('#bulb1'),
	    bulb2 = $('#bulb2'),

	    pub_key = 'pub-c-929488ef-0e05-44de-88b7-c90159bcc8ba',
	    sub_key = 'sub-c-ca91f508-297f-11e7-a5a9-0619f8945a4f',
		
		AzureUserJoinList = [],
		UserName,
		UserRole;

// Init pubnub with keys
	var pubnub = new PubNub({
	    subscribeKey: sub_key,
	    publishKey: pub_key,
	    ssl: true
	})

// Subscribes and Listens to the azure & user messages
	pubnub.addListener({
	    message: function(m) {
	        console.log(m.message)
	        var msg = m.message;
	        message_listing(msg); 
	    }
	})

// Trigger click event on Enter Keypress 
	AzureUserName.keypress(function (e) {
	 	var key = e.which;
	 	if(key == 13){
	    	Azurelogin.click();
	    	return false;  
	  	}
	});

	inputMessage.keypress(function (e) {
	 	var key = e.which;
	 	if(key == 13){
	    	inputMessageSubmit.click();
	    	return false;  
	  	}
	});

/******************************************************************************************
    Function    	: message_listing
    Description 	: Displays the user message data , bulb status and Online user list.
    Commands(type) 	: 	1.Join
    						Join message is for adding user to the online status window.
    			  		2.Message
							On user message , displays the message on the message window.

*******************************************************************************************/
function message_listing(m){
	if(m.command == "join"){
		
		AzureUserJoinList.push(m.user);
		console.log(AzureUserJoinList.length)

		var userData = {
			Azure_UserIcon : AzureUserJoinList.indexOf(m.user),
			Azure_UserName : m.user,
			Azure_UserRole : m.role
		}
		if(AzureUserJoinList.length == 1){
			var userTemplate = ['<li class="media clearList" id={{Azure_UserName}}>',
                                '<div class="media-body" style="background:#d5e5e1">',
                                    '<div class="media">',
                                        '<a class="pull-left" href="#">',
                                            '<img class="media-object img-circle" style="max-height:40px;" src="img/userImages/man-{{Azure_UserIcon}}.png" />',
                                        '</a>',
                                        '<div class="media-body" >',
                                            '<h5>{{Azure_UserName}}</h5>',
                                            '<small class="text-muted" style="text-transform: uppercase;">{{Azure_UserRole}}</small>',
                                        '</div>',
                                    '</div>',
                                '</div>',
                            '</li>'].join("\n");
		}else{
			var userTemplate = ['<li class="media clearList" id={{Azure_UserName}}>',
                                '<div class="media-body">',
                                    '<div class="media">',
                                        '<a class="pull-left" href="#">',
                                            '<img class="media-object img-circle" style="max-height:40px;" src="img/userImages/man-{{Azure_UserIcon}}.png" />',
                                        '</a>',
                                        '<div class="media-body" >',
                                            '<h5>{{Azure_UserName}}</h5>',
                                            '<small class="text-muted" style="text-transform: uppercase;">{{Azure_UserRole}}</small>',
                                        '</div>',
                                    '</div>',
                                '</div>',
                            '</li>'].join("\n");
		}
		var userList = Mustache.render(userTemplate, userData);
    	onlineUsersList.append(userList);
	
	}else if(m.command == "message"){
		
		if(m.user == 'bulb1'){
			if(m.userMessage == 'ON'){
				bulb1.attr("src", "img/status/on.svg");
			}else if(m.userMessage == 'OFF'){
				bulb1.attr("src", "img/status/off.svg");			
			}else if(m.userMessage == 'Malfunction'){
				bulb1.attr("src", "img/status/malfunc.svg");
			}
		}else{
			if(m.userMessage == 'ON'){
				bulb2.attr("src", "img/status/on.svg");
			}else if(m.userMessage == 'OFF'){
				bulb2.attr("src", "img/status/off.svg");			
			}else if(m.userMessage == 'Malfunction'){
				bulb2.attr("src", "img/status/malfunc.svg");
			}
		}

		
		var count = 0;
		for (var i = 0; i < AzureUserJoinList.length; i++) {
			if (AzureUserJoinList[i] !== m.user){
				count++;
			}
			else{
				break;
			}
		};
		if(count == AzureUserJoinList.length){
			if(m.user == 'bulb1' || m.user == 'bulb2'){
				console.log("devices already added")
			}else{
				AzureUserJoinList.push(m.user);

				var userData = {
					Azure_UserIcon : AzureUserJoinList.indexOf(m.user),
					Azure_UserName : m.user,
					Azure_UserRole : m.role
				}

				var userTemplate = ['<li class="media clearList" id={{Azure_UserName}}>',
	                            '<div class="media-body">',
	                                '<div class="media">',
	                                    '<a class="pull-left" href="#">',
	                                        '<img class="media-object img-circle" style="max-height:40px;" src="img/userImages/man-{{Azure_UserIcon}}.png" />',
	                                    '</a>',
	                                    '<div class="media-body" >',
	                                        '<h5>{{Azure_UserName}}</h5>',
	                                        '<small class="text-muted" style="text-transform: uppercase;">{{Azure_UserRole}}</small>',
	                                    '</div>',
	                                '</div>',
	                            '</div>',
	                        '</li>'].join("\n");

				var userList = Mustache.render(userTemplate, userData);
		    	onlineUsersList.append(userList);
	    	}
		}
		
		if(m.user == 'bulb1'){
			var messageData = {
				Azure_UserIcon 	: 'light-bulb-1',
				userName 		: m.user,
				UserRole        : m.role,
		        userMessageBody : m.userMessage
		    }
		}else if(m.user == 'bulb2'){
			var messageData = {
				Azure_UserIcon 	: 'light-bulb-2',
				userName 		: m.user,
				UserRole        : m.role,
		        userMessageBody : m.userMessage
		    }
		}else{
			var messageData = {
				Azure_UserIcon 	: AzureUserJoinList.indexOf(m.user),
				userName 		: m.user,
				UserRole        : m.role,
		        userMessageBody : m.userMessage
		    }
		}

		var messageTemplate = ['<li class="media clearMsgList" >',
                            '<div class="media-body">',
                                '<div class="media">',
                                    '<a class="pull-left" href="#">',
                                        '<img class="media-object img-circle" src="img/userImages/man-{{Azure_UserIcon}}.png" height="40" width="40" />',
                                    	'<p style="text-align:center;">{{userName}}</p>',
                                    '</a>',
                                    '<div class="media-body" >{{userMessageBody}}',
                                       ' <br />',
                                       '<small class="text-muted" style="text-transform: uppercase;"> {{UserRole}} </small>',
                                        '<hr />',
                                    '</div>',
                                '</div>',
                            '</div>',
                        '</li>'].join("\n");
        var list = Mustache.render(messageTemplate, messageData);
    	messageList.append(list);

    	var height = 0;
		$('div li').each(function(i, value){
		    height += parseInt($(this).height());
		});

		height += '';

		$('div').animate({scrollTop: height});
	
	}else if(m.command == "leave"){

		$( "li" ).remove( "#"+m.user );
	}
};

/******************************************************************
    Function    : Input message
    Channel     : 'building_device_status_chat'
    Description : Publishes the user message data to chat window
*******************************************************************/
	inputMessageSubmit.click(function (event) {
        var chatMessage = {
        					"command":"message",
        					"user":UserName,
        					"role":UserRole,
        					"userMessage":inputMessage.val()
        				}
        if(inputMessage.val().length != 0){
        	pub_publish(chatMessage);
        	inputMessage.val("");
        }
    });

/*************************************************************
    Function    : login chat
    Channel     : 'building_device_status_chat'
    Description : Publishes the user login data to chat window
**************************************************************/
	Azurelogin.on( "click", function() {

		pubnub.subscribe({
		    channels: [chatSubscribeChannel],
		})
		setTimeout(function(){
			var loginData = {"command":"join","user":AzureUserName.val(),"role":AzureUserRole}
				UserName = AzureUserName.val();
				UserRole = AzureUserRole;
	        	pub_publish(loginData);
	        	LoginScreen.fadeOut(1000);
	        	setTimeout(function(){
	        		LoginScreen.css("z-index","-10");
	        		AzureUserName.val("")
	        	},1000);
        	document.getElementById('chat-header-username').innerHTML = UserName;
        	document.getElementById('chat-header-role').innerHTML = UserRole;
		},1000);
	});

/*************************************************************
    Function    : Leave chat
    Channel     : 'building_device_status_chat'
    Description : Publishes the user leave messages to 
    			  chat window and returns to login page
**************************************************************/
	Azureleave.on( "click", function() {
		var leaveData = {"command":"leave","user":UserName,"role":UserRole};
		    pub_publish(leaveData);
		    $( "li" ).remove(".clearMsgList");
		    $( "li" ).remove(".clearList");
		    AzureUserJoinList.length = 0;
		    LoginScreen.css("z-index","10");
		    LoginScreen.fadeIn(1000);
		   	pubnub.unsubscribe({
			    channels: [chatSubscribeChannel]
			})
	});

/*************************************************************
    Function    : pub_publish()
    Channel     : 'building_device_status_chat'
    Description : Publishes the user messages to chat window
**************************************************************/
	function pub_publish(pub_msg){
		pubnub.publish({
		        message: pub_msg,
		        channel: chatPublishChannel,
		        sendByPost: false, // true to send via post
		        storeInHistory: true, //override default storage options
		    },
		    function (status, response) {
		    	console.log(response)
		        // handle status, response
		    }
		);
	};

});

