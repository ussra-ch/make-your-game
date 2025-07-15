const bord = document.getElementById('game')

class Map {
    constructor(game) {
        this.game = game
        this.width = 80
        this.height = 70
        this.map = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
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
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ]
        this.addblocke()
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
        bord.innerHTML = ""

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
                    console.log();
                    
                    tile.style.backgroundImage = "url('RTS.png')"
                }
                tile.style.border = '1px solid #ccc'
                bord.appendChild(tile)
            }
        }
    }
}


class Input {
    constructor(game) {
        this.game = game;
        this.keys = [];
        this.keysPressed = new Set();
        
        window.addEventListener('keydown', e => {
            if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', ' ', 'p'].includes(e.key) && !e.repeat) {
                if (!this.keys.includes(e.key)) {
                    this.keys.push(e.key);
                }
                this.keysPressed.add(e.key);
            }
        });
        window.addEventListener('keyup', e => {
            if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', ' ', 'p'].includes(e.key)) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
                this.keysPressed.delete(e.key); 
            }
        });
    }

    isKeyPressed(key) {
        return this.keysPressed.has(key);
    }

  
    
    
    clearPressed() {
        this.keysPressed.clear();
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
        this.moveDelay = 10;
        this.maxBombs = 3; 
    }

    update() {
        if (this.moveCooldown <= 0 && this.game.input.keys.length > 0) {
            const lastKey = this.game.input.keys[this.game.input.keys.length - 1];
            if (lastKey === 'ArrowUp' && this.canMove(this.x, this.y - 1)) {
                this.y--;
                this.moveCooldown = this.moveDelay;
            }
            if (lastKey === 'ArrowDown' && this.canMove(this.x, this.y + 1)) {
                this.y++;
                this.moveCooldown = this.moveDelay;
            }
            if (lastKey === 'ArrowLeft' && this.canMove(this.x - 1, this.y)) {
                this.x--;
                this.moveCooldown = this.moveDelay;
            }
            if (lastKey === 'ArrowRight' && this.canMove(this.x + 1, this.y)) {
                this.x++;
                this.moveCooldown = this.moveDelay;
            }
        }
        if (this.moveCooldown > 0) this.moveCooldown--;

        if (this.game.input.isKeyPressed(' ') ) {
            this.placeBomb();
        }

        this.bombs.forEach(bomb => bomb.update());
        this.bombs = this.bombs.filter(bomb => !bomb.exploded);
    }

    canMove(x, y) {
        if (y < 0 || y >= this.game.map.map.length || x < 0 || x >= this.game.map.map[0].length) return false;
        const tile = this.game.map.map[y][x];
        const hasBomb = this.bombs.some(b => b.x === x && b.y === y && !b.exploded);
        return tile === 0 && !hasBomb; 
    }

    placeBomb() {
        if (this.bombs.length < this.maxBombs && !this.bombs.some(b => b.x === this.x && b.y === this.y)) {
            this.bombs.push(new Bomb(this.game, this.x, this.y));
            
        }
    }

    draw() {
        this.bombs.forEach(bomb => bomb.draw());
        const idx = this.y * this.game.map.map[0].length + this.x;
        const tile = bord.children[idx];
        if (tile) {
            tile.style.backgroundColor = "#FF0000"; 
            tile.style.borderRadius = "50%";
        }
    }
}

class Bomb {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.timer = 80; // taniya ochihaja na ofhamtk bghit tbadal badal mabghitich blach
        this.exploded = false;
        this.blinkTimer = 0;
        this.visible = true;
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
                    this.game.map.map[ny][nx] = 0;
                    // fajar  zmar ana irhabih hhhhhh
                    this.game.ui.score += 10;
                }
                if (this.game.player.x === nx && this.game.player.y === ny) {
                    this.game.player.lives--;
                }
            }
        });
    }

    draw() {
        if (!this.exploded && this.visible) {
            const idx = this.y * this.game.map.map[0].length + this.x;
            const tile = bord.children[idx];
            if (tile) {
                tile.style.backgroundColor = "#FFA500"; 
                tile.style.borderRadius = "100%";
            }
        }
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
    }
    
    draw(deltaTime) {
        this.map.draw()
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
        
        this.input.clearPressed();
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