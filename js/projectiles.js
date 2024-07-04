class Projectile{
    constructor(positionX,positionY,type){
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
     projectileMovement(type){
        if(type === "normal"){
        this.x += 8
        this.node.style.left = `${this.x}px`
        }else if(type == 1){
            this.x += 16
            this.node.style.left = `${this.x}px`
            this.node.style.backgroundColor = "red"
        }else if(type == 2){
            this.x += 32
            this.node.style.left = `${this.x}px`
            this.node.style.backgroundColor = "blue"
        }
    }
}