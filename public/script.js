var codeArea = document.getElementById('codeArea');
console.log(codeArea);

codeArea.onkeyup = function(){
	console.log(codeArea.value);
}

var socket = io('http://localhost');
socket.on('news', function (data) {
	console.log(data);
	socket.emit('my other event', { my: 'data' });
});