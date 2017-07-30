var API = {};

API.URL = "https://cg-loopback.mybluemix.net";
// API.URL = "http://localhost:3000";

API.Request = {};

API.Request.Get = function(url, callback) {
	$.ajax({
		type: "GET",
		url: API.URL + url,
		success: callback,
		dataType: "json"
	});
}

API.Request.Post = function(url, data, callback) {
	$.ajax({
		type: "POST",
		url: API.URL + url,
		data: data,
		success: callback,
		dataType: "json"
	});
}

API.Users = {};

API.Users.getAll = function(callback) {
	API.Request.Get("/api/users", callback);
}

API.Users.getById = function(id, callback) {
	API.Request.Get("/api/users/" + id, callback);
}

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

API.Projects = {};

API.Projects.getAll = function(callback) {
	API.Request.Get("/api/projects", callback);
}

API.Projects.getById = function(id, callback) {
	API.Request.Get("/api/projects/" + id, callback);
}
