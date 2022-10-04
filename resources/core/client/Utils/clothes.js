/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />

import alt from 'alt-client';
import game from 'natives';

alt.on('setClothes::CLIENT',setClothes)
alt.onServer('setClothes::SERVER',setClothes)

function setClothes(type,id,texture) {
    let player = alt.Player.local;
    game.setPedComponentVariation(player.scriptID, 11, 6, 0, 0);
    game.setPedComponentVariation(player.scriptID, 11, 41, 0, 0);
    if(type == 1) {
        if(id == 0) {
            game.setPedComponentVariation(player.scriptID, 0, 7, 0, 0);
        }
        if(id == 1) {
            game.setPedComponentVariation(player.scriptID, 0, 7, 0, 0);
        }
        if(id == 3) {
            game.setPedComponentVariation(player.scriptID, 8, 31, 0, 0); // Низ
            game.setPedComponentVariation(player.scriptID, 11, 3, 0, 0);
            game.setPedComponentVariation(player.scriptID, 3, 4, 0, 0); // Тело
        }
        if(id == 4) {
            game.setPedComponentVariation(player.scriptID, 8, 31, 0, 0); // Низ
            game.setPedComponentVariation(player.scriptID, 11, 4, 0, 0);
            game.setPedComponentVariation(player.scriptID, 3, 4, 0, 0); // Тело
        }
        if(id == 5) {
            game.setPedComponentVariation(player.scriptID, 8, 15, 0, 0); // Низ
            game.setPedComponentVariation(player.scriptID, 11, 5, 0, 0);
            game.setPedComponentVariation(player.scriptID, 3, 5, 0, 0); // Тело
        }
        if(id == 7) {
            game.setPedComponentVariation(player.scriptID, 8, 31, 0, 0); // Низ
            game.setPedComponentVariation(player.scriptID, 11, 7, 0, 0); // Тело
            game.setPedComponentVariation(player.scriptID, 3, 5, 0, 0); // Тело
        }
        if(id == 11) {
            game.setPedComponentVariation(player.scriptID, 8, 15, 0, 0); // // Низ
            game.setPedComponentVariation(player.scriptID, 11, 11, 0, 0); // Сам топ
            game.setPedComponentVariation(player.scriptID, 3, 5, 0, 0); // Тело
        }
        
    }
    if(type == 2) {
        if(id == 1) {
            game.setPedComponentVariation(player.scriptID, 4, 30, 0, 0); // Штаны
        }
    }
}
