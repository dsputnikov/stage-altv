
import * as alt from 'alt';

Object.defineProperty(alt.Player.prototype, "id", {
    get: function () {
        return this.getSyncedMeta("id");
    },
    set: function (id) {
        this.setSyncedMeta("id", id);
    },
});


Object.defineProperty(alt.Player.prototype, "admin", {
    get: function () {
        return this.getSyncedMeta("admin");
    },
    set: function (lvl) {
        this.setSyncedMeta("admin", lvl);
    },
});

// Object.defineProperty(alt.Player.prototype, "logged", {
//     get: function () {
//         return this.getSyncedMeta("logged");
//     },
//     set: function (bool) {
//         this.setSyncedMeta("logged", bool);
//     },
// });

Object.defineProperty(alt.Player.prototype, "nick", {
    get: function () {
        return this.getSyncedMeta("nick");
    },
    set: function (nick) {
        this.setSyncedMeta("nick", nick);
    },
});