// Container for API methods
var API = {};

// URL that the API posts to
// API.URL = "http://localhost:3000";
API.URL = "https://cg-loopback.mybluemix.net";

// Container for request methods
API.Request = {};

// Makes GET request to API
API.Request.Get = function(url, callback) {
	$.ajax({
		type: "GET",
		url: API.URL + url,
		success: callback,
		dataType: "json"
	});
}

// Makes POST request to API
API.Request.Post = function(url, data, callback) {
	$.ajax({
		type: "POST",
		url: API.URL + url,
		data: data,
		success: callback,
		dataType: "json"
	});
}

// Container for methods relating to users
API.Users = {};

// Gets all users in database as array
API.Users.getAll = function(callback) {
	API.Request.Get("/api/users", callback);
}

// Gets single user with given ID
API.Users.getById = function(id, callback) {
	API.Request.Get("/api/users/" + id, callback);
}

// Creates a user from 'info' object
API.Users.create = function(info, callback) {
	API.Request.Post("/api/createuser", {
		username: info.username,
		email: info.email,
		fname: info.first_name,
		lname: info.last_name,
		location: info.location,
		tags: info.tags
	}, callback);
}

// Container for methods relating to projects
API.Projects = {};

// Gets all projects in database as array
API.Projects.getAll = function(callback) {
	API.Request.Get("/api/projects", callback);
}

// Gets single project with given ID
API.Projects.getById = function(id, callback) {
	API.Request.Get("/api/projects/" + id, callback);
}
