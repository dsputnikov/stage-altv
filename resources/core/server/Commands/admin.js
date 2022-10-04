
import * as alt from 'alt';
import { addNotify } from '../Events/hud';
import * as chat from '../Events/hud';
import * as methods from '../Utils/methods'
import { createMarker } from '../Utils/methods'

chat.registerCmd('sethp', (player, arg) => {
    if (!arg || arg.length <= 0) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /sethp [ID] [HP]')
    let target = methods.getById(arg[0])
    if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000)
    target.health = arg[1]
});

// == Установить броню == \\
chat.registerCmd('setarmour', (player, arg) => {
    if (!arg || arg.length <= 0) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /setarmour [ID] [ARMOUR]')
    let target = methods.getById(arg[0])
    if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000)
    target.armour = arg[1]
});

// == Спавн машины == \\
chat.registerCmd('veh', (player, arg) => {
    if (!arg || arg.length <= 0) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /veh [ID] [Vehicle]')
    let target = methods.getById(arg[0])
    if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000)
    try {
        let cVeh = player.getMeta('ADMIN_VEH');
        if(cVeh != null) {
            cVeh.destroy()
        }
        const vehicle = new alt.Vehicle(alt.hash(arg[1]), target.pos.x + 2, target.pos.y, target.pos.z, 0, 0, 0)
        vehicle.numberPlateText = 'str1x';
        player.setMeta('ADMIN_VEH', vehicle)
        player.setIntoVehicle(vehicle,1)
    }
    catch (err) {
        return addNotify(player, 2, 'Такой машины нет', 5000)
    }
});

chat.registerCmd('veh2', (player, arg) => {
    if (!arg || arg.length <= 0) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /veh2 [ID] [Vehicle]')
    let target = methods.getById(arg[0])
    if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000)
    try {
        const vehicle = new alt.Vehicle(alt.hash(arg[1]), target.pos.x + 2, target.pos.y, target.pos.z, 0, 0, 0)
        vehicle.numberPlateText = 'str1x';
        player.setIntoVehicle(vehicle,1)
    }
    catch (err) {
        return addNotify(player, 2, 'Такой машины нет', 5000)
    }
});

chat.registerCmd('dim', (player) => {
    chat.send(player, `Ты сейчас в ${player.dimension}`)
})

// == Починка машины == \\
chat.registerCmd('fixveh', (player) => {
    if (!player.vehicle) return chat.addNotify(player, 2, 'Вы не в машине', 7000)
    player.vehicle.repair()
    chat.addNotify(player, 1, 'Вы починили машину', 7000)
});

// == Установка погоды == \\
chat.registerCmd('setweather', (player, arg) => {
    if (!arg || arg.length <= 0) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /setweather [Погода]')
    player.setWeather(arg[0]);
});

// == Установка времени == \\
chat.registerCmd('settime', (player, arg) => {
    if (!arg || arg.length <= 0) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /settime [Час] [Минута] [Секунда]')
    player.setDateTime(24, 1, 2021, arg[0], arg[1], arg[2]);
});

// == Узнать позицию == \\
chat.registerCmd('pos', (player) => {
    let vehicle = player.vehicle;
    if (player.vehicle) return alt.log(`{x: ${vehicle.pos.x}, y: ${vehicle.pos.y}, z: ${vehicle.pos.z}, rot: ${vehicle.rot.z}},`);
    chat.send(player, `${player.pos.x}, ${player.pos.y}, ${player.pos.z}`)
    alt.log(`${player.pos.x}, ${player.pos.y}, ${player.pos.z} ${player.rot.z}`);
    return;
});

// == Узнать позицию массивом == \\
chat.registerCmd('posx', (player) => {
    let vehicle = player.vehicle;
    if (player.vehicle) return alt.log(`{x: ${vehicle.pos.x}, y: ${vehicle.pos.y}, z: ${vehicle.pos.z}, rot: ${vehicle.rot.z}},`);
    chat.send(player, `Корды в консольке мужик`)
    if(player.vehicle) {
        alt.log(`{x: ${player.vehicle.pos.x}, y: ${player.vehicle.pos.y}, z: ${player.vehicle.pos.z}, rot: ${player.vehicle.rot.z}},`);
        return;
    }
    alt.log(`{x: ${player.pos.x}, y: ${player.pos.y}, z: ${player.pos.z}, rot: ${player.rot.z}},`);
    return;
});

// == Выдать оружие == \\
chat.registerCmd('givegun', (player, arg) => {
    if (!arg || arg.length <= 0) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /givegun [ID] [gun] [AMMO]')
    let target = methods.getById(arg[0])
    if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000)
    target.giveWeapon(alt.hash(`weapon_${arg[1]}`), arg[2], true);
});

chat.registerCmd('para',(player) => {
    player.giveWeapon(alt.hash('gadget_parachute'),15,true)
})

chat.registerCmd('tppos', (player, arg) => {
    if (!arg || arg.length <= 0) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /tppos [x] [y] [z]')
    player.spawn(arg[0], arg[1], arg[2]);
})

chat.registerCmd('tp', (player, arg) => {
    if (!arg || arg.length <= 0) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /tp [ID]')
    let target = methods.getById(arg[0])
    if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000)
    player.pos = target.pos;
})

chat.registerCmd('tph', (player, arg) => {
    if (!arg || arg.length <= 0) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /tph [ID]')
    let target = methods.getById(arg[0])
    if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000)
    target.pos = player.pos;
})

chat.registerCmd('additem', (player, arg) => {
    if (!arg || arg.length <= 0) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /additem [item] [count]')
    alt.emitClient(player, 'Inventory_addItem::CLIENT', arg[0], arg[1]);
})

chat.registerCmd('givemoney', (player, arg) => {
    // if(player.getVariable('adminlvl') < 1) return;
    if (arg[0] == null || arg[1] == null) return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /givemoney [id] [count]');
    let target = methods.getById(arg[0]);
    if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000)
    if (isNaN(arg[1])) return chat.addNotify(player, 2, 'Некоректная сумма', 7000)
    target.giveMoney(arg[1])
    chat.send(target, `!{#BAFE2A}[Информация] !{#FFFFFF}Администратор ${player.nick} выдал вам $${arg[1]}!`)
})

chat.registerCmd('removemoney', (player, arg) => {
    // if(player.getVariable('adminlvl') < 1) return;
    if (arg[0] == null || arg[1] == null)return chat.send(player, '!{#BAFE2A}[Информация] !{#FFFFFF}Используйте /removemoney [id] [count]');
    let target = methods.getById(arg[0]);
    if (target == undefined) return chat.addNotify(player, 2, 'Игрок не найден', 7000)
    if (isNaN(arg[1])) return chat.addNotify(player, 2, 'Некоректная сумма', 7000)
    target.removeMoney(arg[1])
    chat.send(target, `!{#BAFE2A}[Информация] !{#FFFFFF}Администратор ${player.nick} забрал $${arg[1]}!`)
})