/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />

import * as alt from 'alt-client';
import game from 'natives';
import { browser } from '../Browser/app';

let hudHidden = false;
let hidden = false;

alt.everyTick(() => {
    // Hide default hud component
    game.hideHudComponentThisFrame(7); // area name
    game.hideHudComponentThisFrame(9); // street name
    game.hideHudComponentThisFrame(6);
    game.hideHudComponentThisFrame(2);
    game.hideHudComponentThisFrame(3);

    let player = alt.Player.local;
    let plocation = game.getNameOfZone(player.pos.x, player.pos.y, player.pos.z);
    let location = game.getLabelText(plocation)
    let zone_hash = game.getStreetNameAtCoord(player.pos.x, player.pos.y, player.pos.z, 0, 0)
    let zone = game.getStreetNameFromHashKey(zone_hash[1]);

    browser.emit('HUD_updateLocation::CEF', getMinimapTopRight().y + 130, getMinimapTopRight().x + 10, location, zone)
    let vehicle = player.vehicle;
    if (player.vehicle && player.seat == 1 && hidden == false) {
        let vel = vehicle.speed;
        let speed = Math.round(parseInt(vel) * 3.6);
        browser.emit('Hud_showSpeedometr::CEF', true, speed)
    }
    else {
        browser.emit('Hud_showSpeedometr::CEF', false, 0)
    }
    //     
    browser.emit('HUD_updateInfo::CEF', alt.Player.all.length, `${alt.Player.local.getSyncedMeta('login')}(${alt.Player.local.getSyncedMeta('id')})`)
});

alt.onServer('HUD_addNotify', (type, text, time) => {
    browser.emit('HUD_addNotification::CEF', type, text, time)
})

alt.on('keyup', (key) => {
    let player = alt.Player.local;

    // if(!player.logged) return;
    if (key == 0x76 && alt.gameControlsEnabled()) { // F7
        if(hudHidden == true) return;
        hidden = !hidden;

        browser.emit('HUD_show::CEF', !hidden);
        browser.emit('HUD_showHideChat::CEF', !hidden)
        browser.emit('HUD_openChat::CEF', false);

        game.displayRadar(!hidden);
    }
    if (key === 0x54 && alt.gameControlsEnabled()) { // T
        if (hidden == true) return;
        if(hudHidden == true) return;
        browser.emit('HUD_openChat::CEF', true);
        browser.focus();
        alt.toggleGameControls(false);
    }
})

alt.on('HUD_show::CLIENT', (bool) => {
    browser.emit('HUD_show::CEF', bool);
    browser.emit('HUD_showHideChat::CEF', bool)
    browser.emit('HUD_openChat::CEF', false);
    hudHidden = !bool;

    // game.displayHud(bool);
    game.displayRadar(bool);
})


alt.onServer('Hud_updateMoney::CLIENT', (money, bank) => {
    money = formatNumber(money)
    bank = formatNumber(bank)
    if (bank == undefined) return  browser.emit('HUD_updateMoney::CEF',money,0)
    browser.emit('HUD_updateMoney::CEF',money,bank)
})

function formatNumber(x) {
    if (x == null) return;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function getMinimapWidth() {
    const aspectRatio = getScreenAspectRatio();
    const resolution = getScreenResolution();

    return resolution.x / (4 * aspectRatio);
}

function getMinimapHeight() {
    const resolution = getScreenResolution();

    return resolution.y / 5.674;
}

function getMinimapTopLeft() {
    const resolution = getScreenResolution();
    const safeZone = getSafeZoneSize();
    const height = getMinimapHeight();

    const x = resolution.x * ((1.0 / 20.0) * (Math.abs(safeZone - 1.0) * 10));
    const y = resolution.y - resolution.y * ((1.0 / 20.0) * (Math.abs(safeZone - 1.0) * 10)) - height;

    return { x, y };
}

function getMinimapTopRight() {
    const { x, y } = getMinimapTopLeft();
    return { x: x + getMinimapWidth(), y };
}

function getSafeZoneSize() {
    return game.getSafeZoneSize();
}

function getScreenAspectRatio() {
    return game.getAspectRatio(false);
}

function getScreenResolution() {
    const [_, x, y] = game.getActiveScreenResolution(0, 0);
    return { x, y };
}

// Чат

browser.on('Hud_sendMessage::CEF', (text) => {
    alt.emitServer('Chat_sendMessage::SERVER', text);
    alt.toggleGameControls(true);
    browser.unfocus();
})

alt.onServer('Hud_addString::CLIENT', (text) => {
    let player = alt.Player.local;
    browser.emit('Chat_sendMessage::CEF', text)
})

browser.on('toggleControl', bool => {
    alt.toggleGameControls(bool);
})

export function addString(text) {
    browser.emit('Chat_sendMessage::CEF', text)
}

// methods

export function addNotify(type, text, time) {
    browser.emit('HUD_addNotification::CEF', type, text, time)
}