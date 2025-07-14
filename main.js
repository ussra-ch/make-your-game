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
    }

    draw() {
        bord.innerHTML = ""
        console.log(this.map.length, this.map[0].length);

        bord.style.display = "grid"
        bord.style.gridTemplateColumns = `repeat(${this.map[0].length}, 1fr)`
        bord.style.gridTemplateRows = `repeat(${this.map.length}, 1fr)`


        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                const tile = document.createElement('div')
                tile.id='til'
                if (this.map[y][x] === 1) {
                    tile.style.backgroundImage = "url('block.png')"

                }
                tile.style.border = '1px solid #ccc'
                bord.appendChild(tile)
            }
        }
    }

}

class Game {
    constructor() {
        this.map = new Map(this)
    }
    draw() {
        this.map.draw()
    }
}

const game = new Game()

function animate() {
    game.draw()
    requestAnimationFrame(animate)
}

animate()
