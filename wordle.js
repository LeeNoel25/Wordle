/*----- constants -----*/
let GAME_WIDTH = 4;
let CHANCES = 6;
fourLetters = [
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
fiveLetters = [
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
sixLetters = [
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
    ],
  // enter button
};
/*----- cached elements  -----*/
const introScreen = document.querySelector("#intro");
const gameScreen = document.querySelector("#game");
const statScreen = document.querySelector("#stats");
const screenList = [introScreen, gameScreen, statScreen];

const table = document.querySelector("tbody");

const four = document.createElement('level');
const five = document.createElement('level');
const six = document.createElement('level');
const levels = [four,five,six];

/*----- functions -----*/
function toGameScreen() {
  game.screen = 'game';
  renderAll();
};
function toStatScreen(){
  game.screen = 'stats';
};
function fiveLetters() {
  GAME_WIDTH = 5;
  renderAll();
};
function sixLetters() {
  GAME_WIDTH = 6;
  renderAll();
};
function answer() {
  const answer = "";
  const randomIdx = Math.floor(Math.random() * fourLetters.length);
  answer.innerText = fourLetters[randomIdx];
  console.log(answer);
}
/*----- renders -----*/
function renderScreen() {
screenList.forEach(ele => ele.classList.add('hidden'));
const showScreen = document.querySelector("#" + game.screen);
showScreen.classList.remove("hidden");
};
function renderBoard() { // add if loop for width, text boxes
  for (let i = 0; i < CHANCES; i++) {
  const tr = document.createElement("tr");

    for (let j = 0; j < GAME_WIDTH; j++) {
      const td = document.createElement("td");

      const input =document.createElement("input");
      input.setAttribute('type','text');
      input.setAttribute('maxlength','1');
      input.value = game.table[i][j];

      // input.addEventListener("input", e) {
      //   if (e.target.value.length > 0) {
      //     e.target.nextElementSibling.focus();
      //   };}

      td.appendChild(input);
      tr.appendChild(td);
    };
    table.appendChild(tr);
};
};
function renderAll() {
  renderScreen();
  renderBoard();
};
function main() {
  const playbutton = document.querySelector('#play');
  playbutton.addEventListener("click", toGameScreen);

  const enterButton = document.querySelector('#enter');

  const playagainbutton = document.querySelector('#playagain');
  playagainbutton.addEventListener("click", toGameScreen);

  renderAll();
};

main();
