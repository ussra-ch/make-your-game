import { variables } from "./variables.js"
import { Bomb } from "./bomb.js"


export class Player {
    constructor(game, x, y) {
        this.game = game;
        this.pixelX = x * variables.GRID_CELL_SIZE;
        this.pixelY = y * variables.GRID_CELL_SIZE;
        this.speed = 2;
        this.maxSpeed = 4
        this.lives = 3;
        this.maxLives = 5
        this.bombs = [];
        this.maxBombs = 3;
        this.emortal = false;
        this.inagif = '3adi';
        this.element = null;
        this.time= 0
        this.createPlayerElement();
    }

    createPlayerElement() {
        const existingElement = document.getElementById('p');
        if (existingElement) {
            existingElement.remove();
        }
        if (!this.element && variables.bord) {
            this.element = document.createElement('div');
            this.element.id = 'p';
            this.element.style.position = 'absolute';
            this.element.style.width = `${variables.GRID_CELL_SIZE - 5}px`;
            this.element.style.height = `${variables.GRID_CELL_SIZE - 5}px`;
            this.element.style.backgroundSize = 'cover';
            this.element.style.backgroundImage = "url('./img/player/wa9f.gif')";
            this.element.style.zIndex = '10';
            variables.bord.appendChild(this.element);
        }
    }

    update() {
        // this.maxLives = this.game.player.maxLives;
        let moveX = 0, moveY = 0;
        // Handle movement
        if (this.game.input.keys[this.game.input.keys.length - 1] == 'ArrowUp') {
            moveY = -this.speed;
            this.inagif = 'up';
        } else if (this.game.input.keys[this.game.input.keys.length - 1] == 'ArrowDown') {
            moveY = this.speed;
            this.inagif = 'down';
        } else if (this.game.input.keys[this.game.input.keys.length - 1] == 'ArrowLeft') {
            moveX = -this.speed;
            this.inagif = 'left';
        } else if (this.game.input.keys[this.game.input.keys.length - 1] == 'ArrowRight') {
            moveX = this.speed;
            this.inagif = 'right';
        }

        // Reset animation if no movement
        if (moveX === 0 && moveY === 0) {
            this.inagif = '3adi';
        }

        // Calculate new position
        const newX = this.pixelX + moveX;
        const newY = this.pixelY + moveY;

        // Check collision and move
        if (this.canMove(newX, newY)) {
            this.pixelX = newX;
            this.pixelY = newY;
        }
     
     



        if (this.game.input.keys.includes(' ')) {
            this.placeBomb();
        }

        let X = this.pixelX / variables.GRID_CELL_SIZE;
        let Y = this.pixelY / variables.GRID_CELL_SIZE;
        const gridX = Math.round(X);
        const gridY = Math.round(Y);

        this.game.enemies.forEach(enemy => {
            const enemyGridX = Math.round(enemy.x / variables.GRID_CELL_SIZE);
            const enemyGridY = Math.round(enemy.y / variables.GRID_CELL_SIZE);

            if (enemyGridX === gridY && enemyGridY === gridX && this.time==0) {
                this.time = 1
                setTimeout(() => {
                  this.time = 0
                }, 3000)
                
                this.lives--;
                this.pixelX = 1 * variables.GRID_CELL_SIZE;
                this.pixelY = 1 * variables.GRID_CELL_SIZE;
                this.emortal = true;

                if (this.lives <= 0) {
                    this.game.gameOver = true;
                }
            }
        })

        if (this.game.map.map[gridY][gridX] === 4) {
            this.game.map.map[gridY][gridX] = 0;
            if (this.speed < this.maxSpeed) {
                this.speed += 0.5;
            }
            this.game.ui.score += 10;
            this.game.map.draw();
        }
        if (this.game.map.map[gridY][gridX] === 5) {
            this.game.map.map[gridY][gridX] = 0;
            if (this.lives < this.maxLives) {
                this.lives += 1;
            }
            this.game.ui.score += 10;
            this.game.map.draw();

        }
        if (this.game.map.map[gridY][gridX] === 6) {
            this.game.map.map[gridY][gridX] = 0;
            this.lives -= 1;
            this.game.ui.score -= 10;
            if (this.lives <= 0) {
                this.game.gameOver = true;
            }
            this.game.map.draw();

        }

        // Update bombs
        this.bombs.forEach(bomb => bomb.update());
        this.bombs = this.bombs.filter(bomb => !bomb.exploded);
    }

    canMove(newX, newY) {
        const playerSize = variables.GRID_CELL_SIZE - 5;
        const nudgeAmount = 1.5;
        const edgeThreshold = 0.4; // in tile units
        // Check corners of player hitbox
        const corners = [
            [newX, newY],
            [newX + playerSize, newY],
            [newX, newY + playerSize],
            [newX + playerSize, newY + playerSize]
        ];
        for (const [px, py] of corners) {
            let X = px / variables.GRID_CELL_SIZE;
            let Y = py / variables.GRID_CELL_SIZE;
            const gridX = Math.floor(X);
            const gridY = Math.floor(Y);
            // Check bounds
            if (gridY < 0 || gridY >= this.game.map.map.length ||
                gridX < 0 || gridX >= this.game.map.map[0].length) {
                return false;
            }
            const tile = this.game.map.map[gridY][gridX];
            if (tile === 1 || tile == 2) {
                // Nudge logic for all directions
                if (this.inagif === 'down' && X - gridX < edgeThreshold && gridX > 0 && this.game.map.map[gridY][gridX - 1] !== 1) {
                    this.pixelX -= nudgeAmount;
                }
                if (this.inagif === 'down' && gridX + 1 < this.game.map.map[0].length && (gridX + 1 - X) < edgeThreshold && this.game.map.map[gridY][gridX + 1] !== 1) {
                    this.pixelX += nudgeAmount;
                }
                if (this.inagif === 'up' && X - gridX < edgeThreshold && gridX > 0 && this.game.map.map[gridY][gridX - 1] !== 1) {
                    this.pixelX -= nudgeAmount;
                }
                if (this.inagif === 'up' && gridX + 1 < this.game.map.map[0].length && (gridX + 1 - X) < edgeThreshold && this.game.map.map[gridY][gridX + 1] !== 1) {
                    this.pixelX += nudgeAmount;
                }
                if (this.inagif === 'left' && Y - gridY < edgeThreshold && gridY > 0 && this.game.map.map[gridY - 1][gridX] !== 1) {
                    this.pixelY -= nudgeAmount;
                }
                if (this.inagif === 'left' && gridY + 1 < this.game.map.map.length && (gridY + 1 - Y) < edgeThreshold && this.game.map.map[gridY + 1][gridX] !== 1) {
                    this.pixelY += nudgeAmount;
                }
                if (this.inagif === 'right' && Y - gridY < edgeThreshold && gridY > 0 && this.game.map.map[gridY - 1][gridX] !== 1) {
                    this.pixelY -= nudgeAmount;
                }
                if (this.inagif === 'right' && gridY + 1 < this.game.map.map.length && (gridY + 1 - Y) < edgeThreshold && this.game.map.map[gridY + 1][gridX] !== 1) {
                    this.pixelY += nudgeAmount;
                }
                return false;
            }
        }
        return true;
    }

    placeBomb() {
        const centerX = this.pixelX + (variables.GRID_CELL_SIZE / 2);
        const centerY = this.pixelY + (variables.GRID_CELL_SIZE / 2);

        const gridX = Math.floor(centerX / variables.GRID_CELL_SIZE);
        const gridY = Math.floor(centerY / variables.GRID_CELL_SIZE);

        if (this.bombs.length < this.maxBombs &&
            !this.bombs.some(b => b.x === gridX && b.y === gridY)) {
            this.bombs.push(new Bomb(this.game, gridX, gridY));
        }
    }

    draw() {
        if (!this.element) {
            this.createPlayerElement();
        }

        if (this.element) {
            // this.element.style.left = `${this.pixelX}px`;
            this.element.style.transform = `translate(${this.pixelX}px, ${this.pixelY}px)`

            // Update animation
            if (this.inagif === 'right') {
                this.element.style.backgroundImage = "url('./img/player/liman.gif')";
            } else if (this.inagif === 'left') {
                this.element.style.backgroundImage = "url('./img/player/left.gif')";
            } else if (this.inagif === 'up') {
                this.element.style.backgroundImage = "url('./img/player/up.gif')";
            } else if (this.inagif === 'down') {
                this.element.style.backgroundImage = "url('./img/player/down.gif')";
            } else if (this.inagif === '3adi') {
                this.element.style.backgroundImage = "url('./img/player/wa9f.gif')";
            }
        }
        this.bombs.forEach(bomb => bomb.draw());
    }
}