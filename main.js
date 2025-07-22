import { Game } from "./core/game.js"
import { variables } from "./core/variables.js"
import { Enemies } from "./core/enemies.js"



let game
let lastTime = 0;
var a = null;
function animate(timestamp) {
    let deltatime = timestamp - lastTime;
    lastTime = timestamp;
    const blur = document.getElementById('blur-wrapper')
    const pauseEl = document.getElementById('pause');
    let constinue = document.getElementById('pause-button');
    const jj = document.getElementById('win');
    const gameOver = document.getElementById('game-over');


    if (game.pause) {
        pauseEl.style.display = 'block';
        blur.style.filter = 'blur(10px)';
    } else if (game.gameOver) {

        if (game.enemies.length !== 0) {
            gameOver.style.display = 'block';
            pauseEl.style.display = 'block';
            blur.style.filter = 'blur(10px)';
            constinue.style.display = 'none';
        } else {
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
    if (variables.restart) {
        jj.style.display = 'none';
        gameOver.style.display = 'none';
        constinue.style.display = 'block';
        pauseEl.style.display = 'none';
        blur.style.filter = 'blur(10px)';
        clearInterval(a)
        startGame();
        variables.restart = false;
    } else {
        requestAnimationFrame(animate);

    }
}

export function startGame() {
    game = new Game();
    const en = document.querySelectorAll('.enemy');
    en.forEach(enemy => {
        enemy.remove();
    })
    const bomb = document.querySelectorAll('.bomb');
    bomb.forEach(b => {
        b.remove();
    })
    const overlay = document.createElement('div');
    const item = document.querySelectorAll('#ui h1');
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
        background: #1c1c22;
        color: #ffb300;
        border: 2px solid #ffb300;
        border-radius: 8px;
        font-size: 1.2rem;
        padding: 10px 24px;
        margin: 0 8px;
        cursor: pointer;
        font-family: 'Bitcount Grid Single', monospace;
        `;
        btn.onmouseover = () => { btn.style.background = '#ffb300'; btn.style.color = '#1c1c22'; };
        btn.onmouseout = () => { btn.style.background = '#1c1c22'; btn.style.color = '#ffb300'; };
        btn.onclick = (e) => {
            overlay.remove();
            if (e.target.dataset.diff === 'easy') {
                document.getElementById('ui').style.display = 'flex';
                game.maxEnemies = 4;
                blur.style.filter = 'none'
                game.startDraw = true

            } else if (e.target.dataset.diff === 'medium') {
                document.getElementById('ui').style.display = 'flex';
                blur.style.filter = 'none'
                game.maxEnemies = 8;
                console.log(1);
                game.startDraw = true
                game.player.maxLives = 4
                for (let i = 0; i < item.length; i++) {
                    item[i].style.display = 'block';
                }

            } else if (e.target.dataset.diff === 'hard') {
                game.startDraw = true
                document.getElementById('ui').style.display = 'flex';
                blur.style.filter = 'none'
                game.player.maxLives = 3
                a = setInterval(() => {
                    game.maxEnemies = 30;
                    if ((game.enemies.length >= game.maxEnemies)) {
                        clearInterval(a)
                    }
                    let place = game.emptySpaces[Math.floor(Math.random() * game.emptySpaces.length)]
                    game.enemies.push(new Enemies(place.y * variables.GRID_CELL_SIZE, (place.x) * variables.GRID_CELL_SIZE, game.map, variables.GRID_CELL_SIZE, variables.initialSpeed));
                    console.log(game.enemies.length);

                }, 3000)
                for (let i = 0; i < item.length; i++) {
                    item[i].style.display = 'block';
                }
            }
            variables.start = false;
            animate(0);
        };

    });

    const pauseEl = document.getElementById('pause');

    pauseEl.addEventListener('click', () => {
        game.pause = false
        blur.style.filter = 'none'
    })
}
startGame();
