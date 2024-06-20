export default class Collision {
  constructor(scene, snake, fruit) {
    this.scene = scene;
    this.snake = snake;
    this.fruit = fruit;
  }

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

  fruitCollision() {
    this.fruit.randomPosition();
    this.snake.onCollision();
  }

  snakeCollision() {
    this.scene.gameOver();
  }
}