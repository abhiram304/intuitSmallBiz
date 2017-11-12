
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
	var to = '15102039956';
	var text = 'hello';

	console.log(nexmo.message.sendSms(from, to, text));
  res.render('index', { title: 'Express' });
};



exports.incoming1 = function(req, res){
	console.log(req.query.text);
	res.status(200).end();
};