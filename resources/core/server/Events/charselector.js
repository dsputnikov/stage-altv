
import * as alt from 'alt';
import { DB } from '../Modules/mysql';
import { addNotify } from '../Events/hud';

alt.on('Charselector_open::SERVER', (player) => {
    DB.query('SELECT * FROM characters WHERE login = ?', [player.getSyncedMeta('login')], function (err, r) {
        if (err) return console.log(err)
        alt.emitClient(player, 'Charselector_showSelector::CLIENT', r)
        if (r.length == 0) return alt.emitClient(player, 'Charselector_showSelector::CLIENT', null)
    })
})

alt.onClient('Charselector_selectCharacter::SERVER', (player, data) => {
    let model = (data.gender == 0) ? 'mp_m_freemode_01' : 'mp_f_freemode_01';

    player.model = alt.hash(model)
    alt.emitClient(player, 'Charselector_loadFace::CLIENT', data);
})

// Нажал "Начать игру"
alt.onClient('Charselector_play::SERVER', playButton);
alt.on('Charselector_playS::SERVER', playButton)

function playButton(player, data) {
    let spawn = data.lastPos.split(',');
    player.nick = `${data.Name}_${data.Surname}`;
    player.setSyncedMeta('id', data.id);
    player.spawn(spawn[0], spawn[1], spawn[2])
    player.setMoney(parseInt(data.money))
    player.accountBank = data.bank;
    DB.query('SELECT * from bank WHERE playerid = ?', [player.getSyncedMeta('id')], function (err, r) {
        if (err) return console.error(err)
        if(r[0]) {
            player.setBankMoney(parseInt(r[0].money))
        }
     })
    player.dimension = data.dimension;
    addNotify(player, 1, `Добро пожаловать ${data.Name} ${data.Surname}`, 7000)
    alt.emitClient(player, 'Charselector_loadFace::CLIENT', data);
}


alt.onClient('Charselector_loadClothes::SERVER', (player, data) => {
    let head = JSON.parse(data.pedHair)
    let clothes = JSON.parse(data.pedClothes)

    player.setClothes(2, head.hair, 0); // Причесон

    // Одежда
    player.setProp(0, clothes.hats, 0); // Головной убор
    player.setClothes(11, clothes.tops, 0); // Верх
    player.setClothes(8, clothes.undershit, 0); // Низ
    player.setClothes(4, clothes.legs, 0); // Штаны
    player.setClothes(6, clothes.shoes, 0); // Капцы
    player.setProp(1, clothes.glasses, 0); // Очки
})

alt.onClient('Charselector_createCharacter::SERVER', (player) => {
    alt.emit('pedCreator_start::SERVER', player)
})

alt.on('playerDisconnect', async (player) => {
    DB.query('UPDATE characters SET lastPos = ? WHERE id = ?', [[player.pos.x, player.pos.y, player.pos.z].toString(), player.id])
})