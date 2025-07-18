const bord = document.getElementById('game');
let tilesContainer = null; // Container for map tiles
const GRID_CELL_SIZE = 35
const initialSpeed = 0.05

class Map {
    constructor(game) {
        this.game = game;
        this.width = 80;
        this.height = 70;
        this.tileSize = 35;
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
        this.addblocke();
        this.createTilesContainer();
    }

    findEmptySpaces(){
        let emtiSpais = [];
        this.map.forEach((element, y) => {
            for (let x = 0; x < element.length; x++) {
                if (element[x] === 0) {
                    emtiSpais.push({ x, y });
                }
            }
        });
        return emtiSpais
    }

    addblocke() {
        console.log('create sandooo9');
        let emtiSpais = this.findEmptySpaces()
        for (let i = 0; i < 50; i++) {
            let pos = emtiSpais[Math.floor(Math.random() * emtiSpais.length)];
            if (pos) {
                this.map[pos.y][pos.x] = 2;
            }
        }
    }

    createTilesContainer() {
        if (!tilesContainer) {
            tilesContainer = document.createElement('div');
            tilesContainer.style.position = "absolute";
            tilesContainer.style.top = "0";
            tilesContainer.style.left = "0";
            tilesContainer.style.width = `${this.map[0].length * this.tileSize}px`;
            tilesContainer.style.height = `${this.map.length * this.tileSize}px`;
            tilesContainer.style.zIndex = "1";
            bord.appendChild(tilesContainer);
        }
    }

    draw() {
        // Setup board
        bord.style.position = "relative";
        bord.style.width = `${this.map[0].length * this.tileSize}px`;
        bord.style.height = `${this.map.length * this.tileSize}px`;
        bord.style.border = "2px solid #333";
        bord.style.backgroundColor = "#333";

        // Clear only tiles container
        if (tilesContainer) {
            tilesContainer.innerHTML = "";
        }

        // Draw tiles
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                const tile = document.createElement('div');
                tile.style.position = "absolute";
                tile.style.left = `${x * this.tileSize}px`;
                tile.style.top = `${y * this.tileSize}px`;
                tile.style.width = `${this.tileSize}px`;
                tile.style.height = `${this.tileSize}px`;
                //tile.style.border = '1px solid #555';
                tile.style.backgroundSize = "cover";
                // tile.style.boxSizing = "border-box";

                if (this.map[y][x] === 1) {
                    tile.style.backgroundImage = "url('block.png')";
                    //tile.style.backgroundColor = "#654321";
                }
                if (this.map[y][x] === 2) {
                    tile.style.backgroundImage = "url('RTS.png')";
                    //tile.style.backgroundColor = "#ffdd44";
                }
                if (this.map[y][x] === 0 || this.map[y][x] === 3) {
                    tile.style.backgroundColor = "#000000";
                }

                tilesContainer.appendChild(tile);
            }
        }
    }
}

class Input {
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
        this.timeS = 0;
        this.timeM = 0;
        this.elapsed = 0;
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
    }
}

class Player {
    constructor(game, x, y) {
        this.game = game;
        this.pixelX = x * this.game.map.tileSize;
        this.pixelY = y * this.game.map.tileSize;
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
        if (!this.element && bord) {
            this.element = document.createElement('div');
            this.element.style.position = 'absolute';
            this.element.style.width = `${this.game.map.tileSize - 7}px`;
            this.element.style.height = `${this.game.map.tileSize - 7}px`;
            this.element.style.backgroundSize = 'cover';
            this.element.style.backgroundImage = "url('wa9f.gif')";
            this.element.style.zIndex = '10';
            bord.appendChild(this.element);
        }
    }

    update() {
        let moveX = 0;
        let moveY = 0;

        // Handle movement
        if (this.game.input.keys.includes('ArrowUp')) {
            moveY = -this.speed;
            this.inagif = 'up';
        } else if (this.game.input.keys.includes('ArrowDown')) {
            moveY = this.speed;
            this.inagif = 'down';
        } else if (this.game.input.keys.includes('ArrowLeft')) {
            moveX = -this.speed;
            this.inagif = 'left';
        } else if (this.game.input.keys.includes('ArrowRight')) {
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
        } else {

            if ((this.pixelX / this.game.map.tileSize) - Math.floor(this.pixelX / this.game.map.tileSize) < 0.5) {
                this.pixelX -= 5
            } else if ((this.pixelX / this.game.map.tileSize) - Math.floor(this.pixelX / this.game.map.tileSize) > 0.5) {
                this.pixelX += 5
            }
            if ((this.pixelY / this.game.map.tileSize) - Math.floor(this.pixelY / this.game.map.tileSize) < 0.5) {
                this.pixelY -= 5
            } else if ((this.pixelY / this.game.map.tileSize) - Math.floor(this.pixelY / this.game.map.tileSize) > 0.5) {
                this.pixelY += 5
            }

        }


        if (this.bombCooldown > 0) {
            this.bombCooldown--;
        }

        if (this.game.input.keys.includes(' ') && this.bombCooldown === 0) {
            this.placeBomb();
            this.bombCooldown = 10;
        }

        // Update bombs
        this.bombs.forEach(bomb => bomb.update());
        this.bombs = this.bombs.filter(bomb => !bomb.exploded);
    }



    canMove(newX, newY) {
        const playerSize = this.game.map.tileSize - 7;

        // Check corners of player hitbox
        const corners = [
            [newX, newY],
            [newX + playerSize, newY],
            [newX, newY + playerSize],
            [newX + playerSize, newY + playerSize]
        ];

        for (const [px, py] of corners) {
            const gridX = Math.floor(px / this.game.map.tileSize);
            const gridY = Math.floor(py / this.game.map.tileSize);

            // Check bounds
            if (gridY < 0 || gridY >= this.game.map.map.length ||
                gridX < 0 || gridX >= this.game.map.map[0].length) {
                return false;
            }

            const tile = this.game.map.map[gridY][gridX];

            if (tile === 1 || tile == 2) {
                return false;
            }

            const hasBomb = this.bombs.some(
                b => b.x === gridX && b.y === gridY && !b.exploded
            );
            if (hasBomb && time == 0) {
                return false;
            }
        }

        return true;
    }

    placeBomb() {
        const centerX = this.pixelX + (this.game.map.tileSize / 2);
        const centerY = this.pixelY + (this.game.map.tileSize / 2);

        const gridX = Math.floor(centerX / this.game.map.tileSize);
        const gridY = Math.floor(centerY / this.game.map.tileSize);

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
                this.element.style.backgroundImage = "url('liman.gif')";
            } else if (this.inagif === 'left') {
                this.element.style.backgroundImage = "url('left.gif')";
            } else if (this.inagif === 'up') {
                this.element.style.backgroundImage = "url('up.gif')";
            } else if (this.inagif === 'down') {
                this.element.style.backgroundImage = "url('down.gif')";
            } else if (this.inagif === '3adi') {
                this.element.style.backgroundImage = "url('wa9f.gif')";
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
        if (!this.element && bord) {
            this.element = document.createElement('div');
            this.element.style.position = 'absolute';
            this.element.style.left = `${this.x * this.game.map.tileSize}px`;
            this.element.style.top = `${this.y * this.game.map.tileSize}px`;
            this.element.style.width = `${this.game.map.tileSize}px`;
            this.element.style.height = `${this.game.map.tileSize}px`;
            this.element.style.backgroundImage = "url('bomb.gif')";
            this.element.style.borderRadius = `${50}px`
            //this.element.style.backgroundSize = 'cover';
            this.element.style.zIndex = '8';
            bord.appendChild(this.element);
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
                    this.game.map.map[ny][nx] = 0;
                    this.game.ui.score += 10;
                }

                const playerCenterX = this.game.player.pixelX + (this.game.map.tileSize / 2);
                const playerCenterY = this.game.player.pixelY + (this.game.map.tileSize / 2);
                const playerGridX = Math.floor(playerCenterX / this.game.map.tileSize);
                const playerGridY = Math.floor(playerCenterY / this.game.map.tileSize);

                if (playerGridX === nx && playerGridY === ny) {
                    this.game.player.lives--;
                    this.game.player.pixelX = 1 * this.game.map.tileSize;
                    this.game.player.pixelY = 1 * this.game.map.tileSize;

                    if (this.game.player.lives <= 0) {
                        alert("Game Over! Score: " + this.game.ui.score);
                        window.location.reload();
                    }
                }

                this.createExplosion(nx, ny);
            }
        });
    }

    createExplosion(x, y) {
        const bommmmm = document.createElement('div');
        bommmmm.style.position = 'absolute';
        bommmmm.style.left = `${x * this.game.map.tileSize}px`;
        bommmmm.style.top = `${y * this.game.map.tileSize}px`;
        bommmmm.style.width = `${this.game.map.tileSize}px`;
        bommmmm.style.height = `${this.game.map.tileSize}px`;
        bommmmm.style.backgroundColor = 'rgba(255, 165, 0, 0.9)';
        bommmmm.style.borderRadius = '50%';
        bommmmm.style.zIndex = '15';
        bommmmm.style.border = '2px solid rgba(255, 0, 0, 0.8)';
        bommmmm.style.boxShadow = '0 0 20px rgba(255, 165, 0, 0.8)';

        if (bord) {
            bord.appendChild(bommmmm);
        }

        // Animate explosion
        let scale = 0.1;
        const animateExplosion = () => {
            scale += 0.1;
            bommmmm.style.transform = `scale(${scale})`;
            bommmmm.style.opacity = `${1 - scale * 0.1}`;

            if (scale < 2) {
                requestAnimationFrame(animateExplosion);
            } else {
                if (bommmmm.parentNode) {
                    bommmmm.remove();
                }
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
    constructor(x, y, gameBord, enemySize = GRID_CELL_SIZE, speed = initialSpeed) {
        this.x = x
        this.y = y
        this.isAlive = true //active or no
        this.size = enemySize
        this.speed = speed
        this.direction = 'idle'
        bord.append(this.create())
        this.state = true
        this.gameBoard = gameBord
        this.render()
    }

    create() {
        console.log('create enemy');
        this.element = document.createElement('div')
        this.element.className = 'enemy'
        this.element.style = `
            width: 35px;
            height: 35px;
            z-index: 100;
            position: absolute;
            left: ${this.x}px;
            top: ${this.y}px;
            background-color: red;
        `
        return this.element
    }

    render() {
        // if (this.state){
        //     // console.log("x & y are :", this.x, this.y);
        //     this.state = false
        // }
        if (!this.isAlive) return
        this.element.style.top = `${this.x}px`;
        this.element.style.left = `${this.y}px`;
        // this.element.style.top = `${this.y}px`;
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
        if(!this.checkForCollision(newX, newY, gameBoard.map)){
            this.x = newX, this.y = newY
            this.render()
        }else{
            this.randomDirection();
        }
        // console.log("after : ",this.x, this.y);

    }

    checkForCollision(newX, newY, gameBoard) {
        // console.log(newY);
        // console.log(newX);
        const corners = [
            { x: newX, y: newY },// Top-left
            { x: newX + this.size - 1, y: newY }, // Top-right
            { x: newX, y: newY + this.size - 1 }, // Bottom-left
            { x: newX + this.size - 1, y: newY + this.size - 1 } // Bottom-right
        ];
        for (let corner of corners) {
            const tileX = Math.floor(corner.x / GRID_CELL_SIZE); // hadi hia column
            const tileY = Math.floor(corner.y / GRID_CELL_SIZE); //hadi hia row
            // console.log(tileX, gameBoard[0].length);
            // console.log(corner.y);


            if (tileX >= gameBoard[0].length || tileX < 0 ||
                tileY >= gameBoard.length || tileY < 0) {
                    // console.log('khdmat ?');
                return true
            }
            // console.log(gameBoard[tileY][tileX]);
            if (gameBoard[tileX][tileY] == 1 || gameBoard[tileX][tileY] == 2) {
                console.log('dkhal');
                return true
            }
        }
        return false
    }

    randomDirection() {
        // console.log('random direction');
        const directions = ['up', 'down', 'left', 'right']
        this.direction = directions[Math.floor(Math.random() * directions.length)]
        // console.log(this.direction);
    }
}


class Game {
    constructor() {
        this.map = new Map(this);
        this.ui = new Ui(this);
        this.input = new Input(this);
        this.player = new Player(this, 1, 1);
        this.puse = false;
        this.pPressedLastFrame = false;
        this.enemies = []
        this.startDraw = true
        // this.boardWidth = (this.map.map.length - 1) * GRID_CELL_SIZE
        // this.boardHeight = (this.map.map[0].length - 1) * GRID_CELL_SIZE
        let emptySpaces = this.map.findEmptySpaces()
        // console.log(bord.getBoundingClientRect());

        // this.enemies.push(new Enemies(0, 0 , bord, GRID_CELL_SIZE, initialSpeed));
        // this.enemies.push(new Enemies(0, (this.map.map[0].length - 1 ) * GRID_CELL_SIZE, bord, GRID_CELL_SIZE, initialSpeed));
        // this.enemies.push(new Enemies((this.map.map.length - 1) * GRID_CELL_SIZE, 0, bord, GRID_CELL_SIZE, initialSpeed));
        // this.enemies.push(new Enemies((this.map.map.length -  1) * GRID_CELL_SIZE, (this.map.map[0].length -1) * GRID_CELL_SIZE, bord, GRID_CELL_SIZE, initialSpeed));

        for(let i = 0; i < 4; i++){ 
            let place = emptySpaces[Math.floor(Math.random() * emptySpaces.length)] 
            // console.log("x&y are : ", place.x, place.y);
            this.enemies.push(new Enemies(place.y * GRID_CELL_SIZE, (place.x) *GRID_CELL_SIZE, this.map, GRID_CELL_SIZE, initialSpeed));
        }
        // this.enemies.push(new Enemies(8 , 5 , bord, GRID_CELL_SIZE * 1.2, initialSpeed * 0.8));
    }

    draw(deltaTime) {
        if (this.startDraw) {
            this.startDraw = false
            this.map.draw()
        }
        this.player.draw();
        this.ui.draw(deltaTime);
        // console.log(bord.getBoundingClientRect());

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

    update(deltatime) {
        // console.log("Game class, deltaTime is :", deltatime);
        const pPressed = this.input.keys.includes('p');
        if (pPressed && !this.pPressedLastFrame) {
            this.puse = !this.puse;
        }
        this.pPressedLastFrame = pPressed;

        if (!this.puse) {
            this.player.update();
            this.enemies.forEach(enemy => {
                enemy.update(deltatime, this.map); // Pass deltaTime and the actual map array
            });
            // this.enemies = this.enemies.filter(enemy => enemy.isAlive);
        }

    }

    randomCoordonates(gameMap){
        // console.log("gameMap  :", gameMap);
        return  Math.floor(Math.random() * gameMap)
    }
}

// Initialize game
const game = new Game();
let lastTime = 0;

function animate(timestamp) {
    let deltatime = timestamp - lastTime;
    lastTime = timestamp;

    const pauseEl = document.getElementById('puse');
    if (game.puse) {
        if (pauseEl) {
            // console.log(77);
            pauseEl.style.display = 'block';
        }
    } else {
        if (pauseEl) pauseEl.style.display = 'none';
        game.draw(deltatime);
    }

    game.update(deltatime);
    requestAnimationFrame(animate);
}

animate(0);