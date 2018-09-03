const btn1 = document.getElementById('main-btn-1'),
      btn1_outside = document.getElementById('main-btn-1-outside'),

      btn2 = document.getElementById('main-btn-2'),
      btn2_outside = document.getElementById('main-btn-2-outside'),

      btn3 = document.getElementById('main-btn-3'),
      btn3Wings = document.getElementById('main-btn-3-wings'),

      btns_pressed = document.querySelectorAll('.btn-pressed-count'),
      [ btn1_pressed, btn2_pressed, btn3_pressed ] = btns_pressed,

      info1 = document.getElementById('info-1'),
      info2 = document.getElementById('info-2'),
      [ usersOnline, allTimeUniqueVisitors, allTimeVisits ] = info1.querySelectorAll('li'),
      [ userIp, userInfo ] = info2.querySelectorAll('li'),
      usersOnlineSpan = usersOnline.querySelector('span');



const socket = io.connect();
console.log(socket)

btn1.addEventListener( 'mouseover', () => {
    socket.emit( 'mouseover-btn-1');
})

btn1.addEventListener( 'mouseout', () => {
    socket.emit( 'mouseout-btn-1')
})

btn1_outside.addEventListener( 'mousedown', () => {
    socket.emit(`press-btn-1`)
})
btn1_outside.addEventListener( 'mouseup', () => {
    socket.emit( `release-btn-1`)
});


[ btn2, btn3 ].forEach( (btn, i) => {
    let btnIndex = i + 2;
    btn.addEventListener( 'mousedown', () => {
        socket.emit(`press-btn-${btnIndex}`)
    })
    btn.addEventListener( 'mouseup', () => {
        socket.emit( `release-btn-${btnIndex}`)
    })
})




socket.on('info', (info) => {
    console.log('received info', info)

    btns_pressed.forEach( ( btn_pressed, i ) => {
        btn_pressed.textContent = info.pressed[i]
    })
});

socket.on('users-online', users => {
    usersOnlineSpan.textContent = users;
    usersOnline.classList.add('add-user-online');
    setTimeout( () => usersOnline.classList.remove('add-user-online'), 1000);
})

let updateNum = ( countElement, pressedTimes, btnState ) => {
    countElement.textContent = pressedTimes;

    if ( btnState.numUpdating === false ) {
        countElement.classList.add('pressed');
        btnState.numUpdating  = true;
        setTimeout( () => {
            countElement.classList.remove('pressed');
            btnState.numUpdating  = false;
        },
        1000)
    }
}

//BUTTON 1
let btn1_state = {
    numUpdating: false,
}

socket.on( 'press-btn-1', (pressedTimes) => {
    btn1.classList.add('pressed');
    btn1_pressed.textContent = pressedTimes;
    updateNum( btn1_pressed, pressedTimes, btn1_state);
})

socket.on( 'release-btn-1', () => {
    btn1.classList.remove('pressed');
})

socket.on( 'mouseover-btn-1', () => {
    btn1.classList.add('hover');
})

socket.on( 'mouseout-btn-1', () => {
    btn1.classList.remove('hover')
})



// BUTTON 2
let btn2_state = {
    numUpdating: false,
}

socket.on( 'press-btn-2', (pressedTimes) => {
    btn2_outside.className = 'pressed';
    btn2_pressed.textContent = pressedTimes;
    updateNum( btn2_pressed, pressedTimes, btn2_state);

})

socket.on( 'release-btn-2', () => {
    btn2_outside.className = '';

    btn2.className === 'runForward' ? 
        btn2.className = 'runBackward' :
        btn2.className = 'runForward';
})

// BUTTON 3
let btn3_state = {
    beingPressed: false,
    numUpdating: false,
}



let animatePressingBtn3 = ( btn_state ) => {
    btn3Wings.className = 'pressed';

    if ( btn_state.beingPressed === false ) {
        btn_state.beingPressed = true;
        setTimeout( () => {
            btn3Wings.className = '';
            btn_state.beingPressed = false;
        }, 2500);
    }
}

socket.on( 'press-btn-3', (pressedTimes) => {
    animatePressingBtn3( btn3_state );
    updateNum( btn3_pressed, pressedTimes, btn3_state);
})

socket.on( 'release-btn-3', () => {
    // btn1.className = '';
})