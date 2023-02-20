/* GAME CONFIGURATION */
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
const WORD_LENGTH = 4;
const GAME_ROUNDS = 6;
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
    { char: "ENTER", action: "enter" },
    { char: "Z" },
    { char: "X" },
    { char: "C" },
    { char: "V" },
    { char: "B" },
    { char: "N" },
    { char: "M" },
    { char: "BACKSPACE", action: "backspace" },
  ],
];

/* Variables */
const playButton = document.querySelector("#playButton");
const gameBoard = document.querySelector("#gameBoard");
const keyBoard = document.querySelector("#keyBoard");

let wordList = [];
let gameWord = ""; // "BEAR"
let gameRound = 1; // 1 of 6
let gamePosition = 1; // 1 of 4
let gameState = []; // { input: ['B', 'E', 'A', 'R']}

/* Functions */

//Processing WORDPOOL
function processWordList(data) {
  wordList = data.split("\n");
}
console.log(wordList);
function selectWord(wordLength) {
  let filteredWords = [];
  // Filter words based on desired length
  for (let i = 0; i < wordList.length; i++) {
    if (wordList[i].length === WORD_LENGTH) {
      filteredWords.push(wordList[i].toUpperCase());
    }
  }
  // Randomly choose a word
  const randomIndex = Math.floor(Math.random() * filteredWords.length);
  return filteredWords[randomIndex];
}

function handleKeyInput(keyObject) {
  let inputChar = keyObject.char;
  let keyElement = keyObject.element;
  let displayElement = gameState[gameRound][gamePosition].element;
  displayElement.innerText = inputChar;
  // Check if input character at the exact spot
  let correctFlag = false;
  if (inputChar === gameWord[gamePosition]) {
    keyElement.style.backgroundColor = "green";
    displayElement.style.backgroundColor = "green";
    correctFlag = true;
  }
  // Check input character exist
  if (gameWord.includes(inputChar)) {
    if (!correctFlag) {
      keyObject.element.style.backgroundColor = "yellow";
      displayElement.style.backgroundColor = "yellow";
    }
  } else {
    keyObject.element.style.backgroundColor = "#FF0000";
    displayElement.style.backgroundColor = "#FF0000";
  }
  gamePosition++;
  // Check if round ended
  if (gamePosition >= WORD_LENGTH) {
    // Go to next round
    gamePosition = 0;
    gameRound++;
  }
  // Check if game ended
  if (gameRound >= GAME_ROUNDS) {
    // End game
  }
}

function handleEnterInput() {
  alert("enter");
}

function handleBackspaceInput() {
  alert("backspace");
}

function renderGameBoard() {
  gameState = [];
  for (let i = 0; i < GAME_ROUNDS; i++) {
    gameState[i] = [];
    for (let j = 0; j < WORD_LENGTH; j++) {
      // Create new display cell
      const newCell = document.createElement("div");
      newCell.className = "displayCell";
      gameBoard.appendChild(newCell);
      gameState[i][j] = {
        element: newCell,
        char: "",
        state: "none",
      };
    }
    // Create new line
    const newRow = document.createElement("br");
    gameBoard.appendChild(newRow);
  }
}

function renderKeyBoard() {
  let counter = 0;
  for (let i = 0; i < KEYS.length; i++) {
    for (let j = 0; j < KEYS[i].length; j++) {
      // Create new key cell
      const newCell = document.createElement("div");
      newCell.className = "keyCell";
      newCell.innerText = KEYS[i][j].char;
      KEYS[i][j].element = newCell;
      if (KEYS[i][j]?.action === "enter") {
        newCell.addEventListener("click", handleEnterInput);
      } else if (KEYS[i][j]?.action === "backspace") {
        newCell.addEventListener("click", handleBackspaceInput);
      } else {
        newCell.addEventListener("click", () => {
          handleKeyInput(KEYS[i][j]);
        });
      }
      keyBoard.appendChild(newCell);
      counter++;
    }
    // Create new line
    const newRow = document.createElement("br");
    keyBoard.appendChild(newRow);
  }
}
function onPlayGame() {
  // Reset game
  gameRound = 0;
  gamePosition = 0;
  // Hide play button
  playButton.style.display = "none";
  // Select word
  gameWord = selectWord(WORD_LENGTH);
  console.log(`Selected Word: ${gameWord}`);
  // Prepare display
  renderGameBoard();
  renderKeyBoard();
}

/* Main */
// Load word list
fetch("words.txt")
  .then((response) => response.text())
  .then((data) => {
    processWordList(data);
    playButton.style.visibility = "visible";
    playButton.addEventListener("click", onPlayGame);
  });
