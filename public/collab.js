var doc, 
	userID,
	nodes,
	otherUserUpdate = false,
	socket = io();

function updateCode(){
	var text = '';
	for(n in nodes){
		if(text != '') text += '\n';
		text += nodes[n].text;
	}
	doc.setValue(text);
}

socket.on('initialize session', function(data){
	console.log('Initialized session with user:', data.user);

	nodes = data.nodes;

	var text = '';
	for(n in nodes){
		if(text != '') text += '\n';
		text += nodes[n].text;
	}

	console.log('Loaded text:', text);

	doc = CodeMirror(document.body, {
		value: text,
		mode:  "javascript",
		lineNumbers: true
	});

	socket.on('update node', function(data){
		var didUpdate = false;
		for(n in nodes){
			if(data.nodeID == n){
				nodes[n].text = data.text;
				console.log('Updated node', n, 'with text', data.text);
				didUpdate = true;
				break;
			}
		}
		if(didUpdate){
			updateCode();
		}else{
			console.error('Could not update node', n, 'node does not exist');
		}
	});

	socket.on('add node', function(data){
		if(nodes[data.nodeID] == undefined){
			nodes[data.start] = data.nodeID;
			nodes[data.end] = data.nodeID;
			nodes[data.nodeID] = {
				text: data.nodeID,
				start: data.start,
				end: data.end
			};
			updateCode();
			console.log('Node added', data.nodeID);
		}else{
			console.log('Could not add node, node already exists', n, data.text);
		}
	});

	socket.on('remove node', function(data){
		if(nodes[data.nodeID] != undefined){
			nodes[nodes[data.nodeID].start].end = nodes[data.nodeID].end;
			nodes[nodes[data.nodeID].end].start = nodes[data.nodeID].start;
			delete nodes[data.nodeID];
			updateCode();
			console.log('Node deleted', data.nodeID);
		}else{
			console.log('Could not remove node, node does not exist');
		}
	});

	doc.on("change", function(change){
		if(otherUserUpdate){
			otherUserUpdate = false;
			return;
		}
		//socket.emit('update script', { user: userID, update: doc.getValue() });
	});
});

socket.emit('user connect', {});
/*
doc.on("change", function(change){
	//console.log(doc.getValue());
	if(otherUserUpdate){
		otherUserUpdate = false;
		return;
	}
	socket.emit('update script', { user: userID, update: doc.getValue() });
});
*/

/*
socket.on('update', function (data) {
	console.log(data);
	if(data.user != userID){
		otherUserUpdate = true;
		doc.setValue(data.update);
	}
});
*/