class Projectile{
    constructor(positionX,positionY){
        this.node = document.createElement("img")
        this.node.src = "./images/Ice Particle.png"
        gameBox.append(this.node)

        this.x = positionX+50
        this.y = positionY+50
        this.w = 10
        this.h = 10
        console.log(this.x)
        console.log(this.y)

        this.node.style.position = "absolute"
        this.node.style.backgroundColor = "red"
        this.node.style.left = `${this.x}px`
        this.node.style.top = `${this.y}px`
        this.node.style.width = `${this.w}px`
        this.node.style.height = `${this.h}px`
    }
     projectileMovement(){
        this.x += 8
        this.node.style.left = `${this.x}px`
        console.log("pew pew")
    }
}