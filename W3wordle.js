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

const playbutton = document.querySelector("#playButton");

const introScreen = document.querySelector("#intro");
const gameScreen = document.querySelector("#game");
const statScreen = document.querySelector("#stats");
const screenList = [introScreen, gameScreen, statScreen];
const levelButtons = document.querySelector("#levelButtons");

const gameBoard = document.querySelector("#gameBoard");
const keyBoard = document.querySelector("#keyBoard");
const replayButton = document.querySelector("#playAgainButton");

let GAME_WIDTH = 4;
let CHANCES = 6;
let playerGuess = [];
let guessesRemaining = CHANCES;
let cellIndex = 0;
let winStreak = 0;

/*----- functions -----*/
function renderCaption() {
  const caption = document.querySelector("#Winstreak");
  caption.textContent = `Win Streak ${winStreak}`;
}

function resetGameBoard() {
  gameBoard.innerHTML = "";
  keyBoard.innerHTML = "";
  guessesRemaining = 6;
  cellIndex = 0;
  playerGuess = [];
  gameAnswer = gameWord(GAME_WIDTH);
  console.log(gameAnswer);
  renderGameBoard();
  renderKeyBoard();
  renderCaption();
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

function renderScreen() {
  screenList.forEach((ele) => ele.classList.add("hidden"));
  const showScreen = document.querySelector("#" + SCREEN);
  showScreen.classList.remove("hidden");
}

function playGame() {
  playButton.style.display = "none";
  introScreen.style.display = "none";
  gameScreen.style.display = "block";
  resetGameBoard();
}

function renderGameBoard() {
  for (let i = 0; i < CHANCES; i++) {
    const boardRow = document.createElement("div");
    boardRow.classList.add("boardRow");
    for (let j = 0; j < GAME_WIDTH; j++) {
      const boardCell = document.createElement("span");
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
      keyCell.classList.add("keyCell");
      keyCell.addEventListener("click", (key) => {
        let clickedChar = key.target.innerText;
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
      keyRow.appendChild(keyCell);
    }
    keyBoard.appendChild(keyRow);
  }
}

function inputKeys(clickedKey) {
  // Max chances reached
  if (cellIndex === GAME_WIDTH + 1) {
    return;
  }
  // Letters
  // identifying the present cell
  let row = document.querySelectorAll(".boardRow")[CHANCES - guessesRemaining]; // 0
  let cell = row.children[cellIndex]; // free code camp
  cell.innerText = clickedKey;
  playerGuess.push(clickedKey); // ["C", ...]
  cellIndex++;
}

function deleteLetter() {
  // gets the correct row, finds the last box and empties it, and then resets the nextLetter counter
  let row = document.querySelectorAll(".boardRow")[CHANCES - guessesRemaining];
  let cell = row.children[cellIndex - 1];
  if (cell.innerText === "") {
    return;
  }
  cell.innerText = "";
  playerGuess.pop();
  cellIndex--;
}

function checkPlayerGuess() {
  if (playerGuess.length != GAME_WIDTH) {
    alert("Not enough letters!");
    return;
  }
  let row = document.querySelectorAll(".boardRow")[CHANCES - guessesRemaining]; // gameBoard
  let keyboardRows = document.querySelectorAll(".keyRow"); // keyBoard

  // used to locate specific displaybox in board
  for (let i = 0; i < playerGuess.length; i++) {
    const letter = playerGuess[i];
    const correctLetter = gameAnswer[i];
    const box = row.children[i];
    // used to locate index of specific key in keyboard (row+key)
    let jIndex = 0; // 3
    let kIndex = 0; // ~9
    for (let j = 0; j < KEYS.length; j++) {
      const row = KEYS[j];
      for (let k = 0; k < row.length; k++) {
        const key = row[k].char;
        if (key === letter) {
          jIndex = j;
          kIndex = k;
        }
      }
    }
    const key = keyboardRows[jIndex].children[kIndex];

    // Coloring the displayboard and keyboard
    if (letter === correctLetter) {
      box.style.backgroundColor = "green";
      key.style.backgroundColor = "green";
    } else if (gameAnswer.includes(letter)) {
      box.style.backgroundColor = "yellow";
      key.style.backgroundColor = "yellow";
    } else {
      box.style.backgroundColor = "red";
      key.style.backgroundColor = "red";
    }

    // Game is won
    if (playerGuess.join("") === gameAnswer) {
      showModal(modalWin);
      winStreak++;
      resetGameBoard();
      return;
    }
  }
  guessesRemaining--;
  // Game is lost
  if (guessesRemaining === 0) {
    showModal(modalLose);
    winStreak = 0;
    resetGameBoard();
    return;
  }
  cellIndex = 0;
  playerGuess = [];
}
// Rendering the game board and difficulty options
function main() {
  playbutton.addEventListener("click", playGame);

  const fourLetters = document.querySelector("#fourLetters");
  fourLetters.addEventListener("click", () => {
    GAME_WIDTH = 4;
    winStreak = 0;
    resetGameBoard();
  });

  const fiveLetters = document.querySelector("#fiveLetters");
  fiveLetters.addEventListener("click", () => {
    GAME_WIDTH = 5;
    winStreak = 0;
    resetGameBoard();
  });

  const sixLetters = document.querySelector("#sixLetters");
  sixLetters.addEventListener("click", () => {
    GAME_WIDTH = 6;
    winStreak = 0;
    resetGameBoard();
  });
}
main();

//-- MODAL ---//
let modalWin = document.querySelector("#modal-win"); //modal for winning & losing screen
let modalLose = document.querySelector("#modal-lose");

function showModal(modal) {
  modal.style.display = "block";
  setTimeout(function () {
    modal.style.display = "none";
  }, 4000);
}
