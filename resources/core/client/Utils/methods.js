/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />

import * as alt from 'alt-client';
import * as game from 'natives';
import { distance } from './math';

let cusorState = false;

export function showCursor(bool) {
    if (bool == undefined) return cusorState;
    if (cusorState == bool) return;
    // alt.log('cool',bool)
    cusorState = bool;
    alt.showCursor(cusorState);
}

let inColshape = false;

// Проигрование анимации
alt.onServer('playAnimation', (dir, name, duration, flag) => {
    game.requestAnimDict(dir);
    let interval = alt.setInterval(() => {
        if (game.hasAnimDictLoaded(dir)) {
            alt.clearInterval(interval);
            game.taskPlayAnim(alt.Player.local.scriptID, dir, name, 1, -1, duration, flag, 1, false, false, false);
        }
    }, 0);
});

// Посадить игрока в автомобиль
alt.onServer('Methods_veh:enter', vehicleEnter);
alt.on('Methods_veh:enter', vehicleEnter);

function vehicleEnter(vehicle, seat) {
    let cleared = false;
    const interval = alt.setInterval(() => {
        const vehicleScriptId = vehicle.scriptID;
        if (vehicleScriptId) {
            game.setPedIntoVehicle(alt.Player.local.scriptID, vehicleScriptId, seat);
            alt.clearInterval(interval);
            cleared = true;
        }
    }, 10);
    alt.setTimeout(() => {
        if (!cleared) {
            alt.clearInterval(interval);
        }
    }, 5000);
}

alt.everyTick(() => {
    game.drawRect(0, 0, 0, 0, 0, 0, 0, 0, 0);
});

//
alt.on('connectionComplete', async () => {
    game.destroyAllCams(true);
    game.renderScriptCams(false, false, 0, false, false, 0);
    game.doScreenFadeIn(0);
    game.triggerScreenblurFadeOut(0);
    game.freezeEntityPosition(alt.Player.local.scriptID, false);
});

// Рандомное INT число
export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Рандомное Float число
export function getRandomFloat() {
    return methods.getRandomInt(0, 10000) / 10000;
}

export function waitFor(duration) {
    return new Promise((resolve) => setTimeout(resolve, duration));
}

export async function loadModel(model) {
    if (typeof model === 'string') model = alt.hash(model);
    if (!game.isModelValid(model)) return false;
    game.requestModel(model);

    let hasModelLoaded = false;
    let tries = 0;

    while (!(hasModelLoaded = game.hasModelLoaded(model)) && tries++ < 10) {
        await waitFor(10);
    }

    return hasModelLoaded;
}

export function requestModel(modelHash, tries = 0) {
    return new Promise((resolve) => {
        if (!game.isModelValid(modelHash)) return resolve(false);
        if (game.hasModelLoaded(modelHash)) return resolve(true);
        if (tries == 0) game.requestModel(modelHash);
        if (tries == 40) return resolve(false);

        setTimeout(() => {
            if (!game.hasModelLoaded(modelHash)) {
                return resolve(requestModel(modelHash, ++tries));
            }
            resolve(true);
        }, 25);
    });
}

export let peds_data = [];

export async function createNpc(model, coords, heading) {
    await loadModel(alt.hash(model));
    let ped = game.createPed(0, alt.hash(model), coords.x, coords.y, coords.z, heading, false, false);
    game.setEntityAsMissionEntity(ped, true, false); // make sure its not despawned by game engine
    game.setBlockingOfNonTemporaryEvents(ped, true); // make sure ped doesnt flee etc only do what its told
    game.setPedCanBeTargetted(ped, false);
    game.setPedCanBeKnockedOffVehicle(ped, 1);
    game.setPedCanBeDraggedOut(ped, false);
    game.setPedSuffersCriticalHits(ped, false);
    game.setPedDropsWeaponsWhenDead(ped, false);
    game.setPedDiesInstantlyInWater(ped, false);
    game.setPedCanRagdoll(ped, false);
    game.setPedDiesWhenInjured(ped, false);
    game.taskSetBlockingOfNonTemporaryEvents(ped, true);
    game.setPedFleeAttributes(ped, 0, false);
    game.setPedConfigFlag(ped, 32, false); // ped cannot fly thru windscreen
    game.setPedConfigFlag(ped, 281, true); // ped no writhe
    game.setPedGetOutUpsideDownVehicle(ped, false);
    game.setPedCanEvasiveDive(ped, false);
    game.freezeEntityPosition(ped, true);
    game.setEntityInvincible(ped, true);

    let pedData = {
        ped: ped,
        pos: coords,
    };

    peds_data.push(pedData);
    alt.log(`NPC успешно создан.`);
}

alt.on('disconnect', () => {
    peds_data.map((value) => {
        game.deletePed(value.ped);
    });
    peds_data = [];
});

// client marker

export function drawMarker(markerData) {
    game.drawMarker(
        markerData.type,
        markerData.pos.x,
        markerData.pos.y,
        markerData.pos.z,
        0,
        0,
        0,
        0,
        0,
        0,
        markerData.scale.x,
        markerData.scale.y,
        markerData.scale.z,
        markerData.r,
        markerData.g,
        markerData.b,
        markerData.alpha,
        false,
        true,
        2,
        false,
        undefined,
        undefined,
        false
    );
}

// type: 0,
// pos: new alt.Vector3(0, 0, 0),
// dir: new alt.Vector3(0, 0, 0),
// rot: new alt.Vector3(0, 0, 0),
// scale: new alt.Vector3(0, 0, 0),
// r: 0,
// g: 0,
// b: 0,
// alpha: 0,

alt.onServer('createMarker::CLIENT', (markerData) => {
    alt.setInterval(() => {
        drawMarker(markerData);
    }, 0);
});

export class clientColshape {
    constructor(player, position, radius, check, enterCallback, exitCallback) {
        this.posx = position.x;
        this.posy = position.y;
        this.posz = position.z;
        this.radius = radius;
        this.interval = null;
        this.enterCallback = enterCallback;
        this.exitCallback = exitCallback;
        this.checkDist = check;
        this.inColshape = false;

        if (this.checkDist) {
            alt.emitServer('setPlayerColshapeMeta::SERVER', false);
            this.interval = setInterval(() => {
                let poss = { x: this.posx, y: this.posy, z: this.posz };
                const dist = distance(player.pos, poss);
                if (!this.inColshape && parseInt(dist) <= this.radius && this.enterCallback != null) {
                    this.playerEnterClientColshape();
                    this.inColshape = true;
                } else if (this.inColshape && parseInt(dist) > this.radius && this.exitCallback != null) {
                    this.playerLeaveClientColshape();
                    this.inColshape = false;
                }
            }, 5);
        }
    }

    playerEnterClientColshape() {
        this.enterCallback();
    }

    playerLeaveClientColshape() {
        this.exitCallback();
    }

    destroyColshape() {
        if (this.interval != null) {
            clearInterval(this.interval);
            this.radius = null;
            inColshape = false;
            this.enterCallback = null;
            this.exitCallback = null;
            alt.log('COLSHAPE DESTROYED');
        }
    }
}

// Blip
export function createBlip(X, Y, Z, sprite, scale, color, shortRange, name) {
    const blip = new alt.PointBlip(X, Y, Z);
    blip.sprite = sprite;
    blip.scale = scale;
    blip.color = color;
    blip.shortRange = shortRange;
    blip.name = name;
}

// RE

// alt.on('keydown',(key) => {
//     // Активация эдитора
//     if(key == 117) {
//         enableRockstarEditor()
//     }
//     // Сьёмка
//     if(key == 118) {
//         startRecording()
//     }
//     if(key == 119) {
//         stopRecordingAndSaveClip()
//     }
// })

// alt.on('keyup', (key) => {
//     if (key == 118) {
//         let view = null;
//         const player = alt.Player.local;
//         game.createObject(game.getHashKey('v_ilev_cin_screen'), player.pos.x, player.pos.y, player.pos.z, false, false, false);
//         alt.log('exist = ' + alt.isTextureExistInArchetype(game.getHashKey('v_ilev_cin_screen'), 'script_rt_cinscreen'));
//         alt.showCursor(true)
//         alt.setTimeout(() => {
//             alt.toggleGameControls(false)
//         },5000
//         )

//         let inter = alt.setInterval(() => {
//             if (alt.isTextureExistInArchetype(game.getHashKey('v_ilev_cin_screen'), 'script_rt_cinscreen')) {
//                 view = new alt.WebView('https://media1.tenor.com/images/8e6fe38d098da6b26815b3dd0ad6b495/tenor.gif?itemid=23687148', game.getHashKey('v_ilev_cin_screen'), 'script_rt_cinscreen');
//                 view.focus();
//                 alt.clearInterval(inter);
//                 return;
//             }
//         }, 100);
//     }
// })

// Фишка для зимы

alt.on('connectionComplete', () => {
    game.setForceVehicleTrails(true);
    game.setForcePedFootstepsTracks(true);
    game.requestScriptAudioBank('ICE_FOOTSTEPS', false, 0);
    game.requestScriptAudioBank('SNOW_FOOTSTEPS', false, 0);

    game.requestNamedPtfxAsset('core_snow');
    alt.log('X1D');

    let timer = alt.setInterval(() => {
        if (game.hasNamedPtfxAssetLoaded('core_snow')) {
            game.useParticleFxAsset('core_snow');
            alt.log('XD');
            alt.clearInterval(timer);
        }
    }, 1);
});

function startRecording() {
    game.startRecording(1);
}

function stopRecordingAndSaveClip() {
    game.stopRecordingAndSaveClip();
}

function enableRockstarEditor() {
    game.activateRockstarEditor();
    game.setPlayerRockstarEditorDisabled(false);

    const interval = setInterval(() => {
        if (game.isScreenFadedOut()) {
            game.doScreenFadeIn(1000);
            clearInterval(interval);
        }
    }, 1000);
}

function disableRockstarEditor() {
    game.setPlayerRockstarEditorDisabled(true);
}

// Player created waypoint

let interval;
let oldcoords = { x: 0, y: 0, z: 0 };
let coords = { x: 0, y: 0, z: 0 };

export function startCheckWaypoint(event) {
    interval = setInterval(() => {
        let waypoint = game.getFirstBlipInfoId(8);
        if (game.doesBlipExist(waypoint)) {
            coords = game.getBlipInfoIdCoord(waypoint);
            if (coords.x === oldcoords.x) return;
            oldcoords = coords;
            alt.emit(event, coords);
        }
    }, 300);
}

export function stopCheckWaypoints() {
    if (interval == undefined || interval == null) return;
    clearInterval(interval);
}

alt.on('may', (cord) => {
    alt.log('fdsf' + cord);
});
