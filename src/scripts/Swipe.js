// https://www.youtube.com/watch?v=nqLUfoO4TR0
const DIRECTION = Object.freeze({
  // Use numeric values for compatibility with keyboard controls code
  LEFT: 180,
  RIGHT: 0,
  DOWN: 270,
  UP: 90,
  NONE: 'NONE',
})

/**
 * Swipe detection.
 */
export class Swipe {
  // Private properties
  #scene;
  #config;
  #lastPointerDownLocation;
  #lastPointerUpLocation;
  #swipeDirection;

  /**
   * Create a Swipe instance.
   * @param {Phaser.Scene} scene - The phaser scene instance to listen for input events. 
   * @param {Object} config - Configuration object for swipe detection.
   */
  constructor(scene, config) {
    /** @type {Phaser.Scene} */
    this.#scene = scene;

    /** @type {Object} */
    this.#config = config;

    /** @type {Phaser.Math.Vector2} */
    this.#lastPointerDownLocation = new Phaser.Math.Vector2(0, 0);

    /** @type {Phaser.math.Vector2} */
    this.#lastPointerUpLocation = new Phaser.Math.Vector2(0, 0);
    
    /** @type {DIRECTION} */
    this.#swipeDirection = DIRECTION.NONE;

    this.#setupEvents();
  }

  /**
   * Sets up input events for swipe detection
   * @private
   */
  #setupEvents() {
    this.#scene.input.on(Phaser.Input.Events.POINTER_DOWN, this.#handlePointerDown, this);
    this.#scene.input.on(Phaser.Input.Events.POINTER_UP, this.#handlePointerUp, this);

    // Cleanup events when scene shuts down
    this.#scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.#scene.input.off(Phaser.Input.Events.POINTER_DOWN, this.#handlePointerDown, this);
      this.#scene.input.off(Phaser.Input.Events.POINTER_UP, this.#handlePointerUp, this);
    })
  }

  /**
   * Handles the pointer down event.
   * @param {Phaser.Input.Pointer} pointer - The pointer object.
   * @private
   */
  #handlePointerDown(pointer) {
    this.#lastPointerDownLocation = pointer.position.clone();
  }

  /**
   * Handles the pointer up event.
   * Triggers swipe detection and callback.
   * @param {Phaser.Input.Pointer} pointer - The pointer object
   * @private
   */
  #handlePointerUp(pointer) {
    this.#lastPointerUpLocation = pointer.position.clone();
    this.#handleSwipe();
    
    // Trigger callback if swipe detected and callback is provided in config
    if (this.#swipeDirection !== DIRECTION.NONE && this.#config && this.#config.swipeDetectedCallback) {
      this.#config.swipeDetectedCallback(this.#swipeDirection);
    }
  }

  /**
   * Determined the direction of the swipe based on pointer positions.
   * @private
   */
  #handleSwipe() {
    if (this.#lastPointerDownLocation.x === this.#lastPointerUpLocation.x && this.#lastPointerDownLocation.y === this.#lastPointerUpLocation.y) {
      this.#swipeDirection = DIRECTION.NONE;
      return;
    }

    const radians = Phaser.Math.Angle.BetweenPoints(this.#lastPointerDownLocation, this.#lastPointerUpLocation);
    const degrees = Phaser.Math.RadToDeg(radians);
    const positiveDegrees = Math.abs(degrees);
    
    if (positiveDegrees <= 45) {
      this.#swipeDirection = DIRECTION.RIGHT;
      return;
    }
    if (positiveDegrees >= 135) {
      this.#swipeDirection = DIRECTION.LEFT;
      return;
    }
    if (degrees < 0) {
      this.#swipeDirection = DIRECTION.UP;
      return;
    }
    this.#swipeDirection = DIRECTION.DOWN;
  }
}