var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var interval = 1000/60;
setInterval(game, interval);

var acceleration = 0.6; //how fast we speed up
var friction = 0.88; // how fast we speed up or slow down
var maxspeed = 10;

function createGameObject() {

    var gameObject = {
        x: randomNumber(115, canvas.width - 115),
        y: randomNumber(15, canvas.height - 15),
        moveX: setRandomDirection(),
        moveY: setRandomDirection(),
        velocityX: 0,
        velocityY: 0,
        radius: 15,
        color: `rgb(${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${randomNumber(0, 255)})`,
        width: 15,
        height: 15,
        drawBall: function () {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();
        },
        drawSquare: function () {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    return gameObject;
}


function randomNumber(low, high){
    return Math.random() * (high-low) + low;
}


function setRandomDirection(){
    dir = Math.random();
    if(dir > 0.5){
        return 2;
    } else {
        return -2;
    }
}


var myBall = createGameObject();
var player = createGameObject();
player.x = canvas.width/2;
player.y = canvas.height/2;
player.width = 30;
player.height = 30;
player.color = "purple";

var myBalls = []
var numberOfDots = 10;


for(var i = 0; i<numberOfDots; i++){
    myBalls[i] = createGameObject();
    myBalls[i].moveY = 0;
    myBalls[i].y = -myBalls[i].y;
}

//setting up bullets
var bullets = [];
var canShoot = true;

function shoot(){
    var bullet = createGameObject();
    bullet.x = player.x + player.width/2 - 4;
    bullet.y = player.y;
    bullet.width = 8;
    bullet.height = 10;
    bullet.color = "black";
    bullet.velocityY = -10;
    //take this bullet and add it to the bullets array
    bullets.push(bullet);
    canShoot = false;
    //cooldown
    setTimeout(function(){canShoot = true}, 500);
}

function game(){
    //clearing game screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    if(w == true || up == true){
        //player.y -= 2;
        player.velocityY -= acceleration;
    }
     if(s == true || down == true){
        //player.y += 2;
        player.velocityY += acceleration;
    }

    if(a == true || left == true){
        //player.x -= 2;
        player.velocityX -= acceleration;
    }
    if(d == true || right == true){
        //player.x += 2;
        player.velocityX += acceleration;
    }

    if(space == true && canShoot){
        shoot();
    }

    //to bring velocity back to zero we apply friction
    player.velocityY *= friction;
    player.velocityX *= friction;

    //update player pos
    player.x += player.velocityX;
    player.y += player.velocityY;

    player.drawSquare();

    //Right side of canvas
    for(var i = 0; i<myBalls.length; i++){
        myBalls[i].drawBall();

        if(myBalls[i].x > canvas.width - myBalls[i].radius - 100){
            myBalls[i].moveX *= -1;
            myBalls[i].y += myBalls[i].radius*8;
        }
        //Bottom of canvas
        if(myBalls[i].y > canvas.height + myBalls[i].radius){
            //myBalls[i].moveY *= -1;
            myBalls[i].y = -randomNumber(0,canvas.height);
        }

        //left side of canvas
        if(myBalls[i].x < myBalls[i].radius + 100){
            myBalls[i].moveX *= -1;
            myBalls[i].y += myBalls[i].radius*8;
        }
        //Top of canvas
        // if(myBalls[i].y < myBalls[i].radius){
        //     myBalls[i].moveY *= -1;
        // }

        myBalls[i].x += myBalls[i].moveX;
        myBalls[i].y += myBalls[i].moveY;
    }

    for (var b = bullets.length - 1; b >= 0; b--){
            bullets[b].x += bullets[b].velocityX;
            bullets[b].y += bullets[b].velocityY;

            if(bullets[b].y + bullets[b].height < 0){
                bullets.splice(b,1); //removes bullets from the game when off screen
            }

            for(var e = 0; e < myBalls.length; e++){
                //DISTANCE FORMULA
                var distX = bullets[b].x - myBalls[e].x;
                var distY = bullets[b].y - myBalls[e].y;
                var dist = Math.sqrt((distX*distX)+(distY*distY));

                if(dist < myBalls[e].radius){
                    //remove the ball from the screen
                    myBalls.splice(myBalls[e], 1);
                }
            }
            
            //draw bullet to the screen
            bullets[b].drawSquare();
        }

}