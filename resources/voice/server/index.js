/// <reference types="@altv/types-server" />
import * as alt from "alt-server";

// list of voice ranges in meter
const rangeArray = [5, 10, 20];

// index of default range
const defaultRange = 20;

let channelShort;
let channelMedium;
let channelLong;

try {
  channelShort = new alt.VoiceChannel(true, rangeArray[0]);
  channelMedium = new alt.VoiceChannel(true, rangeArray[1]);
  channelLong = new alt.VoiceChannel(true, rangeArray[2]);
} catch (err) {
  if(err.message === "Failed to create base object") {
    alt.logWarning("The alt:V voice chat is not enabled and this resource will cease to work. To enable it, specify the \"voice\" entry in the server config.");
  } else {
    throw err;
  }
}

function changeVoiceChannel(index, player) {
  channelShort.mutePlayer(player);
  channelMedium.mutePlayer(player);
  channelLong.mutePlayer(player);

  if (index == 0) channelShort.unmutePlayer(player);
  if (index == 1) channelMedium.unmutePlayer(player);
  if (index == 2) channelLong.unmutePlayer(player);

  // chat.send(player, "{80eb34}Voice Distance changed to {34dfeb}" + rangeArray[index] + "{80eb34}m.");
}

alt.on("playerConnect", (player) => {
  channelShort.addPlayer(player);
  channelMedium.addPlayer(player);
  channelLong.addPlayer(player);

  // chat.send(player, "{80eb34}Press {34dfeb}T {80eb34}and type {34dfeb}/voice {80eb34}to see all available voice commands.");

  player.setMeta("voice:rangeIndex", defaultRange);
  changeVoiceChannel(defaultRange, player);
});

alt.on("playerDisconnect", (player, reason) => {
  channelShort.removePlayer(player);
  channelMedium.removePlayer(player);
  channelLong.removePlayer(player);
});

alt.onClient("voice:rangeChanged", (player, args) => {
  let index = player.getMeta("voice:rangeIndex");
  index++;

  if (index >= rangeArray.length) index = 0;

  changeVoiceChannel(index, player);
  player.setMeta("voice:rangeIndex", index);
});

