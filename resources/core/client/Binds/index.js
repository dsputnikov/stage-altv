/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />

import * as alt from 'alt-client';
import * as game from 'natives';

alt.on('keydown', (key) => {
    if(key == 'N'.charCodeAt(0)) return alt.emitServer('Events_engine::SERVER');
    if(key == 116) return alt.emit('noclip:start');
});

