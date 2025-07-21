import { Game } from "./core/game.js"
import { variables } from "../core/variables.js"
import { Enemies } from "../core/enemies.js"



const game = new Game();
let lastTime = 0;

function animate(timestamp) {
    let deltatime = timestamp - lastTime;
    lastTime = timestamp;
    const blur = document.getElementById('blur-wrapper')
    const pauseEl = document.getElementById('pause');
    let constinue = document.getElementById('pause-button');


    if (game.pause) {
        pauseEl.style.display = 'block';
        blur.style.filter = 'blur(10px)';
    } else if (game.gameOver || game.enemies.length === 0) {
        if (game.gameOver) {
            game.ui.gameOver.style.display = 'block';
              pauseEl.style.display = 'block';
                blur.style.filter = 'blur(10px)';
                constinue.style.display = 'none';
        } else {
            const jj = document.getElementById('win');
            if (jj) {
                pauseEl.style.display = 'block';
                blur.style.filter = 'blur(10px)';
                jj.style.display = 'block';
                constinue.style.display = 'none';
            }
        }
    } else {
        if (pauseEl) {
            pauseEl.style.display = 'none';
            blur.style.filter = 'none'
        }
        game.draw(deltatime);
    }




    game.update(deltatime);
    requestAnimationFrame(animate);
}

function startGame() {
    //console.log(variables.GRID_CELL_SIZE);

    const overlay = document.createElement('div');
    const item = document.querySelectorAll('#ui h1');
    console.log(item);

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
                for (let i = 0; i < 4; i++) {
                    let place = game.emptySpaces[Math.floor(Math.random() * game.emptySpaces.length)]
                    game.enemies.push(new Enemies(place.y * variables.GRID_CELL_SIZE, (place.x) * variables.GRID_CELL_SIZE, game.map, variables.GRID_CELL_SIZE, variables.initialSpeed));
                } game.player.maxLives = 5;
                blur.style.filter = 'none'
                for (let i = 0; i < item.length; i++) {
                    item[i].style.display = 'block';
                }
            } else if (e.target.dataset.diff === 'medium') {
                blur.style.filter = 'none'
                for (let i = 0; i < 6; i++) {
                    let place = game.emptySpaces[Math.floor(Math.random() * game.emptySpaces.length)]
                    game.enemies.push(new Enemies(place.y * variables.GRID_CELL_SIZE, (place.x) * variables.GRID_CELL_SIZE, game.map, variables.GRID_CELL_SIZE, variables.initialSpeed));
                } game.player.maxLives = 4
                for (let i = 0; i < item.length; i++) {
                    item[i].style.display = 'block';
                }
            } else if (e.target.dataset.diff === 'hard') {
                blur.style.filter = 'none'
                for (let i = 0; i < 8; i++) {
                    let place = game.emptySpaces[Math.floor(Math.random() * game.emptySpaces.length)]
                    game.enemies.push(new Enemies(place.y * variables.GRID_CELL_SIZE, (place.x) * variables.GRID_CELL_SIZE, game.map, variables.GRID_CELL_SIZE, variables.initialSpeed));
                }
                game.player.maxLives = 3
                for (let i = 0; i < item.length; i++) {
                    item[i].style.display = 'block';
                }
            }
            animate(0);
        };
    });

    const pauseEl = document.getElementById('pause');
    //const restartEl = document.getElementById('restart')

    pauseEl.addEventListener('click', () => {
        game.pause = false
        blur.style.filter = 'none'
    })
}
startGame();
