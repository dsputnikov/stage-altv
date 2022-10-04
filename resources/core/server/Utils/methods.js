
import * as alt from 'alt';
import { addNotify } from '../Events/hud'

export function playAnimation(player, dir, name, duration, flag) {
    alt.emitClient(player, 'playAnimation', dir, name, duration, flag)
}

/**
 * Получить игрока по айди
 * @param  {} ID
 * @returns {Array<alt.Player>} игрока
 */

export function getById(id) {
    var rplayer;
    alt.Player.all.forEach(function (player) {
        if (player.getSyncedMeta('id') == id) {
            rplayer = player;
        }
    })
    return rplayer;
}

// client markers

export function createMarker(player, markerData) {
    alt.emitClient(player, 'createMarker::CLIENT', markerData)
}

// Blip
export function createBlip(X, Y, Z, sprite, scale, color, shortRange, name) {
    const blip = new alt.PointBlip(X, Y, Z);
    blip.sprite = sprite;
    blip.scale = scale;
    blip.color = color;
    blip.shortRange = shortRange;
    blip.name = name;
    return blip
}

// Удаление трупа машины после взрыва
alt.on('vehicleDestroy', (vehicle) => {
    alt.setTimeout(() => {
        vehicle.destroy();
    }, 15000);
});