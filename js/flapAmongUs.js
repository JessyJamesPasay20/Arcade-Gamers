var intro = document.getElementById("intro");
var overlay = document.getElementById("endScreen");
var overlayScore = document.getElementById("score");
var game = document.getElementById("game");
var interact = document.querySelector("html");
var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var start = document.getElementById("start");
var live = document.getElementById("live");
var jumping = 0;
var counter = 0;

function startGame() {
  intro.style.display = "none";
  game.style.display = "block";
  setTimeout(function () {
    character.style.display = "block";

    setTimeout(function () {
      block.style.display = "block";
      hole.style.display = "block";
      gameTest();

      interact.removeEventListener("keydown", startGame);
    }, 1000);
  }, 1000);
}
interact.addEventListener("keydown", startGame);

function gameTest() {
  hole.addEventListener("animationiteration", () => {
    var random = -(Math.random() * 400 + 150);
    hole.style.top = random + "px";
    counter++;
  });

  setInterval(function () {
    var characterTop = parseInt(
      window.getComputedStyle(character).getPropertyValue("top")
    );
    if (jumping == 0) {
      character.style.top = characterTop + 6 + "px";
    }
    var blockLeft = parseInt(
      window.getComputedStyle(block).getPropertyValue("left")
    );
    var holeTop = parseInt(
      window.getComputedStyle(hole).getPropertyValue("top")
    );
    var cTop = -(600 - characterTop);
    if (
      characterTop > 600 ||
      (blockLeft < 20 &&
        blockLeft > -50 &&
        (cTop < holeTop || cTop > holeTop + 130))
    ) {
      block.style.display = "none";
      hole.style.display = "none";
      character.style.display = "none";

      overlay.style.display = "flex";

      overlayScore.innerText = counter;
      live.style.display = "none";
      character.style.top = 100 + "px";

      overlay.addEventListener("click", reset);
      interact.removeEventListener("keydown", jump);
      interact.addEventListener("keydown", reset);
      function reset() {
        location.reload();
        counter = 0;
      }
    }
  }, 10);

  function jump() {

    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function () {
      var characterTop = parseInt(
        window.getComputedStyle(character).getPropertyValue("top")
      );
      if (characterTop > 8 && jumpCount < 15) {
        character.style.top = characterTop - 4 + "px";
      }
      if (jumpCount > 20) {
        clearInterval(jumpInterval);
        jumping = 0;
        jumpCount = 0;
      }
      jumpCount++;
    }, 10);
    live.innerText = counter;
  }
  game.addEventListener("click", jump);
  interact.addEventListener("keydown", jump);
}

start.addEventListener("click", startGame);
