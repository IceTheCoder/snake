/**
 * Code for detecting collision and triggering functions associated with collision.
 * @class
 */
export default class Collision {
  /**
   * Constructs the Collision class.
   * @param {Phaser.Scene} scene - The main game scene.
   * @param {Snake} snake - The snake object.
   * @param {Fruit} fruit - The fruit object.
   */
  constructor(scene, snake, fruit) {

    /** @type {Phaser.Scene} */
    this.scene = scene;
    /** @type {Snake} */
    this.snake = snake;
    /** @type {Fruit} */
    this.fruit = fruit;
  }

  /**
   * Constantly check if the snake collides either with the fruit or with itself and trigger appropiate functions.
   */
  update() {
    if (this.snake.getSnakeX() === this.fruit.getFruitX() && 
    this.snake.getSnakeY() === this.fruit.getFruitY()) {
      this.fruitCollision();
    }

    let snakePositions = this.snake.getSnakePositions();

    snakePositions.forEach((position, i) => {
      // The last element in the snakePositions array always has the coordinates of the
      // snake head, so we ignore it.
      if (i === snakePositions.length - 1) return;
      if (this.snake.getSnakeX() === position[0] && this.snake.getSnakeY() === position[1]) {        
        this.snakeCollision();
      }
    })
  }

  /**
   * Trigger functions to move the fruit to a random position and to increase the snake's length.
   */
  fruitCollision() {
    this.fruit.randomPosition();
    this.snake.onCollision();
  }

  /**
   * Trigger the game over logic after collision between the snake and itself.
   */
  snakeCollision() {
    this.scene.gameOver();
  }
}
