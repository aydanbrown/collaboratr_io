var io;

var users = {};// username, socket

var sockets = [];

var nodes = [
  ['s1', '', '', [['c1', '', 'c2', 'v'], ['c2', 'c1', 'c3', 'a'], ['c1', 'c2', '', 'r']]]
];
/*
nodes[
  [
    0 = id,
    1 = start,
    2 = end,
    3 = chars[
      0 = id,
      1 = start,
      2 = end,
      3 = char
    ]
  ]
]
*/

var initialize = function(app){
  io = require('socket.io')(app);

  io.on('connection', function (socket) {
    //sockets.push(socket);
    //socket.emit('news', { hello: 'world' });
    generateUsername(function(n){
      users[n] = { socket: socket };
      socket.emit('initialize session', {
        username: n,
        nodes: nodes
      });
      console.log('Initialized session with username:', n);
    });
    socket.on('update node', function(data){
      //updateNode(data);
    });
    socket.on('add node', function(data){
      //addNode(data);
    });
    socket.on('remove node', function(data){
      //removeNode(data);
    });
  });
}

function updateNode(data){
  if(data.nodeID == undefined || data.text == undefined) 
    return console.error('Update failed, incorrect data format\n', data);
  if(nodes[data.nodeID] != undefined){
    nodes[data.nodeID].text = data.text;
  }else{
    return console.error('Attempted to update node which does not exist');
  }
  /*for(s in sockets){
    sockets[s].emit('update node', data);
  }*/
}

function addNode(data){
  if(data.nodeID == undefined || data.text == undefined || data.start == undefined || data.end == undefined) 
    return console.error('Add failed, incorrect data format\n', data);
  if(nodes[data.nodeID] == undefined){
    nodes[data.nodeID] = {
      text: data.text,
      start: data.start,
      end: data.end
    };
  }else{
    return console.error('Attempted to add node with the same name as an existing node ID');
  }
  /*
  for(s in sockets){
    sockets[s].emit('add node', data);
  }
  */
}

function removeNode(data){
  if(data.nodeID == undefined) 
    return console.error('Remove failed, incorrect data format\n', data);
  if(nodes[data.nodeID] != undefined){
    delete node[data.nodeID];
  }else{
    return console.error('Attempted to remove node which does not exist');
  }
  /*
  for(s in sockets){
    sockets[s].emit('remove node', data);
  }
  */
}

function generateUsername(callback){
  while(true){
    var n = 'user' + Math.floor((Math.random() * 10000) + 1);
    var isUnique = true;
    for(u in users){
      if(u == n){
        isUnique = false;
        break;
      }
    }
    if(isUnique){
      console.log('Generated username:', n);
      return callback(n);
    }else{
      console.log('Username already exists, trying again:', n);
    }
  }
}

function generateNodesFromText(text){
  var nds = [];
  var nd = [];
  var line = 0;
  var ch = 0;
  var newLine = true;
  nd = ['l0', '', '', []];
  for(t in text){
    if(text[t] == '\n'){
      line++;
      nd[2] = 'l' + line;
      nds.push(nd);
      nd = ['l' + line, 'l' + (line - 1), '', []];
      newLine = true;
    }else{
      var c = 'c' + (ch - 1);
      if(newLine){
        c = '';
        newLine = false;
      }else{
        nd[3][nd[3].length - 1][2] = 'c' + ch;
      }
      nd[3].push(['c' + ch, c, '', text[t]]);
      ch++;
    }
  }
  nds.push(nd);
  return nds;
}

function generateTextFromNodes(nds){
  var t = '';
  for(l in nds){
    if(t != ''){
      t += '\n';
    }
    for(c in nds[l][3]){
      t += nds[l][3][c][3];
    }
  }
  return t;
}

module.exports = {
  initialize: initialize
}