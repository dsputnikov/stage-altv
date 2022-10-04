/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />

import * as alt from 'alt';
import { DB } from '../Modules/mysql';
import * as chat from '../Events/hud';
// import * as bcrypt from 'bcrypt';

alt.on('playerConnect', (player) => {
    player.spawn(-1494.052734375, -1283.8154296875, 2.3033447265625, 0);
    // player.pos = new alt.Vector3(-1494.052734375, -1283.8154296875, 2.3033447265625)
    player.rot = new alt.Vector3(0, 0, 0.9894780516624451)
    player.setDateTime(24, 1, 2021, 20, 0, 0);
    alt.emitClient(player, 'Events_nativeset::CLIENT');
    alt.emitClient(player, 'Auth_startAwait::CLIENT'); // Показываем логин диалог
    player.setSyncedMeta('IN_COLSHAPE', false)
    player.logged = false;
    player.dimension = player.id + 2;
});

alt.onClient('Events_playerLogin::SERVER', (player, login, password) => {
    //Штож
    DB.query('SELECT * FROM accounts WHERE login = ? AND password = ?', [login, password], function (err, r) {
        if (err) return console.log(err);
        if (r[0]) {
            if (player.logged) return;
            player.dimension = 0;
            player.setSyncedMeta('admin', r[0].admin); // Установить админа
            player.logged = true;
            player.setSyncedMeta('id', r[0].id); 
            player.login = r[0].login; // Для сервера
            player.setSyncedMeta('login', r[0].login); // Для клиента
            player.pos = new alt.Vector3(-1101.81103515625, 5450.38671875, 2.539184570312)
            player.rot = new alt.Vector3(0,0,180);

            alt.emitClient(player, 'Auth_succefully::CLIENT');
            alt.emit('Charselector_open::SERVER', player)
            chat.send(player, `Добро пожаловать на !{#2C80EF} Stage Test Mode!`)
        } else {
            alt.emitClient(player, 'Auth_showError::CLIENT', 'Не верный логин или пароль')
        }
    });
})

alt.onClient('Auth_playerRegister::CLIENT', (player, login, email, password) => {
    DB.query('SELECT * FROM accounts WHERE login = ?', [login], function (err, r) {
        if (r[0]) {
            if (r[0].login == login) return console.log("такой акк уже ест")
        }
        DB.query('INSERT INTO accounts (login,email,password,socialClub,regIP,lastIP) VALUES(?,?,?,?,?,?)', [login, email, password, player.socialID, player.ip.replace(/^.*:/, '').trim(), player.ip.replace(/^.*:/, '').trim()], function (err, r) {
            if (err) return console.log(err);
            alt.emitClient(player, 'Auth_setState::CLIENT', 1)
        })
    })
});
