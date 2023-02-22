/*----- constants -----*/
const WORDLIST = [
  "wolf",
  "wasp",
  "swan",
  "seal",
  "puma",
  "pika",
  "newt",
  "mule",
  "orca",
  "mink",
  "mole",
  "lynx",
  "lion",
  "hare",
  "goat",
  "bear",
  "duck",
  "crab",
  "bull",
  "boar",
  "bison",
  "camel",
  "cobra",
  "dingo",
  "eagle",
  "gecko",
  "goose",
  "horse",
  "hyena",
  "koala",
  "liger",
  "llama",
  "moose",
  "mouse",
  "otter",
  "quail",
  "sheep",
  "skunk",
  "sloth",
  "tapir",
  "viper",
  "tiger",
  "panda",
  "turtle",
  "iguana",
  "python",
  "weasel",
  "wombat",
  "gopher",
  "walrus",
  "dugong",
  "beaver",
  "badger",
  "marlin",
  "turkey",
  "parrot",
  "toucan",
  "condor",
  "beluga",
  "urchin",
  "osprey",
  "minnow",
  "spider",
  "shrimp",
];
const KEYS = [
  [
    { char: "Q" },
    { char: "W" },
    { char: "E" },
    { char: "R" },
    { char: "T" },
    { char: "Y" },
    { char: "U" },
    { char: "I" },
    { char: "O" },
    { char: "P" },
  ],
  [
    { char: "A" },
    { char: "S" },
    { char: "D" },
    { char: "F" },
    { char: "G" },
    { char: "H" },
    { char: "J" },
    { char: "K" },
    { char: "L" },
  ],
  [
    { char: "ENTER" },
    { char: "Z" },
    { char: "X" },
    { char: "C" },
    { char: "V" },
    { char: "B" },
    { char: "N" },
    { char: "M" },
    { char: "BACKSPACE" },
  ],
];
let SCREEN = "intro";
/*----- cached elements  -----*/
//
const playbutton = document.querySelector("#playButton");

const introScreen = document.querySelector("#intro");
const gameScreen = document.querySelector("#game");
const statScreen = document.querySelector("#stats");
const screenList = [introScreen, gameScreen, statScreen];
//
const gameBoard = document.querySelector("#gameBoard");
const keyBoard = document.querySelector("#keyBoard");
const replayButton = document.querySelector("#playAgainButton");

let GAME_WIDTH = 4;
let CHANCES = 6;
let playerGuess = [];
//
let guessesRemaining = CHANCES;
let cellIndex = 0;
//
// let gameBoardCell = [];

/*----- functions -----*/

function resetGameBoard() {
  gameBoard.innerHTML = "";
  keyBoard.innerHTML = "";
  gameWord(GAME_WIDTH);
  gameAnswer = gameWord(GAME_WIDTH);
  console.log(gameAnswer);
  // let gameAnswer = gameWord(GAME_WIDTH);
  // console.log(gameAnswer);
  renderGameBoard();
  renderKeyBoard();
}
function gameWord(wordLength) {
  let filteredWords = [];
  // Filter words based on desired length
  for (let i = 0; i < WORDLIST.length; i++) {
    if (WORDLIST[i].length === wordLength) {
      filteredWords.push(WORDLIST[i].toUpperCase());
    }
  }
  // Randomly choose a word
  const randomIndex = Math.floor(Math.random() * filteredWords.length);
  return filteredWords[randomIndex];
}
gameWord(GAME_WIDTH);
let gameAnswer = gameWord(GAME_WIDTH);
console.log(gameAnswer);

function renderScreen() {
  screenList.forEach((ele) => ele.classList.add("hidden"));
  const showScreen = document.querySelector("#" + SCREEN);
  showScreen.classList.remove("hidden");
}
function toGameScreen() {
  SCREEN = "game";
}

function playGame() {
  resetGameBoard();
}
//----------------------------------------
function renderGameBoard() {
  // gameBoardCell = []
  for (let i = 0; i < CHANCES; i++) {
    // gameBoardCell[i] = [];
    const boardRow = document.createElement("div");
    boardRow.classList.add("boardRow");
    for (let j = 0; j < GAME_WIDTH; j++) {
      const boardCell = document.createElement("span");
      boardCell.innerText = ""; // maybe not needed
      boardCell.classList.add("boardCell");
      boardRow.appendChild(boardCell);
    }
    gameBoard.appendChild(boardRow);
  }
}

function renderKeyBoard() {
  for (let i = 0; i < KEYS.length; i++) {
    const keyRow = document.createElement("div");
    keyRow.classList.add("keyRow");
    for (let j = 0; j < KEYS[i].length; j++) {
      const keyCell = document.createElement("span");
      keyCell.innerText = KEYS[i][j].char;
      keyCell.classList.add("keyCell"); // cursor: pointer;
      /////////
      keyCell.addEventListener("click", (key) => {
        let clickedChar = key.target.innerText;
        console.log(clickedChar);
        if (clickedChar === "ENTER") {
          checkPlayerGuess(playerGuess);
          return;
        } else if (clickedChar === "BACKSPACE" && cellIndex !== 0) {
          deleteLetter();
          return;
        } else {
          inputKeys(clickedChar);
        }
      });
      keyRow.appendChild(keyCell);
    }
    //
    keyBoard.appendChild(keyRow);
  }
}

function inputKeys(clickedKey) {
  // console.log(cellIndex); // 0
  // Max chances reached
  if (cellIndex === GAME_WIDTH + 1) {
    return;
  }
  // Letters
  // identifying the present cell
  let row = document.querySelectorAll(".boardRow")[CHANCES - guessesRemaining]; // 0
  let cell = row.children[cellIndex]; // free code camp - try gameBoard[i][j] // 0
  cell.innerText = clickedKey;
  cell.classList.add("filled-cell"); // free code camp
  playerGuess.push(clickedKey); // ["C", ...]
  cellIndex++;
}

function deleteLetter() {
  // gets the correct row, finds the last box and empties it, and then resets the nextLetter counter
  let row = document.querySelectorAll(".boardRow")[CHANCES - guessesRemaining];
  let cell = row.children[cellIndex - 1]; // children
  cell.innerText = "";
  cell.classList.remove("filled-cell");
  playerGuess.pop();
  cellIndex--;
  // if ((cell.innerText = "")) {
  //   return;
  // }
}

function checkPlayerGuess(playerGuess) {
  let row = document.querySelectorAll(".boardRow")[CHANCES - guessesRemaining];
  let key = document.querySelectorAll(".keyCell");
  console.log(playerGuess);
  console.log(gameAnswer);
  console.log(row[i].innerText);
  if (playerGuess.length != GAME_WIDTH) {
    alert("Not enough letters!");
    return;
  }
  // ---------------------------------
  for (let i = 0; i < GAME_WIDTH; i++) {
    if (row[i].innerText === gameAnswer[i]) {
      //-----------
      row[i].style.backgroundColor = "green";
      key[i].style.backgroundColor = "green";
      alert("Well Done!");
      return;
      //---------------------
    } else if (gameAnswer.includes(playerGuess[i])) {
      row[i].style.backgroundColor = "yellow";
      key[i].style.backgroundColor = "yellow";
    } else {
      row[i].style.backgroundColor = "red";
      key[i].style.backgroundColor = "red";
    }
  }
}

// function changeCellColor() {
//   console.log("test");
// }

// Put difficulty options - add reset the game board
function main() {
  playbutton.addEventListener("click", playGame);

  const fourLetters = document.querySelector("#fourLetters");
  fourLetters.addEventListener("click", () => {
    GAME_WIDTH = 4;
    console.log(GAME_WIDTH);
    resetGameBoard();
  });

  const fiveLetters = document.querySelector("#fiveLetters");
  fiveLetters.addEventListener("click", () => {
    GAME_WIDTH = 5;
    console.log(GAME_WIDTH);
    resetGameBoard();
  });

  const sixLetters = document.querySelector("#sixLetters");
  sixLetters.addEventListener("click", () => {
    GAME_WIDTH = 6;
    console.log(GAME_WIDTH);
    resetGameBoard();
  });
}
main();

// Swiitch between screens

// win lose GIF - MODAL
// music

// Track the win streak - RESET THE GAME BAORD
