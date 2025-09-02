class Dice {
  score = 0;
  getScore() {
    return this.score;
  }
}

class Game extends Dice {
  constructor() {
    super();
  }
  reset() {
    this.score = 0;
  }
}

const game = new Game();
let position = 0;
let gameStarted = false;
const totalboxes = 42;

const rollBtn = document.getElementById("rollbtn");
const boxlist = document.querySelector(".box-list"); 
const scoreEl = document.getElementById("score");
const circleDiv = document.getElementById("circle");
const resetbtn = document.getElementById("reset");
const Level = document.getElementById("levelscore");
const customAlert1 = document.getElementById("customAlert1");
const customAlert = document.getElementById("customAlert");
const btn = document.getElementById("btn");
const totalscore = document.getElementById("totalscore");
const dice0 = document.getElementById("dice0");
const board = document.getElementById("ii");
const quit = document.getElementById("quit");
const startBtn = document.getElementById("startBtn");
const okBtn = document.getElementById("okBtn");
const cancelBtn = document.getElementById("cancelBtn");
const trapsPositions = [5, 12, 19, 27, 35]; 
const safeZones = [3, 8, 15, 22, 30];   


const boxes = []; 


for(let i = 0; i < totalboxes; i++){
  const box = document.createElement("li");
  box.className = "box";
  box.textContent = i;
  boxes.push(box);
}

const allBoxes = boxes;

customAlert1.style.display = "block";

startBtn.onclick = () => {
  customAlert1.style.display = "none";
  btn.style.filter = "none";
  totalscore.style.filter = "none";
  dice0.style.filter = "none";
  board.style.filter = "none";

  updateVisibleBoxes(1, position);
};

quit.onclick = () => {
  customAlert1.style.display = "block";
  btn.style.filter = "blur(5px)";
  totalscore.style.filter = "blur(5px)";
  dice0.style.filter = "blur(5px)";
  board.style.filter = "blur(5px)";
};

function resetGame() {
  position = 0;
  game.reset();
  gameStarted = false;
  scoreEl.textContent = "0";
  Level.textContent = "";
  updateVisibleBoxes(1, position);
}
resetbtn.addEventListener("click", resetGame);

rollBtn.addEventListener("click", () => {
  const roll = Math.floor(Math.random() * 6) + 1;

  if (!gameStarted) {
    if (roll === 6 && position === 0) {
      gameStarted = true;
      position = 0;
      scoreEl.textContent = "0";
      Level.textContent = "1";
      circleDiv.style.display = "block";
      updateVisibleBoxes(1, position);
    } else {
      for (let j = 0; j < 6; j++) {
        const el = document.getElementById(`dice${j}`);
        if (el) {
          el.style.display = j === roll - 1 ? "block" : "none";
        }
      }
    }
  } else {
    position += roll;
    game.score += roll;
    scoreEl.textContent = game.score;
    updateLevel(position);
  }

  if (position >= totalboxes) {
    position = totalboxes - 1;
    showToast("Game Over!☠️");
    scoreEl.textContent = "0";
    game.reset();
    resetGame();
    customAlert.style.display = "block";

    okBtn.onclick = () => {
      customAlert.style.display = "none";
      resetGame();
    };

    cancelBtn.onclick = () => {
      customAlert.style.display = "none";
    };
  }

 
  for (let i = 0; i < 6; i++) {
    const el = document.getElementById(`dice${i}`);
    if (el) {
      el.style.display = i === roll - 1 ? "block" : "none";
    }
  }

 
  if (allBoxes[position]) {
    allBoxes[position].appendChild(circleDiv);
  }
});

function updateVisibleBoxes(level, currentPosition) {
  while (boxlist.firstChild) {
    boxlist.removeChild(boxlist.firstChild);
  }

 
  let maxIndex = 10; 
  if (level === 2) maxIndex = 20;
  else if (level === 3) maxIndex = 30;
  else if (level === 4) maxIndex = 41;

  
  maxIndex = Math.max(maxIndex, currentPosition + 2);

 
  for(let i = 0; i <= maxIndex && i < totalboxes; i++) {
    boxlist.appendChild(allBoxes[i]);
  }
}

function updateLevel(pos) {
  let level = 1;

  if (pos >= 31) {
    level = 4;
  } else if (pos >= 21) {
    level = 3;
  } else if (pos >= 11) {
    level = 2;
  }

  Level.textContent = level;
  updateVisibleBoxes(level, pos);
}

if (trapsPositions.includes(position)) {
  showToast("You landed on a TRAP! ☠️");
  position = 0;      
  game.reset();      
  scoreEl.textContent = "0";
  updateLevel(position);
  updateVisibleBoxes(1);
  circleDiv.style.display = "block";       
}

if (safeZones.includes(position)) {
  showToast("Safe Zone! 🟢");

}


function showToast(message) {
  const x = document.getElementById("snackbar");
  x.textContent = message;
  x.classList.add("show");
  setTimeout(() => {
    x.classList.remove("show");
  }, 3000);
}



 
