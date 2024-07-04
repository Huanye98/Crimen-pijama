//Variables
//screen
let startScreen = document.querySelector("#start-screen");
let endScreen = document.querySelector("#end-screen");
let gameScreen = document.querySelector("#game-screen");
//BG
let back = document.querySelector("#back");
let middle = document.querySelector("#middle");
let front = document.querySelector("#front");

//gamebox
let gameBox = document.querySelector("#game-box");
//objects
let charaObj = null;
let badGuyObj = null;
let enemyArr = [];
let projectilesArr = [];
//intervals
let mainIntervalId = null;
let enemyInterval = null;
let isSpawning = true;
let skyEnemyInterval = null

//nodes
let lives = document.querySelector("#lives");
let points = document.querySelector("#points");
let enemyCount = document.querySelector("#enemyCount");
let gameName = document.querySelector("#player-name")

//local storage
const scoreboard = document.querySelector("#scoreboard");
let playerName = null;

//Start

function startGame() {
  //set up
  startScreen.style.display = "none";
  endScreen.style.display = "none";
  gameScreen.style.display = "flex";
  verifyLocalStorage();

  //objcts
  charaObj = new Player();

  //gameloop
  mainIntervalId = setInterval(() => {
    gameloop();
  }, 1000 / 60);

  enemyInterval = setInterval(() => {
    enemySpawn();
  
  }, 1100);
  skyEnemyInterval = setInterval (()=>{
    skyEnemy();
  },600)
}
function verifyLocalStorage() {
  if (!localStorage.getItem("score")) {
    localStorage.setItem("score", "[]");
  }
}

//todo lo que pase 60veces por segundo
function gameloop() {
  enemyArr.forEach((e) => e.movement());
  charaObj.gravity();
  PlayerEnemycollision();
  projectileEnemycollision();
  EnemyDeletion();
  gameOver();
  bulletDeletion();

  let numEnemyCount = Number(enemyCount.innerText);
  if (numEnemyCount < 25) {
    projectilesArr.forEach((e) => e.projectileMovement("normal"));
  } else if (numEnemyCount >= 25 && numEnemyCount < 50) {
    projectilesArr.forEach((e) => e.projectileMovement(1));
  } else if (numEnemyCount >= 50) {
    projectilesArr.forEach((e) => e.projectileMovement(2));
  }
}

//functions
function enemySpawn() {
  if (enemyCount.innerText < 50 && isSpawning === true) {
    let sizeType = Math.floor(Math.random() * 3);
    if (sizeType === 0) {
      let smallEnemy = new Enemy("small");
      enemyArr.push(smallEnemy);
    } else if (sizeType === 1) {
      let mediumEnemy = new Enemy("medium");
      enemyArr.push(mediumEnemy);
    } else if (sizeType === 2) {
      let bigEnemy = new Enemy("big");
      enemyArr.push(bigEnemy);
    }
  } else if (enemyCount.innerText >= 50 && isSpawning === true) {
    let boss = new Enemy("boss");
    enemyArr.push(boss);
    isSpawning = false;
  }
}
function skyEnemy() {
  let numEnemyCount = Number(enemyCount.innerText);
  if (numEnemyCount >= 25) {
    let skyEnemy = new Enemy("sky");
    enemyArr.push(skyEnemy);
  }
}
function shoot() {
  let pew = new Projectile(charaObj.x, charaObj.y);
  projectilesArr.push(pew);
}

function PlayerEnemycollision() {
  enemyArr.forEach((e) => {
    if (
      e.x < charaObj.x + charaObj.w &&
      e.x + e.w > charaObj.x &&
      e.y < charaObj.y + charaObj.h &&
      e.y + e.h > charaObj.y
    ) {
      charaObj.takeDmg();
      playPlayerDMG();
    }
  });
}
function projectileEnemycollision() {
  projectilesArr.forEach((projectile, pindex) => {
    enemyArr.forEach((enemy, eIndex) => {
      if (
        projectile.x < enemy.x + enemy.w &&
        projectile.x + projectile.w > enemy.x &&
        projectile.y < enemy.y + enemy.h &&
        projectile.y + projectile.h > enemy.y
      ) {
        enemy.lives--;
        projectilesArr.splice(pindex, 1);
        projectile.node.remove();
        if (enemy.lives <= 0) {
          enemyArr.splice(eIndex, 1);
          enemy.node.remove();
          points.innerText++;
          enemyCount.innerText++;
        }
        if (enemy.lives <= 0 && enemy.type === "boss") {
          enemyArr.splice(eIndex, 1);
          enemy.node.remove();
          points.innerText++;
          enemyCount.innerText++;
          gameOver();
          alert("congrats you won!");
        }
      }
    });
  });
}

function EnemyDeletion() {
  let firstEnemy = enemyArr[0];
  if (firstEnemy && firstEnemy.x - firstEnemy.w <= 0) {
    enemyArr.shift();
    firstEnemy.node.remove();
  }
  if(firstEnemy && firstEnemy.type === "sky" && firstEnemy.y >= gameBox.offsetHeight){
    enemyArr.shift()
    firstEnemy.node.remove()
  }
}
function bulletDeletion() {
  for (let i = projectilesArr.length - 1; i >= 0; i--) {
    let bullet = projectilesArr[i];
    if (bullet && bullet.x >= gameBox.offsetWidth) {
      projectilesArr.splice(i, 1);
      bullet.node.remove();
    }
  }
}
function updateScore() {
  //recibir local storage y parse
  const allScoresString = localStorage.getItem("score");
  const allScoreArr = JSON.parse(allScoresString);
  console.log(allScoreArr);
  if (playerName === null) {
    playerName = "Energúmeno";
  }
  const newScore = { userName: playerName, score: points.innerText };
  console.log(allScoreArr);
  allScoreArr.push(newScore);
  console.log(allScoreArr);
  allScoreArr.sort((elemento1, elemento2) => {
    return elemento2.score - elemento1.score;
  });
  allScoreArr.splice(5, allScoreArr.length);
 
  let newString = JSON.stringify(allScoreArr);
  localStorage.setItem("score", newString);

  //updating ul
  scoreboard.innerHTML = null;
  allScoreArr.forEach((e) => {
    const nameScore = document.createElement("li");
    nameScore.innerHTML = `${e.userName} : ${e.score}`;
    scoreboard.append(nameScore);
  });
}
function gameOver() {
  if (charaObj.lives === 0) {
    clearInterval(mainIntervalId);
    clearInterval(enemyInterval);
    clearInterval(skyEnemyInterval)
    endScreen.style.display = "flex";
    gameScreen.style.display = "none";
    mainIntervalId = null;
    enemyInterval = null;
    updateScore();
    stopBGM();
    playGameover();
  }
}
function resetGame() {
  //chara
  charaObj.node.remove();
  charaObj = null;
  //ui
  points.innerText = "0";
  lives.innerText = 3;
  document.querySelector("#hp3").style.display = "flex";
  document.querySelector("#hp2").style.display = "flex";
  document.querySelector("#hp1").style.display = "flex";

  //enemies

  for (let i = 0; i < enemyArr.length; i++) {
    enemyArr[i].node.remove();
  }
  enemyArr = [];
  for (let y = 0; y < projectilesArr.length; y++) {
    projectilesArr[y].node.remove();
  }
  projectilesArr = [];
  //start
  startGame();
}

//Event listeners
//start
let startBtn = document.querySelector("#start-btn");
//text input
let nameInput = document.querySelector("#name-input");
//submit button
let nameSubmit = document.querySelector("#name-submit");
//replay
let replay = document.querySelector("#replay");

//click start
startBtn.addEventListener("click", () => {
  startGame();
  playBGM();
  document.querySelector("h1").style.display = "block"
  gameName.innerText = playerName
});
//replay
replay.addEventListener("click", () => {
  resetGame();
  playBGM();
});

//Player movement
window.addEventListener("keydown", (e) => {
  if (e.code === "KeyA") {
    charaObj.moveLeft();
  }
  if (e.code === "KeyD") {
    charaObj.moveRight();
  }
  if (e.code === "Space") {
    charaObj.jump();
  }
  window.addEventListener("keyup",()=>{
    charaObj.idle()
  })
});
//shoot
gameBox.addEventListener("mousedown", () => {
  shoot();
});
//local storage

nameSubmit.addEventListener("click", () => {
  playerName = nameInput.value;
  nameInput.placeholder = "Name saved!";
  nameInput.value = "";
  nameInput.style.backgroundColor = "pink";
});

//audio
let bgm = document.querySelector("#bgm");
let playerDMG = document.querySelector("#playerDMG");
let gameoversfx = document.querySelector("#gameoversfx");
function playPlayerDMG() {
  playerDMG.play();
}

function playBGM() {
  bgm.currentTime = 0;
  bgm.play();
}
function stopBGM() {
  bgm.currentTime = 0;
  bgm.pause();
}
function playGameover() {
  gameoversfx.play();
}
