const btn1 = document.getElementById('main-btn-1'),

      btn2 = document.getElementById('main-btn-2'),
      btn2_outside = document.getElementById('main-btn-2-outside'),

      btn3 = document.getElementById('main-btn-3'),
      btn3Wings = document.getElementById('main-btn-3-wings'),

      usersOnline = document.getElementById('users-online');

// BUTTON 1
btn1.addEventListener( 'mousedown', () => {
    btn1.className = 'pressed';
})

btn1.addEventListener( 'mouseup', () => {
    btn1.className = '';
})


// BUTTON 2
btn2.addEventListener( 'mousedown', () => {
    btn2_outside.className = 'pressed';
})

btn2.addEventListener( 'mouseup', () => {
    btn2_outside.className = '';

    btn2.className === 'runForward' ? 
        btn2.className = 'runBackward' :
        btn2.className = 'runForward';
});



// BUTTON 3
let btn3BeingPressed = false;

btn3.addEventListener( 'mousedown', () => {
    btn3Wings.className = 'pressed';

    if ( btn3BeingPressed === false ) {
        setTimeout( () => {
            btn3Wings.className = '';
            btn3BeingPressed = false;
        }, 2500);
    }
    btn3BeingPressed = true;



    console.log('mousedown');
    socket.emit( 'press-btn')
})

btn3.addEventListener( 'mouseup', () => {
    // btn3Wings.className = 'released';

    console.log('mouseup')
    socket.emit( 'release-btn')
})

const socket = io.connect();
console.log(socket)

socket.on('info', (info) => {
    console.log('received info', info)
});

socket.on('users online', users => {
    usersOnline.textContent = `Users online: ${users}`;
})

socket.on( 'press-btn', () => {
    console.log('press')
    btn3.className = 'pressed';
})

socket.on( 'release-btn', () => {
    console.log('release')
    btn3.className = '';
})