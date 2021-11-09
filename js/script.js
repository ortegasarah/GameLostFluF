window.onload = function () {
  const bg = new Background()
  const player = new Player(150, 225, ctx, "./images/sheep_sprites4.png")
  const enemyWolf = new EnemyWolf(900, 310, ctx, "./images/wolf_sprites-01.png")
  const platform = new Platform(0, 400, 5000, 500)
  const flyingPlatform = new FlyingPlatform(600, 300, 100, 15)
  const flyingPlatform2 = new FlyingPlatform(700, 200, 100, 15)
  const flyingPlatform3 = new FlyingPlatform(1300, 300, 100, 15)
  const stairs = new FlyingPlatform(1370, 200, 200, 200)
  const flower = new Flower(640, 200, ctx, "./images/flowers.png")
  const flower2 = new Flower(740, 100, ctx, "./images/flowers.png")
  const water = new Water(1300, 370, 80, 150)
  const controller = new Controller()

  /*
    document.getElementById("start-button").onclick = function () {
      if (requestId) {
        return true
      }

      
      startGame();
    };*/

  function startGame() {
    requestId = requestAnimationFrame(update)
    score = 0;
    highscore = 0;
    playerLife = 5;
    numberOfFlower = 0;
    requestAnimationFrame(update)
  }


  function generateFlower() {
    if (frames % 200 === 0 || frames % 150 === 0 || frames % 900 === 0) {

      //(max min) + min
      let w = Math.floor(Math.random() * canvas.height) + 80
      let x = Math.floor(Math.random() * canvas.width) - 500

      const flower = new Flower(x, y, ctx, "./images/flowers.png")

      flowers.push(flower)
    }
  }

  function moveElement(item) {
    item.d += 0.01;
    item.ox = item.x;
    item.vx = item.x + Math.cos(item.d) * 2 - item.x;
    item.x += item.vx;
  }

  function playerMove(gato) {
    if (!player.jumping && controller.up) {
      controller.up = false;
      player.vy -= 10;
      player.jumping = true;
    }
    if (controller.left) {
      player.vx -= 0.05;
    }
    if (controller.right) {
      player.vx += 0.05;
    }
    if (player.direction != "platform" && (!controller.right || !controller.left)) {
      player.vx = 0;
    }
    player.vy += gravity;
    player.oy = player.y;
    player.ox = player.x;
    player.y += player.vy;
    player.x += player.vx;

    if (player.y > 350) {
      player.y = 350;
      player.vy = 0;
      player.jumping = false;
    }
    if (player.x + player.width * 0.5 > flyingPlatform3.x + 3 && player.x + player.width * 0.5 < flyingPlatform3.x + 9 + flyingPlatform3.width) {

      if (player.y + player.height > flyingPlatform3.height + flyingPlatform3.y && (player.oy + player.height <= flyingPlatform3.y + flyingPlatform3.height)) {
        player.y = (flyingPlatform3.y + 4) - player.height;
        player.vy = flyingPlatform3.vy;
        player.jumping = false;
        player.vx += (flyingPlatform3.vx - player.vx);
        player.direction = "platform"
      }
    }
    if (player.jumping) {
      if (player.direction === "platform") {

        player.vx = 0;
        if (player.status = "right") {
          player.vx += 0.5;
        } else {
          player.vx -= player.x * 0.3;
        }
      } else {
        player.vx -= player.x * 0.3;
      }
    }
  }
  /*
  function countFlower() {
    flowers.forEach((flower) => {
      flower.draw()

      if (player.collision(flower)) {
        numberOfFlower++
        console.log("flowerss", numberOfFlower)
      }
    })
  }*/

  function drawFlowerLife() {
    ctx.fillStyle = "#000";
    ctx.font = "20px 'Press Start 2P'"
    ctx.fillText("flowers ", 400, 200); //TODO add image flower
  }


  function countLife() {

  }

  function drawLife() {
    ctx.fillStyle = "#000";
    ctx.font = "20px 'Press Start 2P'"
    ctx.fillText("Life " + playerLife, 150, 200);
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

  function gameOver() {
    if (countLife === 0) {
      bg.gameOver()
      requestId = undefined
    }
  }

  function drawWolf() {
    enemyWolves.forEach((enemyWolf, index_enemyWolf) => {
      enemyWolf.render() //TODO  move right left
      if (player.collision(enemyWolf)) {
        playerLife--;
        console.log("vida -1", playerLife)
      }
      if (enemyWolf.x + enemyWolf.width <= 0) {
        enemyWolves.splice(index_enemyWolf, 1)
        console.log("wolf splice", playerLife)

      }
    })
  }

  function update() {

    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bg.draw()

    //map - platform, water
    platform.draw()
    flyingPlatform.draw()
    flyingPlatform2.draw()
    if (platform.x < -440 && platform.x > -1580) {
      flyingPlatform3.draw()
      moveElement(flyingPlatform3)
    }
    water.draw()

    drawWolf()
    enemyWolf.render()
    enemyWolf.update()
    moveElement(enemyWolf)
    stairs.draw()

    //score, life, infos game
    drawScore()
    countScore()
    drawLife()
    // countFlower()
    drawFlowerLife()
    countLife()

    // flowers
    flower.render()
    flower.update()
    flower2.render()
    flower2.update()

    //player
    player.render()
    player.update()

    playerMove()

    if (player.collision(platform)) {
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

    if (requestId) {
      requestId = requestAnimationFrame(update)
    }

  }




  addEventListener("keydown", (e) => {
    //jump
    if (e.keyCode === 32) {
      player.jump()
    }
    //right
    if (e.keyCode === 39) {
      player.right()
      if (player.direction != "flyingPlatform3") {
        bg.x -= 7;
        platform.x -= 20;
        enemyWolf.x -= 20;
        flyingPlatform.x -= 20;
        flyingPlatform2.x -= 20;
        flyingPlatform3.x -= 20;
        flower.x -= 20;
        flower2.x -= 20;
        water.x -= 20
      }

    } //left
    if (e.keyCode === 37) {
      player.left();
      if (player.direction != "flyingPlatform3") {
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

    }
    controller.keyDownUp(e);
  })
  //left

  addEventListener("keyup", (e) => {
    if (e.keyCode === 32) {
      falling = true;
    }
    controller.keyDownUp(e);
  })

  startGame()

}