import alt from 'alt-server';

alt.onClient("NoClip:PlayerVisible", (player, bool) => {
    player.visible = !bool;
});