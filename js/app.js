class Background {
  //constructor
  constructor(w, h) {
    this.x = 0;
    this.y = 0;
    this.width = 2000;
    this.height = h;
    this.image = new Image();
    this.image.src = "https://la-wit.github.io/build-an-infinite-runner/build/images/environments/defaultBackground.png"
  }

  //metodos
  draw() {
    //dibujar la imagen
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    )
  }

  /*gameOver() {
    ctx.drawImage(this.imgGameOver, 300, 140, 400, 400)

  }*/
}

class Player {

  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.vy = 2 //gravity
    this.userPull = 0; //gravity
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
    //validar gravedad
    this.vy = this.vy + (gravity - this.userPull);
    if (this.y <= 0) {
      this.userPull = 0;
      this.y = 2;
      this.vy = 2;
    }
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


class Platform {
  constructor(w, h) {
    this.x = 0;
    this.y = 500;
    this.width = 2000;
    this.height = h;
    this.image = new Image();
    this.image.src = "https://la-wit.github.io/build-an-infinite-runner/build/images/environments/defaultPlatform.png";

  }
  draw() {
    //dibujar la imagen
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
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 85;
    this.height = 15;
    this.image = new Image();
    this.image.src = "https://la-wit.github.io/build-an-infinite-runner/build/images/environments/defaultPlatform.png";

  }
  draw() {
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

class MarmotEnemy {
  //Metodos y propiedades
  //Metodos son las funciones a realizar
  //propiedades sus atributos o caracteristicas
  constructor(x, y, w, h) {
    //position
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    //images
    this.images1 = new Image();
    this.images1.src = "https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/robot/run00.png"

    this.images2 = new Image();
    this.images2.src = "https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/robot/run01.png"

    this.image = this.images1;
  }
  //   metodos

  draw() {

    if (frames % 10 === 0) {
      //if ternario  (condicion) "?" (result true) ":"  (reult false)
      this.image = this.image === this.images1 ? this.images2 : this.images1;

    }

    //(img,x,y,w,h)
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }



}

class SpriteSheet {
  constructor(image, w = 16, h = 16) {
      this.image = image;
      this.width = w;
      this.height = h;
      this.tiles = new Map();
  }

  define(name, x, y) {
      const buffer = document.createElement('canvas');
      buffer.height = this.height;
      buffer.width = this.width;
      buffer
          .getContext('2d')
          .drawImage(
              this.image,
              this.width * x,
              this.height * y,
              this.width,
              this.height,
              0,
              0,
              this.width,
              this.height);
      this.tiles.set(name, buffer);
  }

  draw(name, ctx, x, y) {
      const buffer = this.tiles.get(name);
      ctx.drawImage(buffer, x, y);
  }

  drawTile(name, ctx, x, y) {
      this.draw(name, ctx, x * this.width, y * this.height);
  }
}
