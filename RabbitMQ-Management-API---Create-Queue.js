//action inputs
//  restHost   : REST:RESTHost
//  vhost      : string
//  name       : string
//  durable    : boolean
//  autoDelete : boolean
//  autoExpire : number
//  maxLength  : number
//  deadLetterExchange    : string
//  deadLetterRoutingKey  : string
//  messageTTL : number 

//action result type:  void


var url = "/api/queues/"+encodeURIComponent(vhost)+"/"+encodeURIComponent(name);

var bodyObj = {};
bodyObj.auto_delete = autoDelete;
bodyObj.durable = durable;
bodyObj.arguments = {};
if (autoExpire > 0) {
	bodyObj.arguments["x-expires"] = autoExpire;
}
if (maxLength > 0) {
	bodyObj.arguments["x-max-length"] = maxLength;
}
if (deadLetterExchange != null && deadLetterExchange.length > 0) {
	bodyObj.arguments["x-dead-letter-exchange"] = deadLetterExchange;
}
if (deadLetterRoutingKey != null && deadLetterRoutingKey.length > 0) {
	bodyObj.arguments["x-dead-letter-routing-key"] = deadLetterRoutingKey;
}
if (messageTTL > 0) {
	bodyObj.arguments["x-message-ttl"] = messageTTL;
}

var request = restHost.createRequest("PUT", url, JSON.stringify(bodyObj));
request.contentType = "application/json";

var response = request.execute();
if (response.statusCode < 300) {
	System.log("Status Code: "+response.statusCode);
	System.log("Response Body: "+response.contentAsString);
	System.log("Successfully Created Queue: "+name);
	Server.log("Successfully Created Queue", name);
} else {
	//an error occured
	System.error("Status Code: "+response.statusCode);
	System.error("Response Body: "+response.contentAsString);
	throw("Could not create queue: "+response.contentAsString);
}