import * as alt from 'alt';
import { DB } from '../Modules/mysql';
import * as chat from '../Events/hud';

let playerMeta = alt.Player.prototype;

// Выдача денег
playerMeta.giveMoney = function (money) {
    let oldAmount = this.getSyncedMeta('money');
    let newAmount = Number(oldAmount) + Number(money);
    this.setSyncedMeta('money', newAmount);
    DB.query(
        'UPDATE characters SET money = ? WHERE id = ?',
        [this.getMoney(), this.getSyncedMeta('id')],
        function (err, r) {
            if (err) return console.error(err);
        }
    );
    alt.emitClient(this, 'Hud_updateMoney::CLIENT', this.getMoney(), this.getBankMoney());
};

playerMeta.giveBankMoney = function (money) {
    let oldAmount = this.getSyncedMeta('bank');
    let newAmount = parseInt(oldAmount) + parseInt(money);
    this.setSyncedMeta('bank', newAmount);
    DB.query('UPDATE bank SET money = ? WHERE playerid = ?', [newAmount, this.getSyncedMeta('id')], function (err, r) {
        if (err) return console.error(err);
    });
    alt.emitClient(this, 'Hud_updateMoney::CLIENT', this.getMoney(), this.getBankMoney());
};

playerMeta.setMoney = function (money) {
    this.setSyncedMeta('money', money);
    DB.query('UPDATE characters SET money = ? WHERE id = ?', [money, this.getSyncedMeta('id')], function (err, r) {
        if (err) return console.error(err);
    });
    alt.emitClient(this, 'Hud_updateMoney::CLIENT', this.getMoney(), this.getBankMoney());
};

playerMeta.setBankMoney = function (money) {
    this.setSyncedMeta('bank', money);
    DB.query('UPDATE bank SET money = ? WHERE playerid = ?', [money, this.getSyncedMeta('id')], function (err, r) {
        if (err) return console.error(err);
    });
    alt.emitClient(this, 'Hud_updateMoney::CLIENT', this.getMoney(), this.getBankMoney());
};

playerMeta.removeMoney = function (money) {
    let oldAmount = this.getSyncedMeta('money');
    let newAmount = Number(oldAmount) - Number(money);
    this.setSyncedMeta('money', newAmount);
    DB.query('UPDATE characters SET money = ? WHERE id = ?', [newAmount, this.getSyncedMeta('id')], function (err, r) {
        if (err) return console.error(err);
    });
    alt.emitClient(this, 'Hud_updateMoney::CLIENT', this.getMoney(), this.getBankMoney());
};

playerMeta.removeBankMoney = function (money) {
    let oldAmount = this.getSyncedMeta('bank');
    let newAmount = Number(oldAmount) - Number(money);
    this.setSyncedMeta('bank', newAmount);
    DB.query('UPDATE bank SET money = ? WHERE playerid = ?', [newAmount, this.getSyncedMeta('id')], function (err, r) {
        if (err) return console.error(err);
    });
    alt.emitClient(this, 'Hud_updateMoney::CLIENT', this.getMoney(), this.getBankMoney());
};

playerMeta.getMoney = function () {
    return this.getSyncedMeta('money');
};

playerMeta.getBankMoney = function () {
    return this.getSyncedMeta('bank');
};
