
import * as alt from 'alt';
import { DB } from '../Modules/mysql';
import { playAnimation } from '../Utils/methods';
import * as chat from '../Events/hud';
import { getPlayersInRadius } from '../Utils/playersInRadius';

alt.onClient('Inventory_syncItems::SERVER', (player, data) => {
    DB.query('UPDATE characters SET items = ? WHERE id = ?', [JSON.stringify(data), player.getSyncedMeta('id')], function (err, r) {
        if (err) return console.log(err)
    })
})

alt.onClient('Inventory_updateItems::SERVER', (player) => {
    DB.query('SELECT items FROM characters WHERE id = ?', [player.getSyncedMeta('id')],function (err, r) {
        if(err) return console.log(err)
        if(r[0]) {
            alt.emitClient(player,'Inventory_loadInventory::CLIENT',JSON.parse(r[0].items),player.nick);
        }
    })
})

alt.onClient('Inventory_useItem::SERVER',(player,item) => {
    console.log(item.name)
    // Еда
    // switch(item.type){

    // }
    if(item.type === 'food') {
        if(item.t == 1) {
            playAnimation(player,'amb@code_human_wander_eating_donut@male@idle_a', 'idle_c',5000,49)
            sendMe(player,'съедает бургер');
        }
        if(item.t == 2) {
            sendMe(player,'выпил колу');
            alt.emitClient(player, 'objectAttacher:attachObject', 'cola');
            playAnimation(player,'amb@code_human_wander_drinking@male@idle_a', 'idle_c',15000,49)
        }
    }
})

function sendMe(player,msg) {
    let players = getPlayersInRadius(player.pos, 15);

    for (let _player of players) {
        chat.send(_player, `!{#c900c9} ${player.nick}[${player.getSyncedMeta('id')}]: ${msg}`)
    }
}