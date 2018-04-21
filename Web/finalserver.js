var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

(function() {
  var fs, http, qs, server, url;

  http = require('http');

  url = require('url');

  qs = require('querystring');

  fs = require('fs');

  server = http.createServer(function(req, res) {
    var action, form, formData, msg, publicPath, urlData,stringMsg;
		var request = req;
		var response = res;
    urlData = url.parse(req.url, true);
    action = urlData.pathname;
    publicPath = __dirname + "\\public\\";
   console.log(req.url);
    if (action === "/register") {
       console.log("register");
      if (req.method === "POST") {
        console.log("action = post");
        formData = '';
        msg = '';
        return req.on('data', function(data) {
          formData += data;
          
          console.log("form data="+ formData);
          return req.on('end', function() {
            var user;
            user = qs.parse(formData);
            user.id = "123456";
            msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						console.log("mess="+msg);
          console.log("mess="+formData);
           // res.writeHead(200, {
            //  "Content-Type": "application/json",
             // "Content-Length": msg.length
            //});
						MongoClient.connect(dbUrl, function(err, db) {
  					if (err) throw err;
  					var dbo = db.db("mydb");
  					var myobj = stringMsg;
  					dbo.collection("customers").insertOne(myobj, function(err, res) {
    				if (err) throw err;
    				console.log("1 document inserted");
    				db.close();
  					});
					});
						
            return res.end("good");
          });
        });
				
      
      } else {
        //form = publicPath + "ajaxSignupForm.html";
        form = "register.html";
        return fs.readFile(form, function(err, contents) {
          if (err !== true) {
            res.writeHead(200, {
              "Content-Type": "text/html"
            });
            return res.end(contents);
          } else {
            res.writeHead(500);
            return res.end;
          }
        });
      }
			
    } else if( action==="/newpage"){
       res.writeHead(200, {
        "Content-Type": "text/html"
      });
      return res.end("<h1>�w����{Node.js�泾���O2</h1><p><a href=\"/register\">���U</a></p>");
    }
		else if (action === "/index") {
       console.log("index");
      if (req.method === "POST") {
        console.log("action = post");
        formData = '';
        msg = '';
        return req.on('data', function(data) {
          formData += data;
          
          console.log("form data="+ formData);
          return req.on('end', function() {
            var user;
            user = qs.parse(formData);
            user.id = "123456";
            msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						console.log("mess="+msg);
            console.log("mess="+formData);
           // res.writeHead(200, {
            //  "Content-Type": "application/json",
             // "Content-Length": msg.length
            //});
						MongoClient.connect(dbUrl, function(err, db) {
  					if (err) throw err;
  					var dbo = db.db("mydb");
  					var myobj = stringMsg;

						
							
							dbo.collection("customers").find({}).toArray(function(err, result) {
    if (err) throw err;
								for(var i=0;i<result.length;i++){
									if(result[i].userName == myobj.userName){
                    var myquery = { userName: myobj.userName };
                    var newvalues;
                    if(myobj.favreport1=="favreport1"){
   newvalues = { $set: { favreport1:myobj.favreport1 } };
                       }
                    else if(myobj.favreport2=="favreport2"){
   newvalues = { $set: { favreport2:myobj.favreport2 } };
                       }
                    else if(myobj.favreport3=="favreport3"){
   newvalues = { $set: { favreport3:myobj.favreport3 } };
                       }
                    else if(myobj.favreport4=="favreport4"){
   newvalues = { $set: { favreport4:myobj.favreport4 } };
                       }
  dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
  });
    console.log(result[i].userName,result[i].Password,myobj.userName,myobj.Password);
										    db.close();
									 return res.end("good");
								}
								}
								return res.end("notgood");
								
								

	});
							
			//				dbo.collection("customers").find({"Name": "ALEX"}).toArray(function(err, result) {
    //if (err) throw err;
    //console.log(result);
    //db.close();
	//}); 
							
						
					});
						
           
          });
        });
				
      } else {
        //form = publicPath + "ajaxSignupForm.html";
        form = "index.html";
        return fs.readFile(form, function(err, contents) {
          if (err !== true) {
            res.writeHead(200, {
              "Content-Type": "text/html"
            });
            return res.end(contents);
          } else {
            res.writeHead(500);
            return res.end;
          }
        });
      }}
    else if (action === "/login") {
       console.log("login");
      if (req.method === "POST") {
        console.log("action = post");
        formData = '';
        msg = '';
        return req.on('data', function(data) {
          formData += data;
          
          console.log("form data="+ formData);
          return req.on('end', function() {
            var user;
            user = qs.parse(formData);
            user.id = "123456";
            msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						console.log("mess="+msg);
            console.log("mess="+formData);
           // res.writeHead(200, {
            //  "Content-Type": "application/json",
             // "Content-Length": msg.length
            //});
						MongoClient.connect(dbUrl, function(err, db) {
  					if (err) throw err;
  					var dbo = db.db("mydb");
  					var myobj = stringMsg;

						
							
							dbo.collection("customers").find({}).toArray(function(err, result) {
    if (err) throw err;
								for(var i=0;i<result.length;i++){
									if(result[i].userName == myobj.userName && result[i].Password == myobj.Password){
    console.log(result[i].userName,result[i].Password,myobj.userName,myobj.Password);
										    db.close();
									 return res.end("good");
								}
								}
								return res.end("notgood");
								
								

	});
							
			//				dbo.collection("customers").find({"Name": "ALEX"}).toArray(function(err, result) {
    //if (err) throw err;
    //console.log(result);
    //db.close();
	//}); 
							
						
					});
						
           
          });
        });
				
      } else {
        //form = publicPath + "ajaxSignupForm.html";
        form = "login.html";
        return fs.readFile(form, function(err, contents) {
          if (err !== true) {
            res.writeHead(200, {
              "Content-Type": "text/html"
            });
            return res.end(contents);
          } else {
            res.writeHead(500);
            return res.end;
          }
        });
      }}
    else if (action === "/fav") {
       console.log("fav");
      if (req.method === "POST") {
        console.log("action = post");
        formData = '';
        msg = '';
        return req.on('data', function(data) {
          formData += data;
          
          console.log("form data="+ formData);
          return req.on('end', function() {
            var user;
            user = qs.parse(formData);
            user.id = "123456";
            msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						console.log("mess="+msg);
            console.log("mess="+formData);
           // res.writeHead(200, {
            //  "Content-Type": "application/json",
             // "Content-Length": msg.length
            //});
						MongoClient.connect(dbUrl, function(err, db) {
  					if (err) throw err;
  					var dbo = db.db("mydb");
  					var myobj = stringMsg;

						if (formData.includes("delete")){
							dbo.collection("customers").find({}).toArray(function(err, result) {
    if (err) throw err;
								for(var i=0;i<result.length;i++){
									if(result[i].userName == myobj.userName){
                    var myquery = { userName: myobj.userName };
                    var newvalues;
                    if(myobj.favreport1=="delete"){
   newvalues = { $set: { favreport1:myobj.favreport1 } };
                       }
                    else if(myobj.favreport2=="delete"){
   newvalues = { $set: { favreport2:myobj.favreport2 } };
                       }
                    else if(myobj.favreport3=="delete"){
   newvalues = { $set: { favreport3:myobj.favreport3 } };
                       }
                    else if(myobj.favreport4=="delete"){
   newvalues = { $set: { favreport4:myobj.favreport4 } };
                       }
  dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
  });
    console.log(result[i].userName,result[i].Password,myobj.userName,myobj.Password);
										    db.close();
									 return res.end("good");
								}
								}
								return res.end("notgood");
								
								

	});
            } else 
              
              
							dbo.collection("customers").find({}).toArray(function(err, result) {
    if (err) throw err;
								for(var i=0;i<result.length;i++){
									if(result[i].userName == myobj.userName ){
    console.log(result[i].userName,result[i].Password,myobj.userName,myobj.Password);
										    db.close();
									 return res.end("favreport1="+result[i].favreport1+"favreport2="+result[i].favreport2+"favreport3="+result[i].favreport3+"favreport4="+result[i].favreport4);
                    
								}
								}
								return res.end("notgood");
								
								

	});
            
							
			//				dbo.collection("customers").find({"Name": "ALEX"}).toArray(function(err, result) {
    //if (err) throw err;
    //console.log(result);
    //db.close();
	//}); 
							
						
					});
						
           
          });
        });
				
      } else {
        //form = publicPath + "ajaxSignupForm.html";
        form = "fav.html";
        return fs.readFile(form, function(err, contents) {
          if (err !== true) {
            res.writeHead(200, {
              "Content-Type": "text/html"
            });
            return res.end(contents);
          } else {
            res.writeHead(500);
            return res.end;
          }
        });
      }}
	else if(request.url === "/index"){
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
		else if(request.url === "/register"){
		//console.log("Requested URL is url" +request.url);
		sendFileContent(response, "register.html", "text/html");
	}
    else if(request.url === "/fav"){
		//console.log("Requested URL is url" +request.url);
		sendFileContent(response, "fav.html", "text/html");
	}
    else if(request.url === "/page1"){
		//console.log("Requested URL is url" +request.url);
		sendFileContent(response, "page1.html", "text/html");
	}
    else if(request.url === "/page2"){
		//console.log("Requested URL is url" +request.url);
		sendFileContent(response, "page2.html", "text/html");
	}
    else if(request.url === "/page3"){
		//console.log("Requested URL is url" +request.url);
		sendFileContent(response, "page3.html", "text/html");
	}
    else if(request.url === "/page4"){
		//console.log("Requested URL is url" +request.url);
		sendFileContent(response, "page4.html", "text/html");
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
	}
    else {
      console.log("callhtml");
		sendFileContent(res, "index.html", "text/html");
      //res.writeHead(200, {
      //  "Content-Type": "text/html"
     // });
      //return res.end("<h1>�w����{Node.js�泾���O</h1><p><a href=\"/Signup\">���U</a></p>");
    }
		
  });

  server.listen(9001);

  console.log("Server is running�Atime is" + new Date());

  
  
  
  
  
function sendFileContent(response, fileName, contentType){
	
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
}).call(this);


