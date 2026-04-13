const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

var fps = 1000/60; //gives you math for 60fps
var timer = setInterval(game, fps);
var w = 50;
var h = 50;

function game()
{
    ctx.fillStyle = "red";
    ctx.fillRect(canvas.width/2, canvas.height/2, w += 2, h += 2);
}