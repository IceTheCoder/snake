import { Scene1 } from './scenes/Scene1.js';
import { Scene2 } from './scenes/Scene2.js';

let game;

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

    switch(event.direction) {
      case Hammer.DIRECTION_UP:
        console.log('Swipe up detected');
        if (snakeInstance.direction !== 270 && snakeInstance.canChangeDirection) {
          snakeInstance.changeDirection(90);
        }
        break;
      case Hammer.DIRECTION_DOWN:
        console.log('Swipe down detected');
        if (snakeInstance.direction !== 90 && snakeInstance.canChangeDirection) {
          snakeInstance.changeDirection(270);
        }
        break;
      case Hammer.DIRECTION_LEFT:
        console.log('Swipe left detected');
        if (snakeInstance.direction !== 0 && snakeInstance.canChangeDirection) {
          snakeInstance.changeDirection(180);
        }
        break;
      case Hammer.DIRECTION_RIGHT:
        console.log('Swipe right detected');
        if (snakeInstance.direction !== 180 && snakeInstance.canChangeDirection) {
          snakeInstance.changeDirection(0);
        }
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
