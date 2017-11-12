
/*
 * GET home page.
 */

exports.index = function(req, res){
	
	var Nexmo = require('nexmo');

	var nexmo = new Nexmo({
	  apiKey:'51a228ab' ,
	  apiSecret:'4331f47de69da867' ,
	});

	var from = '12016728822';
	var to = '14083102536';
	var text = 'Nice to see you at our restaurant today. How was your experience ?';

	console.log(nexmo.message.sendSms(from, to, text));
  res.render('index', { title: 'Express' });
};



exports.incoming1 = function(req, res){
	var apiai = require('apiai');
	var Nexmo = require('nexmo');
	var app = apiai("93e838129c1f441d824b26677b715f93");
	console.log(req.query.text); 
	var request_api = app.textRequest(req.query.text, {
	    sessionId: '001'
	});
	 
	request_api.on('response', function(response) {
	    console.log("response from api.ai"+response.result.fulfillment.speech);
	    var nexmo = new Nexmo({
	  	  apiKey:'51a228ab' ,
	  	  apiSecret:'4331f47de69da867' ,
	  	});

	  	var from = '12016728822';
	  	var to = '14083102536';
	  	//var text = 'hello';

	  	console.log(nexmo.message.sendSms(from, to, response.result.fulfillment.speech));
	});
	 
	request_api.on('error', function(error) {
	    console.log(error);
	});
	 
	request_api.end();
	
	
	res.status(200).end();
};