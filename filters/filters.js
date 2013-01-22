

//before loading any route, checks if a session is active, and a user
//has successfully logged in.  If not, kicks back to the login page
function checkSession(req, res, next){
	console.log('checking session');
	if(req.session.user){
		next();
	} else {
		res.render('login');
	}
}