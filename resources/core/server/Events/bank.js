import * as alt from 'alt';
import * as chat from './hud';
import * as methods from '../Utils/methods';
import { DB } from '../Modules/mysql';

// ------------------------------------------[Банк]------------------------------------------\\

alt.onClient('Bank_openWindow::SERVER', openBank);
alt.on('Bank_openWindow::SERVER', openBank);

async function openBank(player) {
    DB.query('SELECT * from bank_operations WHERE playerid = ?', [player.getSyncedMeta('id')], function (err, r) {
        if (err) return console.error(err);
        if (r[0]) {
            const res = r.reverse();
            alt.emitClient(player, 'Bank_updateOperations::CLIENT', res);
        }
    });
    DB.query('SELECT * from bank WHERE playerid = ?', [player.getSyncedMeta('id')], function (err, r) {
        if (err) return console.error(err);
        if (r[0]) {
            alt.emitClient(player, 'Bank_updateInfo::CLIENT', r[0].account, r[0].money);
        }
    });
    alt.emitClient(player, 'Bank_openWindow::CLIENT', player.accountBank);
}

//

alt.onClient('Bank_createBankAccount::SERVER', (player, number) => {
    if (player.accountBank == 1) return;
    player.accountBank = 1;
    DB.query('UPDATE characters SET bank = ? WHERE id = ?', [1, player.getSyncedMeta('id')]);
    DB.query(
        'INSERT INTO bank VALUES (?,?, ?, ?, ?)',
        [0, player.login, Number(player.getSyncedMeta('id')), Number(number), 0],
        function (err, r) {
            if (err) return console.log(err);
            alt.emit('Bank_openWindow::SERVER', player);
            player.setBankMoney(0);
        }
    );
});

alt.onClient('Bank_deleteAccount::SERVER', (player) => {
    DB.query('DELETE FROM bank WHERE playerid = ?', player.getSyncedMeta('id'), function (err, r) {
        if (err) return console.log(err);
    });
    DB.query('UPDATE characters SET bank = ? WHERE id = ?', [0, player.getSyncedMeta('id')]);
    player.giveMoney(player.getBankMoney());
    chat.send(
        player,
        `!{#2C80EF}[Информация] !{#FFFFFF}Вы успешно удалили счёт, вам было возвращено !{#2C80EF}$${player.getBankMoney()}`
    );
    player.accountBank = 0;
    player.setBankMoney(0);
});

alt.onClient('Bank_modalActions::SERVER', (player, type, input, input2) => {
    // Пополнение
    if (type == 1) {
        if (player.getMoney() < input)
            return alt.emitClient(player, 'Bank_showError::CLIENT', 'У вас недостаточно денег');
        player.removeMoney(input);
        let com = (parseInt(input) / 100) * 1;
        player.giveBankMoney(input);
        alt.emit('Bank_addBankOperation::SERVER', player, 2, 'Пополнение счёта', 'в банке', `+${input}`);
        alt.emit('Bank_openWindow::SERVER', player);
    } else if (type == 2) {
        if (player.getBankMoney() < input)
            return alt.emitClient(player, 'Bank_showError::CLIENT', 'У вас недостаточно денег');
        player.removeBankMoney(input);
        let com = (parseInt(input) / 100) * 1;
        player.giveMoney(input);
        alt.emit('Bank_addBankOperation::SERVER', player, 1, 'Снятие денег', 'со счёта', `-${input}`);
        alt.emit('Bank_openWindow::SERVER', player);
    } else if (type == 3) {
        if (player.getMoney() < input2)
            return alt.emitClient(player, 'Bank_showError::CLIENT', 'У вас недостаточно денег');
        let target = methods.getById(input);
        if (target == player) return alt.emitClient(player, 'Bank_showError::CLIENT', 'Вы не можете самому себе');
        if (target == undefined)
            return alt.emitClient(player, 'Bank_showError::CLIENT', 'Игрок не в сети или его не существует');
        if (target.accountBank == 0)
            return alt.emitClient(player, 'Bank_showError::CLIENT', 'У игрока нет банковского счёта');
        player.removeBankMoney(input2);
        target.giveBankMoney(input2);
        alt.emit('Bank_addBankOperation::SERVER', player, 1, 'Перевод денег', `Игроку ${target.name}`, `-${input}`);
        alt.emit('Bank_openWindow::SERVER', player);
        chat.send(target, `!{#BAFE2A}[Банк] !{#FFFFFF}На Ваш банковский счёт было начисленно: $${input2}`);
        chat.addNotify(target, 3, `На Ваш банковский счёт было начисленно: $${input2}`, 7000);
    }
});

alt.on('Bank_addBankOperation::SERVER', (player, type, name, subname, money) => {
    DB.query(
        'INSERT INTO bank_operations VALUES (?,?,?,?,?,?)',
        [0, player.getSyncedMeta('id'), type, name, subname, money],
        function (err, r) {
            if (err) return console.error(err);
            console.log('created');
        }
    );
});

// ------------------------------------------[Банкомат]------------------------------------------\\

alt.onClient('Bank_openBankomat::SERVER', openBankomat);
alt.on('Bank_openBankomat::SERVER', openBankomat);

function openBankomat(player) {
    DB.query('SELECT * from characters WHERE id = ?', [player.getSyncedMeta('id')], function (err, r) {
        if (err) return console.error(err);
        if (r[0]) {
            if (r[0].bank == 0) return chat.addNotify(player, 2, 'У вас нет банковского счёта', 7000);
            DB.query('SELECT * from bank WHERE playerid = ?', [player.getSyncedMeta('id')], function (err, r) {
                if (err) return console.error(err);
                if (r[0]) {
                    alt.emitClient(
                        player,
                        'Bank_openBankomat::CLIENT',
                        r[0].account,
                        r[0].money,
                        player.getMoney(),
                        player.nick
                    );
                }
            });
        }
    });
}

alt.onClient('Bank_bankomatmodalActions::SERVER', (player, type, input, input2) => {
    // Пополнение
    if (type == 1) {
        if (player.getMoney() < input)
            return alt.emitClient(player, 'Bank_showError::CLIENT', 'У вас недостаточно денег');
        player.removeMoney(input);
        let com = (parseInt(input) / 100) * 1;
        player.giveBankMoney(input);
        alt.emit('Bank_addBankOperation::SERVER', player, 2, 'Пополнение счёта', 'в банкомате', `+${input}`);
        alt.emit('Bank_openBankomat::SERVER', player);
    } else if (type == 2) {
        if (player.getBankMoney() < input)
            return alt.emitClient(player, 'Bank_showError::CLIENT', 'У вас недостаточно денег');
        player.removeBankMoney(input);
        let com = (parseInt(input) / 100) * 1;
        player.giveMoney(input);
        alt.emit('Bank_addBankOperation::SERVER', player, 2, 'Снятие со счёта', 'в банкомате', `+${input}`);
        alt.emit('Bank_openBankomat::SERVER', player);
    } else if (type == 3) {
        if (player.getMoney() < input2)
            return alt.emitClient(player, 'Bank_showError::CLIENT', 'У вас недостаточно денег');
        let target = methods.getById(input);
        if (target == player) return alt.emitClient(player, 'Bank_showError::CLIENT', 'Вы не можете самому себе');
        if (target == undefined)
            return alt.emitClient(player, 'Bank_showError::CLIENT', 'Игрок не в сети или его не существует');
        if (target.accountBank == 0)
            return alt.emitClient(player, 'Bank_showError::CLIENT', 'У игрока нет банковского счёта');
        player.removeBankMoney(input2);
        target.giveBankMoney(input2);
        alt.emit('Bank_openBankomat::SERVER', player);
        chat.send(target, `!{#BAFE2A}[Банк] !{#FFFFFF}На Ваш банковский счёт было начисленно: $${input2}`);
        chat.addNotify(target, 3, `На Ваш банковский счёт было начисленно: $${input2}`, 7000);
        alt.emit('Bank_addBankOperation::SERVER', player, 1, 'Перевод денег', `Игроку ${target.name}`, `-${input}`);
    }
});