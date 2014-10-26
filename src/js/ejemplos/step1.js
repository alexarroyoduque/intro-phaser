(function () {
    'use strict';
    function Step1() {}

    Step1.prototype = {

        create: function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = 485;

            this.bg = this.game.add.tileSprite(0, 0, 640, 480, 'sky');
            this.bg.fixedToCamera = true;

            // map
            this.map = this.game.add.tilemap('tilemap1');
            this.map.addTilesetImage('tiles');
            this.map.setCollisionBetween(0, this.map.tiles.length);
            this.layer = this.map.createLayer('Tiles');
            this.layer.resizeWorld();

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
    window['intro'].Step1 = Step1;
}());