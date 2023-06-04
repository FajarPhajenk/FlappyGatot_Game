const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const gameContainer = document.getElementById("game-container");

const flappyImg = new Image();
flappyImg.src = 'image/flappy.png';


const FLAP_SPEED = -3;
const BIRD_Width = 40;
const BIRD_Height = 30;
const PIPE_WIDTH = 50;
const PIPE_GAP = 125;


let birdX = 50;
let birdY = 50;
let birdVelocity = 0;
let birdAcc = 0.3;


let pipeX = 400;
let pipeY = canvas.height - 200;


let scoreDiv = document.getElementById("score-display");
let score = 0;
let highScore = 0;


document.body.onkeyup = function(e){
   if(e.code == 'Space'){
      birdVelocity = FLAP_SPEED;
   }
}

document.getElementById("restart-button").addEventListener("click", function(){
   hiddenMenu();
   resetGame();
   loop();
})



function increaseScore(){
   if(birdX > pipeX + PIPE_WIDTH && (birdY < pipeY + PIPE_GAP || birdY + BIRD_Height > pipeY + PIPE_GAP)){
      score++;
      scoreDiv.innerHTML = score;
   }

}

function collisionCheck(){
   const birdBox = {
      x: birdX,
      y: birdY,
      width: BIRD_Width,
      height: BIRD_Height
   }

   const topPipeBox = {
      x: pipeX,
      y: pipeY - PIPE_GAP + BIRD_Height,
      width: PIPE_WIDTH,
      height: pipeY
   }

   const bottomPipeBox = {
      x: pipeX,
      y: pipeY + PIPE_GAP + BIRD_Height,
      width: PIPE_WIDTH,
      height: canvas.height - pipeY - PIPE_GAP
   }

   if(birdBox.x + birdBox.width > topPipeBox.x && birdBox.x < topPipeBox.x + topPipeBox.width && birdBox.y < topPipeBox.y){
      return true;
   }

   if(birdBox.x + birdBox.width > bottomPipeBox.x && birdBox.x < bottomPipeBox.x + bottomPipeBox.width && birdBox.y + birdBox.height > bottomPipeBox.y){
      return true;
   }

   if(birdY < 0 || birdY + BIRD_Height > canvas.height){
      return true;
   }

      return false;

}


function hiddenMenu(){
   document.getElementById("end-menu").style.display = "none";
   gameContainer.classList.remove("backdrop-blur");

}


function showEndMenu(){
   document.getElementById("end-menu").style.display = 'block';
   gameContainer.classList.add("backdrop-blur");
   document.getElementById("end-score").innerHTML = score;
   if(highScore < score){
      highScore = score;
   }

   document.getElementById("best-score").innerHTML = highScore;
}





function resetGame(){
birdX = 50;
birdY = 50;
birdVelocity = 0;
birdAcc = 0.1;


pipeX = 400;
pipeY = canvas.height - 200;

score = 0;

}

function endGame(){
 showEndMenu();

}

function loop(){
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   ctx.drawImage(flappyImg, birdX, birdY);

   ctx.fillStyle = '#232332';
   ctx.fillRect(pipeX, -100, PIPE_WIDTH, pipeY);
   ctx.fillRect(pipeX, pipeY + PIPE_GAP, PIPE_WIDTH, canvas.height - pipeY);


   if(collisionCheck()){
      endGame();
      return;
   }

   pipeX -= 2.5;

   if(pipeX < -50){
      pipeX = 400;
      pipeY = Math.random() * (canvas.height - PIPE_GAP) + PIPE_WIDTH;
   }

   birdVelocity += birdAcc;
   birdY += birdVelocity;

   increaseScore();
   requestAnimationFrame(loop);
}


loop();
