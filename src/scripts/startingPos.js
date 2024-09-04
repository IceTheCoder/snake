document.getElementById("x").value = localStorage.getItem("startingX");
document.getElementById("y").value = localStorage.getItem("startingY");


document.getElementById("starting-position-form").addEventListener('submit', function(event) {
  const x = document.getElementById("x").value;
  const y = document.getElementById("y").value;

  localStorage.setItem("startingX", x);
  localStorage.setItem("startingY", y);

  event.preventDefault();
});