import { Game } from "./core/game.js"

const game = new Game();
let lastTime = 0;

function animate(timestamp) {
    let deltatime = timestamp - lastTime;
    lastTime = timestamp;
    const pauseEl = document.getElementById('pause');
    if (game.pause) {
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
function startGame() {
    const overlay = document.createElement('div');
    overlay.id = 'difficulty-card';
    overlay.innerHTML = `
    <div style="margin-bottom: 24px;">Choose Difficulty</div>
    <button class="diff-btn" data-diff="easy">Easy</button>
    <button class="diff-btn" data-diff="medium">Medium</button>
    <button class="diff-btn" data-diff="hard">Hard</button>
    `;
    document.body.appendChild(overlay);
    let blur = document.getElementById('blur-wrapper')
    Array.from(overlay.querySelectorAll('button')).forEach(btn => {
        btn.style = `
        background: #222;
        color: #ffb300;
        border: 2px solid #ffb300;
        border-radius: 8px;
        font-size: 1.2rem;
        padding: 10px 24px;
        margin: 0 8px;
        cursor: pointer;
        font-family: 'Bitcount Grid Single', monospace;
        `;
        btn.onmouseover = () => { btn.style.background = '#ffb300'; btn.style.color = '#222'; };
        btn.onmouseout = () => { btn.style.background = '#222'; btn.style.color = '#ffb300'; };
        btn.onclick = (e) => {
            overlay.remove();
            if (e.target.dataset.diff === 'easy') {
                blur.style.filter = 'none'
            } else if (e.target.dataset.diff === 'medium') {
                blur.style.filter = 'none'
                game.maxEnemies = 6;
                game.player.maxLives = 4
            } else if (e.target.dataset.diff === 'hard') {
                blur.style.filter = 'none'
                game.maxEnemies = 4;
                game.player.maxLives = 3
            }
            animate(0);
        };
    });
}
startGame();