let testing = true;

if (testing === true) {
  document.getElementById("testing-settings").classList.remove("hide");
  document.getElementById("legacy-value").classList.remove("hide");
  document.getElementById("swipe-test").classList.remove("hide");
  document.getElementById("slider-container").classList.remove("hide");
  document.getElementById("length-form").classList.remove("hide");
} else {
  document.getElementById("testing-settings").classList.add("hide");
  document.getElementById("legacy-value").classList.add("hide");
  document.getElementById("swipe-test").classList.add("hide");
  document.getElementById("slider-container").classList.add("hide");
}

// Starting positions
document.getElementById("x").value = localStorage.getItem("startingX");
document.getElementById("y").value = localStorage.getItem("startingY");

document.getElementById("starting-position-form").addEventListener('submit', function(event) {
  const x = document.getElementById("x").value;
  const y = document.getElementById("y").value;

  localStorage.setItem("startingX", x);
  localStorage.setItem("startingY", y);

  event.preventDefault();

  console.log(localStorage.getItem("startingX"));
  console.log(localStorage.getItem("startingY"));
});

// Length
document.getElementById("length").value = localStorage.getItem("length");

document.getElementById("length-form").addEventListener('submit', function(event) {
  const length = document.getElementById("length").value;

  localStorage.setItem("length", length);

  event.preventDefault();
})
