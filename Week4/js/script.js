const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

var fps = 1000/60; //gives you math for 60fps
var timer = setInterval(game, fps); //
var x = canvas.width/2-50;
var y = canvas.width/2-50;
var moveX = setRandomDirection();
var moveY = setRandomDirection();
var color = setRandomColor();

function game()
{
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //draw object
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 50, 50);

    //update values
    x += moveX;
    y += moveY;

    //border bouncing
    if(x > canvas.width - 50){
        moveX = -2;
        setRandomColor();
    }
    if(x < 0) {
        moveX = +2;
        setRandomColor();
    }

    if(y > canvas.height - 50) {
        moveY = -2;
        setRandomColor();
    }
    if(y < 0) {
        moveY = +2;
        setRandomColor();
    }

}

function setRandomColor(){
    color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
}

function setRandomDirection(){
    dir = Math.random();
    if(dir > 0.5){
        return 2;
    } else {
        return -2;
    }
}