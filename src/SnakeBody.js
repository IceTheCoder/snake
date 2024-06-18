export default class SnakeBody {
  constructor(scene, tileSize, imageName, snakeX, snakeY) {
    this.scene = scene;
    this.TILE_SIZE = tileSize;
    this.imageName = imageName;
    this.snakeX = snakeX;
    this.snakeY = snakeY;

    this.snakeBody = null;
  }

  create() {
    this.snakeBody = this.scene.add.image(this.snakeX, this.snakeY, this.imageName);
    this.snakeBody.setDisplaySize(this.TILE_SIZE, this.TILE_SIZE);
  }

  setPosition(x, y) {
    this.snakeBody.setPosition(x, y);
  }
}