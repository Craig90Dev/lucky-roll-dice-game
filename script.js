// Global Variables
const startButton = document.getElementById("start-btn");
const welcomePage = document.getElementById("welcome-page");
const gamePage = document.getElementById("game-page");
const resetButton = document.getElementById("reset-btn");
const currentElem1 = document.getElementById("dice-number1");
const currentElem2 = document.getElementById("dice-number2");
const higherLowerBtns = document.getElementsByClassName("higher-lower-btn");
const resultElem = document.getElementById("result-area");
let scoreElem = document.getElementById("score");
let streakElem = document.getElementById("streak");

let streak = 0;
let score = 0;
let currentNumber1 = generateRandomDice();
let currentNumber2 = generateRandomDice();

currentElem1.innerText = currentNumber1;
currentElem2.innerText = currentNumber2;

document.getElementById("dice-image1").innerHTML = `<img src="assets/images/${currentNumber1}.png" alt="Number ${currentNumber1}">`;
document.getElementById("dice-image2").innerHTML = `<img src="assets/images/${currentNumber2}.png" alt="Number ${currentNumber2}">`;


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

  let startNumber1 = parseInt(document.getElementById("dice-number1").innerText);
  let startNumber2 = parseInt(document.getElementById("dice-number2").innerText);

  document.getElementById("dice-total-score").innerText = startNumber1 + startNumber2 ;
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

  //Generate new numbers on reset and display appropriate dice images
  let currentNumber1 = generateRandomDice();
  let currentNumber2 = generateRandomDice();

  currentElem1.innerText = currentNumber1;
  currentElem2.innerText = currentNumber2;

  let currentTotal = currentNumber1 + currentNumber2;

  document.getElementById("dice-total-score").innerText = currentTotal;

  document.getElementById("dice-image1").innerHTML = `<img src="assets/images/${currentNumber1}.png" alt="Number ${currentNumber1}">`;
  document.getElementById("dice-image2").innerHTML = `<img src="assets/images/${currentNumber2}.png" alt="Number ${currentNumber2}">`;
}

for (let i = 0; i < higherLowerBtns.length; i++) {
  higherLowerBtns[i].addEventListener("click", function() {
    playGame(this.dataset.value);
  });
}

function playGame(choice) {
  // Generate new number for comparison
  const currentNumber1 = parseInt(document.getElementById("dice-number1").innerText); // parseInt to ensure is a number
  const currentNumber2 = parseInt(document.getElementById("dice-number2").innerText); // parseInt to ensure is a number

  let currentTotal = currentNumber1 + currentNumber2;

  let newNumber1 = generateRandomDice();
  let newNumber2 = generateRandomDice();
 
  let newTotal = newNumber1 + newNumber2;

  //Ensures new and current totals are not the same
  while (newTotal === currentTotal) {
    newTotal = generateRandomDice();
  }

  //Update new numbers and images
  parseInt(document.getElementById("dice-number1").innerText = newNumber1);
  parseInt(document.getElementById("dice-number2").innerText = newNumber2);

  //Uses generated number to call for image from assets folder and display in dice image divs
  document.getElementById("dice-image1").innerHTML = `<img src="assets/images/${newNumber1}.png" alt="Number ${newNumber1}">`;
  document.getElementById("dice-image2").innerHTML = `<img src="assets/images/${newNumber2}.png" alt="Number ${newNumber2}">`;

  parseInt(document.getElementById("dice-total-score").innerText = newTotal);

  checkAnswer();
  //Check if players answer is correct
  function checkAnswer() {
    if((currentTotal < newTotal && choice === "higher") || (currentTotal > newTotal && choice === "lower")) {
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
  //Display correct guess message to player
  resultElem.classList.remove("hide")
  resultElem.innerText = "Correct!"
  resultElem.style.color = "BLUE";
  timeoutFunction();
}

function incorrectAnswer() {
  // Incorrect answer and best streak counter
  if (scoreElem.innerText > streakElem.innerText) {
    streakElem.innerText = score;
  }
  //score reset
  score = 0;
  scoreElem.innerText = score;
  //Display incorrect guess message to player
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

