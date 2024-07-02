class Player{
    constructor(){
        this.node = document.createElement("img")
        this.node.src = "./images/Jump (32x32).png"
        gameBox.append(this.node)

        this.x = 50
        this.y = gameBox.offsetHeight -100
        this.w = 100
        this.h = 100

        this.node.style.left = `${this.x}px`
        this.node.style.top = `${this.y}px`
        this.node.style.width = `${this.w}px`
        this.node.style.height = `${this.h}px`

        this.node.style.position = "absolute"
        this.isjumping = false
        this.lives = 3
        this.gravSpeed = 8
        this.isInvulnerable = false
    }
    moveLeft(){
        this.x -= 50
        this.node.style.left = `${this.x}px`
    }
    moveRight(){
        this.x += 50
        this.node.style.left = `${this.x}px`
    }
    jump(){  
         if(this.isjumping){return}
         this.isjumping = true
        let jumpIntervalId = setInterval(()=>{
        this.y -= 30
        this.node.style.top = `${this.y}px`
        },10)
        setTimeout(()=>{
            clearInterval(jumpIntervalId)
        },100)
    }
    gravity(){
        if(this.y >= gameBox.offsetHeight -100){
            this.y = gameBox.offsetHeight -100
            this.isjumping = false
            return
        }
        this.y += this.gravSpeed
        this.node.style.top = `${this.y}px`
    }

    hp(){
        if(this.lives === 3){
            return
        }
        if(this.lives ===2){
            document.querySelector("#hp3").remove()
        }
        if(this.lives ===1){
            document.querySelector("#hp2").remove()
        }
        if(this.lives <=0){
            document.querySelector("#hp1").remove()
            gameOver()
        }
    }
    takeDmg(){
        if(this.isInvulnerable === false){
            this.lives -= 1
            lives.innerText = charaObj.lives
            this.hp()
            this.startInvulnerable()

           
        }
        
    }
    startInvulnerable(){
        this.isInvulnerable = true
        this.node.style.backgroundColor = "red"
        setTimeout(()=>{
            this.isInvulnerable = false
            this.node.style.backgroundColor = "transparent"
        },1000)
    }
}