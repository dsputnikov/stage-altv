
var Auth = new Vue({
    el: "#auth",
    data() {
        return {
            active: false,
            state: 1,
            Login: {
                login: '',
                password: '',
                checked: false,
            },
            Register: {
                login: '',
                email: '',
                password: '',
                rpassword: ''
            },
            error: {
                text: '',
            }
        }
    },
    methods: {
        loginBtn: function () {
            let login = this.Login.login;
            let password = this.Login.password;
            let checked = this.Login.checked;

            alt.emit('Auth_playerLogin::CLIENT', login, password, checked);
        },
        registerBtn: function () {
            let login = this.Register.login;
            let email = this.Register.email;
            let password = this.Register.password;
            let rpassword = this.Register.rpassword;
            let rx = /^[а-яё\s-]+$/i;
            if (login.length <= 0 || password.length <= 0) return this.showError('Логин или пароль слишком короткий');
            if (rx.test(login) || rx.test(password)) return this.showError('Нельзя использовать русские буквы');
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(email) == false) return this.showError('Не правильный формат почты');
            if (password != rpassword) return this.showError('Пароли не совпадают');;
            alt.emit('Auth_playerRegister::CLIENT', login, email, password);
        },
        showError(text) {
            this.error.text = text;
        },
        setState(s) {
            this.error.text = '';
            this.state = s;
        },
    },
})

if ('alt' in window) {
    alt.on('Auth_startAwait::CEF', () => {
        alt.emit('Auth_showWindow::CLIENT')
    })
    alt.on('Auth_show::CEF', (bool) => {
        Auth.active = bool;
    });
    alt.on('Auth_setLogin::CEF', (bool, login, pass) => {
        Auth.Login.checked = bool;
        if (bool) {
            Auth.Login.login = login;
            Auth.Login.password = pass;
        }
    })
    alt.on('Auth_showError::CEF', (text) => {
        Auth.showError(text)
    })
    alt.on('Auth_setState::CEF', (s) => {
        Auth.state = s;
    })
    // Auth.active = true;
    alt.emit('Auth_showLogin::CLIENT')
}

