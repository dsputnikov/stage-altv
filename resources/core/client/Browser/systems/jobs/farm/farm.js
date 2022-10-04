
var Farm = new Vue({
    el: "#farm",
    data: {
        active: false,
        typeWorkActive: false,
        isWork: false,
        salary: {
            hay: 5, //Сборщик сена
            tractor: 150, // Тракторист
        },
        work: {
            active: false,
            current: 0,
            name: '',
            desc: '',
            salary: '',
            countedMoney: 0,
            currentSalary: 0,
        }
    },
    methods: {
        clickWork(t) {
            this.typeWorkActive = false,
            this.work.active = true;
            if(t == 1) {
                this.work.current = 1;
                this.work.name = 'Сборщик сена';
                this.work.desc = 'Суть работы состоит в том дабы собирать сено из грядки и носить на склад, работа максимально простая и не требует особых навиков, отлично подходит для новичков';
                this.work.salary = `За одно сено $${this.salary.hay}`;
                this.work.currentSalary = this.salary.hay;
            }
            if( t == 2) {
                this.work.current = 2;
                this.work.name = 'Тракторист';
                this.work.desc = 'Суть работы состоит в том дабы ездить по поле, и культивировать его. Работа не сложная, подходит для игроков среднячков';
                this.work.salary = `За один круг по полю $${this.salary.tractor}`;
                this.work.currentSalary = this.salary.tractor;
            }
            if( t == 3) {
                this.work.current = 3;
                this.work.name = 'Дояр';
                this.work.desc = 'Суть работы состоит в том дабы ездить по поле, и культивировать его. Работа не сложная, подходит для игроков среднячков';
                this.work.salary = `За один круг по полю $${this.salary.tractor}`;
                this.work.currentSalary = this.salary.tractor;
            }
            if( t == 4) {
                this.work.current = 4;
                this.work.name = 'Пилот';
                this.work.desc = 'Суть работы состоит в том дабы ездить по поле, и культивировать его. Работа не сложная, подходит для игроков среднячков';
                this.work.salary = `За один круг по полю $${this.salary.tractor}`;
                this.work.currentSalary = this.salary.tractor;
            }
        },
        startWork() {
            let currentWork = this.work.current;
            this.isWork = true;
            //mp.trigger('Farm_startWork::CLIENT',currentWork,this.work.currentSalary);
        },
        stopWork() {
            this.isWork = false;
            this.work.active = false;
            this.work.countedMoney = 0;
            //mp.trigger('Farm_stopWork::CLIENT');
        }
    },
    mounted() {
        var $this = this;
        $(document).keyup(function (key) {
            if (key.keyCode === 8 && $this.work.active == true && $this.isWork == false) {
                $this.typeWorkActive = true;
                $this.work.active = false;
            }
        });
        //mp.events.add('Farm_showWindow::CEF',() => {
        //     this.active = true;
        //     if(this.isWork) {
        //         this.typeWorkActive = false;
        //         this.work.active = true;
        //     }
        //     else {
        //         this.typeWorkActive = true;
        //         this.work.active = false;
        //     }
        // })
    },
})