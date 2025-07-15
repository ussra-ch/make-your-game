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
    }
    addblocke() {
        let emtiSpais = []
        this.map.forEach((element, y) => {
            for (let x = 0; x < element.length; x++) {
                if (element[x] == 0) {
                    emtiSpais.push({ y, x })
                }

            }
        });
        for (let i = 0; i < 50; i++) {
            let pos = emtiSpais[Math.floor(Math.random() * emtiSpais.length)]
            this.map[pos.y][pos.x] = 2
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
            if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', ' ', 'p'].includes(e.key) && !this.keys.includes(e.key)) {
                this.keys.push(e.key);
            }

        });
        window.addEventListener('keyup', e => {
            if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', ' ', 'p'].includes(e.key)) {
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
        timeEl.textContent = `${this.timeM}:${this.timeS}`;
    }
}
class Game {
    constructor() {
        this.map = new Map(this)
        this.ui = new Ui(this)
        this.input = new Input(this)
        this.puse = false
        this.pPressedLastFrame = false
    }
    draw(deleteTime) {
        this.map.draw()
        this.ui.draw(deleteTime)
    }
    update() {
        const pPressed = this.input.keys.includes('p');
        if (pPressed && !this.pPressedLastFrame) {
            this.puse = !this.puse;
        }
        this.pPressedLastFrame = pPressed;
    }
}

const game = new Game()
let lastTime = 0
function animate(timestamp) {
    let deltatime = timestamp - lastTime;
    lastTime = timestamp;
    console.log(Math.ceil(deltatime));
    if (game.puse) {
        document.getElementById('puse').style.display='block'
    } else {
        document.getElementById('puse').style.display='none'

        game.draw(deltatime)
    }
    requestAnimationFrame(animate)
    game.update()
}

animate(0)
