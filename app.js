
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/incoming1', routes.incoming1);
app.get('/users', user.list);


var QuickBooks = require('node-quickbooks')
var consumerKey="qyprdrnbGdQEBy9fEI5bbPaRQIoaDW";
var consumerSecret="83AyUlBLnLHNbWGT7170ymGehgHLxpArTUJm2Npx";
oauthToken="qyprdmctieL0YmGJK0UfJnSa92DeHe5PSVgsZ4qt3J7wSMTC";
oauthTokenSecret="3hvAKYJBIa8CrhPuukOWJsPCChb7A9KNVhbtwPyJ";
realmId="123145710497954";


    //a route which calls CreateSalesReciept
    app.get('/createSalesReceipt', function (req, res) {

		console.log("In qboConnect");
		var qbo = new QuickBooks(consumerKey,
				consumerSecret,
				oauthToken,
				oauthTokenSecret,
				realmId,
				false, // don't use the sandbox (i.e. for testing)
		true); // turn debugging on

        //Check to make sure the front end is sending an item selected, if it is null, render the error page
        
            var ItemRef = 11;
            //building the createSalesReceipt post body
            qbo.createSalesReceipt({
				"Line": [{
					"Id": "1",
					"LineNum": 1,
					"Description": req.param.description,
					"Amount": 45.0,
					"DetailType": "SalesItemLineDetail",
					"SalesItemLineDetail": {
						"ItemRef": {
						    "value": "19",
						    "name": "bha"
						},
						"UnitPrice": 45,
						"Qty": 1,
						"TaxCodeRef": {
						    "value": "NON"
						}
					}
				}]
			}, function (err, SalesReceipt) {
                //render the error page if an error is returned, else, render the salesReciept view
                if (err) {
                    res.render('errorPage.ejs', { locals: { errorMessage: err.Fault.Error[0] } })
                } else {
                    res.send("Success");
                }
            })
        
    })



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
