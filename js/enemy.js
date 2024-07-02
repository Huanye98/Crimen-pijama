class Enemy{
    constructor(){
        this.node = document.createElement("img")
        this.node.src = "./images/Fall (32x32).png"
        gameBox.append(this.node)

        this.x = gameBox.offsetWidth
        this.y = gameBox.offsetHeight -100
        this.w = 100
        this.h = 100

        this.node.style.left = `${this.x}px`
        this.node.style.top = `${this.y}px`
        this.node.style.width = `${this.w}px`
        this.node.style.height = `${this.h}px`

        this.node.style.position = "absolute"


        this.speed = 3
    }
    movement(){
        this.x -= this.speed
        this.node.style.left = `${this.x}px`
    }
    


}