
var HUD = new Vue({
    el: '#HUD_main',
    data: {
        active: false,
        server: {
            online: 99,
            login: 'daun',
            time: '1',
            date: '',
        },
        money: 52,
        bank: 1222222,
        tweenedNumber: 0,
        //
        notify: {
            notifys: [],
            error_color: 'linear-gradient(89.96deg, #ff4747 0.04%, rgba(255, 71, 71, 0) 99.5%)',
            succes_color: 'linear-gradient(89.96deg, #BAFE2A 0.04%, rgba(186, 254, 42, 0.05) 99.5%)',
            info_color: 'linear-gradient(89.96deg, #FFE600 0.04%, rgba(201, 181, 0, 0.05) 99.5%)'
        },
        locationPosition: {
            top: 500,
            left: 130,
            location: '',
            zone: ''
        },
        hints: [
            { key: 'F7', text: 'Скрыть худ' },
            { key: 'F2', text: 'Показать/Скрыть курсор' },
            { key: 'I', text: 'Инвентарь' },
            { key: 'N', text: 'Голосовой чат' },
        ],
        usebutton: {
            active: false,
            button: 'E',
            text: 'Используйте для взаимодействия',
        }
    },
    methods: {
        updateTime() {
            let data = new Date();
            let hour = data.getUTCHours() + 3;
            let minute = data.getMinutes();

            if (hour < 10) hour = "0" + hour;
            if (minute < 10) minute = "0" + minute;
            this.server.time = `${hour}:${minute}`;
        },
        updateDate() {
            let data = new Date();
            let day = data.getDate();
            let month = data.getMonth() + 1;
            let year = data.getUTCFullYear();

            if (day < 10) day = "0" + day;
            if (month < 10) month = "0" + month;

            this.server.date = `${day}.${month}.${year}`;
        },
        addNotify(type, text, time) {
            var $this = this;
            if (type == 1) {
                this.notify.notifys.push({ type: 1, top: 'Успешно', color: this.notify.succes_color, text: text });
            }
            else if (type == 2) {
                this.notify.notifys.push({ type: 2, top: 'Ошибка', color: this.notify.error_color, text: text });
            }
            else if (type == 3) {
                this.notify.notifys.push({ type: 2, top: 'Внимание', color: this.notify.info_color, text: text });
            }
            // Удаление
            setTimeout(function () {
                $this.notify.notifys.pop()
            }, time)
        },
    },
    mounted() {
        setInterval(this.updateTime, 1000);
        this.updateDate();

        // this.usebutton.active = true;
    },
    computed: {
        animatedNumber: function () {
            return this.tweenedNumber.toFixed(0);
        }
    },
    watch: {
        money: function (newValue) {
            gsap.to(this.$data, { duration: 3, tweenedNumber: newValue });
        }
    }
})

if ('alt' in window) {
    alt.on('HUD_show::CEF', (bool) => {
        HUD.active = bool;
    })
    alt.on('HUD_updateLocation::CEF', (top, left, location, zone) => {
        HUD.locationPosition.top = top;
        HUD.locationPosition.left = left;
        HUD.locationPosition.location = location;
        HUD.locationPosition.zone = zone;
    })

    alt.on('HUD_addNotification::CEF', (type, text, time) => {
        HUD.addNotify(type, text, time)
    })
    alt.on('HUD_updateInfo::CEF', (online, login, id) => {
        HUD.server.online = online;
        HUD.server.login = login; online;
        HUD.server.id = id;
    })
    alt.on('HUD_updateMoney::CEF', (money, bank) => {
        HUD.money = money;
        HUD.bank = bank;
    })
}
