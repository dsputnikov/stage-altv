Vue.directive('focus', {
    inserted: function (el) {
        // Focus the element
        el.focus();
    },
    update: function (el, binding) {
        var value = binding.value;
        if (value) {
            Vue.nextTick(function () {
                el.focus();
            });
        }
    },
});

var Chat = new Vue({
    el: '#HUD_chat',
    data: {
        active: false,
        message: '',
        messages: [],
        historyMessages: [],
        historyCount: 0,
        open: false,
        border_color1: '2px solid #2C80EF',
        border_color2: '0',
        border_color3: '0',
        border_color4: '0',
    },
    mounted() {
        var $this = this;
        $(document).keyup(function (key) {
            if (key.keyCode === 38 && $this.open == true) {
                if ($this.historyCount == 0) return;
                $this.message = $this.historyMessages[--$this.historyCount];
            } else if (key.keyCode === 40 && $this.open == true) {
                $this.message =
                    $this.historyCount == $this.historyMessages.length
                        ? ''
                        : $this.historyMessages[++$this.historyCount];
            }
        });
    },
    methods: {
        closeChat() {
            this.open = false;
            this.message = '';
            // alt.emit('toggleControl',true)
        },
        sendMessage() {
            // //mp.trigger('HUD_freezePlayer::CLIENT', false)
            var message = this.message;
            alt.emit('toggleControl', true);
            if (
                /^[а-яА-ЯёЁa-zA-Z0-9/\,.:)(-*^$#@!<>+-=?_ ]+$/.test(message) &&
                /[а-яА-ЯёЁa-zA-Z0-9/\,.:)(-*^$#@!<>+-=?_]/.test(message)
            ) {
                alt.emit('Hud_sendMessage::CEF', message.replace(/<\/?[^>]+>/g, ''));
                this.historyMessages.push(message);
            }
            this.closeChat();
        },
        acceptMessage(message) {
            var newMessage = '';
            for (let i = 0; i < message.length; i++) {
                var colorCheck = `${message[i]}${message[i + 1]}`;

                if (colorCheck === '!{') {
                    var sub = message.slice(i + 2, -1);
                    var color = '';
                    for (val of sub) {
                        if (val == '}') break;
                        else color += val;
                    }
                    i += 2 + color.length;
                    newMessage += `<span style='color: ${color}'>`;
                } else if (colorCheck === '}!') {
                    newMessage += '</span>';
                } else newMessage += message[i];
            }
            this.messages.push(newMessage);
        },
    },
    watch: {
        historyMessages() {
            this.historyCount = this.historyMessages.length;
        },
        messages() {
            setTimeout(() => {
                $('.messages').scrollTop($('.messages')[0].scrollHeight);
            }, 10);
        },
    },
});

if ('alt' in window) {
    alt.on('HUD_showHideChat::CEF', (bool) => {
        Chat.active = bool;
        Chat.message = '';
    });
    alt.on('HUD_openChat::CEF', (bool) => {
        Chat.open = bool;
    });
    alt.on('Chat_sendMessage::CEF', (text) => {
        Chat.acceptMessage(text);
    });
    alt.on('Hud_addString::CEF', (text) => {
        Chat.acceptMessage(text);
    });
}
