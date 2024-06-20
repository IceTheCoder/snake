export class Scene2 extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

  create() {
    const gameWidth = this.scale.width;
    const gameHeight = this.scale.height;

    // Use an auxilliary text box to get dimensions.
    const aux = this.add.text(gameWidth / 2, gameHeight / 2, "Game over.");
    const textBounds = aux.getBounds();

    const textWidth = textBounds.width;
    const textHeight = textBounds.height;

    aux.destroy();

    // Subtract half of the text width to center the text box.
    let textX = gameWidth / 2 - textWidth / 2;
    let textY = gameHeight / 2 - textHeight / 2;

    const text = this.add.text(textX, textY, "Game over.");
  }
}

window.Scene2 = Scene2;
