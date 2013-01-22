/**
This file declares all of the "callback functions for your routes"
*/


//Require ACS Module
var ACS = require('acs').ACS;
var acsKey = '<YOUR OAUTH KEY>';
var acsSecret = '<YOUR OAUTH SECRET>';
//Initialize ACS with your credentials - (<OAUTH Key>, <OAUTH Secret>)
ACS.init(acsKey, acsSecret);

//This function loads the root page, in this case the login page "myurl.com/"
function index(req, res) {
	res.render('login');
}


//Attempts to login a user
function login(req, res) {
	ACS.Users.login({
		login : req.body.login,  //named form elements are passed into the req.body object
		password : req.body.password
	}, function(data){
		console.log('login callback');
		if(data.success){ // If the login was successful, redirect to the route which loads the content section
			console.log('redirecting home');
			req.session.user = data.users[0];
			res.redirect('/home');
		} else { // Otherwise redirect back to the root page
			req.flash('error', 'Error: ' + data.message);
			res.redirect('/');
		}
	}, req, res) // You must always pass the req and res objects into the ACS module
				 // for session/cookie handling
}

//Attempts to create an account
function newAccount(req, res){
	console.log('making new account');
	console.log(JSON.stringify(req.body));
	ACS.Users.create({
		username : req.body.email,  //Values that are passed in the post function
		password : req.body.password,// are available in the req.body object
		password_confirmation : req.body.password_confirmation
	}, function(data){
		if(data.success){
			req.session.user = data.users[0];
		}
		console.log('user callback: ' + JSON.stringify(data));
		res.end(JSON.stringify(data)); // regardless of the result,
	})									// pass the data object back into the view
}										// which will handle the error / success conditions

//This route loads the homepage
//By structuring the site this way a user will see myurl.com/home
// whenever they are on this page
function home(req, res) {
	console.log('rendering home');
	res.render('home', {username : req.session.user.username}); // You can pass an object
															    // with additional values into an EJS page
}																// which can be accessed inside that page

//Posts a new message to our messsage board
function postNewMessage(req, res){
	console.log('posting message: ' + req.body.newMessageTitle)
	ACS.Posts.create({
		title : req.body.newMessageTitle,
		content : req.body.newMessageContent,
	}, function(data){
		res.end(JSON.stringify(data)); // pass the data object back,
	}, req, res) //don't forget!		// let the view handle error / success
}

//Load posts from ACS
function getMessages(req, res){
	console.log('getting messages');
	if(!req.session.last_update){  //if a update has already happened, only get the new messages
		req.session.last_update = new Date(); // save this value to the req.session object 
											  // so that it is unique to each user
		var args = { 
			order : '-updated_at', // same args available in all other
			page : req.params.page,			  // ACS API's  (web, Titanium)
			per_page : 10
		};
	} else {
		var args = {
			order : '-updated_at',
			page : req.params.page,
			per_page : 10
		}
	}

	ACS.Posts.query(args, function(data){
		res.end(JSON.stringify(data)); // send the posts back to the view
	}, req, res)					   // for success / error handling and display
}