const bord = document.getElementById('game')
const GRID_CELL_SIZE = 40
const initialSpeed = 0.01

class Map {
    constructor(game) {
        this.game = game
        this.width = 80
        this.height = 70
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
        ]
        this.addblocke()
        this.draw()
    }

    addblocke() {
        let emtiSpais = []
        this.map.forEach((element, y) => {
            for (let x = 0; x < element.length; x++) {
                if (element[x] == 0) {
                    emtiSpais.push({ x, y })
                }
            }
        });
        for (let i = 0; i < 50; i++) {
            let pos = emtiSpais[Math.floor(Math.random() * emtiSpais.length)]
            if (pos) {
                this.map[pos.y][pos.x] = 2
            }
        }
    }
    draw() {

        bord.style.display = "grid"
        bord.style.gridTemplateColumns = `repeat(${this.map[0].length}, 1fr)`
        bord.style.gridTemplateRows = `repeat(${this.map.length}, 1fr)`

        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                const tile = document.createElement('div')
                tile.id = 'til'
                if (this.map[y][x] === 1) {
                    tile.style.backgroundImage = "url('block.png')"

                }
                if (this.map[y][x] === 2) {

                    tile.style.backgroundImage = "url('RTS.png')"
                }
                //tile.style.border = '1px solid #ccc'
                bord.appendChild(tile)
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
                console.log(this.keysPressed);
                console.log(this.keys);


                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }







}

class Ui {
    constructor(game) {
        this.game = game
        this.score = 0
        this.timeS = 0
        this.timeM = 0
        this.elapsed = 0
    }

    draw(deltaTime) {
        this.elapsed += deltaTime;
        if (this.elapsed >= 1000) {
            this.timeS += Math.floor(this.elapsed / 1000);
            this.elapsed %= 1000;
        }
        if (this.timeS >= 60) {
            this.timeM += 1
            this.timeS = 0
        }
        const timeEl = document.getElementById('time');
        timeEl.textContent = `${this.timeM}:${this.timeS.toString().padStart(2, '0')}`;
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
            this.element.style.height = `${this.game.map.tileSize -7}px`;
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
            
            if ( (this.pixelX / this.game.map.tileSize)- Math.floor(this.pixelX / this.game.map.tileSize)  < 0.5) {
                this.pixelX--
            }else if((this.pixelX / this.game.map.tileSize)- Math.floor(this.pixelX / this.game.map.tileSize)  > 0.5) {
                this.pixelX++
            }
            if ( (this.pixelY / this.game.map.tileSize)- Math.floor(this.pixelY / this.game.map.tileSize)  < 0.5) {
                this.pixelY--
            }else if((this.pixelY / this.game.map.tileSize)- Math.floor(this.pixelY / this.game.map.tileSize)  > 0.5) {
                this.pixelY++
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

        this.render()
    }

    create() {
        this.element = document.createElement('div')
        this.element.className = 'enemy'
        this.element.style = `
            width: 40px;
            height: 40px;
            z-index: 100;
            position: absolute;
            left: ${this.x}px;
            top: ${this.y}px;
            background-color: red;
            transform: translate(${this.x}px, ${this.y}px);
        `
        this.element.style.zIndex = 100
        console.log("create enemy");

        return this.element
    }

    render() {
        if (!this.isAlive) return
        console.log('hehe');
        
        // console.log("b" , this.x);
        console.log("b" , this.y);
        console.log(`translate(${this.x}px, ${this.y}px);`);
        
        this.element.style.top = `${this.x}px`;
        this.element.style.left = `${this.y}px`;
        // this.element.style.top = `${this.y}px`;
    }

    update(deltatime, gameBoard) {
        
        //time howa time li kan bin had l frame wl frame li kant 9bl
        if (!this.isAlive) return
        let distance = this.speed * deltatime ;
        
        if (this.direction === 'idle') {
            this.randomDirection();
        }

        // console.log(deltatime);
        if (this.direction === 'up') {
            this.y = this.y - distance
             this.x = this.x
            // console.log();
        } else if (this.direction === 'down') {
            this.y = this.y + distance
             this.x = this.x
            // console.log(this.y);

        } else if (this.direction === 'left') {
             this.x = this.x - distance
            this.y = this.y
            // console.log(this.y);

        } else if (this.direction === 'right') {
             this.x = this.x + distance
            this.y = this.y
            // console.log(newY);

        }

        // console.log(newX);
        // console.log(newY);
        // if (this.checkForCollision(newX, newY, gameBoard)) {
        //     this.randomDirection()
        // } else {
            
        // }

        console.log("a" , this.x);
        console.log("a" , this.y);

        this.render()
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
            // console.log(corner);
            // console.log(corner.y);

            if (tileX >= gameBoard[0].length || tileX < 0 ||
                tileY >= gameBoard.length || tileY < 0) {
                return true
            }
            if (gameBoard[tileY][tileX] == 1) {
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

class Game {
    constructor() {
        this.map = new Map(this)
        this.ui = new Ui(this)
        this.input = new Input(this)
        this.player = new Player(this, 1, 1)
        this.puse = false
        this.pPressedLastFrame = false
        this.enemies = []
        this.startDraw = true

        this.enemies.push(new Enemies(3 * GRID_CELL_SIZE, 3 * GRID_CELL_SIZE, bord, GRID_CELL_SIZE, initialSpeed));
        this.enemies.push(new Enemies(8 * GRID_CELL_SIZE, 5 * GRID_CELL_SIZE, bord, GRID_CELL_SIZE * 1.2, initialSpeed * 0.8));
    }

    draw(deltaTime) {
           if (this.startDraw) {
            this.startDraw = false
            this.map.draw()
        }
        this.player.draw()
        this.ui.draw(deltaTime)
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
        const pPressed = this.input.keys.includes('p');
        if (pPressed && !this.pPressedLastFrame) {
            this.puse = !this.puse;
        }
        this.pPressedLastFrame = pPressed;

        if (!this.puse) {
            this.player.update();
            this.enemies.forEach(enemy => {
                enemy.update(deltatime, this.map.map); // Pass deltaTime and the actual map array
            });
            // this.enemies = this.enemies.filter(enemy => enemy.isAlive);
        }

    }
}
const game = new Game()
let lastTime = 0

function animate(timestamp) {
    let deltatime = timestamp - lastTime;
    lastTime = timestamp;

    const pauseEl = document.getElementById('puse');
    if (game.puse) {
        if (pauseEl) {
            console.log(77);
            pauseEl.style.display = 'block';
        }
    } else {
        if (pauseEl) pauseEl.style.display = 'none';
        game.draw(deltatime)
    }

    game.update(deltatime)
    requestAnimationFrame(animate)
}



animate(0)