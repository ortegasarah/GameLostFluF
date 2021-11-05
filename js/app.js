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

  gameOver() {
    ctx.drawImage(this.imgGameOver, 300, 140, 400, 400)

  }
}



class Player {
  //Metodos y propiedades
  //Metodos son las funciones a realizar
  //propiedades sus atributos o caracteristicas
  constructor(x, y, w, h) {
    //position
    this.x = x;
    this.y = 450;
    this.width = w;
    this.height = h;
    //images
    this.images1 = new Image();
    this.images1.src = "https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/puppy/run00.png"

    this.images2 = new Image();
    this.images2.src = "https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/puppy/jump03.png"

    this.image = this.images1;
    this.gravity = 0.4;

    this.gravity = 0.4;
    this.jumping = false;
    this.jumpTimer = 0;
    this.velX = 0;
    this.velY = 0;
  }
  //   metodos

  draw() {

    if (frames % 10 === 0) {
      //if ternario  (condicion) "?" (result true) ":"  (reult false)
      this.image = this.image === this.images1 ? this.images2 : this.images1;
      /* 
          if(this.image === this.images1){
              this.image= this.images2
          }else{
              this.image= this.images1
          }
      */


    }

    //(img,x,y,w,h)
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
  //{...}
  collision(item) {
    return (
      this.x < item.x + item.width &&
      this.x + this.width > item.x &&
      this.y < item.y + item.height &&
      this.y + this.height > item.y
    )
  }

  update(game) {
    if (game.keyboard.includes("ArrowLeft")) {
      if (this.x <= 0) {
        this.x = 0;
      } else {
        this.x -= this.xv;
      }
    }
    if (game.keyboard.includes("ArrowRight")) {
      if (this.x + this.w >= game.canvas.width) {
        this.x = game.canvas.width - this.w;
      } else {
        this.x += this.xv;
      }
    }
    if (game.keyboard.includes("Space")) {
      if (!this.jumping) {
        this.jumping = true;
        this.jumpTimer = 0;
      }
    }

    // 投げ上げの公式（※ｙ軸方向に反転）
    this.y = (0.5 * this.gravity * this.jumpTimer * this.jumpTimer - this.yv * this.jumpTimer) + (game.canvas.height - this.h);
    this.jumpTimer++;

    if (this.y > game.canvas.height - this.h) {
      this.y = game.canvas.height - this.h;
      this.jumping = false
    }
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

class FoxEnemy {}

class MarmotEnemy {}