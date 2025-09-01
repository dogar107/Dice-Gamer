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
const boxes = document.querySelectorAll(".box");
const boxlist = document.querySelector(".box-list");
const allBoxes = Array.from(boxes); 
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
const start = document.getElementById("start");
const startBtn = document.getElementById("startBtn");
const okBtn = document.getElementById("okBtn");
const cancelBtn = document.getElementById("cancelBtn");
const traps=document.getElementById("trap");

customAlert1.style.display = "block";
startBtn.onclick = () => {
  customAlert1.style.display = "none";
  btn.style.filter = "none";
  totalscore.style.filter = "none";
  dice0.style.filter = "none";
  board.style.filter = "none";

  updateVisibleBoxes(1); 
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
  updateVisibleBoxes(1); 
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
      updateVisibleBoxes(1);
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

  if (position >= boxes.length) {
    position=boxes.length-1
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

function updateVisibleBoxes(level) {
  let start = 0;
  let end = 11;

  if (level === 2) {
    start = 0;
    end = 20;
  } else if (level === 3) {
    start = 0;
    end = 30;
  } else if (level === 4) {
    start = 0;
    end = 42;
  }

  while (boxlist.firstChild) {
    boxlist.removeChild(boxlist.firstChild);
  }

  for (let i = start; i <= end && i <boxes.length ; i++) {
    boxlist.appendChild(allBoxes[i]);
    const currentBox = boxes[position];
  if (currentBox && currentBox.id === "trap") {
    currentBox.style.backgroundColor = "red";
    gameStarted=true;
    setTimeout(()=>{
    currentBox.style.backgroundColor = "";
    scoreEl.textContent="0"
    updateVisibleBoxes(1);
    },1000)
    showToast("You landed on a TRAP! ☠️");
    //game.reset;
   
    } else if (currentBox && currentBox.id === "safezone") {
    currentBox.style.backgroundColor = "green";
    showToast("Safe Zone ☘️ ");
    setTimeout(()=>{
    currentBox.style.backgroundColor = "";
    },1000)
  }else if(position===41){
  showToast("You Win! 🎌");
  circleDiv.style.display="none";
  scoreEl.textContent="0";
  customAlert1.style.display="block";
  resetGame()
  game.reset()
  }
}
}

function updateLevel(pos) {
  let level = "";
  
  if (pos ===30 || pos >= 31) {
    level = 4;
  } else if (pos===20 || pos >= 21) {
    level = 3;
  } else if (pos===10 || pos >= 11) {
    level = 2;
  }else if(pos===0 || pos >=0){
    level = 1
  }
  Level.textContent = level;
  updateVisibleBoxes(level);
}

function showToast(message) {
  const x = document.getElementById("snackbar");
  x.textContent = message;
  x.classList.add("show");
  setTimeout(() => {
    x.classList.remove("show");
  }, 3000);
}