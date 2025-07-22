import { variables } from "./variables.js"
import { Map } from "./map.js"
import { Player } from "./player.js"
import { Enemies } from "./enemies.js"
import { Ui, KeyboardListner } from "./tools.js"



export class Game {
    constructor() {
        this.map = new Map(this);
        this.ui = new Ui(this);
        this.input = new KeyboardListner(this);
        this.player = new Player(this, 1, 1);
        this.pause = false;
        this.pPressedLastFrame = false;
        this.gameOver = false;
        this.maxEnemies = 4;
        this.startDraw = true
        this.enemies = []
        this.emptySpaces = this.map.findEmptySpaces()
    }

    draw(deltaTime) {
        if (this.startDraw) {
            this.startDraw = false
            while (this.enemies.length  < this.maxEnemies) {
                let place = this.emptySpaces[Math.floor(Math.random() * this.emptySpaces.length)]
                this.enemies.push(new Enemies(place.y * variables.GRID_CELL_SIZE, (place.x) * variables.GRID_CELL_SIZE, this.map, variables.GRID_CELL_SIZE, variables.initialSpeed));
            }
            this.map.draw()
        }

        // console.log('map created');
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
        if (this.enemies.length==0) {
            this.gameOver = true;
            
        }
        const pPressed = this.input.keys.includes('p');
        if (pPressed && !this.pPressedLastFrame) {
            this.pause = !this.pause;
        }
        this.pPressedLastFrame = pPressed;

        if (!this.pause && !this.gameOver) {
            this.player.update();
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime, this.map);
            });
            this.enemies = this.enemies.filter(enemy => enemy.isAlive);
        }
    }

}
