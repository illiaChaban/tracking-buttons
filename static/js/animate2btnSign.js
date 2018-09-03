// animate 2nd button sign
(function() {
    const signNodes = document.querySelectorAll('#main-btn-2-sign > span');
    const [p, r, e, s, s2, m, e2, exclPoint ] = signNodes;
    
    let animatePulse = (el, timeout) => setTimeout( () => {
        el.className = 'animated pulse';
    }, timeout)

    let animateBtn2_sign = () => { 
        p.className = 'tada';
        animatePulse(r, 1000)
        animatePulse(e, 1150)
        animatePulse(s, 1300)
        animatePulse(s2, 1450)
        animatePulse(m, 1600)
        animatePulse(e2, 1750)
        animatePulse(exclPoint, 1900)

        setTimeout( () => {
            signNodes.forEach( node => node.className = '')
        },2400)
    }
    
    setTimeout( animateBtn2_sign, 500);
    setTimeout( () => setInterval( animateBtn2_sign, 3000), 500);
}())