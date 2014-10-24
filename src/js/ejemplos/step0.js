(function () {
    'use strict';
    function Step0() {}

    Step0.prototype = {

        create: function () {
            var x = this.game.width / 2,
                y = this.game.height / 2,
                textStyle = {
                    'align': 'center',
                    'fill': '#FABADA'
                };

            var miTexto = this.game.add.text(x, y, 'Hola juego', textStyle);
            miTexto.anchor.setTo(0.5, 0.5);
        },

        update: function () {}
    };

    window['intro'] = window['intro'] || {};
    window['intro'].Step0 = Step0;
}());