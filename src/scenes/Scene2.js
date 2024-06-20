export class Scene2 extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

  create() {
    const gameWidth = this.scale.width;
    const gameHeight = this.scale.height;

    const text = this.add.text(gameWidth / 2, gameHeight / 2, "GAME OVER", { font: "48px Roboto" }).setOrigin(0.5, 0.5);

    const restartButton = this.add.text(gameWidth / 2, (gameHeight / 2) + 75, "RESTART", {font: "36px Roboto"}).setOrigin(0.5, 0.5);

    // https://snowbillr.github.io/blog/2018-07-03-buttons-in-phaser-3/
    restartButton.setInteractive();

    restartButton.on('pointerover', () => { restartButton.setTint(0x7CFC00); });
    restartButton.on('pointerout', () => { restartButton.setTint(0xffffff); });
    restartButton.on('pointerdown', () => { restartButton.setTint(0x008000)})
    restartButton.on('pointerup', () => { this.scene.start("playGame"); });
  }
}

window.Scene2 = Scene2;
