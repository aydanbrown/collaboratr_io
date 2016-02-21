var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80, function(){
  console.log("listening on port 80");
});

function handler (req, res) {
  console.log(req.url);
  if(req.url == '/') req.url = '/index.html';
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

var sockets = [];

io.on('connection', function (socket) {
  sockets.push(socket);
  //socket.emit('news', { hello: 'world' });
  socket.on('user connect', function (data) {
    console.log(data);
  });
  socket.on('update script', function (data) {
    console.log(data);
    updateScript(data);
  });
});

function updateScript(update){
  for(s in sockets){
    sockets[s].emit('update', update);
  }
}