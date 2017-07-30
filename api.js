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
		success: callback
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

// Makes PATCH requests to API
API.Request.Patch = function(url, data, callback) {
	$.ajax({
		type: "PATCH",
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
	API.Request.Get("/api/projects", function(data) {
		data.forEach(function(proj) {
			proj.seeking = [];
			proj.has = [];
			proj.tags.forEach(function(tag) {
				if (tag[0] == "L") proj.seeking.push(tag.substr(1));
				if (tag[0] == "H") proj.has.push(tag.substr(1));
			});
		});
		callback(data);
	});
}

// Gets single project with given ID
API.Projects.getById = function(id, callback) {
	API.Request.Get("/api/projects/" + id, function(data) {
		data.seeking = [];
		data.has = [];
		data.tags.forEach(function(tag) {
			if (tag[0] == "L") data.seeking.push(tag.substr(1));
			if (tag[0] == "H") data.has.push(tag.substr(1));
		});
		callback(data);
	});
}

// Gets number of projects
API.Projects.count = function(callback) {
	API.Request.Get("/api/projects/count", function(data) {
		callback(data.count);
	});
}

// Changes project attribute
API.Projects.update = function(id, name, value, callback) {
	var dat = {};
	dat[name] = value;
	API.Request.Patch("/api/projects/" + id, dat, callback);
}

// Appends to project array
API.Projects.append = function(id, aname, value, callback) {
	API.Projects.getById(id, function(old_obj) {
		var old_array = old_obj[aname];
		old_array.push(value);
		API.Projects.update(id, aname, old_array, callback);
	});
}

// Creates project from 'info' object
API.Projects.create = function(info, callback) {
	var tags = [];
	info.seeking.forEach(function(tg) {
		tags.push("L" + tg);
	});
	info.has.forEach(function(tg) {
		tags.push("H" + tg);
	})
	API.Request.Post("/api/createProject", {
		name: info.name,
		description: info.description,
		tags: tags,
		members: info.members,
		website: info.homepage,
		thumbnail: info.thumbnail
	}, callback);
}

// app.post('/api/createProject',function(req,res){
//     var projectname = req.body.name;
//     var description = req.body.description;
//     var tags = req.body.tags;
//     var members = req.body.members;
//     var website = req.body.website;
//     var thumbnail = req.body.thumbnail;
//
//     var error = validate_project(projectname);
//
//     if(!error) request.post(SELF_URL+"/api/projects",{form:{
//         name: projectname,
//         description: description,
//         tags: tags,
//         members: members,
//         website: website,
//         thumbnail:thumbnail,
//     }});
//     res.send({error: error});
// });
