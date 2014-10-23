(function () {
    'use strict';
    function Ejemplo1() {}

    Ejemplo1.prototype = {

        create: function () {
            var x = this.game.width / 2,
                y = this.game.height / 2;

            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = 250;

            this.bg = this.game.add.tileSprite(0, 0, 640, 480, 'sky');
            this.bg.fixedToCamera = true;

            // map
            this.map = this.game.add.tilemap('tilemap1');
            this.map.addTilesetImage('tiles');
            this.map.setCollisionBetween(0, this.map.tiles.length);
            this.layer = this.map.createLayer('Tiles');
            this.layer.resizeWorld();

            function setupPlayer(player) {
                player.anchor.setTo(0.5, 0.5);
                player.body.collideWorldBounds = true;
                player.animations.add('standby', [0, 1, 2, 1], 6, true);
                player.animations.add('move', [3, 4, 5, 6, 7, 8, 9, 10, 11], 18, true);
                player.animations.add('attack', [12, 13, 14, 15], 12, true);
                player.animations.add('jump', [16, 17, 18, 19], 12, true);
                player.scale.setTo(2, 2);
                player.body.setSize(55, 50);
            }

            this.player = this.game.add.sprite(x, y, 'marco');
            this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
            setupPlayer(this.player);
            this.player.animations.play('standby');
            this.game.camera.follow(this.player);
        },

        update: function () {
            game.physics.arcade.collide(this.player, this.layer);
        }
    };

    window['intro'] = window['intro'] || {};
    window['intro'].Ejemplo1 = Ejemplo1;
}());
