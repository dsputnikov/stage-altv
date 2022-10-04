/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />

import * as alt from 'alt-client';
import * as game from 'natives';
//import { browser } from '../client';

alt.onServer('Events_nativeset::CLIENT',() => {
    let player = alt.Player.local;

    game.setPedConfigFlag(player.scriptID,429,true); // PED_FLAG_DISABLE_STARTING_VEH_ENGINE
    game.setPedConfigFlag(player.scriptID, 241, true); 

    game.setPedHelmet(player.scriptID, false);
    game.setPedSuffersCriticalHits(player.scriptID, false);
    game.disableControlAction(0, 140, true); // Disable weapon knockout
    game.setPedConfigFlag(player.scriptID, 184, false);
    //game.taskSwapWeapon(player.scriptID,true);
})