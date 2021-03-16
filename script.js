// https://www.youtube.com/watch?v=Y-GkMjUZsmM
// Build Tic Tac Toe With JavaScript - Tutorial

const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATION = [
  // horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //diagonal
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton =document.getElementById("restartButton")
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
let circleTurn;

startGame();
restartButton.addEventListener("click",startGame)

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click',handleClick)
    cell.addEventListener("click", handleClick, { once: true }); //click on cell , object only ever fire once eventlistner
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show")
}

function handleClick(e) {
  // console.log('clicked')
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  //place mark
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    //chekc for win
    // console.log("winner");
    endGame(false); //check for draw
  } else if (isDraw()) {
  endGame(true) 
} else {
  swapTurn(); //switch turns
  setBoardHoverClass(); 
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!"
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add("show");
}


function isDraw() {
return [...cellElements].every(cell=>{//destructor into an array so methend every check if cell contains X or O 
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
})
}


function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurn() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATION.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
