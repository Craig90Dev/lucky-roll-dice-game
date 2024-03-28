// Global Variables
const startButton = document.getElementById("start-btn");
const welcomePage = document.getElementById("welcome-page");
const gamePage = document.getElementById("game-page");
const resetButton = document.getElementById("reset-btn");
const currentElem = document.getElementById("dice-images");
const higherLowerBtns = document.getElementsByClassName("higher-lower-btn");
const resultElem = document.getElementById("result-area");
let scoreElem = document.getElementById("score");
let streakElem = document.getElementById("streak");

let streak = 0;
let score = 0;
let currentNumber = generateRandomDice();
currentElem.innerText = currentNumber;

// Checks DOM content has loaded
document.addEventListener("DOMContentLoaded", function() {
  initialiseEventListeners();
});

//Initialise event listeners once DOM has loaded
function initialiseEventListeners() {
  startButton.addEventListener("click", startGame);
  resetButton.addEventListener("click", resetGame);

  // Enables user to use left and right arrow keys to make choice
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        let choice = event.key === "ArrowLeft" ? "lower" : "higher";
        playGame(choice);
    }
});
}
// Hides welcome page and displays game interface on Start Game button click
function startGame() {
  welcomePage.classList.add("hide");
  gamePage.classList.remove("hide");
}

// Hides game interface and displays welcome page on Reset Game button click
function resetGame() {
  welcomePage.classList.remove("hide");
  gamePage.classList.add("hide");
  //Reset score and streak to 0
  scoreElem.innerText = 0;
  score = 0;
  streakElem.innerText = 0;
  streak = 0;
}

for (let i = 0; i < higherLowerBtns.length; i++) {
  higherLowerBtns[i].addEventListener("click", function() {
    playGame(this.dataset.value);
  });
}

function playGame(choice) {
  // Generate new number for comparison
  const currentNumber = parseInt(document.getElementById("dice-images").innerText); // parseInt to ensure is a number
  let newNumber = generateRandomDice();
  //Ensures new and old numbers are not the same
  while (newNumber === currentNumber) {
    newNumber = generateRandomDice();
  }
  //Update new number in images box
  document.getElementById("dice-images").innerHTML = newNumber;

  checkAnswer();
  //Check if players answer is correct
  function checkAnswer() {
    if((currentNumber < newNumber && choice === "higher") || (currentNumber > newNumber && choice === "lower")) {
      correctAnswer();
    } else {
      incorrectAnswer()
    };
  }
}

function correctAnswer() {
  // Correct Answer and score update
  score++;
  scoreElem.innerText = score;
  resultElem.classList.remove("hide")
  resultElem.innerText = "Correct!"
  resultElem.style.color = "BLUE";
  timeoutFunction();
}

function incorrectAnswer() {
  // Incorrect answer and best streak counter
  if (score > streak) {
    streakElem.innerText = score;
  }
  //score reset
  score = 0;
  scoreElem.innerText = score;
  resultElem.classList.remove("hide")
  resultElem.innerText = "Incorrect!"
  resultElem.style.color = "RED";
  timeoutFunction();
}

// Timeout function for results div to fade out and disable higher/lower buttons to stop player spamming answers and give time for results to fade
function timeoutFunction() {
  document.getElementById("higher-btn").disabled = true;
  document.getElementById("lower-btn").disabled = true;
  setTimeout(function () {
    resultElem.classList.add("hide");
    resultElem.classList.remove("correct");
    document.getElementById("higher-btn").disabled = false;
    document.getElementById("lower-btn").disabled = false;
  }, 1000);
}

// function to generate random dice number
function generateRandomDice() {
  return Math.floor(Math.random() * 6) + 1;
}

