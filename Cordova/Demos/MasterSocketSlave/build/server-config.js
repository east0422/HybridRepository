var app = require('express')();
let server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/', function(req,res){
  res.send('启动成功：');
});

io.on('connection', function(socket){ 
  console.log('new client connected');
  // slave -> master
  socket.on('ready', function (data) {
    console.log('ready:' + JSON.stringify(data));
    socket.broadcast.emit('ready', {id: data.id});
  });
  
  // master -> slave
  socket.on('play', function (data) {
    console.log('play')
    socket.broadcast.emit('play', {videoindex: data.videoindex});
  });
  socket.on('pause', function () {
    console.log('pause')
    socket.broadcast.emit('pause');
  });
  socket.on('volumechanged', function (data) {
    console.log('volumechanged')
    socket.broadcast.emit('volumechanged', {volume: data.volume});
  });
  socket.on('ontimeupdate', function (data) {
    console.log('ontimeupdate')
    socket.broadcast.emit('ontimeupdate', {currentTime: data.currentTime});
  });
});
console.log('io listen success !! ');

server.listen(3000);
