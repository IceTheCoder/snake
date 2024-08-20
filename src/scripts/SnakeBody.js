/**
 * Code for generating a snake body image
 * @class
 */
export default class SnakeBody {
  /**
   * Constructs the SnakeBody class.
   * @param {Phaser.Scene} scene - The main game scene.
   * @param {number} tileSize - The size of one tile.
   * @param {string} imageName - The name of the image.
   * @param {number} snakeX - The snake's X where the body image will be generated.
   * @param {number} snakeY - The snake's X where the body image will be generated.
   */
  constructor(scene, tileSize, imageName, snakeX, snakeY) {
    /** @type {Phaser.Scene} */
    this.scene = scene;
    /** @type {number} */
    this.TILE_SIZE = tileSize;
    /** @type {string} */
    this.imageName = imageName;
    /** @type {number} */
    this.snakeX = snakeX;
    /** @type {number} */
    this.snakeY = snakeY;

    /** @type {Phaser.GameObjects.Image|null} */
    this.snakeBody = null;
  }

  /**
   * Creates the snake body image
   */
  create() {
    this.snakeBody = this.scene.add.image(this.snakeX, this.snakeY, this.imageName);
    this.snakeBody.setDisplaySize(this.TILE_SIZE, this.TILE_SIZE);
    this.snakeBody.visible = false;
  }

  /**
   * Sets a new position for the snake body image.
   * @param {number} x - The new X position for the snake body image.
   * @param {number} y - The new Y position for the snake body image.
   */
  setPosition(x, y) {
    this.snakeBody.setPosition(x, y);
  }
}