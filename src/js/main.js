window.onload = function () {
  'use strict';

  var game
    , ns = window['intro'];

  game = new Phaser.Game(640, 480, Phaser.CANVAS, 'intro-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('game', ns.Game);

  game.state.add('step0', ns.Step0);
  game.state.add('step1', ns.Step1);
  game.state.add('step2', ns.Step2);
  game.state.add('step3', ns.Step3);
  game.state.add('step4', ns.Step4);
  game.state.add('step5', ns.Step5);
  game.state.add('step6', ns.Step6);
  game.state.add('step7', ns.Step7);
  game.state.add('ejemplo1', ns.Ejemplo1);

  game.state.start('boot');
};
