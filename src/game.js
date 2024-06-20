import { Scene1 } from './scenes/Scene1.js';
import { Scene2 } from './scenes/Scene2.js';

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
