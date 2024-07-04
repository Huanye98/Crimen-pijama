class Player {
  constructor() {
    this.node = document.createElement("img");
    this.node.src = "./images/idle.gif";
    gameBox.append(this.node);

    this.x = 50;
    this.y = gameBox.offsetHeight - 100;
    this.w = 100;
    this.h = 100;

    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;

    this.node.style.position = "absolute";
    this.isJumping = false;
    this.lives = 3;
    this.gravSpeed = 8;
    this.isInvulnerable = false;

    this.middleX = 0;
    this.frontX = 0;
  }
  idle(){
    this.node = document.createElement("img")
  }
  moveLeft() {
    if(this.x <= 50){
      this.x = 50
      this.node.style.left = `${this.x}px`;
    }
    this.x -= 50;
    this.node.style.left = `${this.x}px`;
    charaObj.node.src = "./images/left.gif"
    this.moveBackground(5,10)
    
  }
  moveRight() {
    if(this.x >= gameBox.offsetWidth - 100){
      this.x = gameBox.offsetWidth -100
      this.node.style.left = `${this.x}px`;
    }
    this.x += 50;
    this.node.style.left = `${this.x}px`;
    charaObj.node.src = "./images/right.gif"
    this.moveBackground(-5,-10)
  }
  moveBackground(middleSpeed, frontSpeed){
    this.middleX += middleSpeed;
    this.frontX += frontSpeed;

    let middle = document.getElementById("middle");
    let front = document.getElementById("front");

    middle.style.transform = `translateX(${this.middleX}px)`;
    front.style.transform = `translateX(${this.frontX}px)`;
  }
  jump() {
    if (this.isJumping) return;
    this.node.src = "./images/Jump (32x32).png"
    this.isJumping = true;
    this.y -= 30;
    let jumpIntervalId = setInterval(() => {
      this.y -= 30;
      this.node.style.top = `${this.y}px`;
    }, 10);
    setTimeout(() => {
      clearInterval(jumpIntervalId);
      this.node.src = "./images/idle.gif"
    }, 100);
  }
  gravity() {
    if (this.y >= gameBox.offsetHeight - 100) {
      this.y = gameBox.offsetHeight - 100;
      this.isJumping = false;
      return;
      
    }
    this.y += this.gravSpeed;
    this.node.style.top = `${this.y}px`;
    this.node.src = "./images/Fall (32x32).png"
  }

  hp() {
    if (this.lives === 3) {
      document.querySelector("#hp").style.display = "flex"
    }
    if (this.lives === 2) {
      document.querySelector("#hp3").style.display = "none";
    }
    if (this.lives === 1) {
      document.querySelector("#hp2").style.display = "none";
    }
    if (this.lives <= 0) {
      document.querySelector("#hp1").style.display = "none";
      gameOver();
    }
  }
  takeDmg() {
    if (this.isInvulnerable === false) {
      this.lives -= 1;
      lives.innerText = charaObj.lives;
      this.hp();
      this.startInvulnerable();
    }
  }
  startInvulnerable() {
    this.isInvulnerable = true;
    this.node.style.backgroundColor = "red";
    this.node.style.padding = "0"
    setTimeout(() => {
      this.isInvulnerable = false;
      this.node.style.backgroundColor = "transparent";
    }, 1500);
  }
}
