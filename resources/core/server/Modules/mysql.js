
import SQL from 'mysql';
import * as alt from 'alt';

export var DB = SQL.createPool({
    host: 'localhost',
    user: 'root',
    database: 'stagev',
    password: ''
});

( async () =>{
    await new Promise(function(resolve,reject) {
        DB.getConnection(function(e) {
            if(e) return reject (console.log(`Ошибка подключения - ${e}`));
            resolve(console.log('Вы успешно подключились к Базе Данных!'));
        })
    })
}) ();

alt.on('resourceStop', () => {
    DB.end();
    console.log('Выключение БД');
});
