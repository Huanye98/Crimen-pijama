//Variables
//screen
let startScreen = document.querySelector("#start-screen");
let endScreen = document.querySelector("#end-screen");
let gameScreen = document.querySelector("#game-screen");
let gameBox = document.querySelector("#game-box");

//BG
let back = document.querySelector("#back");
let middle = document.querySelector("#middle");
let front = document.querySelector("#front");

//objects
let charaObj = null;
let badGuyObj = null;
let enemyArr = [];
let projectilesArr = [];

//intervals
let mainIntervalId = null;
let enemyInterval = null;
let isSpawning = true;
let skyEnemyInterval = null;

//nodes
let lives = document.querySelector("#lives");
let points = document.querySelector("#points");
let enemyCount = document.querySelector("#enemyCount");
let gameName = document.querySelector("#player-name");
let gameHasEnded = false;

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
  skyEnemyInterval = setInterval(() => {
    skyEnemy();
  }, 600);
  gameHasEnded = false;
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
  if (numEnemyCount >= 10) {
    let skyEnemy = new Enemy("sky");
    enemyArr.push(skyEnemy);
  }
  if (numEnemyCount >= 20) {
    let skyEnemy = new Enemy("sky");
    enemyArr.push(skyEnemy);
    let skyEnemy2 = new Enemy("sky");
    enemyArr.push(skyEnemy2);
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
          charaObj.lives = 0;
          alert("Congrats you won!");
          playwin();
        }
      }
    });
  });
}
function EnemyDeletion() {
  let firstEnemy = enemyArr[0];
  if (firstEnemy.type === "sky") {
    if (firstEnemy.y >= gameBox.offsetHeight) {
      enemyArr.shift();
      firstEnemy.node.remove();
    }
  } else {
    if (firstEnemy && firstEnemy.x - firstEnemy.w <= 0) {
      enemyArr.shift();
      firstEnemy.node.remove();
    }
  }
}
function bulletDeletion() {
    let bullet = projectilesArr[0];
    if (bullet && bullet.x >= gameBox.offsetWidth) {
      projectilesArr.shift()
      bullet.node.remove();
    }
}
function updateScore() {
  if (gameHasEnded) return;
  gameHasEnded = true;
  //recibir local storage y parse
  const allScoresString = localStorage.getItem("score");
  const allScoreArr = JSON.parse(allScoresString);
  if (playerName === null) {
    playerName = "Energúmeno";
  }
  const newScore = { userName: playerName, score: points.innerText };
  allScoreArr.push(newScore);
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
//GameOver & reset
function gameOver() {
  if (charaObj.lives === 0) {
    if (!gameHasEnded) {
      clearInterval(mainIntervalId);
      clearInterval(enemyInterval);
      clearInterval(skyEnemyInterval);
      endScreen.style.display = "flex";
      gameScreen.style.display = "none";
      mainIntervalId = null;
      enemyInterval = null;
      updateScore();
      stopBGM();
      playGameover();
      gameHasEnded = true;
    }
  }
}
function resetGame() {
  //chara
  charaObj.node.remove();
  charaObj = null;
  //ui
  points.innerText = "0";
  lives.innerText = 3;
  enemyCount.innerText = "0";
  document.querySelector("#hp3").style.display = "flex";
  document.querySelector("#hp2").style.display = "flex";
  document.querySelector("#hp1").style.display = "flex";

  //enemies
  isSpawning = true;
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

//selector Variables
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
  document.querySelector("h1").style.display = "block";
  gameName.innerText = playerName;
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
  window.addEventListener("keyup", () => {
    charaObj.idle();
  });
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
let win = document.querySelector("#win");
let playerDMG = document.querySelector("#playerDMG");
let gameoversfx = document.querySelector("#gameoversfx");

function playPlayerDMG() {
  playerDMG.play();
}
function playBGM() {
  bgm.currentTime = 0;
  bgm.play();
}
function playwin() {
  win.currentTime = 0;
  win.play();
}
function stopBGM() {
  bgm.currentTime = 0;
  bgm.pause();
}
function playGameover() {
  gameoversfx.play();
}
