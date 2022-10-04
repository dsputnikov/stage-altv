
var Bus = new Vue({
    el: "#bus",
    data: {
        active: false,
        isWork: false,
        currentRoute: 0,
        routes: [
            {name: 'По всему Сан-Андреасу', length: '14', salary: 350, color: 'rgba(255, 255, 255, 0.05);'},
            {name: 'По Лос-Сантосу', length: '7', salary: 150, color: 'rgba(255, 255, 255, 0.05);'},
            {name: 'По Лос-Сантосу', length: '4', salary: 250, color: 'linear-gradient(151.09deg, #2C80EF 6.08%, rgba(44, 128, 239, 0.19) 82.21%);'},
        ],
        work: {
            active: true,
            current: 0,
            name: 'Автобусник',
            salary: '11',
            countedMoney: 0,
            currentSalary: 0,
        }   
    },
    methods: {
        changeRoute(t) {
            this.currentRoute = t;
        },
        startWork() {
            this.isWork = true;
            alt.emit('Bus_startWork::CLIENT', this.currentRoute, this.routes[this.currentRoute].salary)
        },
        stopWork() {
            this.isWork = false;
            alt.emit('Bus_endWork::CLIENT')
        }
    },
    mounted() {
    }
})

if ('alt' in window) {
    alt.on('Bus_show::CEF', (bool) => {
        Bus.active = bool
    })
}