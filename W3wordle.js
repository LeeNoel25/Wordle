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
/*----- cached elements  -----*/
const introScreen = document.querySelector("#intro");
const gameScreen = document.querySelector("#game");
const statScreen = document.querySelector("#stats");
const screenList = [introScreen, gameScreen, statScreen];

const gameBoard = document.querySelector("#gameBoard");
const keyBoard = document.querySelector("#keyBoard");
const replayButton = document.querySelector("#playAgainButton");

let GAME_WIDTH = 4;
let CHANCES = 6;
let playerGuess = [];
//
let guessesRemaining = CHANCES;
let cellIndex = 0;

/*----- functions -----*/
function toGameScreen() {
  game.screen = "game";
}
function selectWord(wordLength) {
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
function renderScreen() {
  screenList.forEach((ele) => ele.classList.add("hidden"));
  const showScreen = document.querySelector("#" + game.screen);
  showScreen.classList.remove("hidden");
}
function renderGameBoard() {
  console.log("test");
  for (let i = 0; i < CHANCES; i++) {
    const boardRow = document.createElement("div");
    boardRow.classList.add("boardRow");
    for (let j = 0; j < GAME_WIDTH; j++) {
      const boardCell = document.createElement("span");
      boardCell.innerText = "";
      boardCell.classList.add("boardCell");
      boardRow.appendChild(boardCell);
    }
    gameBoard.appendChild(boardRow);
  }
}
renderGameBoard();

function renderKeyBoard() {
  console.log("dog");
  for (let i = 0; i < KEYS.length; i++) {
    const keyRow = document.createElement("div");
    keyRow.classList.add("keyRow");
    for (let j = 0; j < KEYS[i].length; j++) {
      const keyCell = document.createElement("span");
      keyCell.innerText = KEYS[i][j].char;
      keyCell.classList.add("keyCell"); // cursor: pointer;
      /////////
      keyCell.addEventListener("click", (key) => {
        let clickedChar = key.char;
        if (clickedChar === "ENTER") {
          checkPlayerGuess();
          return;
        } else if (clickedChar === "BACKSPACE" && cellIndex !== 0) {
          deleteLetter();
          return;
        } else {
          inputKeys(clickedChar);
        }
      });
      //       if (KEYS[i][j].char === "ENTER") {
      //         keyCell.addEventListener("click", () => {
      //           checkPlayerGuess();
      //           // return;
      //         });
      //       } else if (KEYS[i][j].char === "BACKSPACE" && cellIndex !== 0) {
      //         keyCell.addEventListener("click", () => {
      //           deleteLetter();
      //           // return;
      //         });
      //       } else {
      //         keyCell.addEventListener("click", () => {
      //           inputKeys(KEYS[i][j]);
      //         });
      keyRow.appendChild(keyCell);
    }
    //
    keyBoard.appendChild(keyRow);
  }
}

renderKeyBoard();

function inputKeys(clickedKey) {
  console.log(cellIndex); // 0
  // Max chances reached
  if (guessesRemaining === 0) {
    return;
  }
  // Max chances reached
  if (cellIndex === GAME_WIDTH + 1) {
    return;
  }
  // Letters
  let inputChar = clickedKey ? clickedKey.char : ""; // chatGPT: added a check for clickedKey to make sure it is defined before trying to access its char property. If clickedKey is undefined, we set inputChar to an empty string.
  let row = document.querySelectorAll(".boardRow")[CHANCES - guessesRemaining];
  let cell = row.children[cellIndex]; // free code camp - try gameBoard[i][j]
  cell.innerText = inputChar;
  cell.classList.add("filled-cell"); // free code camp
  playerGuess.push(inputChar); // ["C", ...]
  cellIndex++;
}

inputKeys();

function deleteLetter() {
  // gets the correct row, finds the last box and empties it, and then resets the nextLetter counter
  let row = document.querySelectorAll(".boardRow")[CHANCES - guessesRemaining];
  let cell = row.children[cellIndex - 1];
  cell.innerText = "";
  cell.classList.remove("filled-cell");
  playerGuess.pop;
  cellIndex--;
}

function checkPlayerGuess() {
  console.log("test");
}

function changeCellColor() {
  console.log("test");
}
