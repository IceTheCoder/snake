import { Scene1 } from './scenes/Scene1.js';
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
  document.getElementById("game-over").style.display = "none";
  game = new Phaser.Game(config);
  // Enable all game ui elements
  for (const element of document.getElementsByClassName("game-ui")) {
    element.style.display = "flex";
  }
  document.getElementById("score").innerHTML = "Score: 1";

  // Reset all new high score stuff
  document.getElementById("game-over-h1").innerHTML = "Game Over";
  document.getElementById("game-over-h1").style.color = "#B1DDF1";
});

// Play game
play.addEventListener("click", () =>{
  document.getElementById("main-menu").style.display = "none";
  document.getElementById("main-menu").style.height = "0px";

  document.getElementById("game").style.display = "flex";
  document.getElementById("phaser-game").style.display = "flex";
  document.getElementsByTagName("footer")[0].style.display = "flex";
  console.log("game started");
  game = new Phaser.Game(config);

})