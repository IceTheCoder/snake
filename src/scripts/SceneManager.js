export default { 
  /**
   * Hides all elements not in the requested scene, makes sure
   * the HTML and body elements are not hidden and displays the
   * elements of the requested scene.
   * @param {number} index - The index of the scene we should load
   */
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

