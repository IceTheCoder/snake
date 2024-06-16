import Snake from './Snake.js';
import Fruit from './Fruit.js';
import Collision from './Collision.js';

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

    this.fruit = new Fruit(this, this.TILE_SIZE, this.GRID_WIDTH, this.GRID_HEIGHT,);
    this.fruit.preload();

    this.collision = new Collision(this, this.snake, this.fruit);
  }

  create() {
    this.snake.create();
    this.cursors = this.input.keyboard.createCursorKeys(); // Define input keys

    this.fruit.create();
  }

  update() {
    this.snake.update(this.cursors);

    this.collision.update();
  }
}

window.Scene1 = Scene1;
