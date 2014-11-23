(function() {
    'use strict';

    function Menu() {
        this.titleTxt = null;
        this.startTxt = null;
    }

    Menu.prototype = {

        create: function() {
            var x = this.game.width / 2,
                y = this.game.height / 2;


            this.titleTxt = this.add.bitmapText(x, y, 'minecraftia', 'Example Game');
            this.titleTxt.align = 'center';
            this.titleTxt.x = this.game.width / 2 - this.titleTxt.textWidth / 2;

            y = y + this.titleTxt.height + 5;
            this.startTxt = this.add.bitmapText(x, y, 'minecraftia', 'START');
            this.startTxt.align = 'center';
            this.startTxt.x = this.game.width / 2 - this.startTxt.textWidth / 2;

            this.input.onDown.add(this.onDown, this);
            var textStyle = {
                font: '18px Arial',
                align: 'center',
                fill: '#000'
            };

            function setupButton(button) {
                button.anchor.setTo(0.5, 0.5);
                button.scale.setTo(0.7, 0.7);
            }

            function setupText(textButton) {
                textButton.anchor.setTo(0.5, 0.5);
            }

            this.game.sound.stopAll();
            // Botones del menu
            this.buttons = this.game.add.group();
            this.texts = this.game.add.group();

            this.buttons.add(this.game.add.button(100, 50, 'button', this.goTo, [this, 'step0'], 1, 0, 1));
            this.texts.add(this.game.add.text(100, 50, 'Hola juego', textStyle));
            this.buttons.add(this.game.add.button(100, 100, 'button', this.goTo, [this, 'step1'], 1, 0, 1));
            this.texts.add(this.game.add.text(100, 100, 'Escenario', textStyle));
            this.buttons.add(this.game.add.button(100, 150, 'button', this.goTo, [this, 'step2'], 1, 0, 1));
            this.texts.add(this.game.add.text(100, 150, 'Jugador', textStyle));
            this.buttons.add(this.game.add.button(100, 200, 'button', this.goTo, [this, 'step3'], 1, 0, 1));
            this.texts.add(this.game.add.text(100, 200, 'Movimiento', textStyle));
            this.buttons.add(this.game.add.button(100, 250, 'button', this.goTo, [this, 'step4'], 1, 0, 1));
            this.texts.add(this.game.add.text(100, 250, 'Enemigos', textStyle));
            this.buttons.add(this.game.add.button(100, 300, 'button', this.goTo, [this, 'step5'], 1, 0, 1));
            this.texts.add(this.game.add.text(100, 300, 'Enemigos atacan', textStyle));
            this.buttons.add(this.game.add.button(100, 350, 'button', this.goTo, [this, 'step6'], 1, 0, 1));
            this.texts.add(this.game.add.text(100, 350, 'Jugador muere', textStyle));
            this.buttons.add(this.game.add.button(100, 400, 'button', this.goTo, [this, 'step7'], 1, 0, 1));
            this.texts.add(this.game.add.text(100, 400, 'Jugador dispara', textStyle));

            this.buttons.add(this.game.add.button(320, 50, 'button', this.goTo, [this, 'demo'], 1, 0, 1));
            this.texts.add(this.game.add.text(320, 50, 'Completo', textStyle));

            this.buttons.forEach(setupButton, this);
            this.texts.forEach(setupText, this);

        },

        update: function() {

        },
        goTo: function() {
            var stateName = this[1],
                context = this[0];
            context.game.state.start(stateName);
        },
        onDown: function() {
            this.game.state.start('game');
        }
    };

    window['intro'] = window['intro'] || {};
    window['intro'].Menu = Menu;

}());