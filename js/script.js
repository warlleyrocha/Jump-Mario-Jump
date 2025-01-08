const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const restartScreen = document.querySelector(".restart-screen");

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
    restartScreen.style.display = "flex";
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

  setTimeout(() => {
    location.reload();
  }, 100);
}
