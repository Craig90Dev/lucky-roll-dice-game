let welcomePage = document.getElementById('welcome-page');
let gamePage = document.getElementById('game-page');
let resetButton = document.getElementById('reset-btn');
let rollButton = document.getElementById('first-roll-btn');
let higherButton = document.getElementById('higher-btn');
let lowerButton = document.getElementById('lower-btn');
let numberLabel = document.getElementById('number-label');
let numberSelector = document.getElementById('number-selector');

//Start Game Function
function startGame() {
  welcomePage.classList.add("hide");
  gamePage.classList.remove("hide");
}

//First roll Function
function firstRoll() {
  numberLabel.classList.add("hide");
  numberSelector.classList.add("hide");
  rollButton.classList.add('hide');
  
  higherButton.classList.remove("hide");
  lowerButton.classList.remove("hide");
  resetButton.classList.remove("hide");

  rollDice();
}

//Reset Function
function resetGame() {
  welcomePage.classList.remove("hide");
  gamePage.classList.add("hide");
  higherButton.classList.add("hide");
  lowerButton.classList.add("hide");
  rollButton.classList.remove('hide');
  numberLabel.classList.remove("hide");
  numberSelector.classList.remove("hide");
  document.getElementById("dice-result").innerHTML = "";
  document.getElementById("dice-total").innerHTML = "";
  document.getElementById("dice-images").innerHTML = "";
}

// Roll Dice Function
function rollDice() {
  //Takes the number from the user input value for # of dice.
  const numOfDice = document.getElementById("number-selector").value;
  // Variables for the result and image divs.
  const diceResult = document.getElementById("dice-result");
  const diceImages = document.getElementById("dice-images");
  const diceTotal = document.getElementById("dice-total");
  // Empty arrays to store dice values and images.
  const values = [];
  const images = [];
  // Takes i and goes through the loop as long as i is less than the number of dice required.
  for(let i = 0; i < numOfDice; i++) {
    //Gives a random number between 0 and 1. Multiply by 6 to give between 0 and 5. Plus one to give between 1 and 6. Floor to give whole number.
    const value = Math.floor(Math.random() * 6) + 1; 
    //Push the results into the values array
    values.push(value);
    //Push the results into the image array and create an image element with the relevant image. Alt text if image doesn't load
    images.push(`<img src="assets/images/${value}.png" alt="Number ${value}">`);
  }
  //Using the dice-result div, display the results of the roll
  diceResult.textContent = `Dice: ${values.join(', ')}`;
  //Use values array to take numbers and add together for dice total
  let sumOf = 0;
  for (let i = 0; i < values.length; i++) {
    sumOf += values[i];
  }
  //Display the sumOf variable in the dice-total div
  diceTotal.textContent = `Total: ${(sumOf)}`;
  //Using the dice-images div, display the appropriate dice images
  diceImages.innerHTML = images.join('');
}

