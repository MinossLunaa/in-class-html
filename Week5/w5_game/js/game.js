var c = document.querySelector(`canvas`);
var ctx = c.getContext(`2d`);

var fps = 1000/60;
var timer = setInterval(main, fps);

var gravity = 0.5;
var jumpHeight = -8;

var startingX = 100;
var startingY = 200;

var tutorialEnd = false;


//create player 1
var avatar1 = new GameObject();
avatar1.x = startingX;
avatar1.y = startingY*4;
avatar1.color = "pink";
avatar1.vx = 5;
avatar1.vy = 5;

//create player 2
var avatar2 = new GameObject();
avatar2.x = startingX;
avatar2.y = startingY*3;
avatar2.color = "cyan";
avatar2.vx = 5;
avatar2.vy = 5;

//create player 3
var avatar3 = new GameObject();
avatar3.x = startingX;
avatar3.y = startingY*2;
avatar3.color = "grey";
avatar3.vx = 5;
avatar3.vy = 5;

//create player 4
var avatar4 = new GameObject();
avatar4.x = startingX;
avatar4.y = startingY;
avatar4.color = "purple";
avatar4.vx = 5;
avatar4.vy = 5;


//place blocks           x    y    w    h    color
var blocks = [];
blocks.push(createBlock(500, 950, 100, 100));                //0
blocks.push(createBlock(700, 950, 100, 300));                //1
blocks.push(createBlock(1550, 950, 100, 460));               //2
blocks.push(createBlock(400, 1500, 100, 55));                //3 hidden - button 0
blocks.push(createBlock(600, 1500, 100, 200));               //4 hidden - button 0
blocks.push(createBlock(1025, 1500, 100, 100));              //5 hidden - button 1
blocks.push(createBlock(700, 1500, 100, 100));               //6 hidden - button 1
blocks.push(createBlock(350, 1500, 100, 100));               //7 hidden - button 1

//place spikes
var spikes = [];
spikes.push(createSpike(825, 985, 30, 30));                  //0
spikes.push(createSpike(650, 1500, 700, 30));                //1 hidden - button 1

//place buttons
var button = [];
button.push(createButton(1110, 990, 30, 20, "orange"));      //0
button.push(createButton(1550, 710, 30, 20, "pink"));        //1
button.push(createButton(100, 1500, 30, 20, "orange"));      //2 hidden - button 1




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

    //spike collisions
    for (var i = 0; i < spikes.length; i++) {
        spikeKill(avatar1, spikes[0], 100, 600);
        spikeKill(avatar2, spikes[0], 100, 600);
        spikeKill(avatar3, spikes[0], 100, 600);
        spikeKill(avatar4, spikes[0], 100, 600);

        spikeKill(avatar1, spikes[1], 1500, 600);
        spikeKill(avatar2, spikes[1], 1500, 600);
        spikeKill(avatar3, spikes[1], 1500, 600);
        spikeKill(avatar4, spikes[1], 1500, 600);

        spikes[i].render();
    }

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

    //button collisions
    for (var i = 0; i < button.length; i++) {

        buttonPress0(avatar1, button[0])
        buttonPress0(avatar2, button[0])
        buttonPress0(avatar3, button[0])
        buttonPress0(avatar4, button[0])

        buttonPress1(avatar1, button[1])

        buttonPress2(avatar1, button[2])
        buttonPress2(avatar2, button[2])
        buttonPress2(avatar3, button[2])
        buttonPress2(avatar4, button[2])

        button[i].render();

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


    //---------------------------------------------------------------------------------------------------TEXT-----------------------------------------------------------------------------------------------
    var controlsTrigger = false;
    var orangeButtonTrigger = false;
    var pinkButtonTrigger = false;
    var spikeTrigger = false;

    //controls dissapear
    if(avatar1.x > 550 && avatar2.x > 550 && avatar3.x > 550 && avatar4.x > 550){
        controlsTrigger = true;
    }

    //orange button text
    if (avatar1.x > 750 && avatar1.x < 1300 || avatar2.x > 750 && avatar2.x < 1300 || avatar3.x > 750 && avatar3.x < 1300 || avatar4.x > 750 && avatar4.x < 1300){
        orangeButtonTrigger = true;
    }

    //pink button text appears
    if (avatar1.x > 1400 || avatar2.x > 1400 || avatar3.x > 1400 || avatar4.x > 1400){
        pinkButtonTrigger = true;
    }

    //spike text appears
    if (avatar1.x > 500 && avatar1.x < 850 || avatar2.x > 500 && avatar2.x < 850 || avatar3.x > 500 && avatar3.x < 850 || avatar4.x > 500 && avatar4.x < 850 ){
        spikeTrigger = true;
    }

    //controls text
    if (tutorialEnd == true){
        ctx.fillText(" ", 0, 0);
    }
    else if(controlsTrigger == false){
    ctx.font = "16px Arial";
    ctx.fillStyle = "purple";
    ctx.fillText("purple: Arrow Keys", 75, 835);
    ctx.fillStyle = "grey";
    ctx.fillText("grey: IJKL", 90, 885);
    ctx.fillStyle = "cyan";
    ctx.fillText("blue: TFGH", 90, 935);
    ctx.fillStyle = "pink";
    ctx.fillText("pink: WASD", 90, 985);
    }else{
        ctx.fillText(" ", 0, 0);
    }

    //orange button text
    if (tutorialEnd == true){
        ctx.fillText(" ", 0, 0);
    }
    else if(orangeButtonTrigger == true){
    ctx.font = "16px Arial";
    ctx.fillStyle = "orange";
    ctx.fillText("buttons can be walked through", 1000, 940);
    ctx.fillText("they will be pressed when jumped on", 980, 970);
    }else{
        ctx.fillText(" ", 0, 0);
    }

    //pink button text
    if (tutorialEnd == true){
        ctx.fillText(" ", 0, 0);
    }
    else if(pinkButtonTrigger == true){
    ctx.font = "16px Arial";
    ctx.fillStyle = "pink";
    ctx.fillText("some buttons are", 1475, 640);
    ctx.fillText("color coordinated", 1475, 670);
    }else{
        ctx.fillText(" ", 0, 0);
    }

    //spike text
    if (tutorialEnd == true){
        ctx.fillText(" ", 0, 0);
    }
    else if(spikeTrigger == true){
        ctx.font = "16px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("red hurts", 795, 950);
    }else{
        ctx.fillText(" ", 0, 0);
    }

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    avatar1.render();
    avatar2.render();
    avatar3.render();
    avatar4.render();
}




function createBlock(x, y, w, h) {
    var block = new GameObject();
    block.color = "yellow";

    block.w = w;
    block.h = h;
    block.x = x;
    block.y = y;

    return block;
}

function createButton(x, y, w, h, color){
    var button = new GameObject();
    button.color = color;

    button.w = w;
    button.h = h;
    button.x = x;
    button.y = y;

    return button;
}

function createSpike(x, y, w, h){
    var spike = new GameObject();
    spike.color = "red";

    spike.w = w;
    spike.h = h;
    spike.x = x;
    spike.y = y;

    return spike;
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


function spikeKill(player, spike, x, y){
    if(spike.overlaps(player)) {
        player.x = x;
        player.y = y;
    }
}


function buttonPress0(player, buttons, block1, block2){

     if(buttons.overlaps(player)) {

        //top of button
        while(buttons.hitTestPoint(player.bottom()) ||  buttons.hitTestPoint(player.leftbottom()) || buttons.hitTestPoint(player.rightbottom())){
            player.vy = 0;
            player.y--;

            //jumping 
            if(w == true){ 
                player.vy = jumpHeight;
            }

            if(player.vy == 0){
                buttons.y = 1500;

                blocks[3].y = 975;
                blocks[4].y = 950;
            }

        }
    }
}


function buttonPress1(player, buttons, block1, block2){

     if(buttons.overlaps(player)) {

        //top of button
        while(buttons.hitTestPoint(player.bottom()) ||  buttons.hitTestPoint(player.leftbottom()) || buttons.hitTestPoint(player.rightbottom())){
            player.vy = 0;
            player.y--;

            //jumping 
            if(w == true){ 
                player.vy = jumpHeight;
            }

            if(player.vy == 0){
                buttons.y = 1500;

                tutorialEnd = true;

                //hides everything on canvas
                blocks[0].y = 1500;
                blocks[1].y = 1500;
                blocks[2].y = 1500;
                blocks[3].y = 1500;
                blocks[4].y = 1500;
                spikes[0].y = 1500;
                button[0].y = 1500;

                //move hidden objects up
                spikes[1].y = 985;
                blocks[5].y = 990;
                blocks[6].y = 990;
                blocks[7].y = 960;
                button[2].y = 990;
                
            }

        }
    }
}

function buttonPress2(player, buttons, block1, block2){

     if(buttons.overlaps(player)) {

        //top of button
        while(buttons.hitTestPoint(player.bottom()) ||  buttons.hitTestPoint(player.leftbottom()) || buttons.hitTestPoint(player.rightbottom())){
            player.vy = 0;
            player.y--;

            //jumping 
            if(w == true){ 
                player.vy = jumpHeight;
            }

            if(player.vy == 0){
            buttons.y = 1500;

                //hides everything on canvas
                spikes[1].y = 1500;
                blocks[5].y = 1500;
                blocks[6].y = 1500;
                blocks[7].y = 1500;
            }

        }
    }
}
