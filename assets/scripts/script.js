/*jshint esversion: 6 */ 

// Global Variables
const startButton = document.getElementById("start-btn");
const welcomePage = document.getElementById("welcome-page");
const gamePage = document.getElementById("game-page");
const resetButton = document.getElementById("reset-btn");
const currentElem1 = document.getElementById("dice-number1");
const currentElem2 = document.getElementById("dice-number2");
const higherLowerBtns = document.getElementsByClassName("higher-lower-btn");
const resultElem = document.getElementById("result-area");
const scoreElem = document.getElementById("score");
const streakElem = document.getElementById("streak");
const image1 = document.getElementById("dice-image1");
const image2 = document.getElementById("dice-image2");
const diceTotal = document.getElementById("dice-total-score");
const higherBtn = document.getElementById("higher-btn");
const lowerBtn = document.getElementById("lower-btn");

let streak = 0;
let score = 0;

/**
 * Initialise event listeners once DOM has loaded and calls initialise game function
 */
document.addEventListener("DOMContentLoaded", function() {
  initialiseEventListeners();
});

/**
 * Initialise game start by generating numbers, populating number fields and adding event listeners to the game buttons
 */
function initialiseEventListeners() {
  startButton.addEventListener("click", startGame);
  resetButton.addEventListener("click", resetGame);

  for (let i = 0; i < higherLowerBtns.length; i++) {
    higherLowerBtns[i].addEventListener("click", function() {
      playGame(this.dataset.value);
    });
  }

  // Enables user to use left and right arrow keys to make choice
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        let choice = event.key === "ArrowLeft" ? "lower" : "higher";
        playGame(choice);
    }
  });
  initialiseGame();
}

/**
 * Hides welcome page and displays game interface on Start Game button click
 */
function initialiseGame() {
  const currentNumber1 = generateRandomDice();
  const currentNumber2 = generateRandomDice();

  currentElem1.innerText = currentNumber1;
  currentElem2.innerText = currentNumber2;

  image1.innerHTML = `<img src="assets/images/${currentNumber1}.png" alt="Number ${currentNumber1}">`;
  image2.innerHTML = `<img src="assets/images/${currentNumber2}.png" alt="Number ${currentNumber2}">`;
}

/**
 * Hides welcome page and displays game interface on Start Game button click
 */
function startGame() {
  welcomePage.classList.add("hide");
  gamePage.classList.remove("hide");

  const startNumber1 = parseInt(currentElem1.innerText);
  const startNumber2 = parseInt(currentElem2.innerText);

  diceTotal.innerText = startNumber1 + startNumber2 ;
}

/**
 * Hides game interface and displays welcome page on Reset Game button click
 */
function resetGame() {
  welcomePage.classList.remove("hide");
  gamePage.classList.add("hide");

  //Reset score and streak to 0
  scoreElem.innerText = 0;
  score = 0;
  streakElem.innerText = 0;
  streak = 0;

  //Generate new numbers on reset and display appropriate dice images
  const currentNumber1 = generateRandomDice();
  const currentNumber2 = generateRandomDice();

  parseInt(currentElem1.innerText = currentNumber1);
  parseInt(currentElem2.innerText = currentNumber2);

  const currentTotal = currentNumber1 + currentNumber2;

  diceTotal.innerText = currentTotal;

  image1.innerHTML = `<img src="assets/images/${currentNumber1}.png" alt="Number ${currentNumber1}">`;
  image2.innerHTML = `<img src="assets/images/${currentNumber2}.png" alt="Number ${currentNumber2}">`;
}

/**
 * Generates new numbers and calculates the new total, compares the new total against the current total and checks the players answer
 */
function playGame(choice) {
  // Calculate current total
  const currentNumber1 = parseInt(currentElem1.innerText); // parseInt to ensure is a number
  const currentNumber2 = parseInt(currentElem2.innerText); // parseInt to ensure is a number

  const currentTotal = currentNumber1 + currentNumber2;
  // Generate new numbers for comparison
  let newNumber1 = generateRandomDice();
  let newNumber2 = generateRandomDice();

 // Calculate new total
  let newTotal = newNumber1 + newNumber2;

  //Ensures new and current totals are not the same
  while (newTotal === currentTotal) {
    newNumber1 = generateRandomDice();
    newNumber2 = generateRandomDice();

    newTotal = newNumber1 + newNumber2;
  }

  //Update new numbers and images
  currentElem1.innerText = newNumber1;
  currentElem2.innerText = newNumber2;

  //Uses generated number to call for image from assets folder and display in dice image divs
  image1.innerHTML = `<img src="assets/images/${newNumber1}.png" alt="Number ${newNumber1}">`;
  image2.innerHTML = `<img src="assets/images/${newNumber2}.png" alt="Number ${newNumber2}">`;

  diceTotal.innerText = newTotal;

  checkAnswer();

  /**
 * Check if players answer is correct. If the current total is smaller than the new total and the player selected higher then player is correct and vice versa
 */
  function checkAnswer() {
    if((currentTotal < newTotal && choice === "higher") || (currentTotal > newTotal && choice === "lower")) {
      correctAnswer();
    } else {
      incorrectAnswer();
    }
  }
}

/**
 * Runs if the players answer is correct. Updates the score and displays message to the player
 */
function correctAnswer() {
  // Correct Answer and score update
  score++;
  scoreElem.innerText = score;
  //Display correct guess message to player
  resultElem.classList.remove("hide");
  resultElem.innerText = "Correct!";
  resultElem.style.color = "WHITE";
  timeoutFunction();
}

/**
 * Runs if the players answer is incorrect. Updates the best streak, resets the score and displays a message to the player
 */
function incorrectAnswer() {
  // Incorrect answer and best streak counter
  if (scoreElem.innerText > streakElem.innerText) {
    streakElem.innerText = score;
  }
  //score reset
  score = 0;
  scoreElem.innerText = score;
  //Display incorrect guess message to player
  resultElem.classList.remove("hide");
  resultElem.innerText = "Incorrect!";
  resultElem.style.color = "RED";
  timeoutFunction();
}

/**
 * Timeout function for results div to fade out and disable higher/lower buttons to stop player spamming answers and give time for results to fade
 */
function timeoutFunction() {
  higherBtn.disabled = true;
  lowerBtn.disabled = true;
  setTimeout(function () {
    resultElem.classList.add("hide");
    resultElem.classList.remove("correct");
    higherBtn.disabled = false;
    lowerBtn.disabled = false;
  }, 1000);
}

/**
 * Generates a random dice number
 */
function generateRandomDice() {
  return Math.floor(Math.random() * 6) + 1;
}

