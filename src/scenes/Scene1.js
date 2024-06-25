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
    this.wasd = this.input.keyboard.addKeys(
      {up:Phaser.Input.Keyboard.KeyCodes.W,
      down:Phaser.Input.Keyboard.KeyCodes.S,
      left:Phaser.Input.Keyboard.KeyCodes.A,
      right:Phaser.Input.Keyboard.KeyCodes.D});

    /** @type {Phaser.Input.Keyboard.CursorKeys} */
    this.cursors = this.input.keyboard.createCursorKeys(); // Define input keys

    this.fruit.create();
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
    this.scene.start("gameOver", { snakeLength: this.snake.snakeLength });
  }
}

window.Scene1 = Scene1;
