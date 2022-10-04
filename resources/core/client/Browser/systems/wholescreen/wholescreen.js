
let pressed = false;

function pressedButton(event) {
    var button = event.buttons;
    pressed = true;
    setInterval(() => {
        if(pressed) {
            alt.emit('Wholescreen_press::CLIENT', button);
        }
    },50)
}

function upbutton() {
    pressed = false;
}

let wholescreen = new Vue({
    el: '#wholescreen',
    data: {
        active: false,
    }
})

if ('alt' in window) {
    alt.on('Wholescreen_show::CEF', (bool) => {
        wholescreen.active = bool;
    })
}