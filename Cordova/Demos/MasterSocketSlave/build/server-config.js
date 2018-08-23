var app = require('express')();
let server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/', function(req,res){
  res.send('启动成功：');
});

const socketRandom = 'f174b966fxx29y'

io.on('connection', function(socket){ 
  console.log('new client connected');

  // master <-> slave
  socket.on('my_event_' + socketRandom, function (data) {
    socket.broadcast.emit('my_response_' + socketRandom, data);
  })
});
console.log('io listen success !! ');

server.listen(3000);
