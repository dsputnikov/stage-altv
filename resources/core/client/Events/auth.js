/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />

import { browser } from '../Browser/app';
import * as alt from 'alt-client';
import * as game from 'natives';
import { Camera } from '../Utils/Camera';
import Cursor from '../Utils/cursor';

let check;

alt.onServer('Auth_startAwait::CLIENT', async () => {
    check = alt.setInterval(() => {
        browser.emit('Auth_startAwait::CEF');
    }, 50);
});

browser.on('Auth_showWindow::CLIENT', () => {
    if (check) alt.clearInterval(check);
    //
    game.setPedHeadBlendData(alt.Player.local.scriptID, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
    game.clearPedBloodDamage(alt.Player.local.scriptID);
    game.setEntityAlpha(alt.Player.local, 0, true);
    game.displayRadar(false);
    //
    alt.toggleGameControls(false);
    alt.emit('Chat_hide', true);
    // alt.showCursor(true);
    Cursor.show(true)
    alt.emit('HUD_show::CLIENT', false);

    browser.focus();
    showCamera(true);
    //
    let checked = alt.LocalStorage.get('checked');
    let login = alt.LocalStorage.get('login');
    let pass = alt.LocalStorage.get('pass');
    browser.emit('Auth_setLogin::CEF', checked, login, pass);
    //
    browser.emit('Auth_show::CEF', true);
});

var camera = null;

function showCamera(type) {
    if (type) {
        const cameraPosition = new alt.Vector3(-1531.36352539, -1117.91162109, 21.651895523);
        const cameraRotation = new alt.Vector3(-1645.70922851, -1129.0003662109, 22.76616477);

        camera = new Camera(cameraPosition, cameraRotation, 50);
        camera.render(true);
    } else if (type == false) {
        camera.destroy();
    }
}

browser.on('Auth_playerLogin::CLIENT', (login, password, checked) => {
    alt.LocalStorage.set('checked', checked);
    alt.LocalStorage.set('login', login);
    alt.LocalStorage.set('pass', password);
    alt.LocalStorage.save();
    //
    alt.emitServer('Events_playerLogin::SERVER', login, password);
});

browser.on('Auth_playerRegister::CLIENT', (login, email, password) => {
    alt.emitServer('Auth_playerRegister::CLIENT', login, email, password); //  Events_playerRegister::SERVER
});

alt.onServer('Auth_succefully::CLIENT', () => {
    browser.emit('Auth_show::CEF', false);
    game.setEntityAlpha(alt.Player.local, 255, false);
    showCamera(false);
    Cursor.show(false)
});

alt.on('Auth_hideCamera::CLIENT', () => {
    showCamera(false);
});

alt.onServer('Auth_setState::CLIENT', (state) => {
    browser.emit('Auth_setState::CEF', state);
});

alt.onServer('Auth_showError::CLIENT', (text) => {
    browser.emit('Auth_showError::CEF', text);
});
