
import * as alt from 'alt';
import { DB } from '../Modules/mysql';

let pos = new alt.Vector3(-1065.81103515625, 5468.703125, 3.3985595703125);
let rot = new alt.Vector3(0, 0, 180);

alt.on('pedCreator_start::SERVER', (player) => {
    player.pos = pos;
    // player.rot = rot;
    player.dimension = player.id + 2;
    player.model = alt.hash('mp_m_freemode_01')
    alt.emitClient(player, 'pedCreator_start::CLIENT')
})

alt.onClient('pedCreator_updateServer', (player, model) => {
    player.model = alt.hash(model);
    player.pos = pos;
    // player.rot = rot;
    alt.emitClient(player, 'pedCreator_update::CLIENT')
})

alt.onClient('pedCreator_finishSync::SERVER', async (player, data) => {
    DB.query('INSERT INTO characters (login,Name,Surname,age,gender,pedDnk, pedFace, pedHair, pedClothes,lastPos) VALUES(?,?,?,?,?,?,?,?,?,?)', [player.getSyncedMeta('login'), data.name, data.surname, data.age, data.gender, [data.father, data.mother, data.faceMix, data.skinMix].toString(), JSON.stringify(data.structure), JSON.stringify(data.appearance), JSON.stringify(data.clothes), '-1037.8990478515625, -2736.333251953125, 13.762728691101074'], (err) => {
        if (err) console.log(err)
        DB.query('SELECT * FROM characters WHERE login = ?', [player.getSyncedMeta('login')], function (err, r) {
            if (err) return console.log(err)
            if(r.length > 0) {
                alt.emit('Charselector_playS::SERVER',player,r[r.length-1])
            }
        })
    })
})
