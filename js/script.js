window.onload = function () {

    //llamar mis clases
    const bg = new Background(canvas.width, canvas.height)
    const player = new Player


    document.getElementById("start-button").onclick = function () {
        if (requestId) {
            return true
        }
        startGame();
    };


    function startGame() {
        requestId = requestAnimationFrame(update)
    }
    startGame()

    function gameOver() {
        bg.gameOver()
        requestId = undefined

    }

    function update() {
        frames++;
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        bg.draw()
        //player.draw()
        if (requestId) {
            requestId = requestAnimationFrame(update)
        }
    }

    addEventListener("keydown",(e)=>{
        if(e.keyCode === 32){
          player.userPull = 0.3;
        }
        if(e.keyCode === 82 ){
          resetGame()
        }
      })
    
      addEventListener("keyup",(e)=>{
        if(e.keyCode === 32){
          player.userPull = 0;
        }
      })
}