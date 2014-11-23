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

            // buttons
            this.buttons = this.game.add.group();
            this.buttons.add(this.game.add.button(20, 20, 'button2', function () {
                var stateName = this[1],
                    context = this[0];
                context.game.state.start(stateName);
            }, [this, 'menu'], 2, 0, 2));

            this.buttons.getAt(0).fixedToCamera = true;
        },

        update: function () {}
    };

    window['intro'] = window['intro'] || {};
    window['intro'].Step0 = Step0;
}());