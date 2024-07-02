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
        this.lifes = 2
    }
    moveLeft(){
        this.x -= 30
        this.node.style.left = `${this.x}px`
    }
    moveRight(){
        this.x += 30
        this.node.style.left = `${this.x}px`
    }
    jump(){  
         if(this.isjumping){return}
         this.isjumping = true
        let jumpIntervalId = setInterval(()=>{
        this.y -= 5
        this.node.style.top = `${this.y}px`
        },10)
        setTimeout(()=>{
            clearInterval(jumpIntervalId)
        },100)
    }

    
}