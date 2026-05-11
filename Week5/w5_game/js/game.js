var c = document.querySelector(`canvas`);
var ctx = c.getContext(`2d`);

var fps = 1000/60;
var timer = setInterval(main, fps);

var gravity = 0.5;

//create player 1
var avatar1 = new GameObject();
avatar1.x = 200;
avatar1.y = 800;
avatar1.color = "pink";
avatar1.vx = 5;
avatar1.vy = 5;

//create player 2
var avatar2 = new GameObject();
avatar2.x = 400;
avatar2.y = 975;
avatar2.color = "cyan";
avatar2.vx = 5;
avatar2.vy = 5;

//create player 3
var avatar3 = new GameObject();
avatar3.x = 1000;
avatar3.y = 975;
avatar3.color = "grey";
avatar3.vx = 5;
avatar3.vy = 5;

//create player 4
var avatar4 = new GameObject();
avatar4.x = 800;
avatar4.y = 975;
avatar4.color = "purple";
avatar4.vx = 5;
avatar4.vy = 5;

//place blocks
var blocks = [];
blocks.push(createBlock(500, 950));
blocks.push(createBlock(700, 800));
blocks.push(createBlock(300, 600));

function main()
{
ctx.clearRect(0, 0, c.width, c.height);

    //player 1 input
    if(d == true){avatar1.x += avatar1.vx;}
    if(a == true){avatar1.x -= avatar1.vx;}

    //player 2 input
    if(h == true){avatar2.x += avatar2.vx;}
    if(f == true){avatar2.x -= avatar2.vx;}

    //player 3 input
    if(l == true){avatar3.x += avatar3.vx;}
    if(j == true){avatar3.x -= avatar3.vx;}

    //player 4 input
    if(rightarrow == true){avatar4.x += avatar4.vx;}
    if(leftarrow == true){avatar4.x -= avatar4.vx;}

    for (var i = 0; i < blocks.length; i++) {

        //jumping 
        if(w == true){ 
            avatar1.vy = -15;
        }
        if(t == true ){ 
            avatar2.vy = -15;
        } 
        if(ibutton == true){ 
            avatar3.vy = -15;
        } 
        if(uparrow == true){ 
            avatar4.vy = -15;
        } 
    }

    //player collision
    for (var i = 0; i < blocks.length; i++) {

        playerCollision(avatar1, blocks[i]);
        playerCollision(avatar2, blocks[i]);
        playerCollision(avatar3, blocks[i]);
        playerCollision(avatar4, blocks[i]);

        blocks[i].render();
    }

    //keeps player on screen
    playerBounds(avatar1);
    playerBounds(avatar2);
    playerBounds(avatar3);
    playerBounds(avatar4);

    //gravity
    avatar1.vy += gravity;
    avatar2.vy += gravity;
    avatar3.vy += gravity;
    avatar4.vy += gravity;

    //movement
    avatar1.y += avatar1.vy;
    avatar2.y += avatar2.vy;
    avatar3.y += avatar3.vy;
    avatar4.y += avatar4.vy;

    avatar1.render();
    avatar2.render();
    avatar3.render();
    avatar4.render();
}

function createBlock(x, y, w = 100, h = 100) {
    var b = new GameObject();
    b.color = "yellow";
    b.w = w;
    b.h = h;
    b.x = x;
    b.y = y;

    return b;
}

function playerCollision(player, block) {

    if(block.overlaps(player)) {

        //top
        while(block.hitTestPoint(player.bottom())){
            player.vy = 0;
            player.y--;
        }

        //bottom
        while(block.hitTestPoint(player.top())){
            player.vy = 0;
            player.y++;
        }

        //left
        while(block.hitTestPoint(player.right())){
            player.x--;
        }

        //right
        while(block.hitTestPoint(player.left())){
            player.x++;
        }
    }
}

function playerBounds(player) {

    player.onGround = false;

    //left and right collision
    if(player.x < 0 + player.w/2){
        player.x = 0 + player.w/2;
    }

    if(player.x > c.width - player.w/2){
        player.x = c.width - player.w/2;
    }

    //top collision
    if(player.y < 0 + player.h/2){
        player.y = 0 + player.h/2;
    }

    //ground
    if(player.y > c.height - player.h/2){

        player.vy = 0;
        player.y = c.height - player.h/2;

        //jumping 
        if(w == true){ 
            avatar1.vy = -15;
        }
        if(t == true){ 
            avatar2.vy = -15;
        }
        if(ibutton == true){ 
            avatar3.vy = -15;
        }
        if(uparrow == true){ 
            avatar4.vy = -15;
        }
    }
}