var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";

(function() {
  var fs, http, qs, server, url;

  http = require('http');

  url = require('url');

  qs = require('querystring');

  fs = require('fs');

  server = http.createServer(function(req, res) {
    var action, form, formData, msg, publicPath, urlData, stringMsg;
    urlData = url.parse(req.url, true);
    action = urlData.pathname;
    publicPath = __dirname + "\\public\\";
   console.log(req.url);
    if (action === "/Signup") {
       console.log("signup");
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
            res.writeHead(200, {
              "Content-Type": "application/json",
              "Content-Length": msg.length
            });
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
            return res.end();
          });
        });
				
      } else {
        //form = publicPath + "ajaxSignupForm.html";
        form = "signup.html";
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
      return res.end("<h1>Åwªï¥úÁ{Node.jsµæ³¾µ§°O2</h1><p><a href=\"/Signup\">µù¥U</a></p>");
    }
    
    else {
      
      console.log("callhtml");
		sendFileContent(res, "calldatabase.html", "text/html");

     
      //res.writeHead(200, {
      //  "Content-Type": "text/html"
     // });
      //return res.end("<h1>Åwªï¥úÁ{Node.jsµæ³¾µ§°O</h1><p><a href=\"/Signup\">µù¥U</a></p>");
    }
  });

  server.listen(9001);

  console.log("Server is running¡Atime is" + new Date());

  
  
  
  
  
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


