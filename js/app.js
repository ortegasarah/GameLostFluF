class Background {
  //constructor
  constructor(w, h) {
    this.x = 0;
    this.y = 0;
    this.width = 3000;
    this.height = 600;
    this.image = new Image();
    // this.image.src = "https://la-wit.github.io/build-an-infinite-runner/build/images/environments/defaultBackground.png"
    this.image.src = "./images/bg_mountains.png"
  }

  draw() {
    ctx.drawImage(this.image, this.x - this.width, this.y, this.width, this.height)
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    )
  }

  gameOver() {
    ctx.fillStyle = 'rgba(226, 207, 205, 0.541)';
    ctx.fillRect(this.x, 0, this.width, 1300);

    ctx.fillStyle = "rgb(245, 99, 80)";
    ctx.strokeStyle = "#f9f4e8";
    ctx.font = "28px 'Press Start 2P'"
    ctx.fillText('Oh no!', 550, 300);
    ctx.strokeText('Oh no!', 550, 300);

    ctx.fillText("Fluf didn't make it!", 390, 400);
    ctx.strokeText("Fluf didn't make it!", 390, 400);

    ctx.fillText("Try again", 540, 500);
    ctx.strokeText("Try again", 540, 500);

    /*
        ctx.fillStyle = "#000";
        ctx.font = "28px 'Press Start 2P'"s
        ctx.fillText('Your final score', 100, 610);

        console.log(`${points}`)
        ctx.fillText(`${points}`, 230, 680);
        //create function score*/
  }
  win() {
    ctx.fillStyle = 'rgba(226, 207, 205, 0.541)';
    ctx.fillRect(this.x, 0, this.width, 1300);
    ctx.fillStyle = "#f9f4e8";
    ctx.strokeStyle = "rgb(245, 99, 80)";
    ctx.font = "28px 'Press Start 2P'"
    ctx.fillText('Yay!', 550, 300);
    ctx.strokeText('Yay!', 550, 300);

    ctx.fillText('Fluf is back home!', 400, 400);
    ctx.strokeText('Fluf is back home!', 400, 400);
  }
}

class Trees {
  //constructor
  constructor(w, h) {
    this.x = 0;
    this.y = 300;
    this.width = 2000;
    this.height = 200;
    this.image = new Image();
    this.image.src = "./images/trees.png"
  }

  draw() {
    ctx.drawImage(this.image, this.x - this.width, this.y, this.width, this.height)
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    )
  }
}

class Sprite {
  constructor(options) {
    this.context = options.context;
    this.image = new Image();
    this.image.src = options.image;
    this.width = options.width;
    this.height = options.height;
    this.frames = options.frames;
    this.frameIndex = options.frameIndex;
    this.row = options.row;
    this.ticksPerFrame = options.ticksPerFrame;
    this.tickCount = options.tickCount;
    this.jumping = false;
    this.direction = "down"

    this.d = 0;
    this.ox = this.x = options.x;
    this.oy = this.y = options.y;
    this.vx = this.vy = 0;
  }


  update() {
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.frames - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }
  }

  render() {
    this.context.drawImage(
      this.image,
      this.frameIndex * this.width,
      this.row * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}

class Player extends Sprite {

  constructor(x, y, context, image) {
    super({
      context: context,
      image: image,
      x: x,
      y: y,
      width: 85,
      height: 70,
      frameIndex: 0,
      row: 1,
      tickCount: 0,
      ticksPerFrame: 4,
      frames: 7,


    });
    this.status = "right"
    this.isHit = false
    this.life = playerLife;
  }

  right() {
    this.frames = 7;
    this.frameIndex = 0;
    this.row = 1;
    this.ticksPerFrame = 8;
    this.status = "right"
  }

  left() {
    this.frames = 7;
    this.frameIndex = 0;
    this.row = 0;
    this.ticksPerFrame = 8;
    this.status = "left"
  }


  jump() {
    this.frames = 5;
    this.frameIndex = 0;
    this.row = 2;
    this.ticksPerFrame = 8;
    this.status = "hit"
  }

  collision(item) {
    return (
      this.x < item.x + item.width &&
      this.x + this.width > item.x &&
      this.y < item.y + item.height &&
      this.y + this.height > item.y
    )
  }

  render() {
    ctx.drawImage(
      this.image,
      this.frameIndex * this.width,
      this.row * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}


class Platform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.image = new Image();
    this.image.src = "https://la-wit.github.io/build-an-infinite-runner/build/images/environments/defaultPlatform.png";
  }
  draw() {
    //dibujar la imagen
    ctx.drawImage(this.image, this.x - this.width, this.y, this.width, this.height)
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    )
  }
}


class FlyingPlatform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.image = new Image();
    this.d = 0;
    this.ox = this.x = x;
    this.oy = this.y = y;
    this.vx = this.vy = 0;
    this.image.src = "https://la-wit.github.io/build-an-infinite-runner/build/images/environments/defaultPlatform.png";
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }

  collision(item) {
    return (
      this.x < item.x + item.width &&
      this.x + this.width > item.x &&
      this.y < item.y + item.height &&
      this.y + this.height > item.y &&
      item.direction === "down"
    )
  }

}


class EnemyWolf extends Sprite {
  constructor(x, y, context, image) {
    super({
      context: context,
      image: image,
      x: x,
      y: y,
      width: 125,
      height: 95,
      frameIndex: 0,
      row: 0,
      tickCount: 0,
      ticksPerFrame: 9,
      frames: 3
    });
  }

  right() {
    this.frameIndex = 0;
    this.row = 0;
  }

  left() {
    this.frameIndex = 0;
    this.row = 1;
  }
}


class Flower extends Sprite {
  constructor(x, y, context, image) {
    super({
      context: context,
      image: image,
      x: x,
      y: y,
      width: 63,
      height: 63,
      frameIndex: 0,
      row: 0,
      tickCount: 0,
      ticksPerFrame: 9,
      frames: 3
    });
  }

  flor() {
    this.frameIndex = 0;
    this.row = 0;
  }

}

class Water {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.image = new Image();
    this.image.src = "./images/water.png"
  }

  draw() {
    ctx.drawImage(this.image, this.x - this.width, this.y, this.width, this.height)
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    )
  }
}

class Controller {
  keyDownUp(e) {
    var down = e.type == "keydown" ? true : false;

    switch (e.keyCode) {
      case 37:
        this.left = down;
        break;
      case 38:
        this.up = down;
        break;
      case 39:
        this.right = down;
        break;
    }
  }
}

class GameBoy {
  //constructor
  constructor(w, h) {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src = "./images/gameboy-bg.png"
  }

  draw() {
    ctx.drawImage(this.image, this.x - this.width, this.y, this.width, this.height)
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    )
  }
}

class Flock {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.image = new Image();
    this.image.src = "./images/flock.png"
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    )
  }
}