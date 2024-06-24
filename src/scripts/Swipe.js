const DIRECTION = Object.freeze({
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  DOWN: 'DOWN',
  UP: 'UP',
  NONE: 'NONE',
})

export class Swipe {
  // Private properties
  #scene;
  #config;
  #lastPointerDownLocation;
  #lastPointerUpLocation;
  #swipeDirection;

  constructor(scene, config) {
    this.#scene = scene;
    this.#config = config;
    this.#lastPointerDownLocation = new Phaser.Math.Vector2(0, 0);
    this.#lastPointerUpLocation = new Phaser.Math.Vector2(0, 0);
    this.#swipeDirection = DIRECTION.NONE;
    this.#setupEvents();
  }

  #setupEvents() {
    this.#scene.input.on(Phaser.Input.Events.POINTER_DOWN, this.#handlePointerDown, this);
    this.#scene.input.on(Phaser.Input.Events.POINTER_UP, this.#handlePointerUp, this);
    this.#scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.#scene.input.off(Phaser.Input.Events.POINTER_DOWN, this.#handlePointerDown, this);
      this.#scene.input.off(Phaser.Input.Events.POINTER_UP, this.#handlePointerUp, this);
    })
  }

  #handlePointerDown(pointer) {
    this.#lastPointerDownLocation = pointer.position.clone();
  }

  #handlePointerUp(pointer) {
    this.#lastPointerUpLocation = pointer.position.clone();
    this.#handleSwipe();
  }

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