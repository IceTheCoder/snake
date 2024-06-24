import Snake from '../scripts/Snake.js';
import Fruit from '../scripts/Fruit.js';
import Collision from '../scripts/Collision.js';

export class Scene1 extends Phaser.Scene {
  constructor() {
    super("playGame");

    this.TILE_SIZE = 80;
    this.GRID_WIDTH = 10;
    this.GRID_HEIGHT = 10;  
    this.timeBetweenEachMove = 200; // Adjust as necessary.

    this.snake = null;
  }

  preload() {
    this.snake = new Snake(this, this.TILE_SIZE, this.GRID_WIDTH, this.GRID_HEIGHT, this.timeBetweenEachMove);
    this.snake.preload();

    this.fruit = new Fruit(this, this.TILE_SIZE, this.GRID_WIDTH, this.GRID_HEIGHT, this.snake);
    this.fruit.preload();

    this.collision = new Collision(this, this.snake, this.fruit);
  }

  create() {
    this.snake.create();

    // https://www.html5gamedevs.com/topic/40607-how-to-replace-arrow-keys-with-wasd-movement/
    // cornstipated's solution worked.
    this.wasd = this.input.keyboard.addKeys(
      {up:Phaser.Input.Keyboard.KeyCodes.W,
      down:Phaser.Input.Keyboard.KeyCodes.S,
      left:Phaser.Input.Keyboard.KeyCodes.A,
      right:Phaser.Input.Keyboard.KeyCodes.D});

    this.cursors = this.input.keyboard.createCursorKeys(); // Define input keys

    this.fruit.create();
  }

  update() {
    this.snake.update(this.cursors, this.wasd);

    this.collision.update();
  }

  gameOver() {
    this.scene.start("gameOver", { snakeLength: this.snake.snakeLength });
  }
}

window.Scene1 = Scene1;