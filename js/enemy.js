class Enemy{
    constructor(type){
        this.node = document.createElement("img")
        if(type === "small"){
            this.node.src = "./images/chick.gif"
            this.lives = 1 
            this.w = 50
            this.h = 50
            this.speed =12
        }else if(type === "medium"){
            this.node.src = "./images/frog.gif"
            this.lives = 3
            this.w = 100
            this.h = 100
            this.speed =8
        }else{
            this.node.src = "./images/gifmaker_me .gif"
            this.lives = 5
            this.w = 270
            this.h = 170
            this.speed =3
        }
        gameBox.append(this.node)

        this.x = gameBox.offsetWidth
        this.y = gameBox.offsetHeight - this.h

        this.node.style.left = `${this.x}px`
        this.node.style.top = `${this.y}px`
        this.node.style.width = `${this.w}px`
        this.node.style.height = `${this.h}px`

        this.node.style.position = "absolute"
        

        
    }
    movement(){
        this.x -= this.speed
        this.node.style.left = `${this.x}px`
    }
    


}