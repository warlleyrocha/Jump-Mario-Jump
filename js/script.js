const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const restartScreen = document.querySelector(".restart-screen");
const scoreElement = document.getElementById("score");
const musicGame = document.getElementById("musicGame"); // Seleciona o áudio do jogo
const gameOverMusic = document.getElementById("gameOverMusic");

let score = 0;
let hasPassedPipe = false;

const updateScore = () => {
  score++;
  scoreElement.textContent = score;
};

const jump = () => {
  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  console.log("loop");

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 100) {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    mario.src = "/assets/images/game-over.png";
    mario.style.width = "75px";
    mario.style.marginLeft = "50px";

    clearInterval(loop);

    musicGame.pause(); // Pausa a música ao colidir com o cano
    musicGame.currentTime = 0; // Reseta a música para o início
    gameOverMusic.play(); // Inicia a musica de game over

    restartScreen.style.display = "flex";
  } else if (pipePosition < 0 && !hasPassedPipe) {
    updateScore();
    hasPassedPipe = true;
  } else if (pipePosition >= 120) {
    hasPassedPipe = false;
  }
}, 10);

document.addEventListener("keydown", jump);

function restartGame() {
  restartScreen.style.display = "none";
  pipe.style.animation = "";
  mario.style.animation = "";
  mario.src = "/assets/images/mario.gif";
  mario.style.width = "150px";
  mario.style.marginLeft = "0px";

  score = 0;
  scoreElement.textContent = score;

  musicGame.play(); // Retoma a música ao reiniciar o jogo

  setTimeout(() => {
    location.reload();
  }, 100);
}
