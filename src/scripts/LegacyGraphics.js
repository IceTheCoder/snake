document.getElementById("legacy-graphics").onclick = legacyGraphics;

// Invalid legacy value
if (localStorage.getItem("legacy") !== "0" && localStorage.getItem("legacy") !== "1") {
  localStorage.setItem("legacy", "0");
}

if (localStorage.getItem("legacy") === "1") {
  document.getElementById("legacy-checkbox").checked = true;
}

function legacyGraphics() {
  if (localStorage.getItem("legacy") === "1") {
    localStorage.setItem("legacy", "0");
  } else if (localStorage.getItem("legacy") === "0") {
    localStorage.setItem("legacy", "1")
  }
  console.log(localStorage.getItem("legacy"))
}
