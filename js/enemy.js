class Enemy {
  constructor(type) {
    this.node = document.createElement("img");
    this.type = type
    if (type === "small") {
      this.node.src = "./images/chick.gif";
      this.lives = 1;
      this.w = 50;
      this.h = 50;
      this.speed = 12;
      
      this.x = gameBox.offsetWidth;
      this.y = gameBox.offsetHeight - this.h;
    } else if (type === "medium") {
      this.node.src = "./images/frog.gif";
      this.lives = 3;
      this.w = 100;
      this.h = 100;
      this.speed = 8;
      
      this.x = gameBox.offsetWidth;
      this.y = gameBox.offsetHeight - this.h;
    } else if (type === "big") {
      this.node.src = "./images/gifmaker_me .gif";
      this.lives = 5;
      this.w = 270;
      this.h = 170;
      this.speed = 3;
      
      this.x = gameBox.offsetWidth;
      this.y = gameBox.offsetHeight - this.h;
    } else if (type === "boss") {
      this.node.src = "./images/bossIdle.gif";
      this.lives = 50;
      this.w = 500;
      this.h = 500;
      this.speed = 2;
      
      this.x = gameBox.offsetWidth;
      this.y = gameBox.offsetHeight - this.h;
    } else if (type === "sky") {
      this.node.src = "./images/chick.gif";
      this.w = 50;
      this.h = 50;
      this.speed = 6;
      this.x = Math.floor(Math.random() * gameBox.offsetWidth);
      this.y = 0;
    }
    gameBox.append(this.node);


    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;

    this.node.style.position = "absolute";
  }
  movement() {
    if (this.type === "small" || this.type === "medium" || this.type === "big" ) {
      this.x -= this.speed;
      this.node.style.left = `${this.x}px`;
    } else if (this.type === "boss"){
      setTimeout(() => {
        this.speed = 3;
        this.x -= this.speed;
        this.node.style.left = `${this.x}px`;
      }, 3000);
      setTimeout(()=>{
        this.speed = 0;
        this.x -= this.speed;
        this.node.style.left = `${this.x}px`;
      },6000)
    }else if (this.type === "sky") {
      this.y += this.speed;
      this.node.style.top = `${this.y}px`;
      }
    }
  }

