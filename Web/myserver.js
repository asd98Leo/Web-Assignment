var http = require('http');
var fs = require("fs");

http.createServer(function(request, response) {

	if(request.url === "/index"){
		//sendFileContent(response, "callajax.html", "text/html");
		sendFileContent(response, "index.html", "text/html");
	}
  else if(request.url === "/about"){
		//console.log("Requested URL is url" +request.url);
		sendFileContent(response, "about.html", "text/html");
	}
	else if(request.url === "/post"){
		//console.log("Requested URL is url" +request.url);
		sendFileContent(response, "post.html", "text/html");
	}
	else if(request.url === "/contact"){
		//console.log("Requested URL is url" +request.url);
		sendFileContent(response, "contact.html", "text/html");
	}
	else if(request.url === "/login"){
		//console.log("Requested URL is url" +request.url);
		sendFileContent(response, "login.html", "text/html");
	}
	else if(request.url === "/"){
		console.log("Requested URL is url" +request.url);
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + request.url);
	}
	else if(/^\/[a-zA-Z0-9\/]*.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
		}
	else if(/^\/[a-zA-Z0-9\/]*.min.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
		}
	else if(/^\/[a-zA-Z0-9\/]*.bundle.min.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
	else if(/^\/[a-zA-Z0-9\/]*.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
		}
	else if(/^\/[a-zA-Z0-9\/]*.min.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
		}
	else if(/^\/[a-zA-Z0-9\/]*.font-awesome.min.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}
	else if(/^\/[a-zA-Z0-9\/]*.jpg$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "image/jpg");
	}
	else if(/^\/[a-zA-Z0-9\/]*.ico$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "image/x-ico");
	}
	else if(/^\/[a-zA-Z0-9\/]*.fontawesome-webfont.svg/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "image/svg+xml");
	}
	else if(/^\/[a-zA-Z0-9\/]*.fontawesome-webfont.eot/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "application/x-font-eot");
	}
	else if(/^\/[a-zA-Z0-9\/]*.fontawesome-webfont.woff/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "application/x-font-woff");
	}
	else if(/^\/[a-zA-Z0-9\/]*.fontawesome-webfont.ttf/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "application/x-font-ttf");
	}else{
		console.log("Requested URL is: " + request.url);
		response.end();
	}
}).listen(9999)

function sendFileContent(response, fileName, contentType){
	console.log("File URL is: " + fileName);
	fs.readFile(fileName, function(err, data){
		if(err){
			response.writeHead(404);
			response.write("Not Found!");
		}
		else{
			response.writeHead(200, {'Content-Type': contentType});
			response.write(data);
		}
		response.end();
	});
}