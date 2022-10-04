
import * as alt from 'alt';


/**
 * Send data to the WebView instance.
 * @param  {string} позиция
 * @param  {any[]} радиус
 */
export function getPlayersInRadius(position, radius) {
    return alt.Player.all.filter(player => player.pos.distanceTo(position) <= radius);
}
