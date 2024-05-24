/*---------------TIC TAC TOE-----------------*/
//This code is adapted from the Tic Tac Toe implementation by Professor Posnett.

// Groups all cells into one variable
const cells = document.querySelectorAll('.cell');
let currentPlayer = 'Strawberry'; // Lemon player is always the human
let gameActive = true;
// Allows us to track current gameplay and determine next steps/results
let gameState = ["", "", "", "", "", "", "", "", ""];

// Winning states using the indices of the gameState array
const winningStates = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Event listeners for start of game and how cells interact
document.addEventListener('DOMContentLoaded', () => {
    // Make event listener for each individual cell
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    // Event listener to restart/start the game
    document.getElementById('restartButton').addEventListener('click', restartGame);
});

// Game is reinitialized when this button is pressed
function restartGame() {
    gameActive = true;
    currentPlayer = 'Strawberry';
    gameState = ["", "", "", "", "", "", "", "", ""];
    document.getElementById('resultDisplay').innerText = "Strawberry's turn";
    // Empty cells
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.className = 'cell'; // Reset classes
    });
}

// Get the selected game difficulty level from the radio button
function getLevel() {
    // Group all radio buttons under a variable
    let radios = document.getElementsByName('level');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            // Return the chosen level
            return radios[i].value;
        }
    }
}

// Update board and game when a cell is played
function playCell(clickedCell, clickedCellIndex) {
    // Mark current cell as played by the player in indices and on the board
    gameState[clickedCellIndex] = currentPlayer;

    // Create image for marking
    const img = document.createElement('img');
    // Image of strawberry by drogatnev found on iStock (https://www.istockphoto.com/vector/red-berry-strawberry-and-a-half-gm1138212604-303792503) 
    img.src = currentPlayer === 'Strawberry' ? 'img/strawberry.png' : 'img/lemon.png';
    img.alt = currentPlayer; // Sets alt text for accessibility
    img.classList.add('cellIcon');

    // Add image to board
    clickedCell.appendChild(img);

    // Log current game state
    console.log('Game State:', gameState);
    // Log current player
    console.log('Current Player:', currentPlayer);
}

// Update game and results when a cell is clicked
function handleCellClick(clickedCellEvent) {
    // Retrieve cell that triggered event
    const clickedCell = clickedCellEvent.target;
    // Check if cell is already played, game is not active, or if it's the computer's turn
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    if (gameState[clickedCellIndex] !== "" || !gameActive || currentPlayer === 'Lemon') {
        return;
    }

    // If it's the human's turn and that cell can be played, play it and update the game
    playCell(clickedCell, clickedCellIndex);
    updateGameStatus();
}

// Updates game status
function updateGameStatus() {
    const result = checkWinner();
    // If there's a winner
    if (result) {
        gameActive = false;
        // Announce winner(s)
        if (result === 'tie') {
            document.getElementById('resultDisplay').innerText = "It's a tie!";
        } else {
            document.getElementById('resultDisplay').innerText = `${result} Wins!`;
        }
    } else {
        // Switch to next player
        togglePlayer();
    }
}

// Selects the other player
function togglePlayer() {
    // If the current player is Strawberry (human), switch to computer, else switch to human and display
    currentPlayer = currentPlayer === 'Strawberry' ? 'Lemon' : 'Strawberry';
    document.getElementById('resultDisplay').innerText = currentPlayer + "'s turn";

    // Check current difficulty for computer's next move
    if (currentPlayer === 'Lemon' && gameActive) {
        let level = getLevel();
        if(level === 'easy')
            easyModeComputerMove();
        else if(level === 'medium')
            mediumModeComputerMove();
        else // If level = hard
            hardModeComputerMove(9); 
    }
}

// Check if there's currently a winner
function checkWinner() {
    for (let state of winningStates) {
        // If the board is in one of the winning states, then the current player won
        const [a, b, c] = state.map(i => gameState[i]);
        // Make sure the same player got 3 in a row and return
        if (a && a === b && b === c) {
            return a;  // 'Strawberry' or 'Lemon'
        }
    }

    // If there is no empty cell and no one's won, it's a tie
    if (!gameState.includes("")) {
        return 'tie'; // Game is a draw
    }
    return null; // No winner yet
}

// Easy mode move: Computer chooses random cell
function easyModeComputerMove() {
    let emptyCells = [];
    // Put all empty cells into the array
    gameState.forEach((cell, i) => {
        if (cell === "") {
            emptyCells.push(i);
        }
    });

    // Pick a random cell from the array to play
    if (emptyCells.length > 0) {
        const move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        playCell(cells[move], move);  // Assume this function places the mark and updates the game state
        updateGameStatus();  // Assume this function checks for a win/draw and updates the UI
    }
}

// Medium mode move: Choose move depending on current state with static evaluator
function mediumModeComputerMove() {

    // Check if computer can win or block now
    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] === "") {

            // Test for a winning move for 'Lemon' with game array
            gameState[i] = 'Lemon';
            // If it works, play it on the board
            if (checkWinner() === 'Lemon') {
                playCell(cells[i], i);
                updateGameStatus();
                return;
            }

            // If it doesn't work, reset the cell in the array
            gameState[i] = '';

            // Test for blocking 'Strawberry' from winning
            gameState[i] = 'Strawberry';
            if (checkWinner() === 'Strawberry') {
                // Place 'Lemon' for blocking and if it works, play it on the board
                gameState[i] = 'Lemon'; 
                playCell(cells[i], i);
                updateGameStatus();
                return;
            }

            gameState[i] = ''; // Reset the cell
        }
    }

    // Try to take the center cell if it's empty
    if (gameState[4] === "") {
        gameState[4] = 'O';
        playCell(cells[4], 4);
        updateGameStatus();
        return;
    }

    // Try to take corners next
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => gameState[i] === "");
    if (availableCorners.length > 0) {
        // Choose a random available corner
        const move = availableCorners[Math.floor(Math.random() * availableCorners.length)];
        gameState[move] = 'Lemon';
        playCell(cells[move], move);
        updateGameStatus();
        return;
    }

    // Last resort: Play a random move
    easyModeComputerMove();
}

// Hard mode move: Minimax
function hardModeComputerMove(maxDepth) {
    // Initialize variables to find the best possible move
    let bestScore = -Infinity;
    let move = null;
    // For all cells in the board
    for (let i = 0; i < gameState.length; i++) {
        // If a cell is empty, put an 'O' and test it out
        if (gameState[i] === "") {
            gameState[i] = 'Lemon';
            // Calculate the score from this move and undo it
            let score = minimax(gameState, 0, false, maxDepth);
            gameState[i] = "";
            // See if current move is better than the last tested one
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    // Play the best move on the board
    if (move != null) {
        playCell(cells[move], move);
        updateGameStatus();
    }

    // Minimax algorithm that calculates score for current player
    function minimax(board, depth, isMaximizing, maxDepth) {
        // If reached the bottom of the game tree, end that branch's search
        if (depth === maxDepth) return 0;
        // If there's a winner, return a score based on the winner
            // Lemon = 10, Strawberry = -10, tie = 0
        let winner = checkWinner();
        if (winner !== null) {
            return winner === 'Lemon' ? 10 : winner === 'Strawberry' ? -10 : 0;
        }

        // Maximize the turn
        if (isMaximizing) {
            // Initialize best score for maximizing player
            let bestScore = -Infinity;
            // Try to simulate the maximizing player's move 
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = 'Lemon';
                    // Recursively call minimax for next depth and switch to minimizing move
                    let score = minimax(board, depth + 1, false, maxDepth);
                    // Undo the move to look at other moves, and update maximum score
                    board[i] = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            // Try to simulate the minimizing player's move in the same way
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = 'Strawberry';
                    let score = minimax(board, depth + 1, true, maxDepth);
                    board[i] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }
}