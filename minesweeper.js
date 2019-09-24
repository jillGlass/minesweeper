document.addEventListener("DOMContentLoaded", startGame);

// Define your `board` object here!

var board = {
  cells: []
};

// tick sound on each button click
var snd = new Audio("sounds/tick.wav");
document.addEventListener("click", function() {
  snd.play();
});
//crackle sound on each Flag
var sndFlag = new Audio("sounds/crackle.wav");
document.addEventListener("contextmenu", function() {
  sndFlag.play();
});
//rocket sound on each mine
var sndMine = new Audio("sounds/smallRocket.mp3");
//rocket sound on each mine but not working!
var sndWin = new Audio("sounds/clapping.mp3");

//define board object to be empty
function createNewBoard() {
  for (var x = 0; x < 6; x++) {
    for (var y = 0; y < 6; y++)
      board.cells.push({
        row: x,
        col: y,
        isMine: Boolean(Math.round(Math.random() * 0.7)),
        isMarked: false,
        hidden: true
      });
  }
}

function startGame() {
  createNewBoard();
  lib.initBoard();
  board.cells.forEach(cell => {
    cell.surroundingMines = countSurroundingMines(cell);
  });
  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);
}

// Define this function to look for a win condition:

function checkForWin() {
  for (i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine && !board.cells[i].isMarked) {
      return;
    } else if (!board.cells[i].isMine && board.cells[i].hidden) {
      return;
    }
  }
  lib.displayMessage("Out of this world!");
  sndWin.play();
}

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

//function resetGame() {
// window.location.href = window.location.href;
//document.getElementById("newGame").addEventListener("click", startGame);
//}

//After a win or loss, give players a chance to try again by resetting the board to its default state. You'll need to put classes back the way they were at the start, and re-initialize the global board object.
