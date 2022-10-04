//Импорт всех скриптов

import './Modules/mysql'; // База данных
import './Commands/admin'; // Команды
import './Commands/player'; // Команды
//============== [ Ивенты ] ==============\\
import './Events/pedCreator'; // Создание персонажа
import './Events/vehicles/vehicle'; 
import './Events/charselector'; // Выбор персонажа
import './Events/hud'; // Худ
import './Events/auth'; // Регистрация авторизация
import './Events/death'; // Система смерти
import './Events/autosalon'; // Автосалон
import './Events/money'; // Система денег
import './Events/bank'; // Система банка
//============== [ Утилиты ] ==============\\  
import './Utils/Clothes'; 
import './Utils/Noclip'; 
import './Utils/prototypes'; 
import './Utils/playersInRadius'; 
import './Utils/methods'; 

// Работы
import './Jobs/buswork'