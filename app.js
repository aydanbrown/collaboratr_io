var app = require('http').createServer(handler)
var fs = require('fs');

app.listen(420, function(){
  console.log("listening on port 420");
});

function handler (req, res) {
  console.log(req.url);
  if(req.url == '/') req.url = '/public/index.html';
  fs.readFile(__dirname + req.url,
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var sockets = require('./socket-handler.js');
sockets.initialize(app);



