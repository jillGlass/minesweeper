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
  board.cells.surroundingMines = countSurroundingMines;
  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {
  board.cells.forEach(function(i) {
    if (board.cells.isMine == true && board.cells.hidden == false) {
      return;
    } else if (board.cells.isMine && board.cells.isMarked == true) {
      return lib.displayMessage("You win!");
    } else return;
  });
}

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
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  var count = [];
  surrounding.forEach(function(i) {
    if (i.isMine == true) count.push(i++);
  });
}
