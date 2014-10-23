(function() {
    'use strict';

    function Ejemplo1() {}

    Ejemplo1.prototype = {

        create: function() {
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
            this.layer.debug = true;

            // player
            function setupPlayer(player) {
                player.animations.add('standby', [0, 1, 2, 1], 6, true);
                player.animations.add('move', [3, 4, 5, 6, 7, 8, 9, 10, 11], 18, true);
                player.animations.add('attack', [12, 13, 14, 15], 12, true);
                player.body.collideWorldBounds = true;
                player.body.setSize(18, 35, 0, 12);
                player.anchor.setTo(0.5, 0.5);
                player.health = 3;
                player.jumpTimer = 0;
                player.body.bounce.y = 0.2;
            }

            this.player = this.game.add.sprite(100, 400, 'marco');
            this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
            setupPlayer(this.player);
            this.game.camera.follow(this.player);

            // controls
            function createControls(gameContext) {
                gameContext.controls = {
                    'left': gameContext.game.input.keyboard.addKey(65), //A
                    'right': gameContext.game.input.keyboard.addKey(68), //D
                    'down': gameContext.game.input.keyboard.addKey(83), //S
                    'up': gameContext.game.input.keyboard.addKey(87), //W
                    'fire': gameContext.game.input.keyboard.addKey(75), // K
                    'jump': gameContext.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
                };
            }
            createControls(this);
        },

        update: function() {
            this.game.physics.arcade.collide(this.player, this.layer);

            // this.player.body.velocity.x = 0;

            // if (this.controls.left.isDown) {
            //     this.player.body.velocity.x = -150;
            //     this.player.animations.play('move');
            //     if (this.player.scale.x > 0) {
            //         this.player.scale.x = - 2;
            //     }
            // } else if (this.controls.right.isDown) {
            //     this.player.body.velocity.x = 150;
            //     this.player.animations.play('move');
            //     if (this.player.scale.x < 0) {
            //         this.player.scale.x = 2;
            //     }
            // } else {
            //     this.player.animations.play('standby');
            // }


            if (this.controls.jump.isDown && this.player.body.onFloor() && this.game.time.now > this.player.jumpTimer) {
                this.player.body.velocity.y = - 250;
                this.player.jumpTimer = this.game.time.now + 750;
            }
        },
        render: function() {
            this.game.debug.body(this.player);
            this.game.debug.spriteInfo(this.player, 30, 30);
        }
    };

    window['intro'] = window['intro'] || {};
    window['intro'].Ejemplo1 = Ejemplo1;
}());