// initialize app
function start(app, express) {
	var flash = require('connect-flash');

	app.use(express.favicon(__dirname + '/public/images/favicon.ico'));		//set favicon
	app.use(express.bodyParser());
    app.use(express.cookieParser('secretKey'));  //Required by session
    app.use(express.session({secret : 'meow'})); //Allows connection-specific data
    app.use(flash());							 //Allows for 1 time (route) messages to be passed
    app.use(function(req, res, next){
    	res.locals.flash = req.flash();   //anything stored on res.locals will become
    	next();							  // available in the view.  ex: <%- flash %>
    })

}

// release resources
function stop() {
	
}