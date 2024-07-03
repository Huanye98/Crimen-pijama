
//Variables
    //screen
    let startScreen = document.querySelector("#start-screen")
    let endScreen = document.querySelector("#end-screen")
    let gameScreen = document.querySelector("#game-screen")
    //BG
    let back = document.querySelector("#back")
    let middle = document.querySelector("#middle")
    let front = document.querySelector("#front")
    
    //gamebox
    let gameBox = document.querySelector("#game-box")
    //objects
    let charaObj  = null
    let badGuyObj = null
    let enemyArr = []
    let projectilesArr = []
    //intervals
    let mainIntervalId = null
    let enemyInterval = null

    //nodes
    let lives = document.querySelector("#lives") 
    let points = document.querySelector("#points")


//Start

function startGame(){
    //set up 
    startScreen.style.display = "none"
    endScreen.style.display = "none"
    gameScreen.style.display = "flex"


    //objcts
            charaObj = new Player()
       
    
    //gameloop
    mainIntervalId = setInterval(()=>{
        gameloop()

    },1000/60)

    enemyInterval = setInterval(()=>{
        enemySpawn()
     
        
    },1100)
   
}

//todo lo que pase 60veces por segundo
function gameloop(){
    enemyArr.forEach(e=>e.movement())
    projectilesArr.forEach(e=>e.projectileMovement())
    charaObj.gravity()
    PlayerEnemycollision()
    projectileEnemycollision()
    EnemyDeletion()
    gameOver()
    bulletDeletion()
}



//functions
    function enemySpawn(){
        let sizeType = Math.floor(Math.random()*3)
        if(sizeType === 0){
            let smallEnemy = new Enemy("small")
        enemyArr.push(smallEnemy)
        }else if (sizeType === 1){
            let mediumEnemy = new Enemy("medium")
            enemyArr.push(mediumEnemy)
        }else if (sizeType === 2){
            let bigEnemy = new Enemy("big")
            enemyArr.push(bigEnemy)
        }
        

    }
    function shoot(){
        let pew = new Projectile(charaObj.x,charaObj.y)
        projectilesArr.push(pew)
    }
    
    function PlayerEnemycollision(){
        enemyArr.forEach((e)=>{
            if (
                e.x < charaObj.x + charaObj.w &&
                e.x + e.w > charaObj.x &&
                e.y < charaObj.y + charaObj.h &&
                e.y + e.h > charaObj.y 
              ) {
                charaObj.takeDmg()
                
              }
        })
    }
    function projectileEnemycollision(){
        projectilesArr.forEach((projectile,pindex)=>{
            enemyArr.forEach((enemy, eIndex) => {
            if (
                projectile.x < enemy.x + enemy.w &&
                projectile.x + projectile.w > enemy.x &&
                projectile.y < enemy.y + enemy.h &&
                projectile.y + projectile.h > enemy.y
              ) {
                enemy.lives--
                projectilesArr.splice(pindex,1)
                projectile.node.remove()
                if(enemy.lives <=0){
                    enemyArr.splice(eIndex,1)
                    enemy.node.remove()
                    points.innerText++
                }
    
                }
            })
        })
    }

    function EnemyDeletion(){
        let firstEnemy = enemyArr[0]
        if (firstEnemy && (firstEnemy.x - firstEnemy.w) <= 0){
            enemyArr.shift()
            firstEnemy.node.remove()
            charaObj.lives--
        }
    }
    function bulletDeletion(){
        for (let i = projectilesArr.length - 1; i >= 0; i--) {
            let bullet = projectilesArr[i];
            if (bullet && bullet.x >= gameBox.offsetWidth){
                projectilesArr.splice(i,1) 
                bullet.node.remove()
            }
        }
        
    }
    function gameOver(){
        if(charaObj.lives === 0){
            clearInterval(mainIntervalId)
            clearInterval(enemyInterval)
            endScreen.style.display = "flex"
            gameScreen.style.display = "none"
            mainIntervalId = null
            enemyInterval = null
        }
    }
    function resetGame(){
        //chara
        charaObj.node.remove()
        charaObj = null
        //ui 
        points.innerText = "0"
        lives.innerText= 3
        document.querySelector("#hp3").style.display = "flex"
        document.querySelector("#hp2").style.display = "flex"
        document.querySelector("#hp1").style.display = "flex"

        //enemies

        for (let i = 0; i<enemyArr.length;i++){
            enemyArr[i].node.remove()
        }
        enemyArr = []
        for (let y = 0; y<projectilesArr.length;y++){
            projectilesArr[y].node.remove()
        }
        projectilesArr = []
        //start
        startGame()


    }



//Event listeners
    //start
    let startBtn = document.querySelector("#start-btn")
    //text input
    let nameInput = document.querySelector("#name-input")
    //submit button
    let nameSubmit = document.querySelector("#name-submit")
    //replay
    let replay = document.querySelector("#replay")

    //click start
    startBtn.addEventListener("click",()=>{
        startGame()
    })
    //replay
    replay.addEventListener("click",()=>{
        resetGame()
    })

    //Player movement
    window.addEventListener("keydown",(e)=>{
        if(e.code ==="KeyA"){
            charaObj.moveLeft()
        }
        if(e.code ==="KeyD"){
            charaObj.moveRight()
        }
        if(e.code === "Space"){
            charaObj.jump()
        }

    })
    
     gameBox.addEventListener("mousedown",()=>{
         shoot()
    })
