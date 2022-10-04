
var pedCreator = new Vue({
    el: '#pedCreator',
    data: {
        active: false,
        show: 3,
        clickCef: false,
        data: {
            gender: 0,
            name: '',
            surname: '',
            father: 8,
            mother: 5,
            age: 19,
            faceMix: 50,
            skinMix: 50,
            structure: new Array(20).fill(0),
            appearance: {
                // Брови
                brows: 0,
                browsColor: 1,
                // Цвет глаз
                eyesColor: 0,
                // Волосы на голове
                hair: 0,
                hairColor: 1,
                // Волосы на лице
                beard: -1,
                beardColor: 1,
            },
            clothes: {
                hats: -1, // шляпа
                glasses: -1, // очки
                tops: 0, // Верх
                undershit: 15,
                legs: 0,
                shoes: 1,
            },
            // clothes: [-1, 1, 1, 1, 1, -1],
            // hairColor: 0,
        },
        structureLabels: [
            'Ширина носа',
            'Высота носа',
            'Длинна носа',
            'Мост носа',
            'Кончик носа',
            'Вал носового моста',
            'Высота бровей',
            'Глубина бровей',
            'Высота скул',
            'Ширина скул',
            'Глубина щеки',
            'Размер глаз',
            'Толщина губ',
            'Ширина челюсти',
            'Высота челюсти',
            'Длина подбородка',
            'Высота подбородка',
            'Ширина подбородка',
            'Форма подбородка',
            'Длина шеи'
        ],
        parents: {
            fatherIndex: 7,
            motherIndex: 4,
            fathers: [
                { name: 'Бенджамин', id: 0, image: './systems/pedCreator/img/parents/male/0.png' },
                { name: 'Даниэль', id: 1, image: './systems/pedCreator/img/parents/male/1.png' },
                { name: 'Джошуа', id: 2, image: './systems/pedCreator/img/parents/male/2.png' },
                { name: 'Ной', id: 3, image: './systems/pedCreator/img/parents/male/3.png' },
                { name: 'Эндрю', id: 4, image: './systems/pedCreator/img/parents/male/4.png' },
                { name: 'Джуан', id: 5, image: './systems/pedCreator/img/parents/male/5.png' },
                { name: 'Алекс', id: 6, image: './systems/pedCreator/img/parents/male/6.png' },
                { name: 'Исак', id: 7, image: './systems/pedCreator/img/parents/male/7.png' },
                { name: 'Иван', id: 8, image: './systems/pedCreator/img/parents/male/8.png' },
                { name: 'Итан', id: 9, image: './systems/pedCreator/img/parents/male/9.png' },
                { name: 'Винцент', id: 10, image: './systems/pedCreator/img/parents/male/10.png' },
                { name: 'Ангел', id: 11, image: './systems/pedCreator/img/parents/male/11.png' },
                { name: 'Диего', id: 12, image: './systems/pedCreator/img/parents/male/12.png' },
                { name: 'Адриан', id: 13, image: './systems/pedCreator/img/parents/male/13.png' },
                { name: 'Габриэл', id: 14, image: './systems/pedCreator/img/parents/male/14.png' },
                { name: 'Майкл', id: 15, image: './systems/pedCreator/img/parents/male/15.png' },
                { name: 'Сантьяго', id: 16, image: './systems/pedCreator/img/parents/male/16.png' },
                { name: 'Кевин', id: 17, image: './systems/pedCreator/img/parents/male/17.png' },
                { name: 'Льюис', id: 18, image: './systems/pedCreator/img/parents/male/18.png' },
                { name: 'Самуэль', id: 19, image: './systems/pedCreator/img/parents/male/19.png' },
                { name: 'Антоний', id: 20, image: './systems/pedCreator/img/parents/male/20.png' },
                { name: 'Клод', id: 42, image: './systems/pedCreator/img/parents/male/42.png' },
                { name: 'Нико', id: 43, image: './systems/pedCreator/img/parents/male/43.png' },
                { name: 'Джон', id: 44, image: './systems/pedCreator/img/parents/male/44.png' },
            ],
            mothers: [
                { name: 'Ханна', id: 21, image: './systems/pedCreator/img/parents/female/21.png' },
                { name: 'Обри', id: 22, image: './systems/pedCreator/img/parents/female/22.png' },
                { name: 'Жасмин', id: 23, image: './systems/pedCreator/img/parents/female/23.png' },
                { name: 'Гизела', id: 24, image: './systems/pedCreator/img/parents/female/24.png' },
                { name: 'Эмилия', id: 25, image: './systems/pedCreator/img/parents/female/25.png' },
                { name: 'Изабелла', id: 26, image: './systems/pedCreator/img/parents/female/26.png' },
                { name: 'Зу', id: 27, image: './systems/pedCreator/img/parents/female/27.png' },
                { name: 'Ава', id: 28, image: './systems/pedCreator/img/parents/female/28.png' },
                { name: 'Камилия', id: 29, image: './systems/pedCreator/img/parents/female/29.png' },
                { name: 'Виолет', id: 30, image: './systems/pedCreator/img/parents/female/30.png' },
                { name: 'Софи', id: 31, image: './systems/pedCreator/img/parents/female/31.png' },
                { name: 'Эвелин', id: 32, image: './systems/pedCreator/img/parents/female/32.png' },
                { name: 'Николь', id: 33, image: './systems/pedCreator/img/parents/female/33.png' },
                { name: 'Эшли', id: 34, image: './systems/pedCreator/img/parents/female/34.png' },
                { name: 'Грейси', id: 35, image: './systems/pedCreator/img/parents/female/35.png' },
                { name: 'Брианна', id: 36, image: './systems/pedCreator/img/parents/female/36.png' },
                { name: 'Натали', id: 37, image: './systems/pedCreator/img/parents/female/37.png' },
                { name: 'Оливия', id: 38, image: './systems/pedCreator/img/parents/female/38.png' },
                { name: 'Элизабет', id: 39, image: './systems/pedCreator/img/parents/female/39.png' },
                { name: 'Шарль', id: 40, image: './systems/pedCreator/img/parents/female/40.png' },
                { name: 'Эмма', id: 41, image: './systems/pedCreator/img/parents/female/41.png' },
                { name: 'Мисти', id: 45, image: './systems/pedCreator/img/parents/female/45.png' },
            ]
        },
        genders: ['Мужской', 'Женский'],
        characteristics: {
            topindex: 2,
            brows: [
                'Красивые',
                'Сойдёт',
                'Хз айди 3 занч норм',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
                'хз надо бы зайти',
            ],
            eyes: [
                'Красные',
                'В цвет брад',
                'В цвет))',
                'Пока хуй увидишь',
                'Ладно потом доделаю',
                'Щас уже выбор одежды'
            ],
        },
        appearance: {
            // Причёска
            hairIndex: 0,
            haircolorindex: 0,
            maleHair: [
                { id: 0, name: 'Под ноль' },
                { id: 1, name: 'Коротко' },
                { id: 2, name: 'Ястреб' },
                { id: 3, name: 'Хипстер' },
                { id: 4, name: 'С пробором' },
                { id: 5, name: `Полуостров` },
                { id: 6, name: `Байкер` },
                { id: 7, name: `Хвост` },
                { id: 8, name: 'Брейды' },
                { id: 9, name: 'Прилиза' },
                { id: 10, name: 'Канадка' },
            ],
            femaleHair: [
                { id: 0, name: 'Под ноль' },
                { id: 1, name: 'Коротко' },
                { id: 2, name: 'Слои' },
                { id: 3, name: 'Косички' },
                { id: 4, name: 'Хвост' },
                { id: 5, name: `Ирокез` },
                { id: 6, name: `Брейды` },
                { id: 7, name: `Боб` },
                { id: 8, name: 'Ястреб' },
                { id: 9, name: 'Ракушка' },
                { id: 10, name: 'Лонг Боб' },
            ],
            // Бороды
            beardIndex: 0,
            beardColorIndex: 0,
            beards: [
                { id: -1, name: 'Нема' },
                { id: 0, name: 'Под ноль' },
                { id: 1, name: 'Коротко' },
                { id: 2, name: 'Слои' },
                { id: 3, name: 'Косички' },
                { id: 4, name: 'Хвост' },
                { id: 5, name: `Ирокез` },
            ],
            // Брови
            browIndex: 0,
            browColorIndex: 0,
            brows: [
                { id: 0, name: 'Акуратные' },
                { id: 1, name: 'Модные' },
                { id: 2, name: 'Клеопатра' },
                { id: 3, name: 'Ироничные' },
                { id: 4, name: 'Женственные' },
                { id: 5, name: `Обольстительные` },
                { id: 6, name: `Нахмуренные` },
                { id: 7, name: `Чикса` },
                { id: 8, name: 'Торжествующие' },
                { id: 9, name: 'Беззаботные' },
                { id: 10, name: 'Дугой' },
                { id: 11, name: 'Мышка' },
                { id: 12, name: 'Двойная высечка' },
                { id: 13, name: 'Впалые' },
                { id: 14, name: 'Нарисованные карандашом' },
                { id: 15, name: 'Выщипанные' },
                { id: 16, name: `Прямые и тонкие` },
                { id: 17, name: `Естественные` },
                { id: 18, name: `Пышные` },
                { id: 19, name: 'Неопрятные' },
                { id: 20, name: 'Широкие' },
                { id: 21, name: 'Обычные' },
                { id: 22, name: 'Южноевропейские' },
                { id: 23, name: 'Ухоженные' },
                { id: 24, name: 'Кустистые' },
                { id: 25, name: 'Перышки' },
                { id: 26, name: 'Колючие' },
                { id: 27, name: 'Сросшиеся' },
                { id: 28, name: `Крылатые` },
                { id: 29, name: `Тройная высечка` },
                { id: 30, name: `Высечка дугой` },
                { id: 31, name: 'Подрезанные' },
                { id: 32, name: 'Сходящие на нет' },
                { id: 33, name: 'Высечка' },
            ],
            // Цвет глаз
            eyeIndex: 0,
            eyes: [
                { id: 0, name: 'Зеленый' },
                { id: 1, name: 'Изумрудный' },
                { id: 2, name: 'Голубой' },
                { id: 3, name: 'Синий' },
                { id: 4, name: 'Светлый шатен' },
                { id: 5, name: `Темно-коричневый` },
                { id: 6, name: `Карий` },
                { id: 7, name: `Темно-серый` },
                { id: 8, name: 'Светло-серый' },
                { id: 9, name: 'Розовый' },
                { id: 10, name: 'Желтый' },
                { id: 11, name: 'Фиолетовый' },
                { id: 12, name: 'Затемнение' },
                { id: 13, name: 'Оттенки серого' },
                { id: 14, name: 'Текила-санрайз' },
                { id: 16, name: `Искажение` },
                { id: 18, name: `Космический рейнджер` },
                { id: 19, name: 'Инь-ян' },
                { id: 20, name: 'Мишень' },
                { id: 21, name: 'Ящерица' },
                { id: 22, name: 'Дракон' },
                { id: 23, name: 'Инопланетянин' },
                { id: 24, name: 'Козел' },
                { id: 25, name: 'Смайлик' },
                { id: 26, name: 'Одержимый' },
                { id: 27, name: 'Демон' },
            ]
        },

        clothes: {
            headIndex: 0,
            topIndex: 0,
            undershitsIndex: 0,
            legsIndex: 0,
            shoesIndex: 0,
            glassesIndex: 0,
            male: {
                head: [
                    { name: 'Нет', id: 8 },
                    { name: 'Зимняя шапка', id: 2 },
                    { name: 'Бейсболка LS', id: 4 },
                    { name: 'Кепка', id: 6 },
                    { name: 'Федора', id: 12 },
                    { name: 'Панама', id: 20 },
                    { name: 'Шляпа', id: 21 },
                    { name: 'Шапка-бини', id: 28 },
                    { name: 'SecuroServ', id: 65 },
                ],
                glasses: [
                    { name: 'Нет', id: 0 },
                    { name: 'Очки', id: 2 },
                    { name: 'Очки Janitor', id: 3 },
                    { name: 'Авиаторы', id: 5 },
                    { name: 'Eyewear', id: 8 },
                    { name: 'Elvis', id: 12 },
                    { name: 'Изящные очки', id: 17 },
                    { name: 'Качественные', id: 18 },
                ],
                tops: [
                    { name: 'Белая футболка', id: 0 },
                    { name: 'Спортивная куртка', id: 3 },
                    { name: 'Кожаная куртка', id: 6 },
                    { name: 'Рубашка поло', id: 9 },
                    { name: 'Белая рубашка', id: 13 },
                    { name: 'Серая футболка', id: 16 },
                    { name: 'Темно-серая рубашка', id: 26 },
                    { name: 'Серая полосатая футболка', id: 33 },
                    { name: 'Кожаная куртка', id: 37 },
                    { name: 'Зелёная футболка', id: 44 },
                ],
                undershits: [
                    { name: 'Нет', id: 15 },
                    { name: 'Белая майка', id: 1 },
                    { name: 'Черный жилет', id: 4 },
                    { name: 'Синня футболка', id: 8 },
                    { name: 'Футболка в полосочку', id: 9 },
                    { name: 'Белая рубашка', id: 11 },
                    { name: 'Потрёпаная рубашка', id: 13 },
                    { name: 'Свитер Cerveza Barracho', id: 16 },
                ],
                legs: [
                    { name: 'Ультрамариновые джинсы', id: 0 },
                    { name: 'Спортивные брюки', id: 3 },
                    { name: 'Узкие джинсы', id: 4 },
                    { name: 'Брюки-трико', id: 5 },
                    { name: 'Пепельные шорты', id: 6 },
                    { name: 'Рабочие штаны', id: 7 },
                    { name: 'Чинос', id: 8 },
                    { name: 'Брюки карго', id: 9 },
                    { name: 'Черные брюки', id: 10 },
                    { name: 'Черные чинос', id: 12 },
                    { name: 'Темно-синие шорты', id: 16 },
                ],
                shoes: [
                    { name: 'Черные кеды', id: 1 },
                    { name: 'Серые ботинки', id: 3 },
                    { name: 'Темно-синие кеды', id: 4 },
                    { name: 'Белые шлепанцы', id: 5 },
                    { name: 'Серые сандалии', id: 6 },
                    { name: 'Белые кроссовки', id: 8 },
                    { name: 'Белые кроссовки 2', id: 9 },
                    { name: 'Желто-коричневые ботинки', id: 12 },
                    { name: 'Черные ботинки', id: 14 },
                    { name: 'Голубые кеды', id: 22 },
                ],
            },
            female: {
                head: [
                    { name: 'Нет', id: 120 },
                    { name: 'Бейсболка LS', id: 4 },
                    { name: 'Шапка-бини', id: 5 },
                    { name: 'Кепка Fruit', id: 9 },
                    { name: 'Черная шапка-бини', id: 12 },
                    { name: 'соломенная шляпа', id: 13 },
                    { name: 'Берет', id: 14 },
                    { name: 'Панама CaCa"', id: 21 },
                    { name: `Кепка 'Плохая'`, id: 43 },
                ],
                glasses: [
                    { name: 'Нет', id: 5 },
                    { name: 'Мадемуазель', id: 2 },
                    { name: 'Ретро', id: 4 },
                    { name: 'Стрекозы', id: 6 },
                    { name: 'Авиаторы', id: 11 },
                    { name: 'Кошачий глаз', id: 14 },
                    { name: 'Хипстеры', id: 21 },
                    { name: 'Квадратные очки', id: 35 },
                ],
                tops: [
                    { name: 'Белая футболка', id: 0 },
                    { name: 'Белая толстовка', id: 3 },
                    { name: 'Темно-серая рубашка', id: 9 },
                    { name: 'Полосатая куртка', id: 10 },
                    { name: 'Рубашка - попугаи', id: 17 },
                    { name: 'Подбитая кожаная куртка', id: 69 },
                    { name: 'Майка с желтым рисунком', id: 75 },
                    { name: 'Спортивная толстовка', id: 78 },
                    { name: 'Поло San Andreas', id: 84 },
                    { name: 'Чёрная спортивная толстовка', id: 126 },
                ],
                undershits: [
                    { name: 'Нет', id: 2 },
                    { name: 'Белая майка', id: 0 },
                    { name: 'Голубая майка', id: 11 },
                    { name: 'Красная майка', id: 16 },
                    { name: 'Зелёная футболка', id: 30 },
                    { name: 'Белая рубашка', id: 38 },
                ],
                legs: [
                    { name: 'Узкие джинсы', id: 0 },
                    { name: 'Черные чинос', id: 3 },
                    { name: 'Темно-синие джинсы', id: 4 },
                    { name: 'Черный костюм', id: 6 },
                    { name: 'Узкая юбка', id: 7 },
                    { name: 'Мини-юбка', id: 8 },
                    { name: 'Белые шорты', id: 10 },
                    { name: 'Желтые шорты', id: 16 },
                    { name: 'Брюки', id: 23 },
                ],
                shoes: [
                    { name: 'Двухцветные кеды', id: 1 },
                    { name: 'Черные Canvas', id: 3 },
                    { name: 'Черные Sports', id: 4 },
                    { name: 'Серые шлепанцы', id: 5 },
                    { name: 'Кроссовки индиго', id: 10 },
                    { name: 'Фиолетовые кроссовки', id: 11 },
                    { name: 'Темно-серые шлепанцы', id: 16 },
                    { name: 'Кроссовки Calypso', id: 32 },
                    { name: 'Синие цифровые кроссовки', id: 62 },
                ],
            }
        },
        error: {
            active: false,
            text: ''
        },
        colors: [
            { id: 1, name: 'Чёрный' },
            { id: 3, name: 'Чёрно красный' },
            { id: 53, name: 'Красный' },
            { id: 8, name: 'Светло коричневый' },
            { id: 17, name: 'Коричневый' },
            { id: 19, name: 'Красный' },
            { id: 27, name: 'Тёмно серый' },
            { id: 28, name: 'Серый' },
            { id: 28, name: 'Белый' },
            { id: 32, name: 'Фиолетовый' },
            { id: 33, name: 'Розовый' },
            { id: 39, name: 'Зелёный' },
            { id: 45, name: 'Тёмно жёлтый' },
            { id: 46, name: 'Жёлтый' },
            { id: 47, name: 'Оранжевый' },
        ],
    },
    methods: {
        changeGender(t) {
            if (t == 1) {
                if (this.data.gender == 1) return;
                this.data.gender++;
            } else {
                if (this.data.gender == 0) return;
                this.data.gender--;
            }
            this.appearance.hairIndex = 0;
            this.data.appearance.beard = -1;
            alt.emit('pedCreator_updateData::CLIENT', this.data, 'gender');

        },
        clickRight(t) {
            // Выбор папы
            if (t == 1) {
                if (this.parents.fatherIndex == this.parents.fathers.length - 1) return this.parents.fatherIndex = 0;
                this.parents.fatherIndex++;
                this.data.father = this.parents.fathers[this.parents.fatherIndex].id;
                this.updateData();
            }
            // Выбор мамы
            else if (t == 2) {
                if (this.parents.motherIndex == this.parents.mothers.length - 1) return this.parents.motherIndex = 0;
                this.parents.motherIndex++;
                this.data.mother = this.parents.mothers[this.parents.motherIndex].id;
                this.updateData();
            }
            // Брови
            else if (t == 3) {
                if (this.appearance.browIndex == this.appearance.brows.length - 1) {
                    this.appearance.browIndex = 0;
                    this.data.appearance.brows = this.appearance.brows[this.appearance.browIndex].id;
                    this.updateData();
                    return;
                }
                this.appearance.browIndex++;
                this.data.appearance.brows = this.appearance.brows[this.appearance.browIndex].id;
                this.updateData();
            }
            // Цвет глаз
            else if (t == 4) {
                if (this.appearance.eyeIndex == this.appearance.eyes.length - 1) {
                    this.appearance.eyeIndex = 0;
                    this.data.appearance.eyes = this.appearance.eyes[this.appearance.eyeIndex].id;
                    this.updateData();
                    return;
                }
                this.appearance.eyeIndex++;
                this.data.appearance.eyes = this.appearance.eyes[this.appearance.eyeIndex].id;
                this.updateData();
            }
            //Причёска
            else if (t == 5) {
                if (this.data.gender == 0) {
                    if (this.appearance.hairIndex == this.appearance.maleHair.length - 1) {
                        this.appearance.hairIndex = 0;
                        this.data.appearance.hair = this.appearance.maleHair[this.appearance.hairIndex].id;
                        this.updateData();
                        return;
                    }
                    this.appearance.hairIndex++;
                    this.data.appearance.hair = this.appearance.maleHair[this.appearance.hairIndex].id;
                    this.updateData();
                } else {
                    if (this.appearance.hairIndex == this.appearance.femaleHair.length - 1) {
                        this.appearance.hairIndex = 0
                        this.data.appearance.hair = this.appearance.femaleHair[this.appearance.hairIndex].id;
                        return;
                    }
                    this.appearance.hairIndex++;
                    this.data.appearance.hair = this.appearance.femaleHair[this.appearance.hairIndex].id;
                    this.updateData();
                }
            }
            // Цвет волос
            else if (t == 6) {
                if (this.appearance.haircolorindex == this.colors.length - 1) {
                    this.appearance.haircolorindex = 0;
                    this.appearance.haircolorindex++;
                    this.data.appearance.hairColor = this.colors[this.appearance.haircolorindex].id;
                    return;
                }
                this.appearance.haircolorindex++;
                this.data.appearance.hairColor = this.colors[this.appearance.haircolorindex].id;
                this.updateData();
            }
            // Борода
            else if (t == 7) {
                if (this.data.gender == 0) {
                    if (this.appearance.beardIndex == this.appearance.beards.length - 1) {
                        this.appearance.beardIndex = 0;
                        this.data.appearance.beard = this.appearance.beards[this.appearance.beardIndex].id;
                        this.updateData();
                        return;
                    }
                    this.appearance.beardIndex++;
                    this.data.appearance.beard = this.appearance.beards[this.appearance.beardIndex].id;
                    this.updateData();
                }
            }
            // Цвет бороды
            else if (t == 14) {
                if (this.data.gender == 0) {
                    if (this.appearance.beardColorIndex == this.colors.length - 1) {
                        this.appearance.beardColorIndex = 0;
                        this.data.appearance.hairColor = this.colors[this.appearance.beardColorIndex].id;
                        return;
                    }
                    this.appearance.beardColorIndex++;
                    this.data.appearance.beardColor = this.colors[this.appearance.beardColorIndex].id;
                    this.updateData();
                }
            }
            // Головной убор
            else if (t == 8) {
                if (this.data.gender == 0) {
                    if (this.clothes.headIndex == this.clothes.male.head.length - 1) {
                        this.clothes.headIndex = 0;
                        this.data.clothes.hats = this.clothes.male.head[this.clothes.headIndex].id;
                        this.updateData();
                        return;
                    }
                    this.clothes.headIndex++;
                    this.data.clothes.hats = this.clothes.male.head[this.clothes.headIndex].id;
                    this.updateData();
                } else {
                    if (this.clothes.headIndex == this.clothes.female.head.length - 1) {
                        this.clothes.headIndex = 0;
                        this.data.clothes.hats = this.clothes.female.head[this.clothes.headIndex].id;
                        this.updateData();
                        return;
                    }
                    this.clothes.headIndex++;
                    this.data.clothes.hats = this.clothes.female.head[this.clothes.headIndex].id;
                    this.updateData();
                }
            }
            // Верхняя одежда
            else if (t == 9) {
                if (this.data.gender == 0) {
                    if (this.clothes.topIndex == this.clothes.male.tops.length - 1) {
                        this.clothes.topIndex = 0;
                        this.data.clothes.tops = this.clothes.male.tops[this.clothes.topIndex].id;
                        this.updateData();
                        return;
                    }
                    this.clothes.topIndex++;
                    this.data.clothes.tops = this.clothes.male.tops[this.clothes.topIndex].id;
                    this.updateData();
                } else {
                    if (this.clothes.topIndex == this.clothes.female.tops.length - 1) {
                        this.clothes.topIndex = 0;
                        this.data.clothes.tops = this.clothes.female.tops[this.clothes.topIndex].id;
                        this.updateData();
                        return;
                    }
                    this.clothes.topIndex++;
                    this.data.clothes.tops = this.clothes.female.tops[this.clothes.topIndex].id;
                    this.updateData();
                }
            }
            // Майки
            else if (t == 10) {
                if (this.data.gender == 0) {
                    if (this.clothes.undershitsIndex == this.clothes.male.undershits.length - 1) {
                        this.clothes.undershitsIndex = 0;
                        this.data.clothes.undershit = this.clothes.male.undershits[this.clothes.undershitsIndex].id;
                        this.updateData();
                        return;
                    }
                    this.clothes.undershitsIndex++;
                    this.data.clothes.undershit = this.clothes.male.undershits[this.clothes.undershitsIndex].id;
                    this.updateData();
                } else {
                    if (this.clothes.undershitsIndex == this.clothes.female.undershits.length - 1) {
                        this.clothes.undershitsIndex = 0;
                        this.data.clothes.undershit = this.clothes.female.undershits[this.clothes.undershitsIndex].id;
                        this.updateData();
                        return;
                    }
                    this.clothes.undershitsIndex++;
                    this.data.clothes.undershit = this.clothes.female.undershits[this.clothes.undershitsIndex].id;
                    this.updateData();
                }
            }
            // Низ
            else if (t == 11) {
                if (this.data.gender == 0) {
                    if (this.clothes.legsIndex == this.clothes.male.legs.length - 1) {
                        this.clothes.legsIndex = 0;
                        this.data.clothes.legs = this.clothes.male.legs[this.clothes.legsIndex].id;
                        this.updateData();
                        return;
                    }
                    this.clothes.legsIndex++;
                    this.data.clothes.legs = this.clothes.male.legs[this.clothes.legsIndex].id;
                    this.updateData();
                } else {
                    if (this.clothes.legsIndex == this.clothes.female.legs.length - 1) {
                        this.clothes.legsIndex = 0;
                        this.data.clothes.legs = this.clothes.female.legs[this.clothes.legsIndex].id;
                        this.updateData();
                        return;
                    }
                    this.clothes.legsIndex++;
                    this.data.clothes.legs = this.clothes.female.legs[this.clothes.legsIndex].id;
                    this.updateData();
                }
            }
            // Капцы
            else if (t == 12) {
                if (this.data.gender == 0) {
                    if (this.clothes.shoesIndex == this.clothes.male.shoes.length - 1) {
                        this.clothes.shoesIndex = 0;
                        this.data.clothes.shoes = this.clothes.male.shoes[this.clothes.shoesIndex].id;
                        this.updateData();
                        return;
                    }
                    this.clothes.shoesIndex++;
                    this.data.clothes.shoes = this.clothes.male.shoes[this.clothes.shoesIndex].id;
                    this.updateData();
                } else {
                    if (this.clothes.shoesIndex == this.clothes.female.shoes.length - 1) {
                        this.clothes.shoesIndex = 0;
                        this.data.clothes.shoes = this.clothes.female.shoes[this.clothes.shoesIndex].id;
                        this.updateData();
                        return;
                    }
                    this.clothes.shoesIndex++;
                    this.data.clothes.shoes = this.clothes.female.shoes[this.clothes.shoesIndex].id;
                    this.updateData();
                }
            }
            // Очки)
            else if (t == 13) {
                if (this.data.gender == 0) {
                    if (this.clothes.glassesIndex == this.clothes.male.glasses.length - 1) {
                        this.clothes.glassesIndex = 0;
                        this.data.clothes.glasses = this.clothes.male.glasses[this.clothes.glassesIndex].id;
                        this.updateData();
                        return;
                    }
                    this.clothes.glassesIndex++;
                    this.data.clothes.glasses = this.clothes.male.glasses[this.clothes.glassesIndex].id;
                    this.updateData();
                } else {
                    if (this.clothes.glassesIndex == this.clothes.female.glasses.length - 1) {
                        this.clothes.glassesIndex = 0;
                        this.data.clothes.glasses = this.clothes.female.glasses[this.clothes.glassesIndex].id;
                        this.updateData();
                        return;
                    }
                    this.clothes.glassesIndex++;
                    this.data.clothes.glasses = this.clothes.female.glasses[this.clothes.glassesIndex].id;
                    this.updateData();
                }
            }
        },
        clickLeft(t) {
            //Выбор папы
            if (t == 1) {
                if (this.parents.fatherIndex == this.parents.fathers.length - this.parents.fathers.length) return this.parents.fatherIndex = this.parents.fathers.length - 1;
                this.parents.fatherIndex--;
                this.data.father = this.parents.fathers[this.parents.fatherIndex].id;
                this.updateData();
            }
            // Выбор мамы
            else if (t == 2) {
                if (this.parents.motherIndex == this.parents.mothers.length - this.parents.mothers.length) return this.parents.motherIndex = this.parents.mothers.length - 1;
                this.parents.motherIndex--;
                this.data.mother = this.parents.mothers[this.parents.motherIndex].id;
                this.updateData();
            }
            // Брови
            else if (t == 3) {
                if (this.appearance.browIndex == this.appearance.brows.length - this.appearance.brows.length) {
                    this.appearance.browIndex = this.appearance.brows.length - 1;
                    this.data.appearance.brows = this.appearance.brows[this.appearance.browIndex].id;
                    this.updateData();
                    return;
                }
                this.appearance.browIndex--;
                this.data.appearance.brows = this.appearance.brows[this.appearance.hairIndex].id;
                this.updateData();
            }
            // Цвет глаз
            else if (t == 4) {
                if (this.data.hair[1] == -1) return this.data.hair[1] = 31;
                this.data.hair[1]--;
                this.updateData();
            }
            // Причёска
            else if (t == 5) {
                if (this.data.gender == 0) {
                    if (this.appearance.hairIndex == this.appearance.maleHair.length - this.appearance.maleHair.length) {
                        this.appearance.hairIndex = this.appearance.maleHair.length - 1;
                        this.data.appearance.hair = this.appearance.femaleHair[this.appearance.hairIndex].id;
                        this.updateData();
                        return;
                    }
                    this.appearance.hairIndex--;
                    this.data.appearance.hair = this.appearance.maleHair[this.appearance.hairIndex].id;
                    this.updateData();
                } else {
                    if (this.appearance.hairIndex == this.appearance.femaleHair.length - this.appearance.femaleHair.length) {
                        this.appearance.hairIndex = this.appearance.femaleHair.length - 1;
                        this.data.appearance.hair = this.appearance.femaleHair[this.appearance.hairIndex].id;
                        this.updateData();
                        return;
                    }
                    this.appearance.hairIndex--;
                    this.data.appearance.hair = this.appearance.femaleHair[this.appearance.hairIndex].id;
                    this.updateData();
                }
            }
            // Цвет волос
            else if (t == 6) {
                if (this.appearance.haircolorindex == this.colors.length - this.colors.length) {
                    this.appearance.haircolorindex = this.colors.length;
                    this.appearance.haircolorindex--;
                    this.data.appearance.hairColor = this.colors[this.appearance.haircolorindex].id;
                    this.updateData();
                    return; // блять как же я заебался переписывать это, кст сегодня 01.11.2021, пиздец честно ))))) надеюсь тут скоро будет норм код
                }
                this.appearance.haircolorindex--;
                this.data.appearance.hairColor = this.colors[this.appearance.haircolorindex].id;
                this.updateData();
            }
            // Борода
            else if (t == 7) {
                if (this.data.gender == 0) {
                    if (this.appearance.beardIndex == this.appearance.beards.length - this.appearance.beards.length) {
                        this.appearance.beardIndex = this.appearance.beards.length - 1;
                        this.data.appearance.beard = this.appearance.beards[this.appearance.beardIndex].id;
                        this.updateData();
                        return;
                    }
                    this.appearance.beardIndex--;
                    this.data.appearance.beard = this.appearance.beards[this.appearance.beardIndex].id;
                    this.updateData();
                }
            }
            // Цвет бороды
            else if (t == 14) {
                if (this.data.gender == 0) {
                    if (this.appearance.beardColorIndex == this.colors.length - this.colors.length) {
                        this.appearance.beardColorIndex = this.colors.length - 1;
                        this.data.appearance.hairColor = this.colors[this.appearance.beardColorIndex].id;
                        return;
                    }
                    this.appearance.beardColorIndex--;
                    this.data.appearance.beardColor = this.colors[this.appearance.beardColorIndex].id;
                    this.updateData();
                }
            }
            // Кепка
            else if (t == 8) {
                if (this.data.gender == 0) {
                    if (this.clothes.headIndex == this.clothes.male.head.length - this.clothes.male.head.length) {
                        this.clothes.headIndex = this.clothes.male.head.length - 1;
                        this.data.clothes.hats = this.clothes.male.head[this.clothes.headIndex].id;
                        this.updateData();
                        return;
                    }
                    this.clothes.headIndex--;
                    this.data.clothes.hats = this.clothes.male.head[this.clothes.headIndex].id;
                    this.updateData();
                } else {
                    if (this.clothes.headIndex == this.clothes.female.head.length - this.clothes.female.head.length) {
                        this.clothes.headIndex = this.clothes.female.head.length - 1;
                        this.data.clothes.hats = this.clothes.female.head[this.clothes.headIndex].id;
                        this.updateData();
                        return;
                    }
                    this.clothes.headIndex--;
                    this.data.clothes.hats = this.clothes.female.head[this.clothes.headIndex].id;
                    this.updateData();
                }
            }
            // Верхняя одежда
            else if (t == 9) {
                if (this.data.gender == 0) {
                    if (this.clothes.topIndex == this.clothes.male.tops.length - this.clothes.male.tops.length) {
                        this.clothes.topIndex = this.clothes.male.tops.length - 1;
                        this.data.clothes.tops = this.clothes.male.tops[this.clothes.topIndex].id;
                        this.updateData();
                        return;
                    }
                    this.clothes.topIndex--;
                    this.data.clothes.tops = this.clothes.male.tops[this.clothes.topIndex].id;
                    this.updateData();
                } else {
                    if (this.clothes.topIndex == this.clothes.female.tops.length - this.clothes.female.tops.length) {
                        this.clothes.topIndex = this.clothes.female.tops.length - 1;
                        this.data.clothes.tops = this.clothes.female.tops[this.clothes.topIndex].id;
                        this.updateData();
                        return;
                    }
                    this.clothes.topIndex--;
                    this.data.clothes.tops = this.clothes.female.tops[this.clothes.topIndex].id;
                    this.updateData();
                }
            }
            // Майка
            else if (t == 10) {
                if (this.data.gender == 0) {
                    if (this.clothes.undershitsIndex == this.clothes.male.undershits.length - this.clothes.male.undershits.length) {
                        this.clothes.undershitsIndex = this.clothes.male.undershits.length - 1;
                        this.data.clothes.undershit = this.clothes.male.undershits[this.clothes.undershitsIndex].id;
                        this.updateData();
                        return;
                    }
                    this.clothes.undershitsIndex--;
                    this.data.clothes.undershit = this.clothes.male.undershits[this.clothes.undershitsIndex].id;
                    this.updateData();
                } else {
                    if (this.clothes.undershitsIndex == this.clothes.female.undershits.length - this.clothes.female.undershits.length) {
                        this.clothes.undershitsIndex = this.clothes.female.undershits.length - 1;
                        this.data.clothes.undershit = this.clothes.female.undershits[this.clothes.undershitsIndex].id;
                        this.updateData();
                        return;
                    }
                    this.clothes.undershitsIndex--;
                    this.data.clothes.undershit = this.clothes.female.undershits[this.clothes.undershitsIndex].id;
                    this.updateData();
                }
            }
            // Низ
            else if (t == 11) {
                if (this.data.gender == 0) {
                    if (this.clothes.legsIndex == this.clothes.male.legs.length - this.clothes.male.legs.length) {
                        this.clothes.legsIndex = this.clothes.male.legs.length - 1;
                        this.data.clothes.legs = this.clothes.male.legs[this.clothes.legsIndex].id;
                        this.updateData();
                        return;
                    }
                    this.clothes.legsIndex--;
                    this.data.clothes.legs = this.clothes.male.legs[this.clothes.legsIndex].id;
                    this.updateData();
                } else {
                    if (this.clothes.legsIndex == this.clothes.female.legs.length - this.clothes.female.legs.length) {
                        this.clothes.legsIndex = this.clothes.female.legs.length - 1;
                        this.data.clothes.legs = this.clothes.female.legs[this.clothes.legsIndex].id;
                        this.updateData();
                        return;
                    }
                    this.clothes.legsIndex--;
                    this.data.clothes.legs = this.clothes.female.legs[this.clothes.legsIndex].id;
                    this.updateData();
                }
            }
            else if (t == 12) {
                if (this.data.gender == 0) {
                    if (this.clothes.shoesIndex == this.clothes.male.shoes.length - this.clothes.male.shoes.length) {
                        this.clothes.shoesIndex = this.clothes.male.shoes.length - 1;
                        this.data.clothes.shoes = this.clothes.male.shoes[this.clothes.shoesIndex].id;
                        this.updateData();
                        return;
                    }
                    this.clothes.shoesIndex--;
                    this.data.clothes.shoes = this.clothes.male.shoes[this.clothes.shoesIndex].id;
                    this.updateData();
                } else {
                    if (this.clothes.shoesIndex == this.clothes.female.shoes.length - this.clothes.female.shoes.length) {
                        this.clothes.shoesIndex = this.clothes.female.shoes.length - 1;
                        this.data.clothes.shoes = this.clothes.female.shoes[this.clothes.shoesIndex].id;
                        this.updateData();
                        return;
                    }
                    this.clothes.shoesIndex--;
                    this.data.clothes.shoes = this.clothes.female.shoes[this.clothes.shoesIndex].id;
                    this.updateData();
                }
            }
            // Очки)
            else if (t == 13) {
                if (this.data.gender == 0) {
                    if (this.clothes.glassesIndex == this.clothes.male.glasses.length - this.clothes.male.glasses.length) {
                        this.clothes.glassesIndex = this.clothes.male.glasses.length - 1;
                        this.data.clothes.glasses = this.clothes.male.glasses[this.clothes.glassesIndex].id;
                        this.updateData();
                        return;
                    }
                    this.clothes.glassesIndex--;
                    this.data.clothes.glasses = this.clothes.male.glasses[this.clothes.glassesIndex].id;
                    this.updateData();
                } else {
                    if (this.clothes.glassesIndex == this.clothes.female.glasses.length - this.clothes.female.glasses.length) {
                        this.clothes.glassesIndex = this.clothes.female.glasses.length - 1;
                        this.data.clothes.glasses = this.clothes.female.glasses[this.clothes.glassesIndex].id;
                        this.updateData();
                        return;
                    }
                    this.clothes.glassesIndex--;
                    this.data.clothes.glasses = this.clothes.female.glasses[this.clothes.glassesIndex].id;
                    this.updateData();
                }
            }
        },
        setOpen(s) {
            this.show = s;
        },
        updateData() {
            alt.emit('pedCreator_updateData::CLIENT', this.data)
        },
        resetData() {
            for (let i = 0; i < this.data.structure.length; i++) {
                this.data.structure[i] = 0;
                this.updateData();
            }
        },
        createCharacter() {
            let rx = /^[а-яё\s-]+$/i;
            if (rx.test(this.data.name) || rx.test(this.data.surname)) return this.showError('Не должно быть русских букв')
            if (this.data.name.length < 4) return this.showError('Слишком короткое имя')
            if (this.data.surname.length < 6) return this.showError('Слишком короткая фамилия')
            this.updateData();
            alt.emit('pedCreator_finishSync::CLIENT', this.data);
        },
        showError(text) {
            this.error.active = true;
            this.error.text = text;
            setTimeout(() => {
                this.closeError();
            }, 5000)
        },
        closeError() {
            this.error.active = false;
            this.error.text = '';
        },
        randomBtn() {
            // Ebalo
            for (i = 0; i < this.data.structure.length; i++) {
                let value = this.getRandomFloat(-1, 1);
                this.data.structure[i] = value;
            }
            this.data.father = this.getRandomInt(1, this.parents.fathers.length);
            this.data.mother = this.getRandomInt(1, this.parents.mothers.length);
            this.data.faceMix = this.getRandomFloat(0, 1)
            this.data.shapeMix = this.getRandomFloat(0, 1)

            // HAIR
            this.appearance.hairIndex = this.getRandomInt(0, this.appearance.maleHair.length - 1)
            this.data.appearance.hair = this.appearance.maleHair[this.appearance.hairIndex].id;
            this.appearance.haircolorindex = this.getRandomInt(0, this.colors.length - 1)
            this.data.appearance.hairColor = this.colors[this.appearance.haircolorindex].id;
            // beard
            if (this.data.gender == 0) {
                this.appearance.beardIndex = this.getRandomInt(0, this.appearance.beards.length - 1)
                this.data.appearance.beard = this.appearance.beards[this.appearance.beardIndex].id;
            }
            // brows
            this.appearance.browIndex = this.getRandomInt(0, this.appearance.brows.length - 1)
            this.data.appearance.brows = this.appearance.brows[this.appearance.browIndex].id;
            this.appearance.browColorIndex = this.getRandomInt(0, this.colors.length - 1)
            this.data.appearance.browsColor = this.colors[this.appearance.browColorIndex].id;
            // eye
            this.appearance.eyeIndex = this.getRandomInt(0, this.appearance.eyes.length - 1)
            this.data.appearance.eyesColor = this.appearance.eyes[this.appearance.eyeIndex].id;

            // Clothes
            if (this.data.gender == 0) {
                // Головной убор
                this.clothes.headIndex = this.getRandomInt(0, this.clothes.male.head.length - 1)
                this.data.clothes.hats = this.clothes.male.head[this.clothes.headIndex].id;
                // Очки
                this.clothes.glassesIndex = this.getRandomInt(0, this.clothes.male.glasses.length - 1)
                this.data.clothes.glasses = this.clothes.male.glasses[this.clothes.glassesIndex].id;
                // Верх
                this.clothes.topIndex = this.getRandomInt(0, this.clothes.male.tops.length - 1)
                this.data.clothes.tops = this.clothes.male.tops[this.clothes.topIndex].id;
                // Штаны
                this.clothes.legsIndex = this.getRandomInt(0, this.clothes.male.legs.length - 1)
                this.data.clothes.legs = this.clothes.male.legs[this.clothes.legsIndex].id;
                // Обувь
                this.clothes.shoesIndex = this.getRandomInt(0, this.clothes.male.shoes.length - 1)
                this.data.clothes.shoes = this.clothes.male.shoes[this.clothes.shoesIndex].id;
            }
            else {
                // Головной убор
                this.clothes.headIndex = this.getRandomInt(0, this.clothes.female.head.length - 1)
                this.data.clothes.hats = this.clothes.female.head[this.clothes.headIndex].id;
                // Очки
                this.clothes.glassesIndex = this.getRandomInt(0, this.clothes.female.glasses.length - 1)
                this.data.clothes.glasses = this.clothes.female.glasses[this.clothes.glassesIndex].id;
                // Верх
                this.clothes.topIndex = this.getRandomInt(0, this.clothes.female.tops.length - 1)
                this.data.clothes.tops = this.clothes.female.tops[this.clothes.topIndex].id;
                // Штаны
                this.clothes.legsIndex = this.getRandomInt(0, this.clothes.female.legs.length - 1)
                this.data.clothes.legs = this.clothes.female.legs[this.clothes.legsIndex].id;
                // Обувь
                this.clothes.shoesIndex = this.getRandomInt(0, this.clothes.female.shoes.length - 1)
                this.data.clothes.shoes = this.clothes.female.shoes[this.clothes.shoesIndex].id;
            }

            this.updateData()
        },
        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        getRandomFloat(min, max) {
            return Math.random() * (max - min) + min;
        }
    },
    watch: {
        // Схожесть с родителями
        'data.faceMix'(newVal) {
            this.updateData();
        },
        'data.skinMix'(newVal) {
            this.updateData();
        },
        // Характеристики лица
        'data.structure'(newVal) {
            this.clickCef = true;
            this.updateData();
        },
    }
})

if ('alt' in window) {
    alt.on('pedCreator_show::CEF', (bool) => {
        pedCreator.active = bool;
        pedCreator.show = 1;
        pedCreator.updateData();
    });
}