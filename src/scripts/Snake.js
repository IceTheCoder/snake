import SnakeBody from "./SnakeBody.js";
/* import { Swipe } from "./Swipe.js"; */

/**
 * Generate the snake, handle its control, increase its length etc.
 * @param {Phaser.Scene} scene - The main game scene.
 * @param {number} tileSize - The size of one tile.
 * @param {number} gridWidth - The width of the grid, expressed by number of tiles.
 * @param {number} gridHeight - The height of the grid, expressed by number of tiles.
 * @param {number} timeBetweenEachMove - The time (in milliseconds) between each snake movement by 1 tile.
 */
export default class Snake {
  /**
   * Generate the snake, handle its control, increase its length etc.
   * @param {Phaser.Scene} scene - The main game scene.
   * @param {number} tileSize - The size of one tile.
   * @param {number} gridWidth - The width of the grid, expressed by number of tiles.
   * @param {number} gridHeight - The height of the grid, expressed by numer of tiles.
   * @param {number} timeBetweenEachMove - The time (in milliseconds) between each snake movement by 1 tile.
   */
  constructor(scene, tileSize, gridWidth, gridHeight, timeBetweenEachMove) {
    /** @type {Phaser.scene} */
    this.scene = scene;
    /** @type {number} */
    this.TILE_SIZE = tileSize;
    /** @type {number} */
    this.GRID_WIDTH = gridWidth;
    /** @type {number} */
    this.GRID_HEIGHT = gridHeight;
    /** @type {number} */
    this.timeBetweenEachMove = 1500;

    /** @type {number} */
    this.direction = 0;
    /** @type {number|null} */
    this.cachedDirection = null;
    /** @type {boolean} */
    this.canChangeDirection = true;

    /** @type {number} */
    this.initialSnakeX = Math.floor(this.GRID_WIDTH / 2) * this.TILE_SIZE + this.TILE_SIZE / 2;
    /** @type {number} */
    this.initialSnakeY = Math.floor(this.GRID_HEIGHT / 2) * this.TILE_SIZE + this.TILE_SIZE / 2;

    /** @type {number|null} */
    this.snakeX = null;
    /** @type {number|null} */
    this.snakeY = null;
    /** @type {Array.number} */
    this.storedSnakePosition = [];

    /** @type {Phaser.GameObjects.Image|null} */
    this.snake = null; // Placeholder for the snake image

    // Snake growing variables
    /** @type {number} */
    this.snakeLength = 1;
    /** @type {Array.<Array.<number>>} */
    this.snakePositions = [];
    /** @type {Array.<Phaser.GameObjects.Image>} */
    this.snakeBodyImages = [];
    /** @type {Array.<number>>} */
    this.snakeDirections = [];

    /** @type {number} */
    this.highScore;
    

    /** @type {Array.<Array.<number>>} */
    this.turnImagePositions = [];

    /** @type {Array.Phaser.GameObjects.Image} */
    this.turnImages = [];

    // We use this variable to stop the snake tween when a fruit is eaten, so the tail remains behind,
    // lengthening the snake
    /** @type {Phaser.GameObjects.tweens|null} */
    this.snakeTween = null;

    // Only allow turning and show body images after the first animation is done
    /** @type {boolean} */
    this.firstAnimationDone = false;
  }

  /**
   * Load the snake image.
   */
  preload() {
    this.scene.load.image("snake", "assets/snake.png");
    this.scene.load.image("snake-body", "assets/snake-body.png");
    this.scene.load.image("1", "assets/1.png");
    this.scene.load.image("2", "assets/2.png");
    this.scene.load.image("3", "assets/3.png");
    this.scene.load.image("4", "assets/4.png");
    this.scene.load.image("snake-tail", "assets/snake-tail.png");
    this.scene.load.image("f", "assets/snake-body-f.png");
  }

  /**
   * Initialize the snake, start moving the snake.
   */
  create() {
    this.snakeX = this.initialSnakeX;
    this.snakeY = this.initialSnakeY;
    
    this.snake = this.scene.add.image(this.snakeX, this.snakeY, "");
    this.snake.visible = false;
    this.snake.setDisplaySize(this.TILE_SIZE, this.TILE_SIZE);

    // Set the initial snake length to 3
    this.snakeLength = 3;
    
    // Initialize the snake body with the correct length
    this.snakePositions = [
      [this.snakeX - 2 * this.TILE_SIZE, this.snakeY],
      [this.snakeX - this.TILE_SIZE, this.snakeY]
    ]

    this.snakeDirections = [0, 0] // All parts are intially moving to the right
    
    // Create snake head
    this.snakeHeadImage = this.scene.add.image(this.snakeX, this.snakeY, "snake");
    this.snakeHeadImage.setDisplaySize(this.TILE_SIZE, this.TILE_SIZE);
    this.snakeHeadImage.depth = 100;

    // Create body segments
    //for (let i = 0; i < 1; i++) {
    //  let position = this.snakePositions[i];
    //  let bodyImage = new SnakeBody(this.scene, this.TILE_SIZE, "snake-body", position[0], position[1]);
    //  bodyImage.create();
    //  this.snakeBodyImages.push(bodyImage);
    //}

    let position;
    let bodyImage;

    position = this.snakePositions[0];
    bodyImage = new SnakeBody(this.scene, this.TILE_SIZE, "snake-body", position[0], position[1]);
    bodyImage.create();
    this.snakeBodyImages.push(bodyImage);

    position = this.snakePositions[1];
    bodyImage = new SnakeBody(this.scene, this.TILE_SIZE, "snake-body", position[0], position[1]);
    bodyImage.create();
    this.snakeBodyImages.push(bodyImage);
  
    // Create tail
    let tailPosition = this.snakePositions[1]
    this.snakeTailImage = this.scene.add.image(tailPosition[0], tailPosition[1], "snake-tail");
    this.snakeTailImage.setDisplaySize(this.TILE_SIZE, this.TILE_SIZE);
    this.snakeTailImage.depth = 99;     // https://www.youtube.com/watch?v=TTtgXd5qJko

    // We need the initial snake tail animation for the first move of the snake (the usual animation code only activates AFTER the first move)
    function initialSnakeTailAnimation() {
      this.scene.tweens.add({
        targets: this.snakeTailImage,
        x: this.snakePositions[0][1],
        y: this.snakePositions[0][1],
        duration: this.timeBetweenEachMove,
        ease: 'Linear',
        // Update the tail position after the animation
        onComplete: () => {
          this.snakeBodyImages[0].snakeBody.setPosition(this.snakePositions[1][0], this.snakePositions[1][1]);
        }
      })
      this.firstAnimationDone = true;
    }

    // Start moving the snake and update the body images
    this.scene.time.delayedCall(this.timeBetweenEachMove, this.move, [], this);
    this.scene.time.delayedCall(this.timeBetweenEachMove, initialSnakeTailAnimation, [], this);

    this.highScore = parseInt(localStorage.getItem("highScore")) || 0;

    document.getElementById("high-score").innerHTML = `High Score: ${this.highScore}`
    /* Delete new-high-score class from these elements */
    document.getElementById("high-score").className = "scene-1 game-ui";
    document.getElementById("score").className = "scene-1 game-ui";
    document.getElementById("game-over-high-score").className = "scene-2 game-over";
    document.getElementById("game-over-score").className = "scene-2 game-over";

    this.animation = true;

    /* Dedicated swipe script 
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
        } 
      });  */
  }

  // https://www.w3resource.com/javascript-exercises/javascript-math-exercise-33.php
  /** 
   * Converts degrees to radians
   * @param {Number} degrees - The degree value that should be converted to radians
   */
  degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  // Arrow and WASD keys controls
  /**
   * Handle changing direction correctly.
   * @param {Phaser.Input.Keyboard.CursorKeys} cursors 
   * @param {Object} wasd 
   */
  update(cursors, wasd) {
    // NOTE: I've added the extra condition so we can't change the direction to the same value it already is.
    // Changing the direction to any value triggers a pause in the ability to change direction (while canChangeDirection is false).
    // During the pause, the snake can't change direction, 
    // leading to a delay in changing direction legally (i.e. no 180-degree turns in the same row/column) if the inputs are succeded quickly.
    // As such, we must remove unnecessary pauses, thereby we must introduce the extra condition.
    if (cursors.left.isDown || wasd.left.isDown) {
      this.changeDirection(180);
    } else if (cursors.right.isDown || wasd.right.isDown) {
      this.changeDirection(0);
    } else if (cursors.up.isDown || wasd.up.isDown) {
      this.changeDirection(90);
    } else if (cursors.down.isDown || wasd.down.isDown) {
      this.changeDirection(270);
    }

    if (!this.canChangeDirection) {
      // If the snake has moved
      if (this.snakeX !== this.storedSnakePosition[0] || this.snakeY !== this.storedSnakePosition[1]) {
        this.canChangeDirection = true;
      }
    }
  }
  
  oppositeDegrees(degrees) {
    if (degrees === 0) {
      return 180;
    } else if (degrees === 90) {
      return 270;
    } else if (degrees === 180) {
      return 0;
    } else if (degrees === 270) {
      return 90;
    }
  }

  /**
   * Changes the direction based on player input and waits for the snake to change position before 
   * allowing another direction change.
   * @param {number} direction - The direction (in degrees) the snake will change to. 
   */
  changeDirection(direction) {
    // Make sure the direction isn't change to the same or opposite direction
    /**
     * Returns the number of degrees opposite to the argument given.
     * 180 if 0 degrees, 270 if 90 degrees, 0 if 180 degrees, 90 if 270 degrees.
     * @param {number} degrees 0, 90, 180, 270
     */

    // Only allow changing direction after moving one tile
    if (this.firstAnimationDone && this.canChangeDirection && direction !== this.direction && direction !== this.oppositeDegrees(this.direction)) {
      this.storedSnakePosition = [this.snakeX, this.snakeY];

      this.direction = direction;

      // Prevent the player from changing direction again immediately to avoid a quick succession of direction changes.
      // This prevents a 180-degree rotation if the player attempts to change direction twice quickly (e.g., two 90-degree turns).
      this.canChangeDirection = false;
    }
  }

  /**
   * Move the snake by 1 tile in the correct direction, wrap around the screen when going through
   * a wall, store the snake body tiles' positions, and update them accordingly.
   */
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

    let targetX = this.snakeX;
    let targetY = this.snakeY;

    this.scene.tweens.add({
      targets: this.snakeHeadImage,
      x: targetX,
      y: targetY,
      duration: this.timeBetweenEachMove,
      ease: 'Linear',
      onComplete: () => {
        this.snake.setPosition(this.snakeX, this.snakeY);
      }
    })

    this.snakePositions.push([this.snakeX, this.snakeY]);
    if (this.snakePositions.length > this.snakeLength) {
      this.snakePositions.shift();
    }

    this.snakeDirections.push(this.direction);
    if (this.snakeDirections.length > this.snakeLength) {
      this.snakeDirections.shift();
    }

    this.scene.time.delayedCall(this.timeBetweenEachMove, this.move, [], this);
    this.scene.time.delayedCall(this.timeBetweenEachMove, this.callUpdateSnakeBodyImage, [], this);

    if (this.direction !== 90 && this.direction !== 270) {
      this.snakeHeadImage.setRotation(this.degreesToRadians(this.direction));
    } else if (this.direction === 90) {
      this.snakeHeadImage.setRotation(this.degreesToRadians(270));
    } else if (this.direction === 270) {
      this.snakeHeadImage.setRotation(this.degreesToRadians(90));
    }

  }

  /**
   * Determines whether the snake turned left or right.
   * @param {number} directionDifference - The difference in direction between 2 consecutive snake body images
   * @returns {string} "left" or "right"
   */
  determineRotation(directionDifference) {
    if (directionDifference === -90 || directionDifference === 270) {
      return "left";
    } else if (directionDifference === 90 || directionDifference === -270) {
      return "right"
    }
  }

  callUpdateSnakeBodyImage() {
    if (this.snakeBodyImages.length !== 0) {
      for (let i = 0; i < this.snakeBodyImages.length; i++) {
        this.updateSnakeBodyImage(i, this.snakePositions[i], this.snakeDirections[i]);
      }  
    }
  }

  /**
   * Updates the snake body image position.
   * @param {number} index - The index of the snake body image
   * @param {Array.<number>} position - The position array for the corresponding snake body image.
   * @param {number} direction - The direction for the corresponding snake body image.
   */
  updateSnakeBodyImage(index, position, direction) {
    let targetX = position[0];
    let targetY = position[1];

    if (this.firstAnimationDone === false) {
      return;
    }
  
    let previousDirection = this.snakeDirections[index];
    let nextDirection = this.snakeDirections[index + 1];
  
    if (this.snakeBodyImages[index]) {
      this.snakeBodyImages[index].snakeBody.visible = false;

      // If it's the last snake body image (the tail)
      if (index === 0) {
        // We'll use an image independent from the actual tail
        this.snakeBodyImages[index].snakeBody.visible = false;

        // The tail has to correspond with the next body tile after it
        let nextSnakeDirection = this.snakeDirections[1];
        // For some reason 90 and 270 have to be reversed
        if (nextSnakeDirection !== 90 && nextSnakeDirection !== 270) {
          this.snakeTailImage.setRotation(this.degreesToRadians(nextSnakeDirection));
        } else if (nextSnakeDirection === 90) {
          this.snakeTailImage.setRotation(this.degreesToRadians(270));
        } else if (nextSnakeDirection === 270) {
          this.snakeTailImage.setRotation(this.degreesToRadians(90));
        }

        // The tail needs to keep up with the next body tile
        if (this.snakePositions[1]) {
          targetX = this.snakePositions[1][0];
          targetY = this.snakePositions[1][1];  
        } else {
          targetX = this.snakeX;
          targetY = this.snakeY;
        }  
        
        if (this.animation) {
          this.snakeTween = this.scene.tweens.add({
            targets: this.snakeTailImage,
            x: targetX,
            y: targetY,
            duration: this.timeBetweenEachMove,
            ease: 'Linear',
            // Update the tail position after the animation
            onComplete: () => {
              this.snakeBodyImages[index].snakeBody.setPosition(targetX, targetY);
            }
          })  
        } else {
          this.snakeBodyImages[index].snakeBody.setPosition(targetX, targetY);
          this.snakeTailImage.setPosition(targetX, targetY);
        }

        if (this.turnImages[0]) {
          // If the tail has reached the turn, destroy the turn snake body tile image
          if (this.snakeBodyImages[1].snakeBody.x === this.turnImagePositions[0][0] && this.snakeBodyImages[1].snakeBody.y === this.turnImagePositions[0][1]) {
            this.turnImages[0].destroy();
            this.turnImages.shift();
            this.turnImagePositions.shift();
          }  
        }
      } else {
        this.snakeBodyImages[index].snakeBody.setPosition(targetX, targetY);
        // i.e. if the snake body tile needs to turn
        if (nextDirection && previousDirection !== nextDirection) {
          // We'll use another image to display a turn of the snake instead
          this.snakeBodyImages[index].snakeBody.visible = false;

          // Find the corresponding texture
          const directionMapping = {
            "90-0": "1",
            "180-270": "1",
            "90-180": "2",
            "0-270": "2",
            "0-90": "3",
            "270-180": "3",
            "270-0": "4",
            "180-90": "4"  
          };

          const key = `${previousDirection}-${nextDirection}`;
          const texture = directionMapping[key];

          if (texture) {
            let occupied = false;

            // Place a texture in that tile only if there isn't already a texture
            this.turnImagePositions.forEach((position) => {
              if (position[0] === this.snakeBodyImages[index].snakeBody.x && position[1]  === this.snakeBodyImages[index].snakeBody.y) {
                occupied = true;
              }
            });

            if (occupied === false) {
              let turnImage = this.scene.add.image(this.snakeBodyImages[index].snakeBody.x, this.snakeBodyImages[index].snakeBody.y, texture);
              turnImage.setDisplaySize(this.TILE_SIZE, this.TILE_SIZE);
              turnImage.depth = 98;
              this.turnImages.push(turnImage);
              this.turnImagePositions.push([this.snakeBodyImages[index].snakeBody.x, this.snakeBodyImages[index].snakeBody.y]);  
            }
          } else {
            console.error("No texture found!");
          }
        }
        // Ensures the snake body is pointed in the correct direction
        else {
          this.snakeBodyImages[index].snakeBody.visible = true;
          this.snakeBodyImages[index].snakeBody.depth = 97;
          this.snakeBodyImages[index].snakeBody.setTexture("snake-body");
          if (direction !== 90 && direction !== 270) {
            this.snakeBodyImages[index].snakeBody.setRotation(this.degreesToRadians(direction));
          } else if (direction === 90) {
            this.snakeBodyImages[index].snakeBody.setRotation(this.degreesToRadians(270));
          } else if (direction === 270) {
            this.snakeBodyImages[index].snakeBody.setRotation(this.degreesToRadians(90));
          }
        }  
      }
    }
  }

  /**
   * Create a new snake body image on collision with a fruit.
   */
  onCollision() {
    this.snakeLength += 1;

    // New high score
    if (this.snakeLength > this.highScore) {
      this.highScore = this.snakeLength; // snake length = score
      document.getElementById("high-score").innerHTML = `High Score: ${this.highScore}`
      document.getElementById("high-score").className = "scene-1 game-ui new-high-score";
      document.getElementById("score").className = "scene-1 game-ui new-high-score";
      document.getElementById("game-over-high-score").className = "scene-2 game-over new-high-score";
      document.getElementById("game-over-score").className = "scene-2 game-over new-high-score";
    }
    
    // https://www.dynetisgames.com/2018/10/28/how-save-load-player-progress-localstorage/
    localStorage.setItem('highScore', this.highScore);

    document.getElementById("score").innerHTML = `Score: ${this.snakeLength}`;

    let newBodyImage = new SnakeBody(this.scene, this.TILE_SIZE, "snake-body", this.snakeX, this.snakeY); // Instantiate new snake body image
    newBodyImage.create();
    this.snakeBodyImages.push(newBodyImage);

    // Stop the snake animation.
    if (this.snakeTween) {
      this.snakeTween.remove();
    }
  }

  // Getter methods for snakeX and snakeY
  /**
   * Returns the snake's X.
   * @returns {number}
   */
  getSnakeX() {
    return this.snakeX;
  }

  /**
   * Returns the snake's Y.
   * @returns {number}
   */
  getSnakeY() {
    return this.snakeY;
  }

  /**
   * Returns the snake positions array.
   * @returns {Array.<Array.<number>>}
   */
  getSnakePositions() {
    return this.snakePositions;
  }
}
  
