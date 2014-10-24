(function() {
    'use strict';

    function Ejemplo1() {}

    Ejemplo1.prototype = {

        create: function() {
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
            // this.layer.debug = true;

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

            // enemies
            // abul-abbas
            function setupAbul(enemy) {
                this.game.physics.enable(enemy, Phaser.Physics.ARCADE);
                enemy.animations.add('default', [0, 1, 2, 3, 4, 5], 10, true);
                enemy.body.collideWorldBounds = true;
                enemy.body.setSize(20, 38);
                enemy.anchor.setTo(0.5, 0.5);
                enemy.health = 3;
                enemy.animations.play('default');
            }
            this.abuls = this.game.add.group();
            this.abuls.create(460, 390, 'abul');
            this.abuls.create(720, 180, 'abul');
            this.abuls.create(880, 530, 'abul');
            this.abuls.create(750, 530, 'abul');
            this.abuls.create(1220, 340, 'abul');
            this.abuls.create(1190, 400, 'abul');
            this.abuls.create(1440, 420, 'abul');
            this.abuls.create(1600, 420, 'abul');
            this.abuls.create(1500, 530, 'abul');
            this.abuls.create(1720, 530, 'abul');
            this.abuls.forEach(setupAbul, this);

            // bullets
            function setupBullet(bullet) {
                this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
                bullet.body.collideWorldBounds = false;
                bullet.body.setSize(13, 13);
                bullet.anchor.setTo(0.5, 0.5);
                bullet.lifespan = 3000;
                bullet.body.allowGravity = false;
            }
            this.bullets = this.game.add.group();
            this.bullets.createMultiple(20, 'bullet');
            this.bullets.forEach(setupBullet, this);

            // audio
            this.music = this.game.add.audio('music');
            this.shootSound = this.game.add.audio('shootSound');
            this.music.play('', 0, 1, true);
        },

        update: function() {
            this.game.physics.arcade.collide(this.player, this.layer);
            this.game.physics.arcade.collide(this.abuls, this.layer);
            this.abuls.forEach(function (abul) {
                if (this.game.physics.arcade.distanceBetween(abul, this.player) < 250) {
                    this.game.physics.arcade.accelerateToObject(abul, this.player, 120, 120, 0);
                    // accelerateToObject(objeto, destino, vel, xVelMax, yVelMax)
                } else {
                    abul.body.velocity.x = 0;
                }
            }, this);
            this.game.physics.arcade.collide(this.abuls, this.player, this.playerIsDamaged, null, this);
            this.game.physics.arcade.collide(this.abuls, this.bullets, this.enemyIsDamaged, null, this);
            this.game.physics.arcade.collide(this.layer, this.bullets, this.destroyBullet, null, this);
            // collide(object1, object2, collideCallback, processCallback, callbackContext)

            this.player.body.velocity.x = 0;
            if (this.controls.left.isDown) {
                this.player.body.velocity.x = -150;
                this.player.animations.play('move');
                if (this.player.scale.x > 0) {
                    this.player.scale.x = - 1;
                    this.player.body.setSize(18, 35, 0, 6);
                }
            } else if (this.controls.right.isDown) {
                this.player.body.velocity.x = 150;
                this.player.animations.play('move');
                if (this.player.scale.x < 0) {
                    this.player.scale.x = 1;
                    this.player.body.setSize(18, 35, -6, 6);
                }
            } else if (this.controls.fire.isDown && this.player.alive) {
                this.player.animations.play('fire');
                this.fireBullet(this);
            } else {
                this.player.animations.play('standby');
            }

            if (this.controls.jump.isDown && this.player.body.onFloor()) {
                this.player.body.velocity.y = - 250;
            }
        },
        playerIsDamaged: function (player) {
            player.damage(1);
        },
        enemyIsDamaged: function (enemy, bullet) {
            enemy.damage(1);
            bullet.kill();
        },
        destroyBullet: function (bullet) {
            bullet.kill();
        },
        fireBullet: function (context) {
            if (context.game.time.now > context.player.fireTimer) {
                var bullet = context.bullets.getFirstExists(false);
                if (bullet) {
                    context.shootSound.play('', 0, 0.4, false);
                    bullet.reset(context.player.x, context.player.y - 6);
                    bullet.body.velocity.x = 400 * context.player.scale.x;
                    context.player.fireTimer = context.game.time.now + 200;
                }
            }
        },
        render: function() {
            // this.game.debug.body(this.player);
            // this.game.debug.body(this.abuls.getAt(0));
            // this.game.debug.spriteInfo(this.player, 30, 30);
        }
    };

    window['intro'] = window['intro'] || {};
    window['intro'].Ejemplo1 = Ejemplo1;
}());