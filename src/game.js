import { Scene1 } from './scenes/Scene1.js';
import SceneManager from './scripts/SceneManager.js';
import { Scene2 } from './scenes/Scene2.js';

let game;

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 800,
  backgroundColor: 0x000000,
  scene: Scene1,
  parent: "phaser-game",
}

const restartButton = document.getElementById("restart-button");
const play = document.getElementById("play");

// Restart game
restartButton.addEventListener("click", () => {
  loadScene(1);
  game = new Phaser.Game(config);

  document.getElementById("score").innerHTML = "Score: 1";

  // Reset all new high score stuff
  document.getElementById("game-over-h1").innerHTML = "Game Over";
  document.getElementById("game-over-h1").style.color = "#B1DDF1";
});

// Play game
play.addEventListener("click", () =>{
  SceneManager.loadScene(1);
  console.log("game started");
  game = new Phaser.Game(config);
})