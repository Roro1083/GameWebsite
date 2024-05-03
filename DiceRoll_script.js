

/*---------------DICE ROLL--------------------------*/
document.getElementById('RollDiceButton').addEventListener("click", rollDice);

function rollDice() {
    // Selects random number from 1-6
    var resultNum = Math.floor(Math.random() * 6) + 1;
    var diceResult = document.getElementById("diceResult");
    // Displays appropriate image
    // Dice images by MadVector found on iStock (https://www.istockphoto.com/vector/vector-3d-realistic-blue-pink-and-green-game-dice-icon-set-closeup-isolated-on-gm1464513561-497188578).
    diceResult.innerHTML = `<img src="img/dice_${resultNum}.png" alt="Dice ${resultNum}">`;
}