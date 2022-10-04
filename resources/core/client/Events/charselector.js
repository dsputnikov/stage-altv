/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />

import * as alt from 'alt-client';
import { browser } from '../Browser/app';
import { Camera } from '../Utils/Camera';
import * as game from 'natives';
import * as methods from '../Utils/methods';
import Cursor from '../Utils/cursor';

alt.onServer('Charselector_showSelector::CLIENT', (data) => {
    browser.emit('Charselector_showSelector::CEF', true, data);
    alt.emit('HUD_show::CLIENT', false);
    Cursor.show(true);
    showCamera(true);
});

// Выбрал персонажа
browser.on('Charselector_selectCharacter::CLIENT', (data) => {
    alt.emitServer('Charselector_selectCharacter::SERVER', data);
});

// Нажал "Начать игру"
browser.on('Charselector_play::CLIENT', (data) => {
    showCamera(false);
    alt.emit('HUD_show::CLIENT', true);
    browser.emit('Charselector_hide::CEF', false);
    browser.unfocus();
    Cursor.show(false);
    alt.toggleGameControls(true);
    alt.emitServer('Charselector_play::SERVER', data);
});

let camera = null;

function showCamera(type) {
    if (type) {
        const cameraPosition = new alt.Vector3(-1103.129638671875, 5456.650390625, 2.3201904296875);
        const cameraRotation = new alt.Vector3(0, 0, 0);

        camera = new Camera(cameraPosition, cameraRotation, 50);
        camera.render(false);
    } else if (type == false) {
        camera.destroy();
    }
}

browser.on('Charselector_createCharacter::CLIENT', () => {
    browser.emit('Charselector_hide::CEF', false);
    alt.emit('Auth_hideCamera::CLIENT');
    browser.unfocus();
    alt.emitServer('Charselector_createCharacter::SERVER');
});

alt.onServer('Charselector_loadFace::CLIENT', (data) => {
    let face = data.pedFace.split(',');
    let dnk = data.pedDnk.split(',');
    let head = JSON.parse(data.pedHair);
    //Наследственость
    game.setPedHeadBlendData(
        alt.Player.local.scriptID,
        parseInt(dnk[0]),
        parseInt(dnk[1]),
        0,
        parseInt(dnk[0]),
        parseInt(dnk[1]),
        0,
        parseFloat(dnk[2] / 100),
        parseFloat(dnk[3] / 100),
        0,
        false
    );

    for (let i = 0; i < face.length; i++) {
        const value = face[i];
        game.setPedFaceFeature(alt.Player.local.scriptID, i, parseFloat(value));
    }

    // Брови
    game.setPedHeadOverlay(alt.Player.local.scriptID, 2, parseInt(head.brows), 1);
    game.setPedHeadOverlayColor(alt.Player.local.scriptID, 2, 1, parseInt(head.browsColor), parseInt(head.browsColor));

    // Глаза
    game.setPedEyeColor(alt.Player.local.scriptID, parseInt(head.eyesColor));

    // Причёска
    game.setPedHairColor(alt.Player.local.scriptID, parseInt(head.hairColor), 1);

    // Бородка
    game.setPedHeadOverlay(alt.Player.local.scriptID, 1, parseInt(head.bread), 255);
    game.setPedHeadOverlayColor(alt.Player.local.scriptID, 1, 1, parseInt(head.beardColor), parseInt(head.beardColor));

    alt.emitServer('Charselector_loadClothes::SERVER', data);
});
