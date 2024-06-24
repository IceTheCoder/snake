import SnakeBody from "./SnakeBody.js";
import { Swipe } from '../scripts/Swipe.js';

export default class Snake {
  constructor(scene, tileSize, gridWidth, gridHeight, timeBetweenEachMove) {
    this.scene = scene;
    this.TILE_SIZE = tileSize;
    this.GRID_WIDTH = gridWidth;
    this.GRID_HEIGHT = gridHeight;
    this.timeBetweenEachMove = timeBetweenEachMove;

    this.direction = 0;
    this.canChangeDirection = true;

    this.initialSnakeX = Math.floor(this.GRID_WIDTH / 2) * this.TILE_SIZE + this.TILE_SIZE / 2;
    this.initialSnakeY = Math.floor(this.GRID_HEIGHT / 2) * this.TILE_SIZE + this.TILE_SIZE / 2;

    this.snakeX = null;
    this.snakeY = null;

    this.snake = null; // Placeholder for the snake image

    // Snake growing variables
    this.snakeLength = 1;
    this.snakePositions = [];
    this.snakeBodyImages = [];
  }

  preload() {
    this.scene.load.image("snake", "assets/snake.png");
  }

  create() {
    this.snakeX = this.initialSnakeX;
    this.snakeY = this.initialSnakeY;
    this.snake = this.scene.add.image(this.snakeX, this.snakeY, "snake");
    this.snake.setDisplaySize(this.TILE_SIZE, this.TILE_SIZE);

    this.scene.time.delayedCall(this.timeBetweenEachMove, this.move, [], this);

    // https://www.youtube.com/watch?v=nqLUfoO4TR0
    const swipe = new Swipe(this.scene, {
      swipeDetectedCallback: (direction) => {
        switch(direction) {
          case 180:
            if (this.direction !== 0 && this.canChangeDirection) {
              this.changeDirection(180);
            }
            break;
          case 0:
            if (this.direction !== 180 && this.canChangeDirection) {
              this.changeDirection(0);
            }
            break;
          case 90:
            if (this.direction !== 270 && this.canChangeDirection) {
              this.changeDirection(90);
            }
            break;
          case 270:
            if (this.direction !== 90 && this.canChangeDirection) {
              this.changeDirection(270);
            }
            break;
        }
        this.changeDirection(direction);
      } 
    });
  }

  // Arrow keys controls
  update(cursors, wasd) {
    if ((cursors.left.isDown || wasd.left.isDown) && this.direction !== 0 && this.canChangeDirection) {
      this.changeDirection(180);
    } else if ((cursors.right.isDown || wasd.right.isDown) && this.direction !== 180 && this.canChangeDirection) {
      this.changeDirection(0);
    } else if ((cursors.up.isDown || wasd.up.isDown) && this.direction !== 270 && this.canChangeDirection) {
      this.changeDirection(90);
    } else if ((cursors.down.isDown || wasd.down.isDown) && this.direction !== 90 && this.canChangeDirection) {
      this.changeDirection(270);
    }
  }

  setCanChangeDirectionToTrue() {
    this.canChangeDirection = true;
  }

  changeDirection(direction) {
    this.direction = direction;

    // Prevent the player from changing direction again immediately to avoid a quick succession of direction changes.
    // This prevents a 180-degree rotation if the player attempts to change direction twice quickly (e.g., two 90-degree turns).
    this.canChangeDirection = false;
    this.scene.time.delayedCall(this.timeBetweenEachMove, this.setCanChangeDirectionToTrue, [], this);
  }

  move() {
    switch (this.direction) {
      case 0:
        this.snakeX += this.TILE_SIZE;
        break;
      case 180:
        this.snakeX -= this.TILE_SIZE;
        break;
      case 90:
        this.snakeY -= this.TILE_SIZE;
        break;
      case 270:
        this.snakeY += this.TILE_SIZE;
        break;
    }

    this.snakeX = Phaser.Math.Wrap(this.snakeX, 0, this.GRID_WIDTH * this.TILE_SIZE);
    this.snakeY = Phaser.Math.Wrap(this.snakeY, 0, this.GRID_HEIGHT * this.TILE_SIZE);

    this.snake.setPosition(this.snakeX, this.snakeY);

    this.snakePositions.push([this.snakeX, this.snakeY]);

    if (this.snakePositions.length > this.snakeLength) {
      this.snakePositions.shift();
    }

    for (let i = 0; i < this.snakePositions.length; i++) {
      this.updateSnakeBodyImage(i, this.snakePositions[i]);
    }

    this.scene.time.delayedCall(this.timeBetweenEachMove, this.move, [], this);
  }

  updateSnakeBodyImage(index, position) {
    let x = position[0];
    let y = position[1];

    if (this.snakeBodyImages[index]) {
      this.snakeBodyImages[index].snakeBody.setPosition(x, y);
    }
  }

  onCollision() {
    this.snakeLength += 1;
    let newBodyImage = new SnakeBody(this.scene, this.TILE_SIZE, "snake", this.snakeX, this.snakeY); // Instantiate new snake body image
    newBodyImage.create();
    this.snakeBodyImages.push(newBodyImage);
  }

  // Getter methods for snakeX and snakeY
  getSnakeX() {
    return this.snakeX;
  }

  getSnakeY() {
    return this.snakeY;
  }

  getSnakePositions() {
    return this.snakePositions;
  }
}
  