require('dotenv').config();

const express = require('express'),
      port = process.env.PORT || 4000,
      socketIo = require('socket.io'),
      { pressed } = require('./db'),
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

    socket.emit('info', {
        user: socket.handshake.headers['user-agent'],
        ip: socket.handshake.address,
        pressed,
    })

    io.emit('users-online', usersOnline)

    socket.on('disconnect', () => {
        usersOnline --;
        io.emit('users-online', usersOnline);
        console.log('user disconnected');
    })

    socket.on( 'mouseover-btn-1', () => {
        io.emit( 'mouseover-btn-1')
    })

    socket.on( 'mouseout-btn-1', () => {
        io.emit('mouseout-btn-1')
    })

    for( let i = 1; i <= 3; i++) {
        socket.on( `press-btn-${i}`, () => {
            pressed[i-1]++;
            io.emit( `press-btn-${i}`, pressed[i-1])
        })
        socket.on( `release-btn-${i}`, () => {
            io.emit( `release-btn-${i}`)
        })
    }
})