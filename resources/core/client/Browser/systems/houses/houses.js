
var houses = new Vue({
    el: '#houses',
    data: {
        active: false,
        activeMain: false,
        acitveExits: false,
        id: 0,
        ownerName: '1',
        houseClass: '1',
        gm: '1',
        price: '1',
        ifOwner: false,
        inGarage: false,
        ifLocked: 1,
    },
    methods: {
        buyHouse() {
            //mp.trigger('House_buyHouse::CLIENT')
        },

        enterHouse() {
            //mp.trigger('House_enterHouse::CLIENT')
            this.inGarage = false;
        },

        enterGarage() {
            //mp.trigger('House_enterGarage::CLIENT')
            this.inGarage = true;
        },

        enterStreet() {
            //mp.trigger('House_enterStreet::CLIENT')
            this.inGarage = false;
        },

        sellHouse() {
            //mp.trigger('House_sellHouse::CLIENT')
        },
        lockHouse() {
            //mp.trigger('House_closeHouse::CLIENT')
            this.ifLocked = 2;
        },
        unlockHouse() {
            //mp.trigger('House_openHouse::CLIENT')
            this.ifLocked = 1;
        }
    },
    mounted() {
        //mp.events.add('Houses_showWindow::CEF', (type, bool) => {
        //     this.active = bool;
        //     if (type == 1) {
        //         this.activeMain = bool;
        //     }
        //     if (type == 2) {
        //         this.acitveExits = bool;
        //     }
        // })
    }
})
