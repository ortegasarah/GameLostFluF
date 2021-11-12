/////////////////// GRACIAS EVA, DYLAN Y KAIN ///////////////////////

window.onload = function () {
  const gameBoy = new GameBoy()
  const bg = new Background()
  const trees = new Trees()
  const player = new Player(400, 0, ctx, "./images/sheep_sprites4.png")
  const enemyWolf = new EnemyWolf(900, 380, ctx, "./images/wolf_sprites-01.png")
  const enemyWolf2 = new EnemyWolf(2240, 380, ctx, "./images/wolf_sprites-01.png")
  const platform = new Platform(0, 470, 5000, 500)
  const flyingPlatform = new FlyingPlatform(600, 350, 130, 15)
  const flyingPlatform2 = new FlyingPlatform(720, 270, 130, 15)
  const flyingPlatform3 = new FlyingPlatform(1370, 350, 130, 15)
  const flyingPlatform4 = new FlyingPlatform(1800, 380, 130, 100)
  const flyingPlatform5 = new FlyingPlatform(1930, 300, 130, 180)
  const flyingPlatform6 = new FlyingPlatform(2200, 350, 130, 15)
  const flyingPlatform7 = new FlyingPlatform(2600, 340, 500, 140)
  const flyingPlatform8 = new FlyingPlatform(2750, 220, 250, 15)
  smallPlatforms = [flyingPlatform, flyingPlatform2, flyingPlatform6, flyingPlatform8]; //player.height + 10
  mediumPlatform = [flyingPlatform4]; //player.height + 100
  largePlatform = [flyingPlatform7]; //player.height + 140
  xlLPlatform = [flyingPlatform5]; //player.height + 180
  const flower = new Flower(640, 220, ctx, "./images/flowers.png")
  const flower2 = new Flower(760, 150, ctx, "./images/flowers.png")
  const flower3 = new Flower(1850, 200, ctx, "./images/flowers.png")
  const flower4 = new Flower(2850, 150, ctx, "./images/flowers.png")
  const flower5 = new Flower(3300, 410, ctx, "./images/flowers.png")
  const flower6 = new Flower(3350, 410, ctx, "./images/flowers.png")
  const flower7 = new Flower(3400, 410, ctx, "./images/flowers.png")
  const flower8 = new Flower(3440, 410, ctx, "./images/flowers.png")
  getFlowers = [flower, flower2, flower3, flower4, flower5, flower6, flower7, flower8];
  enemies = [enemyWolf, enemyWolf2];
  const water = new Water(1380, 420, 80, 240)
  const water2 = new Water(2800, 280, 80, 330)
  const controller = new Controller()
  const troupeau = new Troupeau(3500, 370, 300, 140)



  function startGame() {
    requestId = requestAnimationFrame(update)
    time = 50;
    highscore = 0;
    playerLife = 5;
    numberOfFlower = 0;
    requestAnimationFrame(update)
  }


  //WIN
  function win() {
    if (player.life > 0 && player.x > troupeau.x) {
      bg.win();
      requestID = undefined;
    }
  }

  //GAME OVER
  function gameOver() {
    if (player.life === 0) {
      bg.gameOver()
      requestId = undefined
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
          player.vx += 1;
        } else {
          player.vx -= player.x * 0.3;
        }
      } else {
        player.vx -= player.x * 0.3;
      }
    }
  }

  //FLOWERS, LIFE, TIME
  function renderFlowers() {
    getFlowers.forEach((flower, index_flower) => {
      flower.render()
      flower.update()
      if (player.collision(flower)) {
        numberOfFlower++;
        getFlowers.splice(index_flower, 1)
      }
    })
  }

  function drawFlowerLife() {
    ctx.fillStyle = "#fff";
    ctx.font = "15px 'Press Start 2P'";
    ctx.fillText("flowers " + numberOfFlower, 400, 510); //TODO add image flower
  }

  function drawLife() {
    ctx.fillStyle = "#fff";
    ctx.font = "15px 'Press Start 2P'"
    ctx.fillText("life " + player.life, 400, 540);
  }

  function drawWolf() {
    enemies.forEach((enemy, index_enemy) => {
      enemy.render()
      enemy.update()
      moveElement(enemy)
      if (player.collision(enemy)) {
        if (!player.isHit) {
          damage()
          player.life--;
        }
      }
    })
  }

  function countDown() {
    if (frames % 120 === 0) {
      time--;
    }
    if (time > 1 && player.life >= 0 && player.x > troupeau.x) {
      bg.win();
      requestID = undefined

    }
    if (time < 1) {
      bg.gameOver()
      requestId = undefined
    }
  }


  function drawTime() {
    ctx.fillStyle = "#fff";
    ctx.font = "15px 'Press Start 2P'"
    ctx.fillText("time left " + time, 400, 570);
  }

  // RENDER ALL PLATFORMS
  function renderSmallPlatforms() {
    smallPlatforms.forEach((smallPlatform, index_smallPlatform) => {
      smallPlatform.draw()
      if (player.collision(smallPlatform)) {
        player.vy = 0;
        player.jumping = false;
        player.direction = "down";
        player.y = (smallPlatform.y + smallPlatform.height) - (player.height + 10);
      }
    })
  }

  function renderMediumPlatforms() {
    mediumPlatform.forEach((mediumPlatform, index_mediumPlatform) => {
      mediumPlatform.draw()
      if (player.collision(mediumPlatform)) {
        player.vy = 0;
        player.jumping = false;
        player.direction = "down";
        player.y = (mediumPlatform.y + mediumPlatform.height) - (player.height + 100);
      }
    })
  }

  function renderLargePlatforms() {
    largePlatform.forEach((largePlatform, index_largePlatform) => {
      largePlatform.draw()
      if (player.collision(largePlatform)) {
        player.vy = 0;
        player.jumping = false;
        player.direction = "down";
        player.y = (largePlatform.y + largePlatform.height) - (player.height + 140);
      }
    })
  }

  function renderXLPlatforms() {
    xlLPlatform.forEach((xlLPlatform, index_xlLPlatform) => {
      xlLPlatform.draw()
      if (player.collision(xlLPlatform)) {
        player.vy = 0;
        player.jumping = false;
        player.direction = "down";
        player.y = (xlLPlatform.y + xlLPlatform.height) - (player.height + 180);
      }
    })
  }

  function damage() {
    player.isHit = true;
    setTimeout(() => {
      player.isHit = false;
    }, 3500)
  }

  function update() {
    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bg.draw()
    trees.draw()
    platform.draw()
    troupeau.draw()

    //PLATFORMS
    if (platform.x < -440 && platform.x > -1580) {
      flyingPlatform3.draw()
      moveElement(flyingPlatform3)
    }
    if (player.collision(platform)) {
      player.direction = "down";
    }


    // RENDER FLOWERS & PLATFORMS
    renderFlowers()
    renderSmallPlatforms()
    renderMediumPlatforms()
    renderLargePlatforms()
    renderXLPlatforms()

    //PLAYER
    player.render()
    player.update()
    playerMove()


    //ENEMYs COLLISION
    drawWolf()
    water.draw()
    water2.draw()
    if (player.collision(water)) {
      if (!player.isHit) {
        damage()
        player.life--;
      }
    }
    if (player.collision(water2)) {
      if (!player.isHit) {
        damage()
        player.life--;
      }
    }

    if (requestId) {
      requestId = requestAnimationFrame(update)
    }
    countDown()
    drawTime()
    drawLife()
    drawFlowerLife()
    win()
    gameOver()
    gameBoy.draw()

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
        enemyWolf2.x -= 10
        flyingPlatform.x -= 10;
        flyingPlatform2.x -= 10;
        flyingPlatform3.x -= 10;
        flyingPlatform4.x -= 10;
        flyingPlatform5.x -= 10;
        flyingPlatform6.x -= 10;
        flyingPlatform7.x -= 10;
        flyingPlatform8.x -= 10
        flower.x -= 10;
        flower2.x -= 10;
        flower3.x -= 10;
        flower4.x -= 10;
        flower5.x -= 10;
        flower6.x -= 10;
        flower7.x -= 10;
        flower8.x -= 10;
        water.x -= 10;
        water2.x -= 10;
        troupeau.x -= 10;
      }

    } //left
    if (e.keyCode === 37) {
      player.left();
      if (player.direction != "flyingPlatform3") {
        bg.x += 2;
        trees.x += 7;
        platform.x += 10;
        enemyWolf2.x += 10
        enemyWolf.x += 10;
        flyingPlatform.x += 10;
        flyingPlatform2.x += 10;
        flyingPlatform3.x += 10;
        flyingPlatform4.x += 10
        flyingPlatform5.x += 10
        flyingPlatform6.x += 10
        flyingPlatform7.x += 10
        flyingPlatform8.x += 10
        flower.x += 10;
        flower2.x += 10;
        flower3.x += 10;
        flower4.x += 10;
        flower5.x += 10;
        flower6.x += 10;
        flower7.x += 10;
        flower8.x += 10;
        water.x += 10;
        water2.x += 10;
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