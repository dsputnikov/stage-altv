import * as alt from 'alt-client';
import { browser } from '../Browser/app';
import { clientColshape } from '../Utils/methods';
import * as methods from '../Utils/methods';

let bankomats = [
    { x: -1305.3438720703125, y: -706.3187255859375, z: 25.32242774963379 },
    { x: -1205.681640625, y: -324.8963623046875, z: 37.857421875 },
    { x: -1204.8994140625, y: -326.327880859375, z: 37.83354568481445 },
    { x: -866.6430053710938, y: -187.72259521484375, z: 37.8427848815918 },
    { x: -867.5221557617188, y: -186.2918701171875, z: 37.84467697143555 },
    { x: -846.2445678710938, y: -341.18218994140625, z: 38.68026351928711 },
    { x: -846.76025390625, y: -340.21270751953125, z: 38.68026351928711 },
    { x: 1172.483642578125, y: 2702.495849609375, z: 38.174739837646484 },
    { x: 1171.567138671875, y: 2702.574951171875, z: 38.175411224365234 },
    { x: 147.62359619140625, y: -1035.6968994140625, z: 29.343090057373047 },
    { x: 146.02816772460938, y: -1035.19873046875, z: 29.34479522705078 },
    { x: -258.81695556640625, y: -723.5110473632812, z: 33.464866638183594 },
    { x: -256.1260986328125, y: -715.993408203125, z: 33.518409729003906 },
    { x: -254.41720581054688, y: -692.4664306640625, z: 33.60850524902344 },
    { x: -31.43372917175293, y: -1659.7666015625, z: 29.479026794433594 },
    { x: -2958.9248046875, y: 487.8179626464844, z: 15.463052749633789 },
    { x: -2956.854248046875, y: 487.64642333984375, z: 15.463908195495605 },
    { x: -203.85494995117188, y: -861.4549560546875, z: 30.2572021484375 },
    { x: 111.25714111328125, y: -775.3582153320312, z: 31.4366455078125 },
    { x: 114.32967376708984, y: -776.4000244140625, z: 31.4029541015625 },
    { x: 112.76043701171875, y: -819.3758544921875, z: 31.3355712890625 },
    { x: 89.70989227294922, y: 2.3604395389556885, z: 68.3040771484375 },
    { x: -261.982421875, y: -2012.4132080078125, z: 30.13916015625 },
    { x: -526.5626220703125, y: -1222.852783203125, z: 18.4454345703125 },
    { x: -1109.7230224609375, y: -1690.760498046875, z: 4.3590087890625 },
    { x: 285.5208740234375, y: 143.35385131835938, z: 104.16040039062 },
    { x: 158.5318603515625, y: 234.1714324951172, z: 106.6204833984375 },
];

let banks = [
    { x: -1212.7232666015625, y: -330.75653076171875, z: 37.7869758605957 },
    { x: 149.95985412597656, y: -1040.7581787109375, z: 29.374101638793945 },
    { x: 314.1934814453125, y: -279.1059265136719, z: 54.17079162597656 },
    { x: -350.8688049316406, y: -49.867919921875, z: 49.041690826416016 },
    { x: 1175.0379638671875, y: 2706.901611328125, z: 38.09407424926758 },
    { x: -2962.474365234375, y: 482.9751892089844, z: 15.703112602233887 },
];

let bankomatsColshapes = [];
let bankColshapes = [];

// Создание всего такого ....

for (let i = 0; i < bankomats.length; i++) {
    const shape = new clientColshape(
        alt.Player.local,
        new alt.Vector3(bankomats[i].x, bankomats[i].y, bankomats[i].z),
        1,
        true,
        enterBankomatColshape,
        exitBankomatColshape
    );
    const bankomatBlip = new alt.PointBlip(bankomats[i].x, bankomats[i].y, bankomats[i].z);
    bankomatBlip.sprite = 500;
    bankomatBlip.name = 'Банкомат';
    bankomatBlip.shortRange = true;
    bankomatBlip.color = 2;
}

for (let i = 0; i < banks.length; i++) {
    const shape = new clientColshape(
        alt.Player.local,
        new alt.Vector3(banks[i].x, banks[i].y, banks[i].z),
        1,
        true,
        enterBankColshape,
        exitBankColshape
    );
    const bankomatBlip = new alt.PointBlip(banks[i].x, banks[i].y, banks[i].z);
    bankomatBlip.sprite = 108;
    bankomatBlip.name = 'Банк';
    bankomatBlip.shortRange = true;
    bankomatBlip.color = 2;
}

let inBankShape = false;
let inBankomatShape = false;

function enterBankomatColshape() {
    inBankomatShape = true;
}

function exitBankomatColshape() {
    inBankomatShape = false;
    if (opened == true) {
        alt.emit('Bank_hide::CLIENT');
    }
}

function enterBankColshape() {
    inBankShape = true;
}

function exitBankColshape() {
    inBankShape = false;
    if (opened == true) {
        alt.emit('Bank_hide::CLIENT');
    }
}

let opened = false;

alt.on('keydown', (key) => {
    if (key == 0x45) {
        // Банкомат
        if (inBankomatShape) {
            alt.emitServer('Bank_openBankomat::SERVER');
        }
        if (inBankShape) {
            alt.emitServer('Bank_openWindow::SERVER');
        }
    }
});

// Банк

alt.onServer('Bank_openWindow::CLIENT', (acc) => {
    opened = true;
    browser.focus();
    alt.emit('HUD_show::CLIENT', false);
    // alt.showCursor(true);
    methods.showCursor(true);
    alt.toggleGameControls(false);

    browser.emit('Bank_openWindow::CEF', true, acc);
});

alt.onServer('Bank_updateInfo::CLIENT', (acc, money) => {
    browser.emit('Bank_updateInfo::CEF', acc, money);
});

browser.on('Bank_createBankAccount::CLIENT', (num) => {
    alt.emitServer('Bank_createBankAccount::SERVER', num);
});

alt.onServer('Bank_updateOperations::CLIENT', (operations) => {
    browser.emit('Bank_updateOperations::CEF', operations);
});

browser.on('Bank_bankActions::CLIENT', (type, input, input2) => {
    alt.emitServer('Bank_modalActions::SERVER', type, input, input2);
});

browser.on('Bank_deleteAccount::CLIENT', () => {
    alt.emitServer('Bank_deleteAccount::SERVER');
    browser.emit('Bank_openWindow::CEF', false, 0);
    opened = false;
    browser.unfocus();
    alt.emit('HUD_show::CLIENT', true);
    methods.showCursor(false);
    alt.toggleGameControls(true);
});

// Банкомат

alt.onServer('Bank_openBankomat::CLIENT', (acc, money, pmoney, name) => {
    opened = true;
    browser.focus();
    alt.emit('HUD_show::CLIENT', false);
    methods.showCursor(true);
    alt.toggleGameControls(false);

    browser.emit('Bank_bankomatShow::CEF', true, acc, money, pmoney, name);
});

browser.on('Bank_bankomatActions::CLIENT', (type, input, input2) => {
    alt.emitServer('Bank_bankomatmodalActions::SERVER', type, input, input2);
});

//

alt.onServer('Bank_showError::CLIENT', (text) => {
    browser.emit('Bank_showError::CEF', text);
});

browser.on('Bank_hide::CLIENT', () => {
    opened = false;
    browser.emit('Bank_bankomatShow::CEF', false);
    browser.emit('Bank_openWindow::CEF', false, 0);
    browser.unfocus();
    alt.emit('HUD_show::CLIENT', true);
    methods.showCursor(false);
    alt.toggleGameControls(true);
});
