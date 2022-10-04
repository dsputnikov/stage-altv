
import * as alt from 'alt';
import { getPlayersInRadius } from '../Utils/playersInRadius';

export function addNotify(player, type, text, time) {
    alt.emitClient(player, 'HUD_addNotify', type, text, time);
}

let cmdHandlers = {};

function invokeCmd(player, cmd, args) {
    const callback = cmdHandlers[cmd];

    if (callback) {
        callback(player, args);
    } else {
        console.log('нет такой команды')
    }
}

alt.onClient('Chat_sendMessage::SERVER', (player, msg) => {
    if (msg[0] === '/') {
        msg = msg.trim().slice(1);

        if (msg.length > 0) {
            alt.log('[chat:cmd] ' + player.name + ': /' + msg);

            let args = msg.split(' ');
            let cmd = args.shift();

            invokeCmd(player, cmd, args);
        }
    } else {
        msg = msg.trim();

        if (msg.length > 0) {
            const players = getPlayersInRadius(player.pos, 50);
            for (const _player of players) {
                alt.emitClient(_player, 'Hud_addString::CLIENT', `${player.nick} [${player.getSyncedMeta('id')}]: ${msg}`);
            }
        }
    }
    
});

export function registerCmd(cmd, callback) {
    if (cmdHandlers[cmd] !== undefined) {
        alt.logError(`Failed to register command /${cmd}, already registered`);
    } else {
        cmdHandlers[cmd] = callback;
    }
}

export function send(player,text) {
    alt.emitClient(player, 'Hud_addString::CLIENT', text);
}