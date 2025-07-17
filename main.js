const bord = document.getElementById('game')
const GRID_CELL_SIZE = 40
const initialSpeed = 60

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
        this.moveDelay = 10;
        this.maxBombs = 3;
        this.inagif = '3adi'

    }

    update() {

        if (this.moveCooldown <= 0 && this.game.input.keys.length > 0) {
            const lastKey = this.game.input.keys[this.game.input.keys.length - 1];

            if (lastKey === 'ArrowUp' && this.canMove(this.x, this.y - 1)) {
                this.y--;
                this.moveCooldown = this.moveDelay;
                this.inagif = 'up';

            }
            if (lastKey === 'ArrowDown' && this.canMove(this.x, this.y + 1)) {
                this.y++;
                this.moveCooldown = this.moveDelay;
                this.inagif = 'down';

            }
            if (lastKey === 'ArrowLeft' && this.canMove(this.x - 1, this.y)) {
                this.x--;
                this.moveCooldown = this.moveDelay;
                this.inagif = 'left';

            }
            if (lastKey === 'ArrowRight' && this.canMove(this.x + 1, this.y)) {
                this.x++;
                this.moveCooldown = this.moveDelay;
                this.inagif = 'right';

            }



        }
        if (this.game.input.keys[this.game.input.keys.length - 1] === undefined) {
            console.log(6666);

            this.inagif = '3adi';
        }
        if (this.moveCooldown > 0) this.moveCooldown--;

        if (  this.game.input.keys[this.game.input.keys.length - 1]==' '
) {
            this.placeBomb();
        }

        this.bombs.forEach(bomb => bomb.update());
        this.bombs = this.bombs.filter(bomb => !bomb.exploded);
    }

    canMove(x, y) {
        if (y < 0 || y >= this.game.map.map.length || x < 0 || x >= this.game.map.map[0].length) return false;
        const tile = this.game.map.map[y][x];
        const hasBomb = this.bombs.some(b => b.x === x && b.y === y );
        return (tile === 0||tile==3) && !hasBomb;
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
            if (this.inagif == 'right') {

                tile.style.backgroundImage
                    = "url('liman.gif')";
            } else if (this.inagif == 'left') {

                tile.style.backgroundImage
                    = "url('left.gif')";
            } else if (this.inagif == 'up') {
                tile.style.backgroundImage
                    = "url('up.gif')";
            } else if (this.inagif == 'down') {
                tile.style.backgroundImage
                    = "url('down.gif')";

            } else if (this.inagif == '3adi') {
                tile.style.backgroundImage
                    = "url('wa9f.gif')";
            }

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
                    this.game.map.map[ny][nx] = 0;
                    // fajar  zmar ana irhabih hhhhhh
                    //this.game.ui.score += 10;  // hta nchof  wach nzidoha wala la 
                }
                if (this.game.player.x === nx && this.game.player.y === ny) {
                    this.game.player.lives--
                    this.game.player.x = 1;
                    this.game.player.y = 1;

                    if (this.game.player.lives <= 0) {
                        alert("Game Over");
                        window.location.reload();
                    }
                }
            }
            const idx = ny * this.game.map.map[0].length + nx

            const tile = bord.children[idx];
            if (tile) {
                tile.style.backgroundColor = `rgba(0, 0, 0, 1)`;
                tile.style.borderRadius = "100%";
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
            }
        }
    }
}

class Enemies{
    constructor(x, y, gameBord, enemySize = GRID_CELL_SIZE, speed = initialSpeed){
        this.x = x
        this.y = y
        this.isAlive = true //active or no
        this.size = enemySize
        this.speed = speed
        this.element = document.createElement('div')
        this.element.className = 'enemy'
        this.element.style.width = `${this.size}px`;
        this.element.style.height = `${this.size}px`;
        this.element.backgroundColor = 'blue'
        this.element.style.zIndex = 100
        bord.append(this.element)
        console.log(bord);
        
        this.direction = 'idle'
        this.render()
        // console.log('hehe');
        
    }



    render(){
        if (!this.isAlive) return
        // console.log(`${this.x}px`);
        // let t = document.querySelector('body')
        // console.log(t);
        
        
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    update(deltatime, gameBoard){
        //time howa time li kan bin had l frame wl frame li kant 9bl
        if(!this.isAlive) return
        let distance = this.speed * deltatime, newX = this.x, newY = this.y;
        if (this.direction === 'idle') {
            this.randomDirection();
        }
        // console.log(deltatime);
        if (this.direction === 'up'){
            newY = this.y - distance
            newX = this.x
        // console.log();
        }else if (this.direction === 'down'){
            newY = this.y + distance
            newX = this.x
        // console.log(newY);

        }else if (this.direction === 'left'){
            newX = this.x - distance
            newY = this.y
        // console.log(newY);

        }else if (this.direction === 'right'){
            newX = this.x + distance
            newY = this.y
        // console.log(newY);

        }

        // console.log(newX);
        // console.log(newY);
        if(this.checkForCollision(newX, newY, gameBoard)){
            this.randomDirection()
        }else{
            this.x = newX
            this.y = newY
        }

        this.render()
    }

    checkForCollision(newX, newY, gameBoard){
        // console.log(newY);
        // console.log(newX);
        const corners = [
            { x: newX, y: newY },// Top-left
            { x: newX + this.size - 1, y: newY }, // Top-right
            { x: newX, y: newY + this.size - 1 }, // Bottom-left
            { x: newX + this.size - 1, y: newY + this.size - 1} // Bottom-right
        ];
        for(let corner of corners){
            const tileX = Math.floor(corner.x / GRID_CELL_SIZE); // hadi hia column
            const tileY = Math.floor(corner.y / GRID_CELL_SIZE); //hadi hia row
            // console.log(corner);
            // console.log(corner.y);

            if (tileX >= gameBoard[0].length|| tileX < 0 ||
                tileY >= gameBoard.length || tileY < 0) {
                    return true
                }
            if (gameBoard[tileY][tileX] == 1){
                return true
            }
        }
        return false
    }

    randomDirection(){
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
        if(this.startDraw){
            this.startDraw = false
            this.map.draw()
        }
        this.player.draw()
        this.ui.draw(deltaTime)
        document.querySelector('#ui h1').textContent = `Lives: ${this.player.lives}`;
        document.getElementById('score').textContent = `Score: ${this.ui.score}`;

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

    if (game.puse) {
        document.getElementById('puse').style.display = 'block'
    } else {
        document.getElementById('puse').style.display = 'none'
        game.draw(deltatime)
    }

    game.update(deltatime)
    requestAnimationFrame(animate)
}



animate(0)