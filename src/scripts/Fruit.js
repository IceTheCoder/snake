export default class Fruit {
  constructor(scene, tileSize, gridWidth, gridHeight) {
    this.scene = scene;
    this.TILE_SIZE = tileSize;
    this.GRID_WIDTH = gridWidth;
    this.GRID_HEIGHT = gridHeight;

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

    this.fruitX = this.getRandomInt(this.GRID_WIDTH) * this.TILE_SIZE + this.TILE_SIZE / 2;
    this.fruitY = this.getRandomInt(this.GRID_HEIGHT) * this.TILE_SIZE + this.TILE_SIZE / 2;

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