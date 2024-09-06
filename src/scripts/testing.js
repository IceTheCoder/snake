let testing = true;

if (testing === true) {
  document.getElementById("starting-position-settings").classList.remove("hide");
  document.getElementById("legacy-value").classList.remove("hide");
  document.getElementById("swipe-test").classList.remove("hide");
  document.getElementById("slider-container").classList.remove("hide");
} else {
  document.getElementById("starting-position-settings").classList.add("hide");
  document.getElementById("legacy-value").classList.add("hide");
  document.getElementById("swipe-test").classList.add("hide");
  document.getElementById("slider-container").classList.add("hide");
}