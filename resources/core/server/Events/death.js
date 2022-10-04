
import * as alt from 'alt';

alt.on('playerDeath', (player) => {
    let pos = player.pos;
    player.spawn(pos.x,pos.y,pos.z,5000)
    player.clearBloodDamage();
});