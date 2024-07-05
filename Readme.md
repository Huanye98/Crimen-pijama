# CRIMEN PIJAMA

## [Play the game!] https://huanye98.github.io/Crimen-pijama/
![Game-logo Image](../crimen-pijama/images/ooooo.webp)

# Description

Cute "Metal Slug" like game, where you are a pink character that needs to clear all enemies and beat the boss.


# Main Functionalities

- The main character can move left and right using A and D key and jump with spacebar
- By clicking you will be able to shoot snow balls that will upgrade depending on how many enemies you have defeated.
- Depending on how many enemies you have defeated, the difficulty will increase, at 10 enemies little chickens will drop from the sky, at 25 the droping rate will double and at 50 the final boss will spawn.
- Three different types of enemies will appear from the right of the screen with different stats, one will be smaller, faster with less life points, others will be slower, bigger and with more hp and the third type will be a balace on previous two.
- The game ends when you have beaten the final boss or you have been taken three of of your three lives.
- The player can submit their player name before starting and the game will record in a scoreboard how many points the player has scored with its corresponding player name and then the scoreboard will automatically update and sort depending on the score.
- The game will contain a user interface with the ammount of lives left, the score and how many enemies are left and how many the player has defeated in that moment.


# Backlog Functionalities

- Adding more levels with their corresponding difficulties.
- Adding more enemies and powerUps so the game is more entertaining.
- Increasing the bosses difficulty so it feels more challenging and rewarding upon being defeated.
- Making the game and page responsive so the size of the game can be adjusted.

# Technologies used

- HTML
- CSS
- JavaScript
- DOM Manipulation
- JS Canvas
- JS Classes
- Local Storage
- JS Audio() and JS Image()
- Adobe photoshop


# States

- Start Screen
- Game Screen
- Game Over Screen

# Proyect Structure

## main.js

- list here the functions names of your main.js

## main.js

### Functions

- `startGame()`
- `verifyLocalStorage()`
- `gameloop()`
- `enemySpawn()`
- `skyEnemy()`
- `shoot()`
- `PlayerEnemycollision()`
- `projectileEnemycollision()`
- `EnemyDeletion()`
- `bulletDeletion()`
- `updateScore()`
- `gameOver()`
- `resetGame()`

### Audio Functions

- `playPlayerDMG()`
- `playBGM()`
- `playwin()`
- `stopBGM()`
- `playGameover()`

## Player.js 

### Properties

- `this.node`
- `this.x`
- `this.y`
- `this.w`
- `this.h`
- `this.isJumping`
- `this.lives`
- `this.gravSpeed`
- `this.isInvulnerable`
- `this.middleX`
- `this.frontX`

### Methods

- `idle()`
- `moveLeft()`
- `moveRight()`
- `moveBackground(middleSpeed, frontSpeed)`
- `jump()`
- `gravity()`
- `hp()`
- `takeDmg()`
- `startInvulnerable()`

## Projectile.js

### Variables

- `this.node`
- `this.x`
- `this.y`
- `this.w`
- `this.h`

### Methods

- `constructor(positionX, positionY)`
- `projectileMovement(type)`

## Enemy.js

### Variables

- `this.node`
- `this.type`
- `this.lives`
- `this.w`
- `this.h`
- `this.speed`
- `this.x`
- `this.y`

### Methods

- `constructor(type)`
- `movement()`

# Extra Links 

### Sketch
[Sketch Image](../crimen-pijama/images/Captura%20de%20pantalla%202024-07-05%20114152.png)

### Slides
[Link](https://docs.google.com/presentation/d/1ww1bBHYHk8g_oC8-yof66a3O5tG3kyPlMgcI5m89-dc/edit?usp=sharing)

## Deploy
[Link](https://huanye98.github.io/Crimen-pijama/)