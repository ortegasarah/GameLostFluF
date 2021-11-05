window.onload = function () {

  //llamar mis clases
  const bg = new Background(canvas.width, canvas.height)
  const player = new Player(150, 286, 70, 70)
  const platform = new Platform(canvas.width, 300)
const fox = new FoxEnemy(400, 286, 50, 50)
  


  document.getElementById("start-button").onclick = function () {
    if (requestId) {
      return true
    }
    startGame();
  };


  function startGame() {
    requestId = requestAnimationFrame(update)
  }

  function gameOver() {
    bg.gameOver()
    requestId = undefined

  }

  

  function update() {
    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    bg.draw()
    player.draw()
    platform.draw()
    fox.draw()
    //player.draw()
    if (requestId) {
      requestId = requestAnimationFrame(update)
    }
  }



  //space
  addEventListener("keydown", (e) => {
    if (e.keyCode === 32) {
      // player.userPull = 0.3;
      bg.x -= 15;
      platform.x -= 20;
      fox.y-= 20
      player.y -= 20;
    }
    if (e.keyCode === 82) {
      //resetGame()
      //player.x -= 20;
    } //right
    if (e.keyCode === 39) {
      //player.x += 10;
      bg.x -= 30;
      platform.x -= 20;
      fox.x-= 20;

    } //left
    if (e.keyCode === 37) {
      //player.userPull = 0;
      //player.x -= 20;
      bg.x += 15;
      platform.x += 20;
      fox.x+= 20

    }
  })
  //left
}