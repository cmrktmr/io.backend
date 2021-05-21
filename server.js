const io = require("socket.io")((process.env.PORT || 3000), { cors: true });


var line_history = [];

io.on("connection", socket => {
	
	   for (var i in line_history) {
      socket.emit('drawing', { line: line_history[i] } );
   		
	   }
	
	
	
	socket.on("join-room", (room) => {
		socket.join(room);
		socket.roomId = room;
		socket.emit("joined");
	});
	
	socket.on("drawing", (data) => {
		socket.to(socket.roomId).broadcast.emit("drawing", data);
	});
	
	
});
