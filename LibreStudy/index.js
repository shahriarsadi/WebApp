const express = require('express');
const app = express();
const http = require('http').Server(app);
var fs = require('fs');
const io = require('socket.io')(http);

// old front page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/chat.html');
})

//to see which user left and joined
io.on('connection', (socket) => {
    
    console.log("User connected");
    socket.broadcast.emit('chat message', "New user joined.");
    socket.on('disconnect', () => {
        console.log("user disconnected");
        socket.broadcast.emit('chat message', 'A user left.');

    });
    
// This is to get user name 

    socket.on('chat message', (msg, name, stance) => {
        io.emit('chat message', `${stance}: ${name}: ${msg}`);
        console.log(stance);
    })
});

//this code is to start the drawing
function onConnection(socket){
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}
io.on('connection', onConnection);


//This is to connect to the server
http.listen(3000, () => {
    console.log("App running on 3000");
});



