document.getElementById('FlipCoinButton').addEventListener("click", flipCoin);

function flipCoin() {
    // Selects random number from 1-6
    var resultNum = Math.floor(Math.random() * 2) + 1;
    var diceResult = document.getElementById("coinResult");
    // Displays appropriate image
    // Coin images by YoGinta found on iStock (https://www.istockphoto.com/vector/head-and-tail-coin-toss-a-coin-to-make-a-change-and-decide-gm1355067482-429648262).
    if (diceResult === 1) {
        diceResult.innerHTML = `<img src="img/coin_${resultNum}.png" alt="Heads">`;
    } else
    diceResult.innerHTML = `<img src="img/coin_${resultNum}.png" alt="Dice Tails">`;
}