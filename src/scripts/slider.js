let slider = document.getElementById("moveIntervalRange");
let output = document.getElementById("output");
output.innerHTML = `moveInterval: ${slider.value}`; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = `moveInterval: ${this.value}`;
  localStorage.setItem("sliderValue", this.value);
}
