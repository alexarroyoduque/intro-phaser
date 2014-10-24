(function () {
    'use strict';
    function Step2() {}

    Step2.prototype = {

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

            // player
            function setupPlayer(player) {
                player.animations.add('standby', [0, 1, 2, 1], 6, true);
                player.animations.add('move', [3, 4, 5, 6, 7, 8, 9, 10, 11], 18, true);
                player.animations.add('fire', [12, 13, 14, 15], 12, true);
                player.body.collideWorldBounds = true;
                player.body.setSize(18, 35, -6, 6);
                player.anchor.setTo(0.3, 0.5);
                player.fireTimer = 0;
                player.health = 1;
            }


            this.player = this.game.add.sprite(100, 20, 'marco');
            this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
            setupPlayer(this.player);
            this.game.camera.follow(this.player);
        },
        update: function () {
            this.game.physics.arcade.collide(this.player, this.layer);
        },
        render: function () {
            this.game.debug.body(this.player);
            this.game.debug.spriteInfo(this.player, 30, 30);
        }
    };

    window['intro'] = window['intro'] || {};
    window['intro'].Step2 = Step2;
}());