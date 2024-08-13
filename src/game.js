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

// BUTTONS functions
const restartButton = document.getElementById("restart-button");
const play = document.getElementById("play");
const mainMenuButtons = document.getElementsByClassName("main-menu-button");
const settingsButton = document.getElementById("settings-button");
const creditsButton = document.getElementById("credits-button");

// Restart game
restartButton.addEventListener("click", () => {
  SceneManager.loadScene(1);
  game = new Phaser.Game(config);

  document.getElementById("score").innerHTML = "Score: 1";

  // Reset all new high score stuff
  document.getElementById("game-over-h1").innerHTML = "Game Over";
  document.getElementById("game-over-h1").style.color = "#B1DDF1";
});

// Play game
play.addEventListener("click", () => {
  SceneManager.loadScene(1);
  game = new Phaser.Game(config);
})

// Main menu button
for (const button of mainMenuButtons) {
  button.addEventListener("click", () => {
    SceneManager.loadScene(0);
  })
}

// Settings button
settingsButton.addEventListener("click", () => {
  SceneManager.loadScene(3);
})

// Credits button
creditsButton.addEventListener("click", () => {
  SceneManager.loadScene(4);
  const texts = Array.from(document.getElementsByClassName("text"));
  texts.forEach((text) => {
    text.style.display = "inline";
  })
})
