const bord = document.getElementById('game')

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
        this.x = x;
        this.y = y;
        this.lives = 5;
        this.bombs = [];
        this.moveCooldown = 0;
        this.moveDelay = 5;
        this.maxBombs = 3;
        this.inagif = '3adi'
        this.element = document.createElement('div')
        this.element.id = "player"

        this.element.style.zIndex = "100"
        this.element.style.position = "absolute"

        bord.append(this.element)
    }

    update() {
        const tileSize = 40;

        if (this.moveCooldown <= 0 && this.game.input.keys.length > 0) {
            const lastKey = this.game.input.keys[this.game.input.keys.length - 1];

            let newPosX = this.x;
            let newPosY = this.y;
            if (lastKey === 'ArrowUp') {
                newPosY = this.y - 10;
            }
            if (lastKey === 'ArrowDown') {
                newPosY = this.y + 10;
            }
            if (lastKey === 'ArrowLeft') {
                newPosX = this.x - 10;
            }
            if (lastKey === 'ArrowRight') {
                newPosX = this.x + 10;
            }
            // Calculate intended grid position
            const gridX = Math.round(newPosX / tileSize);
            const gridY = Math.round(newPosY / tileSize);
            // Check collision
            if (
                gridY >= 0 && gridY < this.game.map.map.length &&
                gridX >= 0 && gridX < this.game.map.map[0].length &&
                this.game.map.map[gridY][gridX] !== 1 &&
                this.game.map.map[gridY][gridX] !== 2
            ) {
                if (lastKey === 'ArrowUp') {
                    this.y = newPosY;
                    this.moveCooldown = this.moveDelay;
                    this.inagif = 'up';
                    this.element.style.top = `${this.y}px`;
                }
                if (lastKey === 'ArrowDown') {
                    this.y = newPosY;
                    this.moveCooldown = this.moveDelay;
                    this.inagif = 'down';
                    this.element.style.top = `${this.y}px`;
                }
                if (lastKey === 'ArrowLeft') {
                    this.x = newPosX;
                    this.moveCooldown = this.moveDelay;
                    this.inagif = 'left';
                    this.element.style.left = `${this.x}px`;
                }
                if (lastKey === 'ArrowRight') {
                    this.x = newPosX;
                    this.moveCooldown = this.moveDelay;
                    this.inagif = 'right';
                    this.element.style.left = `${this.x}px`;
                }
            }
        }
        if (this.game.input.keys[this.game.input.keys.length - 1] === undefined) {
            this.inagif = '3adi';
        }
        if (this.moveCooldown > 0) this.moveCooldown--;
        if (this.game.input.keys[this.game.input.keys.length - 1] == ' ') {
            this.placeBomb();
        }
        this.bombs.forEach(bomb => bomb.update());
        this.bombs = this.bombs.filter(bomb => !bomb.exploded);
    }

    canMove(x, y) {
        if (y < 0 || y >= this.game.map.map.length || x < 0 || x >= this.game.map.map[0].length) return false;
        const tile = this.game.map.map[y][x];
        const hasBomb = this.bombs.some(b => b.x === x && b.y === y);
        return (tile === 0 || tile == 3) && !hasBomb;
    }

    placeBomb() {
        const tileSize = 40;

        const gridX = Math.round(this.x / tileSize);
        const gridY = Math.round(this.y / tileSize);
        if (
            this.bombs.length < this.maxBombs &&
            !this.bombs.some(b => b.x === gridX && b.y === gridY)
        ) {
            this.bombs.push(new Bomb(this.game, gridX, gridY));
        }
    }

    draw() {
        this.bombs.forEach(bomb => bomb.draw());
        const idx = this.y * this.game.map.map[0].length + this.x;
        const tile = bord.children[idx];


        if (this.inagif == 'right') {

            this.element.style.backgroundImage
                = "url('liman-unscreen.gif')";
        } else if (this.inagif == 'left') {

            this.element.style.backgroundImage
                = "url('left-unscreen.gif')";
        } else if (this.inagif == 'up') {
            this.element.style.backgroundImage
                = "url('up-unscreen.gif')";
        } else if (this.inagif == 'down') {
            this.element.style.backgroundImage
                = "url('down-unscreen.gif')";

        } else if (this.inagif == '3adi') {
            this.element.style.backgroundImage
                = "url('wa9f-unscreen.gif')";
        }


    }
}

class Bomb {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.timer = 120; // taniya ochihaja na ofhamtk bghit tbadal badal mabghitich blach
        this.exploded = false;
        this.blinkTimer = 0;
        this.visible = true;
    }

    update() {
        this.timer--;

        if (this.timer < 80) {
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

        const dirs = [
            [0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]
        ];

        dirs.forEach(([dx, dy]) => {

            const nx = this.x + dx;
            const ny = this.y + dy;
            if (
                ny >= 0 && ny < this.game.map.map.length &&
                nx >= 0 && nx < this.game.map.map[0].length
            ) {

                if (this.game.map.map[ny][nx] === 2) {
                    const idx = ny * this.game.map.map[0].length + nx

                    const tile = bord.children[idx];
                    if (tile) {
                        tile.style.backgroundColor = `rgba(0, 0, 0, 1)`;
                        tile.style.borderRadius = "100%";
                        setTimeout(() => {
                            tile.style.backgroundImage = "";
                        }, 150);

                    }
                    // fajar  zmar ana irhabih hhhhhh
                    //this.game.ui.score += 10;  // hta nchof  wach nzidoha wala la 
                }
                // Check player collision by grid
                const tileSize = 40;
                const playerGridX = Math.round(this.game.player.x / tileSize);
                const playerGridY = Math.round(this.game.player.y / tileSize);
                if (playerGridX === nx && playerGridY === ny) {
                    this.game.player.lives--;
                    // Respawn player at (1,1) in px
                    this.game.player.x = 1 * tileSize;
                    this.game.player.y = 1 * tileSize;
                    this.game.player.element.style.left = `${this.game.player.x}px`;
                    this.game.player.element.style.top = `${this.game.player.y}px`;
                    if (this.game.player.lives <= 0) {
                        alert("Game Over");
                        window.location.reload();
                    }
                }
            }

        });
    }

    draw() {
        if (!this.exploded && this.visible) {
            const idx = this.y * this.game.map.map[0].length + this.x

            const tile = bord.children[idx];
            if (tile) {
                tile.style.backgroundImage = "url('bomb.gif')";
                tile.style.borderRadius = "100%";
                setTimeout(() => {
                    tile.style.backgroundImage = "";
                }, 100);
            }
        }
    }
}

class Game {
    constructor() {
        this.map = new Map(this)
        this.ui = new Ui(this)
        this.input = new Input(this)
        this.player = new Player(this, 40, 40)
        this.puse = false
        this.pPressedLastFrame = false
    }

    draw(deltaTime) {
        this.player.draw()
        this.ui.draw(deltaTime)
        document.querySelector('#ui h1').textContent = `Lives: ${this.player.lives}`;
        document.getElementById('score').textContent = `Score: ${this.ui.score}`;
    }

    update() {
        const pPressed = this.input.keys.includes('p');
        if (pPressed && !this.pPressedLastFrame) {
            this.puse = !this.puse;
        }
        this.pPressedLastFrame = pPressed;

        if (!this.puse) {
            this.player.update();
        }

    }
}
const game = new Game()
let lastTime = 0

function animate(timestamp) {
    let deltatime = timestamp - lastTime;
    lastTime = timestamp;

    if (game.puse) {
        document.getElementById('puse').style.display = 'block'
    } else {
        document.getElementById('puse').style.display = 'none'
        game.draw(deltatime)
    }

    game.update()
    requestAnimationFrame(animate)
}

animate(0)