This app is intended to demonstrate basic features and functionality
of the Node.ACS platform, specifically:

1. General Node.ACS / Express configuration
2. User creation
3. Login
4. Object creation
5. Object query

To run this app you will need to install Node.ACS using the following command-
"sudo npm install ACS -g"

Then from within the main project folder-
"acs run"

The site will be available at http://localhost:<PORT> (typically 8080);


Other notes:

JSON files cannot be commented so the following section is directed at the config.json file                                          
	- All routes by default use the "get" request                                                                         
	- A different request type can be declared in the route object using "method" : "<METHOD>"                                                
	- Strings can be passed into the route with myroute/:mystring and then caught using req.params.mystring                                    
	- Routes are matched and executed in the order they are listed in the array                                                                
     	- to move on to the next matching route, catch the next function in the route callback "function(req, res, next){.."         
       	and call it when needed "next();"                                                                                      
	- Route callbacks are looked for using the following theme: "callback" : "myRouteFile#myRouteCallbackFunction"              

	-Objects in the "filters" array will be executed in order BEFORE any "routes", they always use the "all" method               
 		- meaning they will match any method                                                                             


A live version of this app is available at http://4f6bd9adad928cff49bb8b5981c7669a7f6a64b9.cloudapp-preview2.appcelerator.com                                                                                 

Written by:
Sam Schechter,
Clearly Innovative
		