/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />

import * as alt from 'alt-client';
import * as game from 'natives';
import { browser } from '../Browser/app';
import * as methods from '../Utils/methods';
import { createCam, deleteCam } from '../Utils/3dCamera';
import { drawMarker } from '../Utils/Marker';

var salons = [];
var salonKey = 0;
var salon = '';
var opened = false;
var previewVehicle;
var type = 0;
var inTestdrive = false;
var inShape = false;
const markers = [];

alt.onServer('Autosalon_loadVehicle::CLIENT', (vehicles) => {
    for (var i = 0; i < vehicles.length; i++) {
        methods.requestModel(alt.hash(vehicles[i].model));
    }
});

alt.onServer('Autosalon_init::CLIENT', async (marker, name, blip) => {
    // Создание блипа
    const blipAuto = new alt.PointBlip(marker.x, marker.y, marker.z);
    blipAuto.sprite = 225;
    blipAuto.color = blip;
    blipAuto.shortRange = true;
    blipAuto.name = `Автосалон ${name}`;
    // Маркер
    markers.push({ x: marker.x, y: marker.y, z: marker.z });
});

alt.everyTick(() => {
    if (markers.length > 1) {
        markers.forEach((el) => {
            drawMarker(
                1,
                new alt.Vector3(el.x, el.y, el.z),
                new alt.Vector3(0, 0, 0),
                new alt.Vector3(0, 0, 0),
                new alt.Vector3(1, 1, 1),
                255,
                22,
                3,
                150
            );
        });
    }
});

alt.onServer('Autosalon_create::CLIENT', (data, pos, name) => {
    salons = data;
    type = pos;
    salon = name;

    browser.emit('Autosalon_openWindow::CEF', true, salons, salon);
    browser.focus();
    alt.toggleGameControls(false);
    game.setEntityAlpha(alt.Player.local, 0, true); // Убираем игрока
    alt.emit('HUD_show::CLIENT', false);
    alt.showCursor(true);
    createCam(type.x, type.y, type.z, 0, 0, 285.854, 320, 70);
    opened = true;
});

alt.onServer('Autosalon_bindE::CLIENT', (bool, key) => {
    inShape = bool;
    salonKey = key;
});

browser.on('Autosalon_selectVehicle::CLIENT', (model, color, color2) => {
    if (!previewVehicle == 0) {
        game.deleteVehicle(previewVehicle);
    }
    previewVehicle = game.createVehicle(alt.hash(model), type.x, type.y, type.z, 0, false, false, false);
    game.setVehicleCustomPrimaryColour(previewVehicle, color[0], color[1], color[2]);
    game.setVehicleCustomSecondaryColour(previewVehicle, color2[0], color2[1], color2[2]);
    // let interval = alt.setInterval(() => {
    //     let primaryColor = game.getVehicleCustomPrimaryColour(previewVehicle)
    //     if (primaryColor.r == color[0]) {
    //         alt.clearInterval(interval)
    //     }
    //     game.setVehicleCustomPrimaryColour(previewVehicle, color[0], color[1], color[2])
    //     game.setVehicleCustomPrimaryColour(previewVehicle, color2[0], color2[1], color2[2]);
    // }, 10)

    // Характеристики
    let maxSpeed = game.getVehicleEstimatedMaxSpeed(previewVehicle);
    let acceleration = game.getVehicleAcceleration(previewVehicle);
    let traction = game.getVehicleMaxTraction(previewVehicle);
    let maxBraking = game.getVehicleMaxBraking(previewVehicle);
    let maxP = game.getVehicleMaxNumberOfPassengers(previewVehicle);
    browser.emit('Autosalon_updateStat::CEF', maxSpeed, acceleration, traction, parseInt(maxP) + 1);
});

browser.on('Autosalon_changeColor::CLIENT', (color, color2) => {
    game.setVehicleCustomPrimaryColour(previewVehicle, color[0], color[1], color[2]);
    game.setVehicleCustomSecondaryColour(previewVehicle, color2[0], color2[1], color2[2]);
});

alt.on('keyup', (key) => {
    // if(!player.logged) return;
    if (opened == true) {
        //ESC
        if (key == 27) {
            // ESC
            game.deleteVehicle(previewVehicle);
            browser.emit('Autosalon_openWindow::CEF', false, null, null);
            browser.unfocus();
            alt.toggleGameControls(true);
            game.setEntityAlpha(alt.Player.local, 255, false); // Показываем игрока
            alt.emit('HUD_show::CLIENT', true);
            alt.showCursor(false);

            opened = false;
            deleteCam();
            alt.emitServer('Autosalon_exit::SERVER');
        }
    }
    if (key == 69) {
        // E
        if (inShape) {
            if (opened == true) return;
            alt.emitServer('Autosalon_openWindow::SERVER', salonKey);
        }
    }
});

// ТЕСТ ДРАЙВ

let testDrive = false;

browser.on('Autosalon_testdrive_start::CLIENT', (model, color, color2) => {
    if (testDrive) return;
    browser.emit('Autosalon_openWindow::CEF', false, null);
    alt.showCursor(false);
    testDrive = true;
    game.deleteVehicle(previewVehicle);
    game.setEntityAlpha(alt.Player.local, 255, false); // Показываем игрока
    alt.toggleGameControls(true);
    // Camera
    game.renderScriptCams(false, true, 2000, true, false, 0);
    alt.emitServer('Autosalon_testdrive_start::SERVER', model, color, color2);
});

alt.onServer('Autosalon_stopTestdrive::CLIENT', () => {
    browser.emit('Autosalon_openWindow::CEF', true, salons);
    alt.showCursor(true);
    game.setEntityAlpha(alt.Player.local, 0, true); // Показываем игрока
    alt.toggleGameControls(false);
    testDrive = false;
    // Camera
    game.renderScriptCams(true, false, 2000, true, false, 0);
});

alt.onServer('Autosalon_playerDeath::CLIENT', () => {
    if (testDrive == true) {
        opened = false;
        deleteCam();
        browser.emit('Autosalon_openWindow::CEF', false, null);
        testDrive = false;
        game.deleteVehicle(previewVehicle);
        game.setEntityAlpha(alt.Player.local, 255, false); // Показываем игрока
        alt.toggleGameControls(true);
        alt.emit('HUD_show::CLIENT', true);
        // Camera
        game.renderScriptCams(false, true, 2000, true, false, 0);
    }
});
