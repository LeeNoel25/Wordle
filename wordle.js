/*----- constants -----*/
let GAME_WIDTH = 4;
let CHANCES = 6;
const fourLetterA = [
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
];
const fiveLetterA = [
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
];
const sixLetterA = [
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
/*----- state variables -----*/
const game = {
  screen: "intro",
  table: [
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ],
  answer: "",
};
/*----- cached elements  -----*/
const introScreen = document.querySelector("#intro");
const gameScreen = document.querySelector("#game");
const statScreen = document.querySelector("#stats");
const screenList = [introScreen, gameScreen, statScreen];

const table = document.querySelector("tbody");
const keyboard = document.querySelector("#keyboard");

const four = document.createElement("level");
const five = document.createElement("level");
const six = document.createElement("level");
const levels = [four, five, six];

/*----- functions -----*/
function toGameScreen() {
  game.screen = "game";
  renderAll();
}
function toStatScreen() {
  game.screen = "stats";
}
function setFiveLetters() {
  GAME_WIDTH = 5;
  renderAll();
}
function setSixLetters() {
  GAME_WIDTH = 6;
  renderAll();
}
function generateAnswer() {
  const randomIdx = Math.floor(Math.random() * fourLetterA.length);
  game.answer = fourLetterA[randomIdx];
}

/*----- renders -----*/
function renderScreen() {
  screenList.forEach((ele) => ele.classList.add("hidden"));
  const showScreen = document.querySelector("#" + game.screen);
  showScreen.classList.remove("hidden");
}

function renderBoard() {
  for (let i = 0; i < CHANCES; i++) {
    const tr = document.createElement("tr");
    const rowAnswers = [];

    for (let j = 0; j < GAME_WIDTH; j++) {
      //tr [td,td,td,td]
      const td = document.createElement("td");
      td.classList.add("cell");
      const input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("maxlength", "1");
      input.value = game.table[i][j];
      td.appendChild(input);
      tr.appendChild(td);

      input.addEventListener("input", (e) => {
        if (e.target.value.length > 0) {
          const inputs = document.querySelectorAll("input");
          const currentIndex = Array.from(inputs).indexOf(e.target);
          if (currentIndex < inputs.length - 1) {
            inputs[currentIndex + 1].focus();
          }
        }
      });

      // const erase = document.querySelector("erase");
      // erase.addEventListener("click", (key) => {
      //   if (e.target.value.length > 0) {
      //     const inputs = document.querySelectorAll("input");
      //     const currentIndex = Array.from(inputs).indexOf(e.target); // ChatGPT
      //     if (currentIndex < inputs.length - 1) {
      //       inputs[currentIndex + 1].focus(); // -1 for backspace
      //     }
      //   }
      // });
    } // end of j loop

    keyboard.addEventListener("click", (key) => {
      if (key.target.classList.contains("letter")) {
        let letter = "";
        letter = key.target.innerText;
        console.log(letter);
        game.table[i][j] = letter;
        rowAnswers.push(game.table[i][j]);
      }
    });

    // compare user answers to game answer
    if (rowAnswers.join("") === game.answer) {
      toStatScreen();
      console.log(game.screen);
    }
    table.appendChild(tr);
  } // end of i loop
}

function renderAll() {
  //generateAnswer();
  // renderScreen();
  // renderBoard();
}
function main() {
  const playbutton = document.querySelector("#play");
  playbutton.addEventListener("click", toGameScreen);

  const enterButton = document.querySelector("#enter");

  const playagainbutton = document.querySelector("#playagain");
  playagainbutton.addEventListener("click", toGameScreen);

  // keyboard.addEventListener("click", (evt) => {
  //   if (evt.target.classList.contains("letter")) {
  //     let letter = "";
  //     letter = evt.target.innerText;
  //     console.log(letter);
  //     game.table[i][j] = letter;
  //     rowAnswers.push(game.table[i][j]);
  //   }
  // });

  const enter = document.querySelector("enter");

  renderAll(); //render all happens twice
}

//main();
//renderBoard();

console.log(game.answer);

// const keyboard = document.querySelector("#keyboard");
// keyboard.addEventListener("click", (evt) => {
//   if (evt.target.classList.contains("letter")) {
//     let letter = "";
//     letter = evt.target.innerText;
//     console.log(letter);
//     game.table[i][j] = letter;
//     rowAnswers.push(game.table[i][j]);
//   }
// })
