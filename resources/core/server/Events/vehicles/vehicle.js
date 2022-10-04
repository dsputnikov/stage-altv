
import * as alt from 'alt';

alt.onClient('Events_engine::SERVER',(player) => {  
    let vehicle = player.vehicle;
    if(!player.vehicle) return;
    if(vehicle.engineOn == false) return vehicle.engineOn = true; 
    vehicle.engineOn = false; 
})