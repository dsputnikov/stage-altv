
var Inventory = new Vue({
    el: "#inventory",
    data: {
        active: false,
        player: {
            name: 'Clement Velasco',
            lvl: 1,
        },
        // Предметы
        items: [
            // { slot: 2, name: 'Рубашка', desc: 'Уталяет жажду и восстанавливает здоровья', type: 'clothes', componentId: 11, drawableId: 4, textureId: 0, paletteId: 0, weight: 0.5, img: './systems/inventory/img/items/7.png' },
            { slot: 5, name: 'Рубашка', desc: 'Уталяет жажду и восстанавливает здоровья', type: 'clothes', componentId: 11, drawableId: 4, textureId: 0, paletteId: 0, weight: 0.5, img: './systems/inventory/img/items/32.png' },
        ],
        playerClothes: [
            { name: 'Торс', componentId: 11, drawableId: 1, textureId: 0, paletteId: 0 },
        ],
        list_items: [
            { slot: 1, name: 'Рубашка', desc: 'Уталяет жажду и восстанавливает здоровья', type: 'clothes', componentId: 11, drawableId: 4, textureId: 0, paletteId: 0, weight: 0.5, img: './systems/inventory/img/items/7.png' },
        ],
        // Модальное окно
        modal: {
            active: false,
            posX: 0,
            posY: 0,
            img: './systems/inventory/img/items/7.png',
            weight: 0,
            count: 1,
            name: '',
            desc: ''
        },
        currentItem: 0,
    },
    methods: {
        addItem(type, count) {
            let length = this.items.length;
            let id = length++;
            let list_item = this.list_items[type];

            this.items.push(list_item)
            this.updateInventory();
        },
        clickItem(i) {
            this.modal.active = true;
            this.modal.img = this.items[i].img;
            this.modal.name = this.items[i].name;
            this.modal.desc = this.items[i].desc;
            this.modal.weight = this.items[i].weight;
            this.currentItem = i;
            let position = $(`.slot #${i}`).position();
            console.log(position)
            this.modal.posX = position.left + 50;
            this.modal.posY = position.top + 50;

            console.log(position)
            mp.trigger('Inventory_syncItems::CLIENT', JSON.stringify(this.items))
        },
        useItem() {
            let citem = this.currentItem;
            let item = this.items[citem];

            this.modal.active = false;
            console.log(this.items)
            this.items.splice(citem, 1);
            $(`#${citem}`).detach();
            this.updateInventory();
            if ('alt' in window) {
                alt.emit('Inventory_useItem::CLIENT', item);
                alt.emit('Inventory_syncItems::CLIENT', this.items)
            }
        },
        dropItem() {
            this.modal.active = false;
            this.currentItem = 0;
        },
        updateInventory() {
            var $this = this;
            for (let i = 0; i < this.items.length; i++) {
                $(`.slot:nth-child(${this.items[i].slot})`).append(`
                    <div class="item" onClick="clickItem(`+ i + `)" id="` + i + `" style="background-image: url(` + this.items[i].img + `); background-repeat: no-repeat;">
                `)
            }
            // $this.updateDND();
        },
        clickEmpty() {
            if (this.modal.active == true) return this.modal.active = false;
        },
        updateDND() {
            var $this = this;
            $(".slot .item").draggable({ // ВЫБИРАЕМ ЭЛЕМЕНТЫ КОТОРЫЕ БУДЕМ ПЕРЕМЕЩАТЬ
                scroll: false, // ЗАПРЕЩАЕМ ПОЯВЛЕНИЮ SCROLL ВО ВРЕМЯ ПЕРЕМЕЩЕНИЯ
                helper: "clone", // ПРИ ПЕРЕМЕЩЕНИИ СОЗДАЕТ КЛОНА
                cursor: "pointer", // КУРСОР В СТИЛЕ POINTER
                zIndex: 27, // ОТОБРАЖЕНИЕ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА СВЕРХУ  
                // distance: 0,
                drag: function (event, ui) {
                    item_isStackable = $(this).hasClass("stackable");
                },
            });

            $(".slot").droppable({ // Элемент который будет принимать для себя предметы
                accept: ".item", // Принимаемые элементы
                drop: function (event, ui) {  // Функция выполнится при дропе предмета
                    var item = $(this).find(".item");
                    if (item.length == 0) /// Просмотр, есть ли уже какие-либо предметы в выбранном в данный момент слоте инвентаря  //
                    {
                        $this.items[ui.draggable.attr('id')].slot = $(this).attr('id');
                        // mp.trigger('Inventory_syncItems::CLIENT', JSON.stringify($this.items))
                        ui.draggable.detach().appendTo($(this)); // если нет, вставьте предмет в свободный слот ///
                        // console.log($this.items[0])
                    }
                    // else if (ui.draggable.attr('id') == 0) { // если id предметов совпадают
                    //     this.i++;
                    //     ui.draggable.detach();  /// Если предметы совпадают, уничтожьте клона и добавьте + 1 к количеству //
                    //     $(this).children().children().html(this.i)
                    //     return this.i;
                    // }
                    // else if (item_isStackable == true && item.children("item")) {
                    //     ui.draggable.detach(); /// Если да, просто уничтожьте клона //
                    //     ui.draggable.animate(ui.draggable.data().origPosition, "slow");
                    // } else {
                    //     console.log(ui.draggable.attr('id'))
                    //     // в случае , если это не одинаковые предметы, верните элемент в предыдущее положение //
                    //     ui.draggable.animate(ui.draggable.data().origPosition, "slow");
                    //     let idSlot = $(this).attr('id')
                    // }
                }
            });
        }
    },
    mounted() {

        var $this = this;
        // $this.addItem(0, 2)
        // this.addItem(2, 2)
        // $this.updateInventory()

        $(".slot .item").draggable({ // ВЫБИРАЕМ ЭЛЕМЕНТЫ КОТОРЫЕ БУДЕМ ПЕРЕМЕЩАТЬ
            scroll: false, // ЗАПРЕЩАЕМ ПОЯВЛЕНИЮ SCROLL ВО ВРЕМЯ ПЕРЕМЕЩЕНИЯ
            helper: "clone", // ПРИ ПЕРЕМЕЩЕНИИ СОЗДАЕТ КЛОНА
            cursor: "pointer", // КУРСОР В СТИЛЕ POINTER
            zIndex: 27, // ОТОБРАЖЕНИЕ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА СВЕРХУ  
            // distance: 0,
            drag: function (event, ui) {
                item_isStackable = $(this).hasClass("stackable");
            },
        });
        $(".slot").droppable({ // Элемент который будет принимать для себя предметы
            accept: ".item", // Принимаемые элементы
            drop: function (event, ui) {  // Функция выполнится при дропе предмета
                var item = $(this).find(".item");
                if (item.length == 0) /// Просмотр, есть ли уже какие-либо предметы в выбранном в данный момент слоте инвентаря  //
                {
                    $this.items[ui.draggable.attr('id')].slot = $(this).attr('id');
                    ui.draggable.detach().appendTo($(this)); // если нет, вставьте предмет в свободный слот ///
                    // console.log($(this))
                    // mp.trigger('Inventory_syncItems::CLIENT', JSON.stringify($this.items))
                }
                // else if (ui.draggable.attr('id') == 0) { // если id предметов совпадают
                //     this.i++;
                //     ui.draggable.detach();  /// Если предметы совпадают, уничтожьте клона и добавьте + 1 к количеству //
                //     $(this).children().children().html(this.i)
                //     return this.i;
                // }
                // else if (item_isStackable == true && item.children("item")) {
                //     ui.draggable.detach(); /// Если да, просто уничтожьте клона //
                //     ui.draggable.animate(ui.draggable.data().origPosition, "slow");
                // } else {
                //     console.log(ui.draggable.attr('id'))
                //     // в случае , если это не одинаковые предметы, верните элемент в предыдущее положение //
                //     ui.draggable.animate(ui.draggable.data().origPosition, "slow");
                //     let idSlot = $(this).attr('id')
                // }
            }
        });
        $(".player-skin-slot").droppable({
            accept: '.item',
            drop(event, ui) {
                var item = $(this).find(".item");
                let i = ui.draggable.attr('id');
                if ($(this).attr('id') == 'clothes_cap') {
                    if ($this.items[i].type != 'clothes') return;
                    if ($this.items[i].drawableId != 0) return;
                    ui.draggable.detach().appendTo($(this));
                }
                else if ($(this).attr('id') == 'clothes_top') {
                    if ($this.items[i].componentId != 11) return;
                    ui.draggable.detach().appendTo($(this));
                    $this.playerClothes[0] = $this.items[i];
                    // mp.trigger('Inventory_equipClothes::CLIENT',JSON.stringify($this.playerClothes))
                }
            }
        })

        // 
        mp.events.add('Inventory_open::CEF', (bool, items) => {
            $this.active = bool;
            items = JSON.parse(items)
            // if (items == null || items == 0) return;
            // setTimeout(() => {
            // $this.items = items;
            //     mp.trigger('console_cef',$this.items[0])
            // },500)
            // mp.trigger('console_cef',items)
            $this.updateInventory()
        })

        mp.events.add('Inventory_clearSlots::CEF', () => {
            $(`.slots`).empty();
            for (i = 0; i < 28; i++) {
                $('.slots').append('<div class="slot">');
            }
        })
    }
})

function clickItem(i) {
    Inventory.clickItem(i);
}

// Inventory.active = true;