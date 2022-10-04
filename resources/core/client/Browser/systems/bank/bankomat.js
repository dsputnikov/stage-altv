
var bankomat = new Vue({
    el: "#bankomat",
    data: {
        active: false,
        open: true,
        playername: '',
        playermoney: 0,
        balance: 0,
        account: 0,
        modal: {
            active: false,
            type: 0,
            text: 'пополнить счёт',
            input1holder: 'Введите сумму',
            input2holder: 'Введите сумму',
            input1: '',
            input2: '',
            button: 'Перевести'
        },
        error: {
            active: false,
            text: ''
        },
        currentOperation: 0,
    },
    methods: {
        clickButton(id) {
            if (id == 1) {
                this.open = false;
                this.modal.type = 2;
                this.modal.active = true;
                this.modal.text = 'Пополнить баланс'
                this.modal.input1holder = 'Введите сумму'
                this.modal.button = 'Пополнить'
                this.currentOperation = 1;
            }
            else if (id == 2) {
                this.open = false;
                this.modal.active = true;
                this.modal.type = 2;
                this.modal.text = 'Снять со счёта'
                this.modal.input1holder = 'Введите сумму'
                this.modal.button = 'Снять'
                this.currentOperation = 2;
            }
            else if (id == 3) {
                this.open = false;
                this.modal.active = true;
                this.modal.type = 1;
                this.modal.text = 'Перевести деньги'
                this.modal.input1holder = 'Введите ID игрока'
                this.modal.input2holder = 'Введите сумму'
                this.currentOperation = 3;
                this.modal.button = 'Перевести'
            }
        },
        closeBankWindow() {
            alt.emit('Bank_hide::CLIENT')
        },
        closeModalWindow() {
            this.open = true;
            this.modal.active = false;
            this.modal.text = ''
            this.modal.input1 = ''
        },
        clickModal() {
            if (this.currentOperation == 1) {
                let input = parseInt(this.modal.input1);
                if (input == '' || isNaN(input)) return this.showError('Вы ничего не ввели');
                if (input < 1 || input > 999999) return this.showError('Сумма должна быть от 1 до 999999');

                this.modal.input1 = '';
                this.modal.input2 = '';
                alt.emit('Bank_bankomatActions::CLIENT', 1, input)
            }
            else if (this.currentOperation == 2) {
                let input = this.modal.input1;
                if (input == '' || isNaN(input)) return this.showError('Вы ничего не ввели');
                if (input < 1 || input > 999999) return this.showError('Сумма должна быть от 1 до 999999');

                this.modal.input1 = '';
                this.modal.input2 = '';
                alt.emit('Bank_bankomatActions::CLIENT', 2, input)
            }
            else if (this.currentOperation == 3) {
                let input = this.modal.input1;
                let input2 = this.modal.input2;
                if (input == '' || isNaN(input)) return this.showError('Вы ничего не ввели');
                if (input2 == '' || isNaN(input2)) return this.showError('Вы ничего не ввели');
                if (input2 < 1 || input2 > 999999) return this.showError('Сумма должна быть от 1 до 999999');

                this.modal.input1 = '';
                this.modal.input2 = '';
                alt.emit('Bank_bankomatActions::CLIENT',false, 3, input, input2)
            }
        },
        showError(text) {
            this.error.active = true;
            this.error.text = text;
            setTimeout(() => {
                this.closeError();
            }, 5000)
        },
        closeError() {
            this.error.active = false;
            this.error.text = '';
        }
    }
})

if('alt' in window) {
    alt.on('Bank_bankomatShow::CEF',(bool,acc,money,pmoney,name) => {
        bankomat.active = bool;
        bankomat.open = true;
        bankomat.modal.active = false;
        bankomat.playermoney = pmoney;
        bankomat.account = acc;
        bankomat.playername = name;
        bankomat.balance = money;
    })
}