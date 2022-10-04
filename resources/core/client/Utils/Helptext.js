/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />

import * as alt from 'alt-client';
import * as game from 'natives';

alt.onServer('showHelpText', showHelpText);
 
export function showHelpText(text, milliseconds) {
    game.playSound(-1, "NAV", "HUD_AMMO_SHOP_SOUNDSET", false, 0, true);
    game.beginTextCommandDisplayHelp('STRING');
    game.addTextComponentSubstringKeyboardDisplay(text);
    game.endTextCommandDisplayHelp(0, 0, 0, milliseconds);
}

alt.everyTick(() => {
    let player = alt.Player.local;
    let isShooting = game.isPedShooting(player.scriptID);
    const [_, currentWeapon] = game.getCurrentPedWeapon(alt.Player.local.scriptID, 0, true);
    const currentAmmo = game.getAmmoInPedWeapon(alt.Player.local.scriptID, currentWeapon);

    if(isShooting) {
      alt.log('SHOTING')
      if (currentAmmo == 1) {
        alt.log('Закончились патроны')   
        game.setPedAmmo(player.scriptID, currentWeapon, 0, true);
        game.clearPedTasks(player.scriptID);
        alt.emitServer('ammoEnd',currentWeapon);
      }
    }
});