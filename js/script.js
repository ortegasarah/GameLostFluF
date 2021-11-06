window.onload = function () {
  const bg = new Background(canvas.width, canvas.height)
  const player = new Player(150, 440, 70, 70)
  const platform = new Platform(canvas.width, 600)
  const marmot = new MarmotEnemy(400, 440, 70, 70)
  const flyingPlatform = new FlyingPlatform(300, 200, 70, 70)

  document.getElementById("start-button").onclick = function () {
    if (requestId) {
      return true
    }
    startGame();
  };


  function loadImage(url) {
    return new Promise(resolve => {
      const image = new Image();
      image.addEventListener('load', () => {
        resolve(image);
      })
      image.src = url;
    })
  }

  loadImage('./images/tiles.png')
    .then(image => {
      const sprites = new SpriteSheet(image);
      sprites.define('ground', 0, 0);
      sprites.define('sky', 3, 23);
      sprites.define('water', 10, 2)

      for (let x = 0; x < 300; x++) {
        for (let y = 0; y < 40; y++) {
          sprites.drawTile('sky', ctx, x, y);
        }
      }

      for (let x = 0; x < 300; x++) {
        for (let y = 30; y < 40; y++) {
          sprites.drawTile('ground', ctx, x, y);
        }
      }

      for (let x = 50; x < 55; x++) {
        for (let y = 30; y < 40; y++) {
          sprites.drawTile('water', ctx, x, y);
        }
      }
    });





  function startGame() {
    requestId = requestAnimationFrame(update)
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    score = 0;
    highscore = 0;
    requestAnimationFrame(update)

  }

  function gameOver() {
    bg.gameOver()
    requestId = undefined
  }

  function generateMarmot() {
    if (!(frames % 160 === 0)) {
      return true
    }
  }

  function drawMarmot() {

    if (player.collision(marmot)) {
      gameOver()
      console.log("game over")
    }

  }

  function update() {
    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    bg.draw()
    player.draw()
    platform.draw()
    marmot.draw()
    flyingPlatform.draw()
    drawMarmot()
    generateMarmot()
    if (requestId) {
      requestId = requestAnimationFrame(update)
    }
  }




  addEventListener("keydown", (e) => {
    //space
    if (e.keyCode === 32) {
      player.userPull = 0.3;
      console.log('hellooo')
    }
    //right
    if (e.keyCode === 39) {
      bg.x -= 7;
      platform.x -= 20;
      marmot.x -= 20;
      flyingPlatform.x -= 20;

    } //left
    if (e.keyCode === 37) {
      bg.x += 7;
      platform.x += 20;
      marmot.x += 20
      flyingPlatform.x += 20;
    }
  })
  //left

  addEventListener("keyup", (e) => {
    if (e.keyCode === 32) {
      player.userPull = 0;
    }
  })

}