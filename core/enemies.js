import {variables} from "./variables.js"

export class Enemies {
    constructor(x, y, gameBord, enemySize = variables.GRID_CELL_SIZE, speed = variables.initialSpeed) {
        this.x = x
        this.y = y
        this.isAlive = true //active or no
        this.size = enemySize
        this.speed = speed
        this.direction = 'idle'
        variables.bord.append(this.create())
        this.state = true
        this.gameBoard = gameBord
        this.render()
        this.time = 100
    }

    create() {
        this.element = document.createElement('div')
        this.element.className = 'enemy'
        this.element.style = `
            width:  ${this.size}px;
            height: ${this.size}px;
            z-index: 100;
            position: absolute;
            will-change: transform;
            background-image: url('./img/enemy.gif');
            transform: translate(${this.y}px, ${this.x}px)
            `
            return this.element
    }

    render() {
        if (!this.isAlive) return
        this.element.style.transform = `translate(${this.y}px, ${this.x}px)`;
    }

    update(deltatime, gameBoard) {
        //time howa time li kan bin had l frame wl frame li kant 9bl
        if (!this.isAlive) return
        let distance = this.speed * deltatime, newX, newY
        if (this.direction === 'idle') {
            this.randomDirection();
        }

        if (this.direction === 'up') {
            newY = this.y - distance
            newX = this.x
        } else if (this.direction === 'down') {
            newY = this.y + distance
            newX = this.x

        } else if (this.direction === 'left') {
            newX = this.x - distance
            newY = this.y

        } else if (this.direction === 'right') {
            newX = this.x + distance
            newY = this.y
        }
        if (!this.checkForCollision(newX, newY, gameBoard.map)) {
            this.x = newX, this.y = newY
            this.render()
        }else{
            this.randomDirection();
        } 
        if(this.time <= 0) {
            this.randomDirection();
            this.time = 550
        }
        this.time -= 1
    }

    checkForCollision(newX, newY, gameBoard) {
        const corners = [
            { x: newX, y: newY },// Top-left
            { x: newX + this.size - 1, y: newY }, // Top-right
            { x: newX, y: newY + this.size - 1 }, // Bottom-left
            { x: newX + this.size - 1, y: newY + this.size - 1 } // Bottom-right
        ];
        for (let corner of corners) {
            const tileX = Math.floor(corner.x / variables.GRID_CELL_SIZE); // hadi hia column
            const tileY = Math.floor(corner.y / variables.GRID_CELL_SIZE); //hadi hia row

            if (tileX > gameBoard[0].length || tileX < 0 ||
                tileY > gameBoard.length || tileY < 0) {
                return true
            }
            if (gameBoard[tileX][tileY] == 1 || gameBoard[tileX][tileY] == 2||gameBoard[tileX][tileY] == 3) {
                return true
            }
        }
        return false
    }

    randomDirection() {
        const directions = ['up', 'down', 'left', 'right']
        this.direction = directions[Math.floor(Math.random() * directions.length)]
    }
}