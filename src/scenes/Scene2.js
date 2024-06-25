import Snake from '../scripts/Snake.js';

/**
 * Represents the game over scene.
 * @class
 * @extends Phaser.Scene
 */
export class Scene2 extends Phaser.Scene {
  /**
   * Constructs the Scene2 class.
   */
  constructor() {
    super("gameOver");
  }

  /**
   * Create UI elements for the game over scene.
   */
  create(data) {
    /** @type {number} */
    const GAME_WIDTH = this.scale.width;
    /** @type {number} */
    const GAME_HEIGHT = this.scale.height;
    
    /** @type {number} */
    const FOREST_GREEN = 0x228B22;
    /** @type {number} */
    const GRASS_GREEN = 0x7CFC00;

    /**
     * @type {Phaser.GameObjects.Text}
     */
    const text = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, "GAME OVER", { font: "48px" }).setOrigin(0.5, 0.5);
    
    /**
     * @type {Phaser.GameObjects.Text}
     */
    const restartButton = this.add.text(GAME_WIDTH / 2, (GAME_HEIGHT / 2) + 75, "RESTART", {font: "36px"}).setOrigin(0.5, 0.5).setTint(FOREST_GREEN);
    
    /**
     * @type {Phaser.GameObjects.Text}
     */
    // Display snake length
    const snakeLengthText = this.add.text(GAME_WIDTH / 2, (GAME_HEIGHT / 2) -75, `Score: ${data.snakeLength}`, { font: "36px" }).setOrigin(0.5, 0.5);

    // https://snowbillr.github.io/blog/2018-07-03-buttons-in-phaser-3/
    restartButton.setInteractive();

    restartButton.on('pointerover', () => { restartButton.setTint(GRASS_GREEN); });
    restartButton.on('pointerout', () => { restartButton.setTint(FOREST_GREEN); });
    restartButton.on('pointerup', () => { this.scene.start("playGame"); });
  }
}

window.Scene2 = Scene2;
