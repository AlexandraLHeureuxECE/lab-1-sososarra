// script.js
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");
const boardElement = document.getElementById("board");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function updateStatusMessage(message) {
  statusText.textContent = message;
}

function handleCellClick(event) {
  const index = event.target.getAttribute("data-index");

  if (board[index] !== "" || !gameActive) {
    return;
  }

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  const winningCombo = getWinningCombination();
  if (winningCombo) {
    highlightWinningCells(winningCombo);
    updateStatusMessage(`Player ${currentPlayer} has won the game!`);
    endGame();
    return;
  }

  if (board.every(cell => cell !== "")) {
    updateStatusMessage("Game ended in a draw.");
    endGame();
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatusMessage(`Player ${currentPlayer}'s turn`);
}

function getWinningCombination() {
  return winningCombinations.find(combination =>
    combination.every(index => board[index] === currentPlayer)
  );
}

function highlightWinningCells(combination) {
  combination.forEach(index => {
    cells[index].classList.add("winner");
  });
}

function endGame() {
  gameActive = false;
  boardElement.classList.add("disabled");
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });

  boardElement.classList.remove("disabled");
  updateStatusMessage("Player X's turn");
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
