document.addEventListener("DOMContentLoaded", startGame);

// Define your `board` object here!
var board = {
  cells: [
    { row: 0, col: 0, isMine: false, hidden: true, surroundingMines: 0 },
    { row: 0, col: 1, isMine: false, hidden: true, surroundingMines: 1 },
    { row: 0, col: 2, isMine: true, hidden: true, surroundingMines: 0 },
    { row: 0, col: 3, isMine: false, hidden: true, surroundingMines: 1 },
    { row: 0, col: 4, isMine: false, hidden: true, surroundingMines: 0 },
    { row: 1, col: 0, isMine: false, hidden: true, surroundingMines: 1 },
    { row: 1, col: 1, isMine: false, hidden: true, surroundingMines: 2 },
    { row: 1, col: 2, isMine: false, hidden: true, surroundingMines: 2 },
    { row: 1, col: 3, isMine: false, hidden: true, surroundingMines: 2 },
    { row: 1, col: 4, isMine: false, hidden: true, surroundingMines: 1 },
    { row: 2, col: 0, isMine: false, hidden: true, surroundingMines: 1 },
    { row: 2, col: 1, isMine: true, hidden: true, surroundingMines: 0 },
    { row: 2, col: 2, isMine: false, hidden: true, surroundingMines: 1 },
    { row: 2, col: 3, isMine: false, hidden: true, surroundingMines: 2 },
    { row: 2, col: 4, isMine: true, hidden: true, surroundingMines: 1 },
    { row: 3, col: 0, isMine: false, hidden: true, surroundingMines: 2 },
    { row: 3, col: 1, isMine: false, hidden: true, surroundingMines: 2 },
    { row: 3, col: 2, isMine: false, hidden: true, surroundingMines: 2 },
    { row: 3, col: 3, isMine: false, hidden: true, surroundingMines: 3 },
    { row: 3, col: 4, isMine: true, hidden: true, surroundingMines: 2 },
    { row: 4, col: 0, isMine: true, hidden: true, surroundingMines: 0 },
    { row: 4, col: 1, isMine: false, hidden: true, surroundingMines: 1 },
    { row: 4, col: 2, isMine: false, hidden: true, surroundingMines: 1 },
    { row: 4, col: 3, isMine: true, hidden: true, surroundingMines: 1 },
    { row: 4, col: 4, isMine: false, hidden: true, surroundingMines: 2 }
  ]
};

function startGame() {
  board.cells.forEach(cell => {
    return countSurroundingMines(cell);
  });
  lib.initBoard();
  surroundingMines = countSurroundingMines;
  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {
  for (i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine && !board.cells[i].isMarked) {
      return;
    } else if (!board.cells[i].isMine && board.cells[i].hidden) {
      return;
    }
  }
  lib.displayMessage("You win!");
}

//if cell isMine and not marked, return. if cell isn't mine and and is hidden, return.
//   lib.displayMessage('You win!')

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
  var count = 0;
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  surrounding.forEach(function(i) {
    if (i.isMine == true) {
      count++;
    }
  });

  return count;
}

/*
function createNewBoard() {
  for (var y = 0; y < 5; y++) {
    for (var x = 0; x < 5; x++) {
      board.cells = {
        row: x,
        column: y,
        isMine: true,
        isMarked: false,
        hidden: true
      };
    }
  }
}

//Each cell will need row, col, isMine, isMarked, and hidden properties.
//You could start by simply setting every isMine to true, but later you'll probably want to //have a random number of mines scattered throughout the board.

function resetGame() {
  document.getElementById("newGame").addEventListener("click", createNewBoard);
}

//creates a new game but still has old one there!
*/
