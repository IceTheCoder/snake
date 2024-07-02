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
  scene: Scene1,
  parent: "phaser-game",
}

const button = document.getElementById("restart-button");

// Restart game
button.addEventListener("click", () => {
  document.getElementById("game-over").style.display = "none";
  game = new Phaser.Game(config);
  // Enable all game ui elements
  for (const element of document.getElementsByClassName("game-ui")) {
    element.style.display = "flex";
  }
  document.getElementById("score").innerHTML = "Score: 1";
});
