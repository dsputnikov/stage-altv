/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />

import * as alt from 'alt-client';
import * as game from 'natives';
import { browser } from '../Browser/app';
import { createCam, deleteCam } from '../Utils/3dCamera';

const fModel = alt.hash('mp_f_freemode_01');
const mModel = alt.hash(`mp_m_freemode_01`);

var tempData = {};

game.requestModel(fModel);
game.requestModel(mModel);

let clickCef = false;

alt.onServer('pedCreator_start::CLIENT', () => {
    browser.emit('pedCreator_show::CEF', true);
    alt.showCursor(true);
    alt.emit('HUD_show::CLIENT', false);
    browser.focus();
    createCam(-1065.81103515625, 5468.703125, 3.3985595703125, 0, 0, 285.854, 320, 30);
});

browser.on('pedCreator_finishSync::CLIENT', (data) => {
    browser.emit('pedCreator_show::CEF', false);
    alt.showCursor(false);
    alt.showCursor(false);
    alt.toggleGameControls(true);
    alt.emit('HUD_show::CLIENT', true);
    browser.unfocus();
    deleteCam();
    alt.emitServer('pedCreator_finishSync::SERVER', data);
});

browser.on('pedCreator_updateData::CLIENT', (data, t) => {
    tempData = data;
    if (t == 'gender') return updateCharacter(1);
    updateCharacter();
});

alt.onServer('pedCreator_update::CLIENT', updateCharacter);

function updateCharacter(t) {
    let _faceMix = parseFloat(tempData.faceMix / 100);
    let _skinMix = parseFloat(tempData.skinMix / 100);

    if (t == 1) {
        let model = tempData.gender === 0 ? 'mp_m_freemode_01' : 'mp_f_freemode_01';
        alt.emitServer('pedCreator_updateServer', model);
        return;
    }

    //Наследственость
    game.setPedHeadBlendData(
        alt.Player.local.scriptID,
        parseInt(tempData.father),
        parseInt(tempData.mother),
        0,
        parseInt(tempData.father),
        parseInt(tempData.mother),
        0,
        parseFloat(_faceMix),
        parseFloat(_skinMix),
        0,
        false
    );

    for (let i = 0; i < tempData.structure.length; i++) {
        const value = tempData.structure[i];
        game.setPedFaceFeature(alt.Player.local.scriptID, i, parseFloat(value));
    }

    // Брови
    game.setPedHeadOverlay(alt.Player.local.scriptID, 2, tempData.appearance.brows, 1);
    game.setPedHeadOverlayColor(alt.Player.local.scriptID, 2, 1, tempData.appearance.browsColor, 1);

    // Глаза
    game.setPedEyeColor(alt.Player.local.scriptID, tempData.appearance.eyesColor);

    // Причёска
    game.setPedComponentVariation(alt.Player.local.scriptID, 2, tempData.appearance.hair, 0, 0);
    game.setPedHairColor(
        alt.Player.local.scriptID,
        parseInt(tempData.appearance.hairColor),
        parseInt(tempData.appearance.hairColor)
    );

    // Волосы на лице
    game.setPedHeadOverlay(alt.Player.local.scriptID, 1, tempData.appearance.beard, 255);
    game.setPedHeadOverlayColor(
        alt.Player.local.scriptID,
        1,
        1,
        tempData.appearance.beardColor,
        tempData.appearance.beardColor
    );

    // Одежда
    game.setPedPropIndex(alt.Player.local.scriptID, 0, tempData.clothes.hats, 0, true);
    game.setPedPropIndex(alt.Player.local.scriptID, 1, tempData.clothes.glasses, 0, true);
    game.setPedComponentVariation(alt.Player.local.scriptID, 11, tempData.clothes.tops, 0, 0); // Верх
    game.setPedComponentVariation(alt.Player.local.scriptID, 8, tempData.clothes.undershit, 0, 0); // Низ
    game.setPedComponentVariation(alt.Player.local.scriptID, 4, tempData.clothes.legs, 0, 0); // Штаны
    game.setPedComponentVariation(alt.Player.local.scriptID, 6, tempData.clothes.shoes, 0, 0); // Капцы
}
