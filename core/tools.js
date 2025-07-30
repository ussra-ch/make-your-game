import { variables } from "./variables.js"


export class KeyboardListner {
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


export class Ui {
    constructor(game) {
        this.game = game;
        this.score = 0;
        this.timeM = 3;
        this.timeS = 0;
        this.elapsed = 0;
        this.gameOver = null;
        [this.pauseButton, this.restartButton] = [document.getElementById('pause-button'), document.getElementById('restart')];
    }

    draw(deltaTime) {
        this.elapsed += deltaTime;

        if (this.elapsed >= 1000) {
            this.elapsed -= 1000;

            if (this.timeS === 0) {
                if (this.timeM > 0) {
                    this.timeM -= 1;
                    this.timeS = 59;
                } else {
                    this.timeM = 0;
                    this.timeS = 0;
                    this.game.gameOver = true;

                    return;
                }
            } else {
                this.timeS -= 1;
            }
        }
        const timeEl = document.getElementById('time');
        if (timeEl) {
            timeEl.textContent = `time: ${this.timeM.toString().padStart(2, '0')}:${this.timeS.toString().padStart(2, '0')}`;
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
            document.body.append(this.gameOver);
        }
        [this.pauseButton, this.restartButton].forEach(button => {
            button.addEventListener('click', () => {
                if (button.id === 'pause-button') {
                    this.game.pause = !this.game.pause;
                } else if (button.id === 'restart') {
                    variables.restart = true;
                }
            });
        })

    }
}