var Taxi = new Vue({
    el: '#taxi',
    data: {
        active: false,
        open: 5,
        isWork: false,
        //
        currentPrice: 0,
        //
        orders: [],
        num: 0,
        name: 'David Lazarev',
        dist: 0,
        id: 0,
        // Установка цены
        inputPrice: 1,
        // Оплата за проезд
        tripLength: 1,
        tripPrice: 0,
    },
    methods: {
        startWork() {
            this.isWork = true;
            //mp.trigger('Taxi_GotAJob::CLIENT')
        },
        leaveWork() {
            this.isWork = false;
            //mp.trigger('Taxi_endWork::CLIENT')
        },
        //
        addOrder(num, name, dist, id) {
            const newOrder = {
                num: num,
                name: name,
                dist: dist,
                id: id,
            };
            this.orders.push(newOrder);
        },

        accept(index) {
            //mp.trigger('Taxi_interimAcceptOrder::CLIENT', this.orders[index].id)
            this.orders.splice(index, 1);
        },

        deleteOrder(id) {
            for (var [key, value] of Object.entries(this.orders)) {
                if (value.id == id) {
                    this.orders.splice(key, 1);
                }
            }
        },
        // Аренда такси
        rentTaxi() {
            //mp.trigger('Taxi_rentTaxi::CLIENT')
        },
        decline() {
            //mp.trigger('Taxi_declineBtn::CLIENT')
        },
        // Установка цены
        setPrice() {
            const price = this.inputPrice;
            //mp.trigger('Taxi_setPrice::CLIENT', price)
        },
        // Оплата проезда
        payTrip() {
            //mp.trigger('Taxi_payment::CLIENT', this.tripPrice)
        },
    },
});
