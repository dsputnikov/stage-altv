
var Bank = new Vue({
    el: '#bank',
    data: {
        active: false,
        open: true,
        isAccount: 1,
        account: 0,
        money: 0,
        bank_operations: [
            // { type: 2, name: 'Пополнение счёта', subname: 'от Clement_Velasco', money: '+50.000' },
            // { type: 2, name: 'снятие счёта', subname: 'от Clement_Velasco', money: '+50.000' },
        ],
        modal: {
            active: false,
            type: 1,
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
        createBankAccount() {
            let num = Math.floor(100000 + Math.random() * 900000);
            alt.emit('Bank_createBankAccount::CLIENT', num)
        },
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
            else if (id == 4) {
                this.open = false;
                this.modal.active = true;
                this.modal.type = 3;
                this.currentOperation = 4;
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
            this.currentOperation = 0;
        },
        clickModal() {
            if (this.currentOperation == 1) {
                let input = parseInt(this.modal.input1);
                if (input == '' || isNaN(input)) return this.showError('Вы ничего не ввели');
                if (input < 1 || input > 999999) return this.showError('Сумма должна быть от 1 до 999999');

                this.modal.input1 = '';
                this.modal.input2 = '';
                alt.emit('Bank_bankActions::CLIENT', 1, input)
                this.closeModalWindow()
            }
            else if (this.currentOperation == 2) {
                let input = this.modal.input1;
                if (input == '' || isNaN(input)) return this.showError('Вы ничего не ввели');
                if (input < 1 || input > 999999) return this.showError('Сумма должна быть от 1 до 999999');

                this.modal.input1 = '';
                this.modal.input2 = '';
                alt.emit('Bank_bankActions::CLIENT', 2, input)
                this.closeModalWindow()
            }
            else if (this.currentOperation == 3) {
                let input = this.modal.input1;
                let input2 = this.modal.input2;
                if (input == '' || isNaN(input)) return this.showError('Вы ничего не ввели');
                if (input2 == '' || isNaN(input2)) return this.showError('Вы ничего не ввели');
                if (input2 < 1 || input2 > 999999) return this.showError('Сумма должна быть от 1 до 999999');

                this.modal.input1 = '';
                this.modal.input2 = '';
                alt.emit('Bank_bankActions::CLIENT', 3, input, input2)
                this.closeModalWindow()
            }
            else if (this.currentOperation == 4) {
                alt.emit('Bank_deleteAccount::CLIENT')
                this.closeModalWindow()
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
            const timeout = setTimeout(() => {
                this.error.text = '';
                clearTimeout(timeout);
            }, 500)

        }
        // isAN(value) {
        //     return (value instanceof Number || typeof value === 'number') && !isNaN(value);
        // }
    }
})

if ('alt' in window) {
    alt.on('Bank_openWindow::CEF', (bool, acc) => {
        Bank.active = bool;
        Bank.open = true;
        Bank.isAccount = acc;
    })
    alt.on('Bank_updateInfo::CEF', (account, money) => {
        Bank.account = account;
        Bank.money = money;
    })
    alt.on('Bank_updateOperations::CEF', (operations) => {
        Bank.bank_operations = operations;
    })
    alt.on('Bank_showError::CEF', (text) => {
        Bank.showError(text)
    })
}