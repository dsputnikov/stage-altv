
var Speedometer = new Vue({
    el: '#speedometer',
    data: {
        active: false,
        speed: 0,
    },
    methods: {

    }
})

if ('alt' in window) {
    alt.on('Hud_showSpeedometr::CEF', (active,speed) => {
        Speedometer.active = active;
        Speedometer.speed = speed;
    })
}
