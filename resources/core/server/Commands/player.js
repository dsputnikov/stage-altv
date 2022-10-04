
import * as alt from 'alt';
import { addNotify } from '../Events/hud';
import * as chat from '../Events/hud';
import { getPlayersInRadius } from '../Utils/playersInRadius';

chat.registerCmd('me', (player, args) => {
    if (args.length <= 0) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /me [действие]')
    const msg = args.join(' ');
    let players = getPlayersInRadius(player.pos, 50);

    for (let _player of players) {
        chat.send(_player, `!{#c900c9} ${player.nick}[${player.getSyncedMeta('id')}]: ${msg}`)
    }
});

chat.registerCmd('do', (player, args) => {
    if (args.length <= 0) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /do [действие]')
    const msg = args.join(' ');
    let players = getPlayersInRadius(player.pos, 50);

    for (let _player of players) {
        chat.send(_player, `!{#c900c9} ${msg} (( ${player.nick}[${player.getSyncedMeta('id')}] ))`)
    }
});

chat.registerCmd('try', (player, args) => {
    if (args.length <= 0) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /try [действие]')
    const msg = args.join(' ');
    let players = getPlayersInRadius(player.pos, 50);
    let random = Math.floor(Math.random() * 2);
    for (let _player of players) {
        if (random == 1) {
            chat.send(_player, `!{#c900c9} ${player.nick}[${player.getSyncedMeta('id')}] ${msg} | !{#008000}удачно`)
        } else {
            chat.send(_player, `!{#c900c9}${player.nick}[${player.getSyncedMeta('id')}] ${msg} | !{#DC143C}неудачно`)
        }
    }
});

chat.registerCmd('goto', (player) => {
    alt.emitClient(player,'create3d',true,2)
})