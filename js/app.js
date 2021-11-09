class Background {
  //constructor
  constructor(w, h) {
    this.x = 0;
    this.y = 0;
    this.width = 3000;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src = "https://la-wit.github.io/build-an-infinite-runner/build/images/environments/defaultBackground.png"
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
    ctx.fillStyle = "#000";
    ctx.font = "28px 'Press Start 2P'"
    ctx.fillText('Game Over! Try again!', 120, 550);

    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, 500, this.width, 250);

    ctx.fillStyle = "#000";
    ctx.font = "28px 'Press Start 2P'"
    ctx.fillText('Your final score', 100, 610);

    console.log(`${points}`)
    ctx.fillText(`${points}`, 230, 680);
    //create function score
  }
}
/*
class Player {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.vy = 10 //gravity
    this.vx = 5 //gravity
    this.jump = false;
    this.direction = "down"
    //this.userPull = 0; //gravity
    this.life = playerLife;
    this.images1 = new Image();
    this.images1.src = "https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/puppy/run00.png"
    this.images2 = new Image();
    this.images2.src = "https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/puppy/jump03.png"
    this.image = this.images1;
  }
  draw() {
    if (frames % 10 === 0) {
      this.image = this.image === this.images1 ? this.images2 : this.images1;
    }
    this.y += this.vy;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }

  collision(item) {
    return (
      this.x < item.x + item.width &&
      this.x + this.width > item.x &&
      this.y < item.y + item.height &&
      this.y + this.height > item.y
    )
  }
}
*/
class Sprite {
  constructor(options) {
    this.context = options.context;
    this.image = new Image(); // Path to image sprite sheet
    this.image.src = options.image;

    //this.x = options.x; // Coordinates on canvas
    //this.y = options.y;
    this.width = options.width; // Size of sprite frame
    this.height = options.height;
    this.frames = options.frames; // Number of frames in a row
    this.frameIndex = options.frameIndex; // Current frame
    this.row = options.row; // Row of sprites
    this.ticksPerFrame = options.ticksPerFrame; // Speed of animation
    this.tickCount = options.tickCount; // How much time has passed
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
      this.frameIndex * this.width, // The x-axis coordinate of the top left corner
      this.row * this.height, // The y-axis coordinate of the top left corner
      this.width, // The width of the sub-rectangle
      this.height, // The height of the sub-rectangle
      this.x, // The x coordinate
      this.y, // The y coordinate
      this.width, // The width to draw the image
      this.height // The width to draw the image
    );
  }
}

class Player extends Sprite {

  //static src = './images/sheep_sprites.png';

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
      frames: 7
    });
    this.status = "right"

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
    this.frames = 7;
    this.frameIndex = 0;
    this.row = 1;
    this.ticksPerFrame = 8;
  }

  collision(item) {
    return (
      this.x < item.x + item.width &&
      this.x + this.width > item.x &&
      this.y < item.y + item.height &&
      this.y + this.height > item.y
    )
  }

  render() { // para que se quede en el top de la plataforma 
    /*if (this.y + this.height < 400) {
      this.y += this.vy
    }*/
    ctx.drawImage(
      this.image,
      this.frameIndex * this.width, // The x-axis coordinate of the top left corner
      this.row * this.height, // The y-axis coordinate of the top left corner
      this.width, // The width of the sub-rectangle
      this.height, // The height of the sub-rectangle
      this.x, // The x coordinate
      this.y, // The y coordinate
      this.width, // The width to draw the image
      this.height // The width to draw the image
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
    //if (this.x < this.x % 2)
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    /*ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    )*/
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
      width: 53,
      height: 130,
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

  collision(item) {
    return (
      this.x < item.x + item.width &&
      this.x + this.width > item.x &&
      this.y < item.y + item.height &&
      this.y + this.height > item.y
    )
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
      case 32:
        this.up = down;
        break;
      case 39:
        this.right = down;
        break;
    }
  }
}