import {Game} from "./core/game.js"

const game = new Game();
let lastTime = 0;

function animate(timestamp) {
    let deltatime = timestamp - lastTime;
    lastTime = timestamp;
    const pauseEl = document.getElementById('puse');
    if (game.puse) {
        pauseEl.style.display = 'block';
    } else if (game.gameOver || game.enemies.length === 0) {

        if (game.gameOver) {
            game.ui.gameOver.style.display = 'block';
        } else {
            const jj = document.getElementById('win');
            if (jj) {
                jj.style.display = 'block';
            }
        }
    } else {
        if (pauseEl) pauseEl.style.display = 'none';
        game.draw(deltatime);
    }

    game.update(deltatime);
    requestAnimationFrame(animate);
}

animate(0);