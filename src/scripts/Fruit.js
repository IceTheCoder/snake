/**
 * Code for loading the fruit and moving it to a random position when appropiate
 * @class
 */
export default class Fruit {
  /**
   * Constructs the Fruit class.
   * @param {Phaser.Scene} scene - The main game scene.
   * @param {number} tileSize - The size of one tile.
   * @param {number} gridWidth - The width of the grid, expressed by number of tiles.
   * @param {number} gridHeeight - The height of the grid, expressed by number of tiles.
   * @param {Snake} snake - The snake object.
   */
  constructor(scene, tileSize, gridWidth, gridHeight, snake) {
    /** @type {Phaser.Scene} */
    this.scene = scene;
    /** @type {number} */
    this.TILE_SIZE = tileSize;
    /** @type {number} */
    this.GRID_WIDTH = gridWidth;
    /** @type {number} */
    this.GRID_HEIGHT = gridHeight;

    /** @type {Snake} */
    this.snake = snake;

    /** @type {Fruit|null} */
    this.fruit = null;

    /** @type {number|null} */
    this.fruitX = null;
    /** @type {number|null} */
    this.fruitY = null;
  }

  /**
   * Preloads the fruit image.
   */
  preload() {
    this.scene.load.image("fruit", "assets/fruit.png");
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

  /**
   * Get a random integer from 1 to max.
   * @param {number} max - The maximum value of the generated integer.
   * @returns {number}
   */
  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  /**
   * Destroy the fruit and place it in a random position that's not occupied by the snake.
   */
  randomPosition() {
    if (this.fruit) {
      this.fruit.destroy();
    }

    let validPosition = false;
    while (!validPosition) {
      this.fruitX = this.getRandomInt(this.GRID_WIDTH) * this.TILE_SIZE + this.TILE_SIZE / 2;
      this.fruitY = this.getRandomInt(this.GRID_HEIGHT) * this.TILE_SIZE + this.TILE_SIZE / 2;
      
      // Check if the new fruit position coincides with any of the snake body positions
      const snakePositions = this.snake.getSnakePositions();
      validPosition = !snakePositions.some(pos => pos[0] === this.fruitX && pos[1] === this.fruitY);
    }

    this.fruit = this.scene.add.image(this.fruitX, this.fruitY, "fruit");
    this.fruit.setDisplaySize(this.TILE_SIZE, this.TILE_SIZE);
  }

  /**
   * Place the fruit in a random position when the game starts.
   */
  create() {
    this.randomPosition();
  }

  // Getter methods
  /**
   * Returns the fruit X.
   * @returns {number}
   */
  getFruitX() {
    return this.fruitX;
  }

  /**
   * Returns the fruit Y.
   * @returns {number}
   */
  getFruitY() {
    return this.fruitY;
  }
}
