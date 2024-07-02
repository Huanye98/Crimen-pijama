
//Variables
    //screen
    startScreen = document.querySelector("#start-screen")
    endScreen = document.querySelector("#end-creen")
    gameScreen = document.querySelector("#game-screen")
    
    //gamebox
    gameBox = document.querySelector("#game-box")
    //objects
    let charaObj  = null
    let badGuyObj = null
    let enemyArr = []
    let projectilesArr = []
    //intervals
    let mainIntervalId = null
    let enemyInterval = null



//Start

function startGame(){
    //set up 
    startScreen.style.display = "none"
    gameScreen.style.display = "flex"


    //objcts
    charaObj = new Player()

    //gameloop
    mainIntervalId = setInterval(()=>{
        gameloop()

    },1000/60)

    enemyInterval = setInterval(()=>{
        enemySpawn()
    },3000)

}

//todo lo que pase 60veces por segundo
function gameloop(){
    enemyArr.forEach(e=>e.movement())
    projectilesArr.forEach(e=>e.projectileMovement())
}



//functions
    function enemySpawn(){
        let EnemyObj = new Enemy()
        enemyArr.push(EnemyObj)
    }
    function shoot(){
        let pew = new Projectile(charaObj.x,charaObj.y)
        projectilesArr.push(pew)
    }
    






//Event listeners
    //start
    let startBtn = document.querySelector("#start-btn")
    //text input
    let nameInput = document.querySelector("#name-input")
    //submit button
    let nameSubmit = document.querySelector("#name-submit")
    //replay
    let replay = document.querySelector("replay")

    //click start
    startBtn.addEventListener("click",()=>{
        startGame()
    })

    //Player movement
    window.addEventListener("keydown",(e)=>{
        if(e.code ==="KeyA"){
            charaObj.moveLeft()
        }
        if(e.code ==="KeyD"){
            charaObj.moveRight()
        }
        if(e.code === "KeyW"){
            charaObj.jump()
        }

    })


    gameBox.addEventListener("click",()=>{
        shoot()
    })