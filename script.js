// Roll Dice
function rollDice() {
  //Takes the number from the user input for # of dice.
  const numOfDice = document.getElementById("number-selector").value;
  // Variables for the result and image divs.
  const diceResult = document.getElementById("dice-result");
  const diceImages = document.getElementById("dice-images");
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
  //Using the dice-images div, display the appropriate dice images
  diceImages.innerHTML = images.join('');
}