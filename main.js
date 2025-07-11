const bord = document.getElementById('game')

class Map {
    constructor(game) {
        this.game = game
        this.width=80
        this.hegth=70
        this.map=[
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ]

    }
    draw(){
       
    }

}
class Game {
    constructor() {
        this.map=new Map(this)
    }
    draw(){
        this.map.draw()
    }
}
const game = new Game()
function animate() {
    game.draw()
    requestAnimationFrame(animate)
}
animate()