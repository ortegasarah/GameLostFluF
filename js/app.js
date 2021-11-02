class Background {
    //constructor
    constructor(w, h) {
        this.x = 0;
        this.y = 0;
        this.width = w;
        this.height = h;
        this.image = new Image();
        this.image.src = "./images/bg.jpg" // ./ => en este mismo nievel; ../ salte un nivel
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


}

class Player {
    //Metodos y propiedades
    //Metodos son las funciones a realizar
    //propiedades sus atributos o caracteristicas
    constructor(x, y, w, h) {
        //position
        this.x = x;
        this.y = y;

        this.width = w;
        this.height = h;
        this.image = new Image();
        this.image.src = ""
        //add all images, profile, face, right, left, jump
    }

    draw() {
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

class FoxEnemy {}

class MarmotEnemy {}