// Initial references
// Create global variables for the different elements in the document
// The querySelector() method returns the first element that matches a CSS selector
// The getElementById() method returns the element that matches the ID

// Declare constant container set equal to object document, method querySelector, passing as an argument class ".container"
const container = document.querySelector(".container");
// Declare constant playerTurn set equal to object document, method getElementById, passing as an argument id "playerTurn"
const playerTurn = document.getElementById("playerTurn");
// Declare constant message set equal to object document, method getElementById, passing as an argument id "message"
const message = document.getElementById("message");
// Declare variable initialMatrix as a 2d array, 6 rows, 7 columns, initialized to all 0s
var initialMatrix = new Array(6).fill(0).map(() => new Array(7).fill(0));
// Declare variable currentPlayer to store the current player
var currentPlayer = 1;

// Write function gameOverCheck
function gameOverCheck() {
  console.log("gameOverCheck");
  return false;
}

// Write function winCheck
function winCheck() {
  console.log("winCheck");
  return false;
}

// Write function setPiece
function setPiece(startCount, colValue) {
  console.log("setPiece");

  // Declare variable rows initialized to object document, method querySelectorAll, passing argument class ".grid-row"
  var rows = document.querySelectorAll(".grid-row");
  // If the element in array initialMatrix at indexes parameters startCount and colValue is NOT equal to 0
  if (initialMatrix[startCount][colValue] !== 0) {
    // Decrement parameter startCount by 1
    startCount--;
    // Call function setPiece, passing as arguments parameters startCount and colValue
    setPiece(startCount, colValue);
  }
  // Else
  else {
    // Declare variable currentRow initialized to array rows, index startCount, method querySelectorAll, passing as an argument class ".grid-box"
    // Modify currentRow, index colValue, object classlist, method add, passing as arguments "filled" and `player${currentPlayer}`
    var currentRow = rows[startCount].querySelectorAll(".grid-box");
    currentRow[colValue].classList.add("filled", `player${currentPlayer}`);

    // Update array initialMatrix, indexes startCount and colValue, set equal to currentPlayer
    initialMatrix[startCount][colValue] = currentPlayer;
    // If function call winCheck, passing as arguments parameters startCount and colValue is true
    if (winCheck(startCount, colValue)) {
      // Call function gameOver, passing as an argument currentPlayer
      gameOver(currentPlayer);
    }
    // Set object message's innerHTML equal to `Player<span> ${currentPlayer}</span> wins`
    message.innerHTML = `Player<span> ${currentPlayer}</span> wins`;

    // Return false
    return false;
  }

  // Call function gameOverCheck
  gameOverCheck();
}

// Write function fillBox
function fillBox(e) {
  console.log("fillBox");
  // Declare variable colValue set equal to function parseInt() of parameter e, object target, function getAttribute, passing as argument "data-value"
  var colValue = parseInt(e.target.getAttribute("data-value"));

  // Call function setPiece, passing arguments 5 (because we have 6 rows, 0 - 5) and variable colValue
  setPiece(5, colValue);

  // Switch the currentPlayer, if currently 1 then 2, if currently 2, then 1
  currentPlayer = currentPlayer === 1 ? 2 : 1;

  // Set playerTurn's innerHTML to `Player <span>${currentPlayer}'s</span> turn`
  playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;
}

// Write function createBoard
function createBoard() {
  console.log("createBoard");

  // Iterate through the 2d array initialMatrix
  // Write an outer for in loop to iterate through the rows, loop control variable innerArray
  for (let innerArray = 0; innerArray < 6; innerArray++) {
    // console.log("we are in first loop");
    // Declare variable outerDiv set equal to object document, method createElement, passing "div" as an argument
    var outerDiv = document.createElement("div");
    // Modify outerDiv, classList, to add class "grid-row"
    outerDiv.classList.add("grid-row");

    // Modify outerDiv to setAttribute "data-value" to loop control variable innerArray
    outerDiv.setAttribute("data-value", innerArray);

    // Write an inner for in loop to iterate through the columns, loop control variable j
    // console.log("we are in betweeen loop");
    for (let j = 0; j < 7; j++) {
      console.log("we are in second loop");

      // Set each element in array initialMatrix to the value of 0
      console.log("index" + innerArray);
      initialMatrix[innerArray][j] = 0;
      console.log(initialMatrix[innerArray][j]);

      // Declare variable innerDiv set equal to object document, method createElement, passing "div" as an argument
      var innerDiv = document.createElement("div");

      // Modify innerDiv, classList, to add class "grid-box"
      innerDiv.classList.add("grid-box");

      // Modify innerDiv to setAttribute "data-value" to loop control variable j
      innerDiv.setAttribute("data-value", j);

      // Modify innerDiv to addEventListener, passing arguments "click" and (e) => { fillBox(e); }
      innerDiv.addEventListener("click", (e) => {
        fillBox(e);
      });

      // Modify outerDiv to appendChild, passing argument innerDiv
      outerDiv.appendChild(innerDiv);
    }
    // Modify container to appendChild, passing argument outerDiv
    container.appendChild(outerDiv);
  }
}

// Write function startGame
function startGame() {
  console.log("startGame");

  // Set currentPlayer to 1, player 1 always goes first
  currentPlayer = 1;

  // Set the container's innerHTML to an empty string
  container.innerHTML = "";

  // Call function createBoard
  createBoard();

  // Set playerTurn's innerHTML to `Player <span>${currentPlayer}'s</span> turn`
  playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;
}

// For the window.onload event, call function startGame
window.onload = startGame;
