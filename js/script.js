window.onload = function () {
  const bg = new Background()
  const player = new Player(150, 220, ctx, "./images/sheep_sprites4.png")
  const enemyWolf = new EnemyWolf(900, 310, ctx, "./images/wolf_sprites-01.png")
  const platform = new Platform(0, 400, 5000, 500)
  const flyingPlatform = new FlyingPlatform(600, 300, 65, 15)
  const flyingPlatform2 = new FlyingPlatform(700, 200, 65, 15)
  const flyingPlatform3 = new FlyingPlatform(1300, 200, 65, 15)
  const flower = new Flower(640, 200, ctx, "./images/flowers.png")
  const flower2 = new Flower(740, 100, ctx, "./images/flowers.png")
  const water = new Water(1300, 370, 80, 150)





  document.getElementById("start-button").onclick = function () {
    if (requestId) {
      return true
    }

    function startButton() {
      var btn = document.getElementById("start-button");

      if (btn.value == "START GAME") {
        btn.value = "PAUSE GAME";
        btn.innerHTML = "PAUSE GAME";
      } else {
        btn.value = "START GAME";
        btn.innerHTML = "START GAME";
      }

    }
    startGame();
  };

  function startGame() {
    requestId = requestAnimationFrame(update)
    //canvas.width = window.innerWidth;
    //canvas.height = window.innerHeight;
    score = 0;
    highscore = 0;
    requestAnimationFrame(update)
  }

  function countScore() {
    if (frames > 200) {
      if (frames % 97 === 0) score++
    }
  }

  function drawScore() {
    ctx.fillStyle = "#000";
    ctx.font = "20px 'Press Start 2P'"
    ctx.fillText("Score: " + score, 150, 100);
  }
  /*
    let img = ["https://la-wit.github.io/build-an-infinite-runner/build/images/environments/defaultPlatform.png"];
    const tileSize = 32;
    const platform = new Image();
    platform.src = img[0];*/
  /*
    function renderMap(m) {
      for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
          let tile = {
            x: tileSize * [j],
            y: tileSize * [i],
            width: tileSize,
            height: tileSize,
          };
          let currentTile = m[i][j];
          if (currentTile === undefined) {

            // ctx.fillStyle = 'blue';
            // ctx.fillRect(tile.x, tile.y, tile.width, tile.height);
          }
          if (currentTile === 1) {

            //titleCollision(item)
            ctx.drawImage(platform, tile.x, tile.y, tile.width, tile.height);

          }
        }
      }
    }*/

  /*
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
        //sprites.define('sky', 3, 23);
        sprites.define('water', 10, 2)
        sprites.define('platform', 10, 2)


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
      });*/


  function gameOver() {
    bg.gameOver()
    requestId = undefined
  }

  function generateWolf() {
    if (frames % 100 == 0) {
      let y = Math.floor(Math.random() * (400 - 10) + 10)
      let w = Math.floor(Math.random() * (80 - 30) + 30)
      const enemyWolf = new EnemyWolf(520, y, ctx, "./images/wolf_sprites-01.png")
      enemyWolves.push(enemyWolf)
      //enemies = [...enemies, enemy ]
    }
  }

  function drawWolf() {
    enemyWolves.forEach((enemyWolf, index_enemyWolf) => {
      //enemyWolf.render() //TODO  move right left
      if (player.collision(enemyWolf)) {
        player.life--;
        console.log("vida -1")
      }
    })
  }

  function update() {
    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bg.draw()
    platform.draw()
    flyingPlatform.draw()
    flyingPlatform2.draw()
    flyingPlatform3.draw()
    water.draw()
    generateWolf()
    drawWolf()

    enemyWolf.render()
    enemyWolf.update()

    drawScore()
    countScore()

    player.render()
    player.update()

    flower.render()
    flower.update()
    flower2.render()
    flower2.update()

    player.vy += gravity
    if (player.collision(platform)) {
      player.vy = 0;
      player.jumping = false;
      player.direction = "down";
    }

    if (player.collision(flyingPlatform2)) {
      player.vy = 0;
      player.jumping = false;
      player.direction = "down";
      player.y = (flyingPlatform2.y + flyingPlatform2.height) - (player.height + 10);
    }
    if (player.collision(flyingPlatform)) {
      player.vy = 0;
      player.jumping = false;
      player.direction = "down";
      player.y = (flyingPlatform.y + flyingPlatform.height) - (player.height + 10);
    }

    /*player.vy += friction
    player.y+= player.vy;
    player.y ++;*/

    if (requestId) {
      requestId = requestAnimationFrame(update)
    }
  }




  addEventListener("keydown", (e) => {
    //jump
    if (e.keyCode === 32) {
      player.jump()
      if (!player.jumping) {
        //player.jumping = true;
        player.y -= 100;
        player.direction = "up";
        console.log("jump", player)
      }

    }
    if (e.keyCode === 32 && e.keyCode === 39) {
      player.jump()
      if (!player.jumping) {
        //player.jumping = true;
        player.y -= 150;
        player.x += 50;

        player.direction = "up";
        console.log("jump", player)
      }

    }
    //right
    if (e.keyCode === 39) {
      player.right()
      bg.x -= 7;
      platform.x -= 20;
      enemyWolf.x -= 20;
      flyingPlatform.x -= 20;
      flyingPlatform2.x -= 20;
      flyingPlatform3.x -= 20;
      flower.x -= 20;
      flower2.x -= 20;
      water.x -=20
    } //left
    if (e.keyCode === 37) {
      player.left();
      bg.x += 7;
      platform.x += 20;
      enemyWolf.x += 20;
      flyingPlatform.x += 20;
      flyingPlatform2.x += 20;
      flyingPlatform3.x += 20;
      flower.x += 20;
      flower2.x += 20;
      water.x += 20
    }
  })
  //left

  addEventListener("keyup", (e) => {
    if (e.keyCode === 32) {
      //player.direction = "down";
      falling = true;
    }
  })

}