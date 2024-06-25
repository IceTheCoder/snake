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

    this.fruit = null;

    this.fruitX = null;
    this.fruitY = null;
  }

  preload() {
    this.scene.load.image("fruit", "assets/fruit.png");
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

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

  create() {
    this.randomPosition();
  }

  // Getter methods
  getFruitX() {
    return this.fruitX;
  }

  getFruitY() {
    return this.fruitY;
  }
}
