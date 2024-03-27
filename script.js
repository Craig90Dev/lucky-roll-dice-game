// Global Variables
const startButton = document.getElementById("start-btn");
const welcomePage = document.getElementById("welcome-page");
const gamePage = document.getElementById("game-page");
const resetButton = document.getElementById("reset-btn");

// Checks DOM content has loaded
document.addEventListener("DOMContentLoaded", function() {
  initialiseEventListeners();
});

function initialiseEventListeners() {
  startButton.addEventListener("click", startGame);
  resetButton.addEventListener("click", resetGame);
}

function startGame() {
  welcomePage.classList.add("hide");
  gamePage.classList.remove("hide");
}

function resetGame() {
  welcomePage.classList.remove("hide");
  gamePage.classList.add("hide");
}