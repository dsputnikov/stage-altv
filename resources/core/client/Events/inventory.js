/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />

import * as alt from 'alt-client';
import * as game from 'natives';
import { browser } from '../Browser/app';
//

alt.onServer('Inventory_addItem::CLIENT', (type, count) => {
    alt.log(type, count)
    browser.emit('Inventory_addItem::CEF', type, count);
})

browser.on('Inventory_syncItems::CLIENT', (data) => {
    alt.emitServer('Inventory_syncItems::SERVER', data)
})

browser.on('Inventory_useItem::CLIENT', (item) => {
    alt.emitServer('Inventory_useItem::SERVER', item)
})

//

let state = false;

alt.on('keydown', (key) => {
    let player = alt.Player.local;
    if (key == 73 && alt.gameControlsEnabled()) {
        if (state == false) {
            alt.emitServer('Inventory_updateItems::SERVER')
            alt.showCursor(true);
            state = true;
            browser.focus();
            alt.toggleGameControls(false);
            // alt.emit('HUD_show::CLIENT',false)
        }
    }
    else if (key == 27 || key == 73) {
        if (state == true) {
            browser.emit('Inventory_show::CEF', false)
            alt.setTimeout(() => {
                alt.showCursor(false);
            }, 150)
            state = false;
            browser.focus();
            alt.toggleGameControls(true);
            game.displayRadar(true);
            browser.emit('HUD_show::CEF', true);
            browser.emit('HUD_showHideChat::CEF', true);
            browser.emit('HUD_openChat::CEF', false);
        }
    }
})

alt.onServer('Inventory_loadInventory::CLIENT', (data,name) => {
    browser.emit('Inventory_show::CEF', true)
    browser.emit('Inventory_updateItems::CEF', data,name)
})