/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />

import * as alt from 'alt-client';

import './Browser/app'

//============== [ Ивенты ] ==============\\
import './Events/player'; //
import './Events/pedCreator'; // Создание персонажа
import './Events/charselector'; // Выбор персонажа
import './Events/hud'; // Худ
import './Events/auth'; // Регистрация
import './Events/nametag'; // Рега
import './Events/autosalon'; // Автосалон
import './Events/bank' // Система банка
//============== [ Разное ] ==============\\
import './Binds/index'; //
import './Utils/Helptext';
import './Utils/Noclip';
import './Utils/clothes';
import './Events/loadInteriors';
import './Utils/methods';
import './Utils/Marker';
import './Utils/3dCamera';
import './Utils/math'

// Работы
import './Jobs/buswork'