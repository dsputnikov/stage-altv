
var CharSelector = new Vue({
    el: '#charSelector',
    data: {
        active: false,
        char1exist: false,
        char2exist: false,
        char3exist: false,
        characters: [],
        currentCharacter: -1,
    },
    methods: {
        load(data) {
            let dat = JSON.parse(data)
            CharSelector.data = dat;
            this.pl1 = dat.player1.active;
            this.pl2 = dat.player2.active;
            this.pl3 = dat.player3.active;
        },
        selectCharacter(char) {
            if(this.currentCharacter == char) return;
            this.currentCharacter = char;
            alt.emit('Charselector_selectCharacter::CLIENT', this.characters[char])
            $(`.select-block `).css('background', 'linear-gradient(180deg, #1c1e24 0%, rgba(28, 30, 36, 0.51) 100%)');
            $(`#${char}.select-block `).css('background', 'linear-gradient(269.16deg, #60fe8c -4.56%, rgba(67, 205, 106, 0.72) 99.28%)');
        },
        createCharacter() {
            alt.emit('Charselector_createCharacter::CLIENT')
        },
        playButton() {
            alt.emit('Charselector_play::CLIENT',this.characters[this.currentCharacter])
        }
    }
})

if ('alt' in window) {
    alt.on('Charselector_showSelector::CEF', (type, data) => {
        CharSelector.active = type;
        if(data == null) return;
        CharSelector.characters = data;
        if(data[0]) {
            CharSelector.char1exist = true;
            CharSelector.selectCharacter(0)
        }
        if(data[1]) {
            CharSelector.char2exist = true;
        }
        if(data[2]) {
            CharSelector.char3exist = true;
        }
    });
    alt.on('Charselector_hide::CEF', (type) => {
        CharSelector.active = type;
    });
}