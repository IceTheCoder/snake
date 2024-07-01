import { Scene1 } from './scenes/Scene1.js';
import { Scene2 } from './scenes/Scene2.js';

let game;
let timeIntervalToCheckIfCanChangeDirection = 50; // Setting a high value may freeze the game

window.onload = function() {
  game = new Phaser.Game(config);
};

/* Hammer.js */
document.addEventListener('DOMContentLoaded', (event) => {
  const hammer = new Hammer(document.body);

  hammer.get('swipe').set({
    direction: Hammer.DIRECTION_ALL,
    threshold: 0,
    velocity: 0
  });

  hammer.on('swipe', (event) => {
    handleSwipe(event);
  });

  /**
   * Handles swipe gestures and logs the direction of the swipe
   * @param {Object} event - The event object containing details about the swipe gesture.
   */
  function handleSwipe(event) {
    const gameScene = game.scene.getScene('playGame');
    if (!gameScene) return;
    const snakeInstance = gameScene.getSnakeInstance();

    if (!snakeInstance) return;

    function waitUntilCanChangeDirection(direction) {
      console.log("Waiting to be able to change direction... " + direction)
      if (snakeInstance.canChangeDirection) {
        console.log("CAN CHANGE DIRECTION " + direction);
        snakeInstance.changeDirection(direction);
        return;
      } else {
        console.log("CAN'T CHANGE DIRECTION. Waiting... " + direction)
        setTimeout(function() {
          waitUntilCanChangeDirection(direction)
        }, timeIntervalToCheckIfCanChangeDirection);
      }
    }

    switch(event.direction) {
      case Hammer.DIRECTION_UP:
        console.log('%c Swipe up detected', 'color:red;');
        // Wait until the snake can change direction
        waitUntilCanChangeDirection(90);
        break;
      case Hammer.DIRECTION_DOWN:
        console.log('%c Swipe down detected', 'color:yellow;');
        waitUntilCanChangeDirection(270);
        break;
      case Hammer.DIRECTION_LEFT:
        console.log('%c Swipe left detected', 'color:green;');
        waitUntilCanChangeDirection(180);
        break;
      case Hammer.DIRECTION_RIGHT:
        console.log('%c Swipe right detected', 'color:blue;');
        waitUntilCanChangeDirection(0);
        break;
      default:
        break;
    }
  }
});

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 800,
  backgroundColor: 0x000000,
  scene: [Scene1]
}

const button = document.getElementById("restart-button");

button.addEventListener("click", () => {
  console.log("restarting game");
});
