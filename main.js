import {variables} from "./variables.js"
class Map {
    constructor(game) {
        this.game = game;
        this.width = 80;
        this.height = 70;
        this.map = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 3, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
        this.addBoxes();
        this.createTilesContainer();
    }

    findEmptySpaces() {
        let emptySpaces = [];
        this.map.forEach((element, y) => {
            for (let x = 0; x < element.length; x++) {
                if (element[x] === 0) {
                    emptySpaces.push({ x, y });
                }
            }
        });
        return emptySpaces
    }

    addBoxes() {
        let emptySpaces = this.findEmptySpaces()
        for (let i = 0; i < 50; i++) {
            let pos = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
            if (pos) {
                this.map[pos.y][pos.x] = 2;
            }
        }
    }

    createTilesContainer() {
        if (!variables.tilesContainer) {
            variables.tilesContainer = document.createElement('div');
            variables.tilesContainer.style.position = "absolute";
            variables.tilesContainer.style.top = "0";
            variables.tilesContainer.style.left = "0";
            variables.tilesContainer.style.width = `${this.map[0].length * variables.GRID_CELL_SIZE}px`;
            variables.tilesContainer.style.height = `${this.map.length * variables.GRID_CELL_SIZE}px`;
            variables.tilesContainer.style.zIndex = "1";
            variables.bord.appendChild(variables.tilesContainer);
        }
    }

    draw() {
        // Setup board
        variables.bord.style.position = "relative";
        variables.bord.style.width = `${this.map[0].length * variables.GRID_CELL_SIZE}px`;
        variables.bord.style.height = `${this.map.length * variables.GRID_CELL_SIZE}px`;
        variables.bord.style.border = "2px solid #333";

        // Clear only tiles container
        if (variables.tilesContainer) {
            variables.tilesContainer.innerHTML = "";
        }

        // Draw tiles
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                const tile = document.createElement('div');
                tile.style.position = "absolute";
                tile.style.left = `${x * variables.GRID_CELL_SIZE}px`;
                tile.style.top = `${y * variables.GRID_CELL_SIZE}px`;
                tile.style.width = `${variables.GRID_CELL_SIZE}px`;
                tile.style.height = `${variables.GRID_CELL_SIZE}px`;
                tile.style.backgroundSize = "cover";

                if (this.map[y][x] === 1) {
                    tile.style.backgroundImage = "url('./img/block.png')";
                }
                if (this.map[y][x] === 2) {
                    tile.style.backgroundImage = "url('./img/RTS.png')";
                }
                if (this.map[y][x] === 0 || this.map[y][x] === 3) {
                    tile.style.backgroundImage = "url('./img/grass.png')";
                }
                if (this.map[y][x] === 4) {
                    tile.style.backgroundImage = "url('./img/energy.gif')";
                }
                if (this.map[y][x] === 5) {
                    tile.style.backgroundImage = "url('./img/heart.gif')";
                }
                if (this.map[y][x] === 6) {
                    tile.style.backgroundImage = "url('./img/poison.gif')";
                }

                variables.tilesContainer.appendChild(tile);
            }
        }
    }
}

class KeyboardListner {
    constructor(game) {
        this.game = game;
        this.keys = [];
        window.addEventListener('keydown', e => {
            if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', ' ', 'p'].includes(e.key) && !e.repeat) {
                if (!this.keys.includes(e.key)) {
                    this.keys.push(e.key);
                }
            }
        });

        window.addEventListener('keyup', e => {
            if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', ' ', 'p'].includes(e.key)) {
                const index = this.keys.indexOf(e.key);
                if (index > -1) {
                    this.keys.splice(index, 1);
                }
            }
        });
    }
}

class Ui {
    constructor(game) {
        this.game = game;
        this.score = 0;
        this.timeS = 0; //seconds
        this.timeM = 0; //minutes
        this.elapsed = 0;
        this.gameOver = null;
    }

    draw(deltaTime) {
        this.elapsed += deltaTime;
        if (this.elapsed >= 1000) {
            this.timeS += Math.floor(this.elapsed / 1000);
            this.elapsed %= 1000;
        }
        if (this.timeS >= 60) {
            this.timeM += 1;
            this.timeS = 0;
        }
        const timeEl = document.getElementById('time');
        if (timeEl) {
            timeEl.textContent = `${this.timeM}:${this.timeS.toString().padStart(2, '0')}`;
        }
        document.getElementById('score').textContent = `Score: ${this.score}`;
        document.getElementById('bombs').textContent = `Bombs: ${this.game.player.maxBombs - this.game.player.bombs.length}`;
        document.getElementById('speed').textContent = `Speed: ${this.game.player.speed}`;
        document.getElementById('enemy').textContent = `Enemies: ${this.game.enemies.length}`;
        const gameover = document.getElementById('game-over');
        if (!gameover) {
            this.gameOver = document.createElement('div');
            this.gameOver.id = 'game-over';
            this.gameOver.textContent = `Game Over! Score: ${this.score}`;
            variables.bord.prepend(this.gameOver);
        }

    }
}

class Player {
    constructor(game, x, y) {
        this.game = game;
        this.pixelX = x * variables.GRID_CELL_SIZE;
        this.pixelY = y * variables.GRID_CELL_SIZE;
        this.speed = 2;
        this.lives = 5;
        this.bombs = [];
        this.maxBombs = 3;
        this.inagif = '3adi';
        this.element = null;
        this.bombCooldown = 0;
        this.createPlayerElement();
    }

    createPlayerElement() {
        if (!this.element && variables.bord) {
            this.element = document.createElement('div');
            this.element.style.position = 'absolute';
            this.element.style.width = `${variables.GRID_CELL_SIZE- 5}px`;
            this.element.style.height = `${variables.GRID_CELL_SIZE - 5}px`;
            this.element.style.backgroundSize = 'cover';
            this.element.style.backgroundImage = "url('./img/player/wa9f.gif')";
            this.element.style.zIndex = '10';
            variables.bord.appendChild(this.element);
        }
    }

    update() {
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
        if (this.canMove(newX + 2, newY + 2)) {
            this.pixelX = newX;
            this.pixelY = newY;
        }

        if (this.bombCooldown > 0) {
            this.bombCooldown--;
        }

        if (this.game.input.keys.includes(' ') && this.bombCooldown === 0) {
            this.placeBomb();
            this.bombCooldown = 10;
        }

        let X = this.pixelX /variables.GRID_CELL_SIZE;
        let Y = this.pixelY / variables.GRID_CELL_SIZE;
        const gridX = Math.round(X);
        const gridY = Math.round(Y);

        this.game.enemies.forEach(enemy => {
            const enemyGridX = Math.round(enemy.x / variables.GRID_CELL_SIZE);
            const enemyGridY = Math.round(enemy.y / variables.GRID_CELL_SIZE);

            if (enemyGridX === gridY && enemyGridY === gridX) {
                this.lives--;
                this.pixelX = 1 * variables.GRID_CELL_SIZE;
                this.pixelY = 1 * variables.GRID_CELL_SIZE;

                if (this.lives <= 0) {
                    this.game.gameOver = true;
                }
            }
        })

        if (this.game.map.map[gridY][gridX] === 4) {
            this.game.map.map[gridY][gridX] = 0;
            this.game.player.speed += 0.5;
            this.game.ui.score += 10;
            this.game.map.draw();
        }
        if (this.game.map.map[gridY][gridX] === 5) {
            this.game.map.map[gridY][gridX] = 0;
            this.game.player.lives += 1;
            this.game.ui.score += 10;
            this.game.map.draw();

        }
        if (this.game.map.map[gridY][gridX] === 6) {
            this.game.map.map[gridY][gridX] = 0;
            this.game.player.lives -= 1;
            this.game.ui.score -= 10;
            if (this.game.player.lives <= 0) {
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
            this.element.style.left = `${this.pixelX}px`;
            this.element.style.top = `${this.pixelY}px`;

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

class Bomb {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.timer = 120;  //2tawani daba mazyanin
        this.exploded = false;
        this.visible = true;
        this.element = null;
        this.blinkTimer = 0;
        this.createBombElement();
    }

    createBombElement() {
        if (!this.element && variables.bord) {
            this.element = document.createElement('div');
            this.element.style.position = 'absolute';
            this.element.style.left = `${this.x * variables.GRID_CELL_SIZE}px`;
            this.element.style.top = `${this.y * variables.GRID_CELL_SIZE}px`;
            this.element.style.width = `${variables.GRID_CELL_SIZE}px`;
            this.element.style.height = `${variables.GRID_CELL_SIZE}px`;
            this.element.style.backgroundImage = "url('./img/bomb.gif')";
            this.element.style.borderRadius = `${50}px`
            this.element.style.zIndex = '8';
            variables.bord.appendChild(this.element);
        }
    }

    update() {
        this.timer--;
        if (this.timer < 60) {
            this.blinkTimer++;
            if (this.blinkTimer % 10 === 0) {
                this.visible = !this.visible;
            }
        }

        if (this.timer <= 0 && !this.exploded) {
            this.explode();
        }
    }

    explode() {
        this.exploded = true;

        if (this.element && this.element.parentNode) {
            this.element.remove();
            this.element = null;
        }
        const dirs = [
            [0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]
        ];

        dirs.forEach(([dx, dy]) => {
            const nx = this.x + dx;
            const ny = this.y + dy;

            if (ny >= 0 && ny < this.game.map.map.length &&
                nx >= 0 && nx < this.game.map.map[0].length) {

                // Destroy destructible blocks
                if (this.game.map.map[ny][nx] === 2) {
                    this.game.map.map[ny][nx] = variables.cadeau[Math.floor(Math.random() * variables.cadeau.length)];
                    this.game.map.draw();
                }

                const playerGridX = Math.round(this.game.player.pixelX / variables.GRID_CELL_SIZE);
                const playerGridY = Math.round(this.game.player.pixelY / variables.GRID_CELL_SIZE);

                if (playerGridX === nx && playerGridY === ny) {
                    this.game.player.lives--;
                    this.game.player.pixelX = 1 * variables.GRID_CELL_SIZE;
                    this.game.player.pixelY = 1 * variables.GRID_CELL_SIZE;

                    if (this.game.player.lives <= 0) {
                        this.game.gameOver = true;
                    }
                }

                if (this.game.enemies.length > 0) {
                    this.game.enemies.forEach(enemy => {
                        const enemyGridX = Math.round(enemy.x / variables.GRID_CELL_SIZE);
                        const enemyGridY = Math.round(enemy.y / variables.GRID_CELL_SIZE);

                        if (enemyGridX === ny && enemyGridY === nx) {
                            enemy.isAlive = false;
                            enemy.element.remove();
                            this.game.ui.score += 20;
                        }
                    });
                }
                this.createExplosion(nx, ny);
            }
        });
    }

    createExplosion(x, y) {
        const bommmmm = document.createElement('div');
        bommmmm.style.position = 'absolute';
        bommmmm.style.left = `${x * variables.GRID_CELL_SIZE}px`;
        bommmmm.style.top = `${y * variables.GRID_CELL_SIZE}px`;
        bommmmm.style.width = `${variables.GRID_CELL_SIZE}px`;
        bommmmm.style.height = `${variables.GRID_CELL_SIZE}px`;
        bommmmm.style.backgroundColor = 'rgba(255, 165, 0, 0.9)';
        bommmmm.style.borderRadius = '50%';
        bommmmm.style.zIndex = '15';
        bommmmm.style.border = '2px solid rgba(255, 0, 0, 0.8)';
        bommmmm.style.boxShadow = '0 0 20px rgba(255, 165, 0, 0.8)';

        if (variables.bord) {
            variables.bord.appendChild(bommmmm);
        }

        // Animate explosion
        let scale = 0.1;
        const animateExplosion = () => {
            scale += 0.1;
            bommmmm.style.transform = `scale(${scale})`;
            if (scale < 2) {
                requestAnimationFrame(animateExplosion);
            } else {
                bommmmm.remove();
            }
        };
        requestAnimationFrame(animateExplosion);
    }

    draw() {
        if (!this.element) {
            this.createBombElement();
        }

        if (this.element && !this.exploded) {
            this.element.style.display = this.visible ? 'block' : 'none';
        }
    }
}

class Enemies {
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
    }

    create() {

        this.element = document.createElement('div')
        this.element.className = 'enemy'
        this.element.style = `
            width: 35px;
            height: 35px;
            z-index: 100;
            position: absolute;
            left: ${this.x}px;
            top: ${this.y}px;
            background-image: url('./img/enemy.gif');
        `
        return this.element
    }

    render() {
        if (!this.isAlive) return
        this.element.style.top = `${this.x}px`;
        this.element.style.left = `${this.y}px`;
    }

    update(deltatime, gameBoard) {
        // console.log("before : ",this.x, this.y);
        //time howa time li kan bin had l frame wl frame li kant 9bl
        if (!this.isAlive) return
        let distance = this.speed * deltatime, newX, newY
        // console.log("deltatime is :", deltatime);
        if (this.direction === 'idle') {
            this.randomDirection();
        }

        // console.log(deltatime);
        if (this.direction === 'up') {
            newY = this.y - distance
            newX = this.x
            // console.log();
        } else if (this.direction === 'down') {
            newY = this.y + distance
            newX = this.x
            // console.log(this.y);

        } else if (this.direction === 'left') {
            newX = this.x - distance
            newY = this.y
            // console.log(this.y);

        } else if (this.direction === 'right') {
            newX = this.x + distance
            newY = this.y
            // console.log(newY);

        }
        if (!this.checkForCollision(newX, newY, gameBoard.map)) {
            this.x = newX, this.y = newY
            this.render()
        } else {
            this.randomDirection();
        }
        // console.log("after : ", this.x, this.y);

    }

    checkForCollision(newX, newY, gameBoard) {
        // console.log(newX);
        const corners = [
            { x: newX, y: newY },// Top-left
            { x: newX + this.size - 1, y: newY }, // Top-right
            { x: newX, y: newY + this.size - 1 }, // Bottom-left
            { x: newX + this.size - 1, y: newY + this.size - 1 } // Bottom-right
        ];
        for (let corner of corners) {
            const tileX = Math.floor(corner.x / variables.GRID_CELL_SIZE); // hadi hia column
            const tileY = Math.floor(corner.y / variables.GRID_CELL_SIZE); //hadi hia row
            // console.log(tileX, gameBoard[0].length);
            // console.log(corner.y);


            if (tileX > gameBoard[0].length || tileX < 0 ||
                tileY > gameBoard.length || tileY < 0) {
                // console.log('khdmat ?');
                return true
            }
            // console.log(gameBoard[tileY][tileX]);
            if (gameBoard[tileX][tileY] == 1 || gameBoard[tileX][tileY] == 2) {
                return true
            }
        }
        return false
    }

    randomDirection() {
        // console.log('random direction');
        const directions = ['up', 'down', 'left', 'right']
        this.direction = directions[Math.floor(Math.random() * directions.length)]
        // console.log("New direction:", this.direction);

    }
}

class Game {
    constructor() {
        this.map = new Map(this);
        this.ui = new Ui(this);
        this.input = new KeyboardListner(this);
        this.player = new Player(this, 1, 1);
        this.puse = false;
        this.pPressedLastFrame = false;
        this.gameOver = false;
        this.enemies = []
        this.startDraw = true
        let emptySpaces = this.map.findEmptySpaces()
        for (let i = 0; i < 1; i++) {
            let place = emptySpaces[Math.floor(Math.random() * emptySpaces.length)]
            this.enemies.push(new Enemies(place.y * variables.GRID_CELL_SIZE, (place.x) * variables.GRID_CELL_SIZE, this.map, variables.GRID_CELL_SIZE, variables.initialSpeed));
        }
    }

    draw(deltaTime) {
        if (this.startDraw) {
            this.startDraw = false

            this.map.draw()
        }
        this.player.draw();
        this.ui.draw(deltaTime);

        const livesEl = document.querySelector('#ui h1');
        if (livesEl) {
            livesEl.textContent = `Lives: ${this.player.lives}`;
        }

        const scoreEl = document.getElementById('score');
        if (scoreEl) {
            scoreEl.textContent = `Score: ${this.ui.score}`;
        }
        this.enemies.forEach(enemy => {
            enemy.render();
        })
    }

    update(deltaTime) {
        const pPressed = this.input.keys.includes('p');
        if (pPressed && !this.pPressedLastFrame) {
            this.puse = !this.puse;
        }
        this.pPressedLastFrame = pPressed;

        if (!this.puse && !this.gameOver) {
            this.player.update();
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime, this.map); // Pass deltaTime and the actual map array
            });
            this.enemies = this.enemies.filter(enemy => enemy.isAlive);
        }
    }

}

const game = new Game();
let lastTime = 0;
function animate(timestamp) {
    let deltatime = timestamp - lastTime;
    lastTime = timestamp;
    const pauseEl = document.getElementById('puse');
    if (game.puse) {
        pauseEl.style.display = 'block';
    } else if (game.gameOver || game.enemies.length === 0) {

        if (game.gameOver) {
            game.ui.gameOver.style.display = 'block';
        } else {
            const jj = document.getElementById('win');
            if (jj) {
                jj.style.display = 'block';
            }
        }
    } else {
        if (pauseEl) pauseEl.style.display = 'none';
        game.draw(deltatime);
    }

    game.update(deltatime);
    requestAnimationFrame(animate);
}

animate(0);