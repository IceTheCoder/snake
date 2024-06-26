import { Scene1 } from './scenes/Scene1.js';
import { Scene2 } from './scenes/Scene2.js';

let game;


window.onload = function() {
  game = new Phaser.Game(config);
};

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 800,
  backgroundColor: 0x000000,
  scene: [Scene1]
}

const button = document.getElementById("restart-button");

button.addEventListener("click", () => {
  document.getElementById("game-over").style.display = "none";
  game = new Phaser.Game(config);
});
