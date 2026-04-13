const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

var fps = 1000/60;
var timer = setInterval(ball, fps);
var x = canvas.width/2-50;
var y = canvas.width/5-50;
var moveballX = setRandomDirection();
var moveballY = setRandomDirection();
var color = "rgb(0, 0, 0)";


function ball()
{
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = color;
    ctx.fillRect(x, y, 50, 50);

    x += moveballX;
    y += moveballY;

    if(x > canvas.width - 50){
        moveballX = -2;
    }
    if(x < 0) {
        moveballX = +2;
    }

    if(y > canvas.height - 50) {
        moveballY = -2;
    }
    if(y < 0) {
        moveballY = +2;
    }

     ctx.fillRect(140, 300, 10, 60); //left paddle
     ctx.fillRect(1460, 300, 10, 60); //right paddle

}


function setRandomDirection(){
    dir = Math.random();
    if(dir > 0.5){
        return 2;
    } else {
        return -2;
    }
}