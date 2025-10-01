import { Game } from "./core/game.js"
import { variables } from "./core/variables.js"
import { Enemies } from "./core/enemies.js"


let ids
let game
let lastTime = 0;
let starts = document.getElementById('startstory')
let ss = document.getElementById('topstory')
let paus = false
var a = null;
function animate(timestamp) {
    removeSpaceListener();


    if (game.count == 1 || game.count == 1.5) {


        starts.style.display = "block"
        starts.textContent = 'لقد تدربت كتيرا على هذا ,الشيء الوحيد القادر  على قتل الأشباح وتحريرها من اللعنة هي القابل'



    }
    if (game.count == 2 || game.count == 2.5) {

        starts.textContent = 'علي أن أسرع الوقت غير كافي '
        starts.style.display = "block"

    }


    if (game.count == 3 || game.count == 3.5) {

        starts.style.display = "block"

        starts.textContent = 'اللعنة هنالك الكتير من السموم'



    }
    if (game.count == 4 || game.count == 4.5) {

        starts.style.display = "block"

        starts.textContent = 'لطالما أردت أن أخبرك أنني أحبك لكني ,,لكني ,,لكني,,أحتاج لتركيز علي تحريرها'



    }
    if (game.count == 5 || game.count == 5.5) {
        starts.style.display = "block"

        starts.textContent = 'أنا السبب في كل شيء أنا من جعلتهم هكذا أنا السبب ،،،،أنااااااا،ليتني مت بدل ذلك'


    }
    if (game.count == 6 || game.count == 6.5) {
        starts.style.display = "block"

        starts.textContent = 'يتذكر البطل ملامح زوجته والدموع تسقط كأنها صخور تحجرت وصوت طفلته التي تتلعتم في الكلام لكن صوتها ينسي كل هم  '

    }
    if (game.count == 7 || game.count == 7.5) {
        starts.style.display = "block"

        starts.textContent = 'تم يتذكر أخر كلمات زوجته .،لاتلم  نفسك كتيرا ،لا تحمل كل العبئ وحدك، لاشيء تغير، كل شيء ظل كا هو فأنت بطلي'

    }
    if (game.count == 8 || game.count == 8.5) {
        starts.style.display = "block"

        starts.textContent = 'يصرخ البطل والغضب يشع من وجهه قائلا : أحبك'


    }
    if (game.count == 9 || game.count == 9.5) {
        starts.style.display = "block"

        starts.textContent = 'لن أستسلم'


    }
    if (game.count == 10 || game.count == 10.5) {
        starts.style.display = "block"

        starts.textContent = 'أبدا'


    }
    if (game.count == 11) {
        starts.style.display = "block"
        console.log(game.count, '------------');

        starts.textContent = 'فلتساعني أناجيك أيها الاعب '

    }

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
        clearInterval(game.ui.interval)
        paus = true
    } else if (game.gameOver) {
        clearInterval(game.ui.interval)

        starts.style.display = "none"

        if (game.enemies.length !== 0 || game.ui.timeS == 0) {
            clearTimeout(ids)
            clearInterval(game.ui.interval)

            gameOver.style.display = 'block';
            pauseEl.style.display = 'block';
            blur.style.filter = 'blur(10px)';
            constinue.style.display = 'none';
        } else {
            if (jj) {
                clearInterval(game.ui.interval)

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
        if (paus) {
            game.ui.go = true
            paus = false
        }
        game.draw(deltatime);
    }

    game.update(deltatime);
    if (variables.restart) {
        starts.style.display = "none"
        starts.textContent = ""
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
function startGame() {
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
    var blur = document.getElementById('blur-wrapper')
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
            ss.textContent = "لم  تعدّ للحياة معنى جديدًا بعدما تحوّلت عائلته وأصدقاؤه إلى أشباح، بسبب أمرٍ غامض لا يعلمه أحد. فقد زوجته وابنته وجميع أصدقائه في لمح البصر، وكأن شيئًا لم يكن أصلًا. لكن، وبعد صراعٍ طويل، قرر البطل أن يحرّر اليأس من روحه، وأن يمنح للّامعنى معنى جديدًا. ساعده على ذلك ليُحرّر نفسه من أصوات اليأس، ويحرّر عائلته من لعنةٍ طالما كانت عبئًا عليهم                 "
            blur.style.filter = 'blur(10px)';
           document.querySelector('.skip').style.display = 'block'
            ss.style.display = 'block'

            document.addEventListener('keydown', handleSpace);


        };

    });

    const pauseEl = document.getElementById('pause');

    pauseEl.addEventListener('click', () => {
        game.pause = false
        blur.style.filter = 'none'
    })
}
function handleSpace(event) {
    if (event.key === 'Enter' || event.code === 'Enter') {
        const blur = document.getElementById('blur-wrapper')
        blur.style.filter = 'none';
        ss.style.display = 'none';
        ss.textContent = "";

        animate(0);
        game.ui.go = true
        document.querySelector('.skip').style.display = 'none'


    }
}
function removeSpaceListener() {
    document.removeEventListener('keydown', handleSpace);
}
startGame();
