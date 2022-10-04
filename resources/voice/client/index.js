/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
"use strict";
import * as alt from "alt-client";
import * as native from "natives";

alt.on("keyup", (keycode) => {
  switch (keycode) {
    case 112: // Key: F1
      alt.emitServer("voice:rangeChanged");
      alt.log('fff')
      break;
  }
});
