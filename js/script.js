window.onload = function () {
  const gameBoy = new GameBoy()
  const bg = new Background()
  const trees = new Trees()
  const player = new Player(400, 0, ctx, "./images/sheep_sprites4.png")
  const enemyWolf = new EnemyWolf(900, 380, ctx, "./images/wolf_sprites-01.png")
  const platform = new Platform(0, 470, 5000, 500)
  const flyingPlatform = new FlyingPlatform(600, 350, 100, 15)
  const flyingPlatform2 = new FlyingPlatform(700, 250, 100, 15)
  const flyingPlatform3 = new FlyingPlatform(1370, 350, 100, 15)
  const stairs = new FlyingPlatform(1800, 380, 100, 100)
  const flower = new Flower(640, 250, ctx, "./images/flowers.png")
  const flower2 = new Flower(740, 150, ctx, "./images/flowers.png")
  const flower3 = new Flower(1850, 200, ctx, "./images/flowers.png")
  const water = new Water(1300, 420, 80, 240)
  const controller = new Controller()

  const troupeau = new Troupeau(2300, 370, 300, 140)

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

  function win() {
    if (player.x > troupeau.x) {
      console.log("you won")
      bg.win();
      requestID = undefined
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

    if (player.y > 410) {
      player.y = 410;
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

  function countFlower() {
    flowers.forEach((flower, index_flower) => {
      flower.draw()

      if (player.collision(flower)) {
        numberOfFlower++;
        flowers.splice(index_flower, 1)
        console.log("flowerss", numberOfFlower)
      }

      if (flower.x + flower.width < 0) {
        flowers.splice(index_flower, 1)
        console.log("flowerss dispear")

      }
    })
  }

  function drawFlowerLife() {
    ctx.fillStyle = "#000";
    ctx.font = "20px 'Press Start 2P'"
    ctx.fillText("Nber of flowers: " + numberOfFlower, 400, 200); //TODO add image flower
  }



  function drawLife() {
    ctx.fillStyle = "#000";
    ctx.font = "20px 'Press Start 2P'"
    ctx.fillText("Life " + player.life, 150, 200);
  }

  /*
    function gameOver() {
      if (countLife === 0) {
        bg.gameOver()
        requestId = undefined
      }
    }
  /*
    function drawWolf() {
      enemyWolfs.forEach((enemyWolf, index_enemyWolf) => {
        enemyWolf.render()
        enemyWolf.update() //TODO  move right left
        if (player.collision(enemyWolf)) {
          player.life--;
          console.log("vida -1", player.life)
        }
        if (enemyWolf.x + enemyWolf.width <= 0) {
          enemyWolfs.splice(index_enemyWolf, 1)
          console.log("wolf splice", player.life)
        }
      })
    }*/



  function update() {

    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bg.draw()
    trees.draw()
    //map - platform, water
    platform.draw()
    flyingPlatform.draw()
    flyingPlatform2.draw()
    if (platform.x < -440 && platform.x > -1580) {
      flyingPlatform3.draw()
      moveElement(flyingPlatform3)
    }
    troupeau.draw()
    water.draw()
    stairs.draw()

    //drawWolf()
    enemyWolf.render()
    enemyWolf.update()
    moveElement(enemyWolf)


    // flowers
    flower.render()
    flower.update()
    flower2.render()
    flower2.update()
    flower3.render()
    flower3.update()

    //player
    player.render()
    player.update()

    playerMove()

    //COLLISION ENEMY
    if (player.collision(enemyWolf)) {
      player.life--;
      console.log("vida -1", player.life)
    }
    if (player.collision(water)) {
      player.life--;
      console.log("vida -1", player.life)
    }

    if (player.collision(flower, flower2, flower3)) {
      numberOfFlower++;
      console.log("flor +1", numberOfFlower)
    }

    if (player.collision(flower2)) {
      numberOfFlower++;
      console.log("flor +2", numberOfFlower)
    }





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

    if (player.collision(stairs)) {
      player.vy = 0;
      player.jumping = false;
      player.direction = "down";
      player.y = (stairs.y + stairs.height) - (player.height + 90);
    }

    if (requestId) {
      requestId = requestAnimationFrame(update)
    }
    win()

    gameBoy.draw()

    //score, life, infos game
    //drawScore()
    //countScore()
    drawLife()
    // countFlower()
    drawFlowerLife()
    countFlower()
    //countLife()
    // gameOver()

  }




  addEventListener("keydown", (e) => {
    //jump
    if (e.keyCode === 38) {
      player.jump()
    }
    //right
    if (e.keyCode === 39) {
      player.right()
      if (player.direction != "flyingPlatform3") {
        bg.x -= 2;
        trees.x -= 7;
        platform.x -= 10;
        enemyWolf.x -= 10;
        flyingPlatform.x -= 10;
        flyingPlatform2.x -= 10;
        flyingPlatform3.x -= 10;
        flower.x -= 10;
        flower2.x -= 10;
        flower3.x -= 10;
        water.x -= 10;
        stairs.x -= 10;
        troupeau.x -= 10;
      }

    } //left
    if (e.keyCode === 37) {
      player.left();
      if (player.direction != "flyingPlatform3") {
        bg.x += 2;
        trees.x += 7;
        platform.x += 10;
        enemyWolf.x += 10;
        flyingPlatform.x += 10;
        flyingPlatform2.x += 10;
        flyingPlatform3.x += 10;
        flower.x += 10;
        flower2.x += 10;
        flower3.x += 10;
        water.x += 10;
        stairs.x += 10;
        troupeau.x += 10;
      }

    }
    controller.keyDownUp(e);
  })
  //left

  addEventListener("keyup", (e) => {
    if (e.keyCode === 38) {
      falling = true;
    }
    controller.keyDownUp(e);
  })

  startGame()

}