var c = document.querySelector(`canvas`);
var ctx = c.getContext(`2d`);

var fps = 1000/60;
var timer = setInterval(main, fps);

var gravity = 0.5;
var jumpHeight = -10;

//create player 1
var avatar1 = new GameObject();
avatar1.x = 100;
avatar1.y = 800;
avatar1.color = "pink";
avatar1.vx = 5;
avatar1.vy = 5;

//create player 2
var avatar2 = new GameObject();
avatar2.x = 100;
avatar2.y = 600;
avatar2.color = "cyan";
avatar2.vx = 5;
avatar2.vy = 5;

//create player 3
var avatar3 = new GameObject();
avatar3.x = 100;
avatar3.y = 400;
avatar3.color = "grey";
avatar3.vx = 5;
avatar3.vy = 5;

//create player 4
var avatar4 = new GameObject();
avatar4.x = 100;
avatar4.y = 200;
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

    //player collisions
    for (var i = 0; i < blocks.length; i++) {

        playerCollision(avatar1, blocks[i]);
        playerCollision(avatar2, blocks[i]);
        playerCollision(avatar3, blocks[i]);
        playerCollision(avatar4, blocks[i]);

        playerOnPlayer(avatar1, avatar2, w, t);
        playerOnPlayer(avatar1, avatar3, w, ibutton);
        playerOnPlayer(avatar1, avatar4, w, uparrow);
        playerOnPlayer(avatar2, avatar3, t, ibutton);
        playerOnPlayer(avatar2, avatar4, t, uparrow);
        playerOnPlayer(avatar3, avatar4, ibutton, uparrow);

        blocks[i].render();
    }

    //player bounds check
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

        //top of block player 1
        while(block.hitTestPoint(avatar1.bottom()) ||  block.hitTestPoint(avatar1.leftbottom()) || block.hitTestPoint(avatar1.rightbottom())){
            avatar1.vy = 0;
            avatar1.y--;

            //jumping 
            if(w == true){ 
                avatar1.vy = jumpHeight;
            }
        }

        //top of block player 2
        while(block.hitTestPoint(avatar2.bottom()) ||  block.hitTestPoint(avatar2.leftbottom()) || block.hitTestPoint(avatar2.rightbottom())){
            avatar2.vy = 0;
            avatar2.y--;

            //jumping 
            if(t == true){ 
                avatar2.vy = jumpHeight;
            }
        }

        //top of block player 3
        while(block.hitTestPoint(avatar3.bottom()) ||  block.hitTestPoint(avatar3.leftbottom()) || block.hitTestPoint(avatar3.rightbottom())){
            avatar3.vy = 0;
            avatar3.y--;

            //jumping 
            if(ibutton == true){ 
                avatar3.vy = jumpHeight;
            }
        }

        //top of block player 4
        while(block.hitTestPoint(avatar4.bottom()) ||  block.hitTestPoint(avatar4.leftbottom()) || block.hitTestPoint(avatar4.rightbottom())){
            avatar4.vy = 0;
            avatar4.y--;

            //jumping 
            if(uparrow == true){ 
                avatar4.vy = jumpHeight;
            }
        }

        //bottom of block
        while(block.hitTestPoint(player.top())){
            player.vy = 0;
            player.y++;
        }

        //left of block
        while(block.hitTestPoint(player.right())){
            player.x--;
        }

        //right of block
        while(block.hitTestPoint(player.left())){
            player.x++;
        }
    }
}


function playerBounds(player) {

    //left bounds
    if(player.x < 0 + player.w/2){
        player.x = 0 + player.w/2;
    }
    
    //right bounds
    if(player.x > c.width - player.w/2){
        player.x = c.width - player.w/2;
    }

    //top bounds
    if(player.y < 0 + player.h/2){
        player.y = 0 + player.h/2;
    }

    //ground bounds
    //player 1 ground bounds
    if(avatar1.y > c.height - avatar1.h/2){

        avatar1.vy = 0;
        avatar1.y = c.height - avatar1.h/2;

        //jumping 
        if(w == true){ 
            avatar1.vy = jumpHeight;
        }
    }

    //player 2 ground bounds
    if(avatar2.y > c.height - avatar2.h/2){

        avatar2.vy = 0;
        avatar2.y = c.height - avatar2.h/2;

        //jumping 
        if(t == true){ 
            avatar2.vy = jumpHeight;
        }
    }

    //player 3 ground bounds
    if(avatar3.y > c.height - avatar3.h/2){

        avatar3.vy = 0;
        avatar3.y = c.height - avatar3.h/2;

        //jumping 
        if(ibutton == true){ 
            avatar3.vy = jumpHeight;
        }
    }

    //player 4 ground bounds
    if(avatar4.y > c.height - avatar4.h/2){

        avatar4.vy = 0;
        avatar4.y = c.height - avatar4.h/2;

        //jumping 
        if(uparrow == true){ 
            avatar4.vy = jumpHeight;
        }
    }

}

function playerOnPlayer(player1, player2, player1Jump, player2Jump){
    //player 1 with 2
    //top of player 1
    while(player1.hitTestPoint(player2.bottom()) || player1.hitTestPoint(player2.leftbottom()) || player1.hitTestPoint(player2.rightbottom())){
        player2.vy = 0;
        player2.y--;

        //jumping 
        if(player2Jump == true){ 
            player2.vy = jumpHeight;
        }
    }
    //top of player 2
    while(player2.hitTestPoint(player1.bottom()) || player2.hitTestPoint(player1.leftbottom()) || player2.hitTestPoint(player1.rightbottom())){
        player1.vy = 0;
        player1.y--;

        //jumping 
        if(player1Jump == true){ 
            player1.vy = jumpHeight;
        }
    }
    //bottom of player 2
    while(player2.hitTestPoint(player1.top())){
        player1.vy = 0;
        player1.y++;
    }
    //left of player 2
    while(player2.hitTestPoint(player1.right())){
        player1.x--;
        player2.x++;
    }
    //right of player 2
    while(player2.hitTestPoint(player1.left())){
        player1.x++;
        player2.x--;
    }
}


//spikes
//timer