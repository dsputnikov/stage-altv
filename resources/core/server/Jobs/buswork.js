import * as alt from 'alt'
import * as chat from '../Events/hud'
import { getRandomInt } from '../Utils/math'
import { getById } from '../Utils/methods'
import { addNotify } from '../Events/hud'

let vehs = []
let busCoords = [
    { x: -2012.6636962890625, y: -496.971435546875, z: 11.6717529296875, xrot: 0, yrot: 0, zrot: -0.44526514410972595 },
    { x: -2017.252685546875, y: -492.8835144042969, z: 11.6885986328125, xrot: 0, yrot: 0, zrot: -0.44526514410972595 },
    { x: -2023.6483154296875, y: -487.5956115722656, z: 11.6885986328125, xrot: 0, yrot: 0, zrot: -0.44526514410972595 },
    { x: -2028.3824462890625, y: -483.8373718261719, z: 11.6885986328125, xrot: 0, yrot: 0, zrot: -0.44526514410972595 },
    { x: -2032.945068359375, y: -480.03955078125, z: 11.6885986328125, xrot: 0, yrot: 0, zrot: -0.44526514410972595 },
    { x: -2039.6834716796875, y: -474.1450500488281, z: 11.6212158203125, xrot: 0, yrot: 0, zrot: -0.44526514410972595 },
    { x: -2044.3912353515625, y: -469.97802734375, z: 11.6212158203125, xrot: 0, yrot: 0, zrot: -0.44526514410972595 },
    { x: -2049.125244140625, y: -465.81097412109375, z: 11.6212158203125, xrot: 0, yrot: 0, zrot: -0.44526514410972595 },
    { x: -2053.318603515625, y: -462.1054992675781, z: 11.6212158203125, xrot: 0, yrot: 0, zrot: -0.44526514410972595 },
    { x: -2059.120849609375, y: -458.1758117675781, z: 11.6549072265625, xrot: 0, yrot: 0, zrot: -0.44526514410972595 },
    { x: -2064.14501953125, y: -453.6659240722656, z: 11.6549072265625, xrot: 0, yrot: 0, zrot: -0.44526514410972595 }
]

try {
    for (let i = 0; i < busCoords.length; i++) {
        let vehicle = new alt.Vehicle(alt.hash('coach'), busCoords[i].x, busCoords[i].y, busCoords[i].z, busCoords[i].xrot, busCoords[i].yrot, busCoords[i].zrot)
        vehs.push(vehicle)
    }

    vehs.forEach(veh => {
        veh.setSyncedMeta('BUS_VEH', true)
        veh.setMeta('BUS_VEH_BUSY', null)
    })
}
catch (e) {
    console.log(e)
}

let colshape = new alt.ColshapeCircle(-2032.541, -463.507, 2)

alt.on('entityEnterColshape', (shape, player) => {
    if (shape == colshape) {
        player.setSyncedMeta('IN_BUS_COLSHAPE', true)
    }
})

alt.on('entityLeaveColshape', (shape, player) => {
    if (shape == colshape) {
        player.setSyncedMeta('IN_BUS_COLSHAPE', false)
    }
})

alt.onClient('Bus_startWork::SERVER', (player) => {
    player.bus = true
    player.timeout = null
    addNotify(player, 1, 'Возьмите свободный автобус, чтобы начать работу.', 5000)
})

alt.onClient('Bus_endWork::SERVER', (player) => {
    addNotify(player, 1, 'Вы уволены.', 7000)
    if (player.getMeta('BUS_PERSONAL_KEY') != undefined || player.getMeta('BUS_PERSONAL_KEY') != null) {
        let key = player.getMeta('BUS_PERSONAL_KEY')
        player.getMeta('BUS_PERSONAL_VEH').destroy()
        vehs[key] = new alt.Vehicle(alt.hash('coach'), busCoords[key].x, busCoords[key].y, busCoords[key].z, busCoords[key].xrot, busCoords[key].yrot, busCoords[key].zrot)
        vehs[key].setSyncedMeta('BUS_VEH', true)
        vehs[key].setMeta('BUS_VEH_BUSY', null)
    }
    player.bus = false
    player.timeout = null
})

alt.onClient('Bus_endWay::SERVER', (player, earn) => {
    if (player.bus && player.seat == 1) {
        chat.send(player, ' !{#BAFE2A}[Информация] !{#FFFFFF} Вы завершили маршрут, вы можете начать его заново!')
        addNotify(player, 1, `Вы заработали: ${earn}`, 7000)
    }
})

alt.on('playerEnteredVehicle', (player, vehicle, seat) => {
    for (var [key, value] of Object.entries(vehs)) {
        if (vehicle == value) {
            if (player.timeout != null) {
                clearTimeout(player.timeout)
            }
            switch (player.bus) {
                case true:
                    if (seat == 1) {
                        if (vehicle.getMeta('BUS_VEH_BUSY') != null && vehicle.getMeta('BUS_VEH_BUSY') != player) {
                            addNotify(player, 2, 'Этот автобус уже занят. Возьмите другой.', 5000)
                            alt.emitClient(player, 'TaskLeaveVehicle::NATIVE', vehicle)
                        } else if (vehicle.getMeta('BUS_VEH_BUSY') != null && vehicle.getMeta('BUS_VEH_BUSY') == player) {
                            return
                        } else {
                            alt.emitClient(player, 'Bus_startRoute::CLIENT')
                            player.setMeta('BUS_PERSONAL_VEH', vehs[key])
                            player.setMeta('BUS_PERSONAL_KEY', key)
                            vehicle.setSyncedMeta('BUS_DRIVER_ID', player.getSyncedMeta('id'))
                            vehicle.setMeta('BUS_VEH_BUSY', player)
                        }
                    } else {
                        alt.emit('Bus_tips::SERVER', player, vehicle)
                    }
                    break

                case false:
                case undefined:
                    if (seat != 1) {
                        alt.emit('Bus_tips::SERVER', player, vehicle)
                    } else {
                        addNotify(player, 2, 'Вы не работаете водителем автобуса.', 5000)
                        alt.emitClient(player, 'TaskLeaveVehicle::NATIVE', vehicle)
                    }
                    break
            }
        }
    }
})

alt.on('playerLeftVehicle', (player, vehicle, seat) => {
    if (player.bus) {
        if (vehicle.getSyncedMeta('BUS_VEH') == true && vehicle.getMeta('BUS_VEH_BUSY') == player) {
            addNotify(player, 1, 'Вернитесь в транспорт в течении 2х минут, или будете уволены.', 7000)
            player.timeout = setTimeout(() => {
                alt.emitClient(player, 'Bus_endServerWork::CLIENT')
                vehicle.setMeta('BUS_VEH_BUSY', null)
            }, 2000)
        }
    }
})

alt.on('Bus_tips::SERVER', (player, vehicle) => {               
    if (vehicle != null) {
        if (vehicle.getSyncedMeta('BUS_VEH') == true) {
            let tips = getRandomInt(20)
            if (tips == 0) return
            if (player.getMoney() >= tips) {
                let id = vehicle.getSyncedMeta('BUS_DRIVER_ID')
                let target = getById(id)
                player.removeMoney(tips)
                target.giveMoney(tips)
                addNotify(player, 1, `Вы заплатили за проезд $${tips}.`, 7000)
                addNotify(target, 1, `Вы получили: $${tips}`, 7000)
            } else {
                addNotify(player, 2, `Вам не хватает денег. Стоимость проезда: $${tips}`, 5000)
                alt.emitClient(player, 'TaskLeaveVehicle::NATIVE', vehicle)
            }
        }
    }
})

alt.on('playerDisconnect', (player) => {
    if (player.bus) {
        if (player.getMeta('BUS_PERSONAL_VEH') != undefined || player.getMeta('BUS_PERSONAL_VEH') != null) {
            let key = player.getMeta('BUS_PERSONAL_KEY')
            player.getMeta('BUS_PERSONAL_VEH').destroy()
            vehs[key] = new alt.Vehicle(alt.hash('coach'), busCoords[key].x, busCoords[key].y, busCoords[key].z, busCoords[key].xrot, busCoords[key].yrot, busCoords[key].zrot)
            vehs[key].setSyncedMeta('BUS_VEH', true)
            vehs[key].setMeta('BUS_VEH_BUSY', null)
            player.bus = false
        }
    }
})
