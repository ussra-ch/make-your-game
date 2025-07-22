import { variables } from "./variables.js"


export class Bomb {
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
        if (!this.element && variables.bord) {
            this.element = document.createElement('div');
            this.element.style.position = 'absolute';
            this.element.className = 'bomb';
            this.element.style.left = `${this.x * variables.GRID_CELL_SIZE}px`;
            this.element.style.top = `${this.y * variables.GRID_CELL_SIZE}px`;
            this.element.style.width = `${variables.GRID_CELL_SIZE}px`;
            this.element.style.height = `${variables.GRID_CELL_SIZE}px`;
            this.element.style.backgroundImage = "url('./img/bomb.png')";
            this.element.style.borderRadius = `${50}px`
            this.element.style.zIndex = '8';
            variables.bord.appendChild(this.element);
        }
    }

    update() {
        this.timer--;
        if (this.timer < 60) {
            this.blinkTimer++;
            if (this.blinkTimer % 9 === 0) {
                this.visible = !this.visible;
            }
        }

        if (this.timer <= 0 && !this.exploded) {
            this.explode();
        }
    }

    explode() {
        this.exploded = true;

        if (this.element) {
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
                    this.game.map.map[ny][nx] = variables.cadeau[Math.floor(Math.random() * variables.cadeau.length)];
                    this.game.map.draw();
                }

                const playerGridX = Math.round(this.game.player.pixelX / variables.GRID_CELL_SIZE);
                const playerGridY = Math.round(this.game.player.pixelY / variables.GRID_CELL_SIZE);

                if (playerGridX === nx && playerGridY === ny && this.game.player.time==0) {
                    this.game.player.time = 1;
                    setTimeout(() => {
                        this.game.player.time = 0;
                    }, 3000);
                    this.game.player.lives--;
                    this.game.player.pixelX = 1 * variables.GRID_CELL_SIZE;
                    this.game.player.pixelY = 1 * variables.GRID_CELL_SIZE;
                    this.game.player.emortal = true;
                    if (this.game.player.lives <= 0) {
                        this.game.gameOver = true;
                    }
                }

                if (this.game.enemies.length > 0) {
                    this.game.enemies.forEach(enemy => {
                        const enemyGridX = Math.round(enemy.x / variables.GRID_CELL_SIZE);
                        const enemyGridY = Math.round(enemy.y / variables.GRID_CELL_SIZE);

                        if (enemyGridX === ny && enemyGridY === nx) {
                            enemy.isAlive = false;
                            enemy.element.remove();
                            this.game.ui.score += 20;
                        }
                    });
                }


                this.createExplosion(nx, ny);

            }

        });

    }

    createExplosion(x, y) {
        const bommmmm = document.createElement('div');
        bommmmm.style.position = 'absolute';
        bommmmm.style.left = `${x * variables.GRID_CELL_SIZE}px`;
        bommmmm.style.top = `${y * variables.GRID_CELL_SIZE}px`;
        bommmmm.style.width = `${variables.GRID_CELL_SIZE}px`;
        bommmmm.style.height = `${variables.GRID_CELL_SIZE}px`;
        bommmmm.style.backgroundColor = 'rgba(255, 165, 0, 0.9)';
        bommmmm.style.borderRadius = '50%';
        bommmmm.style.zIndex = '15';
        bommmmm.style.border = '2px solid rgba(255, 0, 0, 0.8)';
        bommmmm.style.boxShadow = '0 0 20px rgba(255, 165, 0, 0.8)';

        if (variables.bord) {
            variables.bord.appendChild(bommmmm);
        }

        // Animate explosion
        let scale = 0.1;
        const animateExplosion = () => {
            scale += 0.1;
            bommmmm.style.transform = `scale(${scale})`;
            if (scale < 2) {
                requestAnimationFrame(animateExplosion);
            } else {
                bommmmm.remove();
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