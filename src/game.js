import { Scene1 } from './Scene1.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 800,
  backgroundColor: 0x000000,
  scene: Scene1,
}

window.onload = function() {
  const game = new Phaser.Game(config);
};
