import * as alt from 'alt';
import * as chat from '../Events/hud';

var salons = [
    {
        name: 'Низкого класса',
        marker: new alt.Vector3(-51.41538619995117, -1102.193359375, 25.4154052734375),
        blipColor: 31,
        vehicles: [
            { name: 'Asbo', price: 2500, model: 'asbo' },
            { name: 'Panto', price: 2000, model: 'panto' },
            { name: 'Nightshade', price: 4200, model: 'nightshade' },
            { name: 'Radi', price: 5000, model: 'radi' },
            { name: 'Seminole2', price: 5500, model: 'seminole2' },
            { name: 'Seminole', price: 6500, model: 'seminole' },
            { name: 'Stratum', price: 3000, model: 'stratum' },
            { name: 'Asea', price: 2500, model: 'asea' },
            { name: 'Intruder', price: 5000, model: 'intruder' },
            { name: 'Stanier', price: 4800, model: 'stanier' },
            { name: 'Surge', price: 7000, model: 'surge' },
            { name: 'Blista2', price: 2800, model: 'blista2' },
            { name: 'Futo', price: 3500, model: 'futo' },
            { name: 'Asterope', price: 4100, model: 'asterope' },
            { name: 'Ingot', price: 3200, model: 'ingot' },
            { name: 'Premier', price: 5000, model: 'premier' },
            { name: 'Primo', price: 4000, model: 'primo' },
            { name: 'Regina', price: 1500, model: 'regina' },
            { name: 'Washington', price: 3500, model: 'washington' },
            { name: 'Blista', price: 10000, model: 'blista' },
            { name: 'Brioso', price: 3000, model: 'brioso' },
            { name: 'Issi2', price: 3000, model: 'issi2' },
            { name: 'Weevil', price: 2700, model: 'weevil' },
            { name: 'Prairie', price: 6800, model: 'prairie' },
            { name: 'Ellie', price: 7000, model: 'ellie' },
            { name: 'Picador', price: 3000, model: 'picador' },
            { name: 'Sabregt', price: 5000, model: 'sabregt' },
            { name: 'Vigero', price: 8000, model: 'vigero' },
            { name: 'Hellion', price: 7500, model: 'hellion' },
            { name: 'Rancherxl', price: 5500, model: 'rancherxl' },
            { name: 'Gresley', price: 10000, model: 'gresley' },
            { name: 'Mesa', price: 8000, model: 'mesa' },
            { name: 'Bjxl', price: 6000, model: 'bjxl' },
            { name: 'Fusilade', price: 6300, model: 'fusilade' },
            { name: 'Dynasty', price: 10000, model: 'dynasty' },
            { name: 'Pigalle', price: 3500, model: 'pigalle' },
            { name: 'Retinue', price: 4700, model: 'retinue' },
        ],
        standVehicle: new alt.Vector3(-42.659339904785156, -1098.883544921875, 26.4154052734375),
        testDrive: new alt.Vector3(-47.550472259521484, -1113.944580078125, 25.43579864501953),
        exitPosition: new alt.Vector3(-49.24433898925781, -1102.9827880859375, 26.422351837158203),
    },
    {
        name: 'Среднего класса',
        marker: new alt.Vector3(-38.880760192871094, -1673.1343994140625, 28.48229217529297),
        blipColor: 75,
        vehicles: [
            { name: 'Fugitive', price: 12000, model: 'fugitive' },
            { name: 'tailgater', price: 15000, model: 'tailgater' },
            { name: 'Felon', price: 30000, model: 'felon' },
            { name: 'Jackal', price: 25000, model: 'jackal' },
            { name: 'Sentinel XS', price: 20000, model: 'sentinel' },
            { name: 'Oracle', price: 15000, model: 'oracle' },
            { name: 'Gauntlet', price: 17000, model: 'gauntlet' },
            { name: 'Schwarzer', price: 20000, model: 'schwarzer' },
            { name: 'Penumbra', price: 15000, model: 'penumbra' },
            { name: 'Schafter', price: 18000, model: 'schafter2' },
            { name: 'Zion', price: 23000, model: 'zion' },
            { name: 'Sandking 2', price: 15000, model: 'sandking2' },
            { name: 'Cavalcade', price: 30000, model: 'cavalcade' },
            { name: 'Baller', price: 35000, model: 'Baller2' },
            { name: 'Patriot', price: 36000, model: 'patriot' },
            { name: 'Cypher', price: 40000, model: 'cypher' },
            { name: 'Zr350', price: 35000, model: 'zr350' },
            { name: 'Previon', price: 25000, model: 'previon' },
            { name: 'Gauntlet5', price: 36000, model: 'gauntlet5' },
            { name: 'Dominator7', price: 42000, model: 'dominator7' },
            { name: 'Caracara2', price: 35000, model: 'caracara2' },
            { name: 'Everon', price: 33000, model: 'everon' },
            { name: 'Landstalker2', price: 30000, model: 'landstalker2' },
            { name: 'Novak', price: 37000, model: 'novak' },
            { name: 'Tailgater2', price: 45000, model: 'Tailgater2' },
            { name: 'Kuruma', price: 39000, model: 'kuruma' },
            { name: 'Raiden', price: 50000, model: 'raiden' },
            { name: 'Jester4', price: 70000, model: 'jester4' },
            { name: 'Calico', price: 45000, model: 'calico' },
            { name: 'Euros', price: 60000, model: 'euros' },
            { name: 'Remus', price: 35000, model: 'remus' },
            { name: 'Vectre', price: 50000, model: 'vectre' },
            { name: 'Sultan3', price: 37000, model: 'sultan3' },
            { name: 'Rt3000', price: 150000, model: 'rt3000' },
            { name: 'Z190', price: 40000, model: 'z190' },
            { name: 'Vstr', price: 70000, model: 'vstr' },
            { name: 'Sugoi', price: 65000, model: 'sugoi' },
            { name: 'Elegy', price: 73000, model: 'elegy' },
            { name: 'Buffalo', price: 50000, model: 'buffalo' },
            { name: 'Rocoto', price: 57000, model: 'rocoto' },
            //
            { name: 'Club', price: 15000, model: 'club' },
            { name: 'Brawler', price: 63000, model: 'brawler' },
            { name: 'Cog55', price: 80000, model: 'cog55' },
            { name: 'Superd', price: 90000, model: 'superd' },
            { name: 'Banshee', price: 70000, model: 'banshee' },
            { name: 'Komoda', price: 60000, model: 'komoda' },
            { name: 'Gb200', price: 65000, model: 'gb200' },
            { name: 'Jugular', price: 75000, model: 'jugular' },
            { name: 'Jester3', price: 70000, model: 'jester3' },
            { name: 'Specter', price: 76000, model: 'specter' },
        ],
        standVehicle: new alt.Vector3(-47.21013259887695, -1687.5595703125, 29.437057495117188),
        testDrive: new alt.Vector3(-55.265777587890625, -1669.2708740234375, 29.285898208618164),
        exitPosition: new alt.Vector3(-40.39360046386719, -1669.7412109375, 29.479703903198242),
    },
    {
        name: 'Высокого класса',
        marker: new alt.Vector3(-795.868896484375, -219.9210968017578, 36.079654693603516),
        blipColor: 83,
        vehicles: [
            { name: 'BMW 730', price: 81000, model: 'bmw730' },
            { name: 'BMW M5', price: 121000, model: '2019M5' },
            { name: 'BMW M2', price: 150000, model: 'bmwm2' },
            { name: 'BMW Z4', price: 150000, model: 'bmwz4' },
            { name: 'Toyota A90', price: 150000, model: 'a90' },
        ],
        standVehicle: new alt.Vector3(-783.6351318359375, -224.0694122314453, 36.968379974365234),
        testDrive: new alt.Vector3(-773.033203125, -232.25009155273438, 36.36253356933594),
        exitPosition: new alt.Vector3(-798.1190795898438, -221.21755981445312, 37.07961654663086),
    },
    {
        name: 'Мотосалон',
        marker: new alt.Vector3(-242.10989379882812, 278.6505432128906, 92.028564453125),
        blipColor: 31,
        vehicles: [
            { name: 'Bati2', price: 2500, model: 'bati2' },
            { name: 'Akuma', price: 2500, model: 'akuma' },
            { name: 'avarus', price: 2500, model: 'avarus' },
            { name: 'bagger', price: 2500, model: 'bagger' },
            { name: 'Bati', price: 2500, model: 'bati' },
            { name: 'bf400', price: 2500, model: 'bf400' },
            { name: 'carbonrs', price: 2500, model: 'carbonrs' },
            { name: 'cliffhanger', price: 2500, model: 'cliffhanger' },
            { name: 'daemon', price: 2500, model: 'daemon' },
            { name: 'defiler', price: 2500, model: 'defiler' },
            { name: 'diablous', price: 2500, model: 'diablous' },
            { name: 'double', price: 2500, model: 'double' },
            { name: 'enduro', price: 2500, model: 'enduro' },
            { name: 'esskey', price: 2500, model: 'esskey' },
            { name: 'fcr', price: 2500, model: 'fcr' },
            { name: 'lectro', price: 2500, model: 'lectro' },
            { name: 'manchez', price: 2500, model: 'manchez' },
            { name: 'nemesis', price: 2500, model: 'nemesis' },
            { name: 'pcj', price: 2500, model: 'pcj' },
            { name: 'ruffian', price: 2500, model: 'ruffian' },
            { name: 'stryder', price: 2500, model: 'stryder' },
            { name: 'vortex', price: 2500, model: 'vortex' },
            { name: 'vader', price: 2500, model: 'vader' },
        ],
        standVehicle: new alt.Vector3(-255.5208740234375, 289.3186950683594, 91.6746826171875),
        testDrive: new alt.Vector3(-253.8329620361328, 302.1362609863281, 92.028564453125),
        exitPosition: new alt.Vector3(-255.5208740234375, 289.3186950683594, 91.6746826171875),
    },
];

var salonColshapes = [];

// цикл

for (let i = 0; i < salons.length; i++) {
    let shape = new alt.ColshapeCylinder(salons[i].marker.x, salons[i].marker.y, salons[i].marker.z, 1, 1);
    // let marker = //mp.markers.new(1, new alt.Vector3(salons[i].marker.x, salons[i].marker.y, salons[i].marker.z), 1);
    salonColshapes.push(shape);
}

alt.on('entityEnterColshape', (colshape, player) => {
    for (var [key, value] of Object.entries(salonColshapes)) {
        if (colshape == value) {
            // alt.emitClient('Autosalon_openWindow::CLIENT', player.getMoney(), player.getBankMoney(), salons[key].name)
            alt.emitClient(player, 'Autosalon_bindE::CLIENT', true, key);
            break;
        }
    }
});

alt.on('entityLeaveColshape', (colshape, player) => {
    for (var [key, value] of Object.entries(salonColshapes)) {
        if (colshape == value) {
            alt.emitClient(player, 'Autosalon_bindE::CLIENT', false);
            // player.setSyncedMeta('currentAutosalon', 0)
            break;
        }
    }
});

alt.onClient('Autosalon_openWindow::SERVER', (player, key) => {
    player.dimension = parseInt(player.getSyncedMeta('id') + 12);
    player.setSyncedMeta('currentAutosalon', key);
    alt.emitClient(
        player,
        'Autosalon_create::CLIENT',
        salons[key].vehicles,
        salons[key].standVehicle,
        salons[key].name
    );
});

// TEST DRIVE

alt.onClient('Autosalon_testdrive_start::SERVER', (player, model, color, color2) => {
    const dim = parseInt(player.getSyncedMeta('id') + 11);
    const position = salons[player.getSyncedMeta('currentAutosalon')].testDrive;
    player.testDriveVehicle = new alt.Vehicle(alt.hash(model), position.x, position.y, position.z, 0, 0, 0);
    player.testDriveVehicle.customPrimaryColor = { r: color[0], g: color[1], b: color[2], a: 255 };
    player.testDriveVehicle.customSecondaryColor = { r: color2[0], g: color2[1], b: color2[2], a: 255 };
    player.dimension = dim;
    player.testdrive = true;
    player.testDriveVehicle.dimension = dim;

    // alt.emitClient(player, 'Methods_veh:enter', vehicle, 1);
    player.setIntoVehicle(player.testDriveVehicle, 1);
});

alt.on('playerLeftVehicle', (player, vehicle, seat) => {
    if (player.testdrive) {
        player.dimension = parseInt(player.getSyncedMeta('id') + 12);
        player.testdrive = false;
        player.pos = salons[player.getSyncedMeta('currentAutosalon')].exitPosition;
        player.testDriveVehicle.destroy();
        alt.emitClient(player, 'Autosalon_stopTestdrive::CLIENT');
    }
});

alt.onClient('Autosalon_exit::SERVER', (player) => {
    player.pos = salons[player.getSyncedMeta('currentAutosalon')].exitPosition;
    player.dimension = 0;
});

alt.on('playerConnect', (player) => {
    for (let i = 0; i < salons.length; i++) {
        alt.emitClient(player, 'Autosalon_loadVehicle::CLIENT', salons[i].vehicles);
        alt.emitClient(player, 'Autosalon_init::CLIENT', salons[i].marker, salons[i].name, salons[i].blipColor);
    }
});

alt.on('playerDeath', (player, killer, weapon) => {
    if (player.testdrive) {
        player.testdrive = false;
        player.testDriveVehicle.destroy();
        player.dimension = 0;
        alt.emitClient(player, 'Autosalon_playerDeath::CLIENT');
    }
});
