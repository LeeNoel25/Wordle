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
let WORD_LENGTH = 4;
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
/* Variables */
const playButton = document.querySelector("#playButton");
// const fourLetters = document.querySelector("#fourLetters");
// const fiveLetters = document.querySelector("#fiveLetters");
// const sixLetters = document.querySelector("#sixLetters");

const gameBoard = document.querySelector("#gameBoard");
const keyBoard = document.querySelector("#keyBoard");
const replayButton = document.querySelector("#playAgainButton");

let gameWord = ""; // game Answer, e.g. WOLF
let gameRound = 1; // 1 of 6
let gamePosition = 1; // 1 OF 4
let gameState = []; // { element: xxx, char: xxx }
let userAnswer = []; //user inputs

/* Functions */

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

// Display board -----gamestate
function renderGameBoard() {
  gameState = [];
  for (let i = 0; i < GAME_ROUNDS; i++) {
    gameState[i] = [];

    for (let j = 0; j < WORD_LENGTH; j++) {
      // Create individual cells for letters
      const newCell = document.createElement("div"); //nodes
      newCell.className = "displayCell";
      gameBoard.appendChild(newCell);
      gameState[i][j] = {
        element: newCell,
        char: "",
      };
    }
    // Create new row and append the cells from above
    const newRow = document.createElement("br");
    gameBoard.appendChild(newRow);
  }
}

//Keyboard ----element/newcell
function renderKeyboard() {
  for (let i = 0; i < KEYS.length; i++) {
    // 3 rows
    for (let j = 0; j < KEYS[i].length; j++) {
      // no of letters
      // Create new key cell
      const newCell = document.createElement("div");
      newCell.className = "keyCell";
      newCell.innerText = KEYS[i][j].char;
      // KEYS[i][j].element = newCell;

      if (KEYS[i][j].char === "ENTER") {
        newCell.addEventListener("click", () => {
          handleKeyInput(KEYS[i][j]);
        });
      } else if (KEYS[i][j].char === "BACKSPACE") {
        newCell.addEventListener("click", () => {
          handleKeyInput(KEYS[i][j]);
        });
      } else {
        newCell.addEventListener("click", () => {
          handleKeyInput(KEYS[i][j]);
        });
      }

      keyBoard.appendChild(newCell);
    }
    // Create new line
    const newRow = document.createElement("br");
    keyBoard.appendChild(newRow);
  }
}

function handleKeyInput(clickedKey) {
  //.element
  let inputChar = clickedKey.char;
  userAnswer.push(inputChar); // ["w","o","l",'f']
  let keyElement = clickedKey.element;
  let displayElement = gameState[gameRound][gamePosition].element;
  displayElement.innerText = inputChar;

  // Backspace **display has delay in showing**
  if (inputChar === "BACKSPACE") {
    displayElementText = "";
    gamePosition--;
    if (gamePosition < 0) {
      gamePosition = 0;
    }
    return;
  } else if (inputChar === "ENTER") {
    if (userAnswer.join("") === gameWord) {
      alert("congrats"); // to change to score screen
      return;
    }
    for (let i = 0; i < userAnswer.length; i++) {
      if (userAnswer[i] === gameWord[i]) {
        keyElement.style.backgroundColor = "green";
        displayElement.style.backgroundColor = "green";
      } else if (gameWord.includes(userAnswer[i])) {
        keyElement.style.backgroundColor = "yellow";
        displayElement.style.backgroundColor = "yellow";
      } else {
        keyElement.style.backgroundColor = "red";
        displayElement.style.backgroundColor = "red";
      }
    }
    gameRound++;
    gamePosition = 0;
    return;
  }
  if (inputChar !== "BACKSPACE") {
    gamePosition++;
  }

  // Check if round ended
  if (gamePosition >= WORD_LENGTH) {
    // Go to next round
    gamePosition = 0;
    gameRound++;
  }
  // Check if game ended
  if (gameRound >= GAME_ROUNDS) {
    console.log("U lost");
    // End game
  }
}
//+++++++++++++++

// function handleEnterInput() {
//   alert("enter");
// }

// function handleBackspaceInput() {
//   alert("backspace");
// }

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
  renderKeyboard();
}
function fourLetters() {
  WORD_LENGTH = 4;
  console.log("four Letters");
}
function fiveLetters() {
  WORD_LENGTH = 5;
  console.log("five Letters");
}
function sixLetters() {
  WORD_LENGTH = 6;
  console.log("six Letters");
}

/* Main */
// Load word list
// fetch("words.txt")
//   .then((response) => response.text())
//   .then((data) => {
// playButton.style.visibility = "visible";
// fourLetters.addEventListener("click", fourLetters);
// fiveLetters.addEventListener("click", fiveLetters);
// sixLetters.addEventListener("click", sixLetters);

playButton.addEventListener("click", onPlayGame);
selectWord(WORD_LENGTH);



