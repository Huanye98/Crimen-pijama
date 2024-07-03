class Projectile{
    constructor(positionX,positionY){
        this.node = document.createElement("img")
        this.node.src = "./images/Ice Particle.png"
        gameBox.append(this.node)

        this.x = positionX+50
        this.y = positionY+50
        this.w = 15
        this.h = 15

        this.node.style.position = "absolute"
        this.node.style.left = `${this.x}px`
        this.node.style.top = `${this.y}px`
        this.node.style.width = `${this.w}px`
        this.node.style.height = `${this.h}px`
    }
     projectileMovement(){
        this.x += 8
        this.node.style.left = `${this.x}px`
    }
}