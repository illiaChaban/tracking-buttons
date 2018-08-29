require('dotenv').config();

const express = require('express'),
      port = process.env.PORT || 4000,
      socketIo = require('socket.io'),
      http = require('http');

let usersOnline = 0;


const app = express();

app.use( express.static( __dirname + '/static'));


const server = http.createServer(app);
server.listen(port);
console.log(`Server is running at http://localhost:${port}`)

const io = socketIo.listen(server);

io.on( 'connection', socket => {

        
    console.log('user connected')
    usersOnline ++;
    console.log('users online', usersOnline)

    socket.emit('info', {user: socket.handshake.headers['user-agent'], ip: socket.handshake.address})

    io.emit('users online', usersOnline)

    socket.on('disconnect', () => {
        usersOnline --;
        console.log('user disconnected');
    })

    socket.on( 'press-btn', () => {
        io.emit( 'press-btn')
    })

    socket.on( 'release-btn', () => {
        io.emit('release-btn')
    })
})