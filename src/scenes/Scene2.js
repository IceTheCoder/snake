export class Scene2 extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

  create() {
    this.add.text(20, 20, "Game over.");
  }
}

window.Scene2 = Scene2;
