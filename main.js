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
    // Create overlay card
    const overlay = document.createElement('div');
    overlay.id = 'difficulty-card';
    overlay.style.position = 'fixed';
    overlay.style.top = '50%';
    overlay.style.left = '50%';
    overlay.style.transform = 'translate(-50%, -50%)';
    overlay.style.background = 'rgba(30,30,30,0.97)';
    overlay.style.color = '#fff';
    overlay.style.padding = '36px 56px';
    overlay.style.borderRadius = '18px';
    overlay.style.border = '2px solid #ffb300';
    overlay.style.boxShadow = '0 0 32px 8px rgba(0,0,0,0.7)';
    overlay.style.zIndex = '2000';
    overlay.style.textAlign = 'center';
    overlay.style.fontFamily = "'Bitcount Grid Single', monospace";
    overlay.style.fontSize = '2rem';
    overlay.innerHTML = `
    <div style="margin-bottom: 24px;">Choose Difficulty</div>
    <button class="diff-btn" data-diff="easy">Easy</button>
    <button class="diff-btn" data-diff="medium">Medium</button>
    <button class="diff-btn" data-diff="hard">Hard</button>
    `;
    document.body.appendChild(overlay);
    // Style buttons
    Array.from(overlay.querySelectorAll('button')).forEach(btn => {
        btn.style.background = '#222';
        btn.style.color = '#ffb300';
        btn.style.border = '2px solid #ffb300';
        btn.style.borderRadius = '8px';
        btn.style.fontSize = '1.2rem';
        btn.style.padding = '10px 24px';
        btn.style.margin = '0 8px';
        btn.style.cursor = 'pointer';
        btn.style.fontFamily = "'Bitcount Grid Single', monospace";
        btn.onmouseover = () => { btn.style.background = '#ffb300'; btn.style.color = '#222'; };
        btn.onmouseout = () => { btn.style.background = '#222'; btn.style.color = '#ffb300'; };
        btn.onclick = (e) => {
            overlay.remove();
            if (e.target.dataset.diff === 'easy') {


            } else if (e.target.dataset.diff === 'medium') {
                game.maxEnemies = 7;
                game.player.maxLives = 4
                animate(0);


            } else if (e.target.dataset.diff === 'hard') {
                game.maxEnemies = 15;
                game.player.maxLives = 3
                animate(0);
            }


        };
    });
}
startGame();