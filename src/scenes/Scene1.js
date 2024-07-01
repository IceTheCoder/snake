import Snake from '../scripts/Snake.js';
import Fruit from '../scripts/Fruit.js';
import Collision from '../scripts/Collision.js';

/**
 * Represents the main game scene.
 * @class
 * @extends Phaser.Scene
 */
export class Scene1 extends Phaser.Scene {
  /**
   * Constructs the Scene1 class.
   */
  constructor() {
    super("playGame");

    /** @type {number} */
    this.TILE_SIZE = 80;
    /** @type {number} */
    this.GRID_WIDTH = 10;
    /** @type {number} */
    this.GRID_HEIGHT = 10;
    /** @type {number} */
    this.timeBetweenEachMove = 200; // Adjust as necessary.

    /** @type {Snake|null} */
    this.snake = null;
  }

  /**
   * Preload assets for the game.
   * @method
   */
  preload() {
    this.snake = new Snake(this, this.TILE_SIZE, this.GRID_WIDTH, this.GRID_HEIGHT, this.timeBetweenEachMove);
    this.snake.preload();

    this.fruit = new Fruit(this, this.TILE_SIZE, this.GRID_WIDTH, this.GRID_HEIGHT, this.snake);
    this.fruit.preload();

    this.collision = new Collision(this, this.snake, this.fruit);
  }

  /**
   * Create game objects and initialize game settings.
   */
  create() {
    this.snake.create();

    // https://www.html5gamedevs.com/topic/40607-how-to-replace-arrow-keys-with-wasd-movement/
    // cornstipated's solution worked.
    /** @type {Object} */
    this.wasd = this.input.keyboard.addKeys(
      {up:Phaser.Input.Keyboard.KeyCodes.W,
      down:Phaser.Input.Keyboard.KeyCodes.S,
      left:Phaser.Input.Keyboard.KeyCodes.A,
      right:Phaser.Input.Keyboard.KeyCodes.D});

    /** @type {Phaser.Input.Keyboard.CursorKeys} */
    this.cursors = this.input.keyboard.createCursorKeys(); // Define input keys

    this.fruit.create();

    /* Hammer.js */
    let hammer = new Hammer(document.body);

    hammer.get('swipe').set({
      direction: Hammer.DIRECTION_ALL,
      threshold: 0,
      velocity: 0
    });

    hammer.on('swipe', (event) => {
      handleSwipe(event);
    });


    const snakeInstance = this.snake;
    
    /**
     * Handles swipe gestures and logs the direction of the swipe
     * @param {Object} event - The event object containing details about the swipe gesture.
     */
    function handleSwipe(event) {

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
  }

  /**
   * Update the game state.
   * @method
   * @param {Phaser.Input.Keyboard.CursorKeys} cursors - Cursor keys for controlling the snake.
   * @param {Object} wasd - WASD keys for controlling the snake.
   */
  update() {
    this.snake.update(this.cursors, this.wasd);

    this.collision.update();
  }

  /**
   * Handle the game over state.
   */
  gameOver() {
    // https://stackoverflow.com/questions/59448975/how-to-stop-a-phaser-game-and-remove-it-from-a-page
    let snakeLength = this.snake.snakeLength;
    this.game.destroy(true, false);

    function loadGameOver() {
      // I'm so happy document works in this script :)
      document.getElementById("score").innerHTML = `Score: ${snakeLength}`;
      document.getElementById("game-over").style.display = "flex";
    }
    setTimeout(loadGameOver, 50);
  }

  /**
   * Returns the current snake instance
   * @returns {Snake}
   */
  getSnakeInstance() {
    return this.snake;
  }
}

window.Scene1 = Scene1;
