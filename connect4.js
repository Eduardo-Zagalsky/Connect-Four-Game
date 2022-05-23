/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

var currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
const makeBoard = () => {
  for (let i = 0; i < HEIGHT; i++) {
    board.push(new Array(WIDTH));
  }
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
}

/** makeHtmlBoard: make HTML table and row of column tops. */
const makeHtmlBoard = () => {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");
  // TODO: add comment for this code
  var top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

const findSpotForCol = (x) => {
  for (let i = HEIGHT - 1; i >= 0; i--) {
    let cell = document.getElementById(`${i}-${x}`);
    if (!cell.firstChild) {
      return i;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

const placeInTable = (y, x) => {
  // TODO: make a div and insert into correct table cell
  let gameCoin = document.createElement("div");
  let cell = document.getElementById(`${y}-${x}`);
  if (currPlayer == 1) {
    gameCoin.className = "piece p1";
  } else if (currPlayer == 2) {
    gameCoin.className = "piece p2";
  }
  cell.append(gameCoin);
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg)
  // TODO: pop up alert message
}
/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  // TODO: add line to update in-memory board

  // place piece in board and add to HTML table
  board[y][x] = currPlayer;
  placeInTable(y, x);
  // switch players

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (checkForTie()) {
    return endGame("It's a draw!!");
  }
  switchPlayers();

}

// TODO: switch currPlayer 1 <-> 2
const switchPlayers = () => currPlayer == 1 ? currPlayer = 2 : currPlayer = 1;


/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    console.log(cells);
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

// check for tie
const checkForTie = () => {
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      let cell = document.getElementById(`${y}-${x}`);
      if (!cell.firstChild) {
        return false;
      }
    }
  }
  return true;
}

makeBoard();
makeHtmlBoard();
