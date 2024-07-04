// HOW TO USE:
// To make a HTML element part of a scene, give it a class of scene-{index},
// where index is its scene number. Use the loadScene function with the index
// argument to load that specified scene.

export default { 
  /**
   * Hides all elements not in the requested scene, makes sure
   * the HTML and body elements are not hidden and displays the
   * elements of the requested scene.
   * @param {number} index - The index of the scene we should load
   */

  // 0 - main menu
  // 1 - game
  // 2 - game over
  loadScene(index) {
    console.log(index);
    // Hide all elements not in the requested scene
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
      if (!element.classList.contains(`scene-${index}`)) {
        element.style.display = "none";
      }
    });

    // DON'T HIDE THE BODY!
    document.documentElement.style.display = "flex";
    document.body.style.display = "flex";
    document.head.style.display = "flex";

    // Display all elements in the requested scene
    const elementsOfSelectedScene = document.querySelectorAll(`[class*="scene-${index}"]`)
    elementsOfSelectedScene.forEach(element => {
      element.style.display = "flex";
    });
  }
}

