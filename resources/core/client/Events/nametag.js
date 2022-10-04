/// <reference types="@altv/types-natives" />

/// <reference types="@altv/types-client" />
import alt from 'alt-client';
import * as native from 'natives';

let hideNametagsInVehicle = false;
let drawDistance = 100;


function drawNametags() {
    if (alt.Player.local.getSyncedMeta('STOP_DRAWS')) {
        return;
    }

    for (let i = 0, n = alt.Player.all.length; i < n; i++) {
        let player = alt.Player.all[i];
        if (!player.valid) {
            continue;
        }

        if (hideNametagsInVehicle && player.vehicle && alt.Player.local.vehicle !== player.vehicle) {
            continue;
        }

        if (player.scriptID === alt.Player.local.scriptID) {
            continue;
        }

        const name = player.nick;
        if (!name) {
            continue;
        }

        if (!native.hasEntityClearLosToEntity(alt.Player.local.scriptID, player.scriptID, 17)) {
            continue;
        }

        let dist = distance2d(player.pos, alt.Player.local.pos);
        if (dist > drawDistance) {
            continue;
        }

        const isChatting = player.getSyncedMeta('CHATTING');
        const pos = { ...native.getPedBoneCoords(player.scriptID, 12844, 0, 0, 0) };
        pos.z += 0.75;

        let scale = 1 - (0.8 * dist) / drawDistance;
        let fontSize = 0.6 * scale;

        const lineHeight = native.getTextScaleHeight(fontSize, 4);
        const entity = player.vehicle ? player.vehicle.scriptID : player.scriptID;
        const vector = native.getEntityVelocity(entity);
        const frameTime = native.getFrameTime();

        // Names
        native.setDrawOrigin(
            pos.x + vector.x * frameTime,
            pos.y + vector.y * frameTime,
            pos.z + vector.z * frameTime,
            0
        );
        native.beginTextCommandDisplayText('STRING');
        native.setTextFont(4);
        native.setTextScale(fontSize, fontSize);
        native.setTextProportional(true);
        native.setTextCentre(true);
        native.setTextColour(255, 255, 255, 255);
        native.setTextOutline();
        native.addTextComponentSubstringPlayerName(`${name}`);
        native.endTextCommandDisplayText(0, 0);

        native.clearDrawOrigin();
    }
}

/**
 * @param  {alt.Vector3} vector1
 * @param  {alt.Vector3} vector2
 */
function distance2d(vector1, vector2) {
    return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2));
}