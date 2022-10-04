
var Autosalon = new Vue({
    el: '#autosalon',
    components: {
        'vueSlider': window['vue-slider-component'],
    },
    data: {
        active: false,
        open: false,
        modal: false,
        buyedWindow: false,
        vehicles: [
            { name: 'Asbo', price: 1000, model: 'asbo' },
            { name: 'Panto', price: 900, model: 'panto' },
            { name: 'Nightshade', price: 150000, model: 'nightshade' },
            { name: 'Coquette3', price: 15000, model: 'coquette3' },
            // { name: 'Dominator7', price: 150000, model: 'dominator7' },
            // { name: 'Everon', price: 150000, model: 'everon' },
            // { name: 'Cypher', price: 150000, model: 'cypher' },
            // { name: 'Zr350', price: 150000, model: 'zr350' },
            // { name: 'Calico', price: 150000, model: 'calico' },
            // { name: 'Futo2', price: 150000, model: 'futo2' },
            // { name: 'Euros', price: 150000, model: 'euros' },
            // { name: 'Jester4', price: 150000, model: 'jester4' },
            // { name: 'Remus', price: 150000, model: 'remus' },
            // { name: 'Vectre', price: 150000, model: 'vectre' },
            // { name: 'Sultan3', price: 150000, model: 'sultan3' },
            // { name: 'Sultanrs', price: 150000, model: 'sultanrs' },
            // { name: 'Radi', price: 150000, model: 'radi' },
            // { name: 'Fq2', price: 150000, model: 'fq2' },
            // { name: 'Seminole2', price: 150000, model: 'seminole2' },
            // { name: 'Seminole', price: 150000, model: 'seminole' },
            // { name: 'Stratum', price: 150000, model: 'stratum' },
            // { name: 'Asea', price: 150000, model: 'asea' },
            // { name: 'Intruder', price: 150000, model: 'intruder' },
            // { name: 'Stanier', price: 150000, model: 'stanier' },
            // { name: 'Surge', price: 150000, model: 'surge' },
            // { name: 'Blista2', price: 150000, model: 'blista2' },
            // { name: 'Futo', price: 150000, model: 'futo' },
            // { name: 'Asterope', price: 150000, model: 'asterope' },
            // { name: 'Ingot', price: 150000, model: 'ingot' },
            // { name: 'Premier', price: 150000, model: 'premier' },
            // { name: 'Primo', price: 150000, model: 'primo' },
            // { name: 'Regina', price: 150000, model: 'regina' },
            // { name: 'Washington', price: 150000, model: 'washington' },
            // { name: 'Blista', price: 150000, model: 'blista' },
            // { name: 'Brioso', price: 150000, model: 'brioso' },
            // { name: 'Issi2', price: 150000, model: 'issi2' },
            // { name: 'Weevil', price: 150000, model: 'weevil' },
            // { name: 'Prairie', price: 150000, model: 'prairie' },
            // { name: 'Clique', price: 150000, model: 'clique' },
            // { name: 'Ellie', price: 150000, model: 'ellie' },
            // { name: 'Gauntlet3', price: 150000, model: 'gauntlet3' },
            // { name: 'Picador', price: 150000, model: 'picador' },
            // { name: 'Sabregt', price: 150000, model: 'sabregt' },
            // { name: 'Vigero', price: 150000, model: 'vigero' },
            // { name: 'Hellion', price: 150000, model: 'hellion' },
            // { name: 'Rancherxl', price: 150000, model: 'rancherxl' },
            // { name: 'Gresley', price: 150000, model: 'gresley' },
            // { name: 'Mesa', price: 150000, model: 'mesa' },
            // { name: 'Bjxl', price: 150000, model: 'bjxl' },
            // { name: 'Fusilade', price: 150000, model: 'fusilade' },
            // { name: 'Sentinel3', price: 150000, model: 'sentinel3' },
            // { name: 'Dynasty', price: 150000, model: 'dynasty' },
            // { name: 'Pigalle', price: 150000, model: 'pigalle' },
            // { name: 'Retinue', price: 150000, model: 'retinue' },
            // { name: 'Cheburek', price: 150000, model: 'cheburek' },
        ],
        currentSalon: '',
        currentVehicle: 0,
        price: 0,
        vehicle: 'BMW M4',
        speed: 20,
        currentColor: [13, 17, 22],
        currentColor2: [13, 17, 22],
        profile: [
            { name: 'Скорость', number: 120, width: 50, img: './systems/Autosalon/img/speedometer.svg' },
            { name: 'Ускорение', number: 120, width: 50, img: './systems/Autosalon/img/spe.svg' },
            // { name: 'Управление', number: 120, width: 50, img: './systems/Autosalon/img/control.svg' },
            { name: 'Тормоза', number: 120, width: 50, img: './systems/Autosalon/img/brake.svg' },
            // { name: 'Бак', number: 120, width: 50, img: './systems/Autosalon/img/fuel.svg' },
            { name: 'Багажник', number: '20 кг.', width: 67, img: './systems/Autosalon/img/trunk.svg' },
            { name: 'Вместительность', number: 120, width: 50, img: './systems/Autosalon/img/seat.svg' },
        ],
        colors: [
            { color: '#0d1116', id: [13, 17, 22] },
            { color: '#999da0', id: [153, 157, 160] },
            { color: '#979a97', id: [151, 154, 151] },
            { color: '#3c3f47', id: [60, 63, 71] },
            { color: '#13181f', id: [19, 24, 31] },
            { color: '#515554', id: [81, 85, 84] },
            { color: '#c00e1a', id: [192, 14, 26] },
            { color: '#a51e23', id: [165, 30, 35] },
            { color: '#8e1b1f', id: [142, 27, 31] },
            { color: '#49111d', id: [73, 17, 29] },
            { color: '#d44a17', id: [212, 74, 23] },
            { color: '#f78616', id: [247, 134, 22] },
            { color: '#66b81f', id: [102, 184, 31] },
            { color: '#0b9cf1', id: [11, 156, 241] },
            { color: '#2446a8', id: [36, 70, 168] },
        ],
        money: 0,
        bank: 0,
    },
    methods: {
        selectVehicle(i) {
            this.currentVehicle = i;
            //
            this.vehicle = this.vehicles[i].name;
            let price = this.formatNumber(this.vehicles[i].price)
            this.price = price;
            // Характеристики
            alt.emit('Autosalon_selectVehicle::CLIENT', this.vehicles[i].model, this.currentColor, this.currentColor2)

        },
        testDriveStart() {
            alt.emit('Autosalon_testdrive_start::CLIENT', this.vehicles[this.currentVehicle].model, this.currentColor, this.currentColor2)
        },
        changeColor1(i) {
            let color = this.colors[i].id;
            this.currentColor = color;
            alt.emit('Autosalon_changeColor::CLIENT', this.currentColor, this.currentColor2)
        },
        changeColor2(i) {
            let color = this.colors[i].id;
            this.currentColor2 = color;
            alt.emit('Autosalon_changeColor::CLIENT', this.currentColor, this.currentColor2)
        },
        updateStat(speed) {
            this.speed = speed;
        },
        buyButton() {
            this.open = false;
            this.modal = true;
        },
        buyVehicle(t) {
            let model = this.vehicles[this.currentVehicle].model;
            let price = this.vehicles[this.currentVehicle].price;
            alt.emit('Autosalon_buyVehicle::CLIENT', t, model, price, this.currentColor, this.currentColor2)
        },
        successBuy() {
            this.modal = false
            this.open = false;
            this.buyedWindow = true;
            var $this = this;
            setTimeout(function () {
                $this.open = true;
                $this.buyedWindow = false;
                alt.emit('Autosalon_successBuy::CLIENT')
            }, 5000)
        },
        formatNumber(x) {
            if (x == null) return;
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
    },
    mounted() {
        var $this = this;
        $(document).keyup(function (key) {
            if (key.keyCode === 8 && $this.modal == true) {
                $this.open = true;
                $this.modal = false;
            }
        });
    },
})

if ('alt' in window) {
    alt.on('Autosalon_openWindow::CEF', (bool, data, salon) => {
        if (data == null) {
            Autosalon.active = bool;
            Autosalon.open = bool;
            Autosalon.buyedWindow = false;
            Autosalon.modal = false;
        }
        else {
            Autosalon.active = bool;
            Autosalon.open = bool;
            Autosalon.vehicles = data;
            Autosalon.vehicles.sort(function (a, b) {
                return a.price - b.price
            })
            Autosalon.selectVehicle(0);
            if(salon == undefined) return;
            Autosalon.currentSalon = salon;
        }
    })

    alt.on('Autosalon_updateStat::CEF', (speed, acceleration, maxBraking, maxP) => {
        Autosalon.profile[0].number = `${((speed * 3.6).toFixed(0))} км/ч`;
        Autosalon.profile[0].width = speed;
        //
        Autosalon.profile[1].number = (acceleration).toFixed(0) + '%';
        Autosalon.profile[1].width = acceleration;
        //
        Autosalon.profile[2].number = (maxBraking).toFixed(0) + '%';
        Autosalon.profile[2].width = maxBraking ;

        //
        Autosalon.profile[4].number = (maxP).toFixed(0) 
        Autosalon.profile[4].width = maxP * 20;
    })
}

Autosalon.vehicles.sort(function (a, b) {
    return a.price - b.price
})

Autosalon.vehicles.reverse();
