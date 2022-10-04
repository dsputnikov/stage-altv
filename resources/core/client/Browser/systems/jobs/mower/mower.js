var Mower = new Vue({
    el: '#mower',
    data: {
        active: false,
        isWork: false,
        //
        salary: 150,
        countedMoney: 0,
    },
    methods: {
        startWork() {
            //mp.trigger('LawnMower_startWork::CLIENT')
            this.isWork = true;
        },
        stopWork() {
            //mp.trigger('LawnMower_stopWork::CLIENT')
            this.isWork = false;
        },
    },
});
