var c = document.querySelector(`canvas`);
var ctx = c.getContext(`2d`);

var fps = 1000/60;
var timer = setInterval(main, fps);

var startingX = 100;
var startingY = 200;
var playerSpeed = 5;

var gravity = 0.5;
var jumpHeight = -28;


//create player 1
var avatar1 = new GameObject();
avatar1.x = 1200;
avatar1.y = 50;
avatar1.vx = playerSpeed;
avatar1.vy = playerSpeed;
avatar1.color = "pink";

//create player 2
var avatar2 = new GameObject();
avatar2.x = 1500;
avatar2.y = 900;
avatar2.vx = playerSpeed;
avatar2.vy = playerSpeed;
avatar2.color = "cyan";

//create player 3
var avatar3 = new GameObject();
avatar3.x = 100;
avatar3.y = 100;
avatar3.vx = playerSpeed;
avatar3.vy = playerSpeed;
avatar3.color = "grey";

//create player 4
var avatar4 = new GameObject();
avatar4.x = 50;
avatar4.y = 100;
avatar4.vx = playerSpeed;
avatar4.vy = playerSpeed;
avatar4.color = "purple";


//place blocks           x    y    w    h    color
var blocks = [];
blocks.push(createBlock(500, 1500, 100, 100));                //0  start  - button end
blocks.push(createBlock(700, 1500, 100, 300));                //1  start  - button end
blocks.push(createBlock(1550, 1500, 100, 460));               //2  start  - button end
blocks.push(createBlock(400, 1500, 100, 55));                //3  hidden - button 0
blocks.push(createBlock(600, 1500, 100, 200));               //4  hidden - button 0
blocks.push(createBlock(1025, 1500, 100, 100));              //5  hidden - button 1
blocks.push(createBlock(700, 1500, 100, 100));               //6  hidden - button 1
blocks.push(createBlock(350, 1500, 100, 100));               //7  hidden - button 1

blocks.push(createBlock(50, 1500, 150, 100));                 //8
blocks.push(createBlock(300, 1500, 75, 100));                 //9
blocks.push(createBlock(525, 1500, 75, 100));                //10
blocks.push(createBlock(725, 1500, 75, 100));                //11
blocks.push(createBlock(925, 1500, 75, 100));                //12
blocks.push(createBlock(1125, 1500, 75, 600));               //13
blocks.push(createBlock(1325, 1500, 75, 800));               //14
blocks.push(createBlock(1550, 1500, 150, 100));              //15

//--
blocks.push(createBlock(70, 175, 200, 50));               //16
blocks.push(createBlock(700, 175, 200, 50));              //17
blocks.push(createBlock(800, 175, 50, 1200));              //18
blocks.push(createBlock(1225, 100, 200, 50));             //19
blocks.push(createBlock(1200, 100, 200, 50));             //20
blocks.push(createBlock(1200, 100, 200, 50));              //21
blocks.push(createBlock(1125, 750, 600, 50));              //22
blocks.push(createBlock(1500, 965, 200, 100));              //23
blocks.push(createBlock(700, 965, 200, 100));              //24
blocks.push(createBlock(275, 665, 100, 50));              //25
blocks.push(createBlock(340, 425, 700, 50));              //26
blocks.push(createBlock(50, 375, 100, 50));              //27


//place spikes
var spikes = [];
spikes.push(createSpike(825, 1500, 30, 30));                  //0  start  - button end
spikes.push(createSpike(650, 1500, 700, 30));                //1  hidden - button 1
spikes.push(createSpike(800, 1500, 1600, 30));                //2


//--
spikes.push(createSpike(340, 385, 700, 30));                //3
spikes.push(createSpike(750, 985, 1500, 30));                //4
spikes.push(createSpike(840, 200, 30, 30));                  //5 (start crab triangle)
spikes.push(createSpike(870, 230, 30, 30));                  //6
spikes.push(createSpike(900, 260, 30, 30));                  //7
spikes.push(createSpike(930, 290, 30, 30));                  //8
spikes.push(createSpike(960, 320, 30, 30));                  //9
spikes.push(createSpike(990, 350, 30, 30));                  //10
spikes.push(createSpike(1020, 380, 30, 30));                  //11
spikes.push(createSpike(1050, 410, 30, 30));                  //12
spikes.push(createSpike(1080, 440, 30, 30));                  //13
spikes.push(createSpike(1110, 470, 30, 30));                  //14
spikes.push(createSpike(1140, 500, 30, 30));                  //15
spikes.push(createSpike(1585, 200, 30, 30));                  //16
spikes.push(createSpike(1555, 230, 30, 30));                  //17
spikes.push(createSpike(1525, 260, 30, 30));                  //18
spikes.push(createSpike(1495, 290, 30, 30));                  //19
spikes.push(createSpike(1465, 320, 30, 30));                  //20
spikes.push(createSpike(1435, 350, 30, 30));                  //21
spikes.push(createSpike(1405, 380, 30, 30));                  //22
spikes.push(createSpike(1375, 410, 30, 30));                  //23
spikes.push(createSpike(1345, 440, 30, 30));                  //24
spikes.push(createSpike(1315, 470, 30, 30));                  //25
spikes.push(createSpike(1285, 500, 30, 30));                  //26
spikes.push(createSpike(1255, 530, 30, 30));                  //27
spikes.push(createSpike(1170, 530, 30, 30));                  //28 (delete this one if falling doesnt work)


//place buttons
var button = [];
button.push(createButton(1110, 1500, 30, 20, "orange"));      //0  start  - button end
button.push(createButton(1550, 1500, 30, 20, "pink"));        //1  start  - button end
button.push(createButton(100, 1500, 30, 20, "orange"));      //2  hidden - button 1

button.push(createButton(500, 1500, 30, 20, "orange"));     //3 creation button
button.push(createButton(505, 1500, 30, 20, "pink"));      //4
button.push(createButton(545, 1500, 30, 20, "grey"));      //5
button.push(createButton(1550, 1500, 30, 20, "orange"));     //6

//--
button.push(createButton(50, 340, 30, 20, "grey"));     //7
button.push(createButton(700, 140, 30, 20, "purple"));     //8
button.push(createButton(1215, 715, 30, 20, "cyan"));     //8
button.push(createButton(275, 630, 30, 20, "orange"));     //9



//place doors
var doors = [];
doors.push(createDoor(270, 1500, 10, 1000, "pink"));       //0
doors.push(createDoor(695, 1500, 10, 1000, "grey"));       //1
doors.push(createDoor(270, 1500, 10, 1000, "grey"));       //2
doors.push(createDoor(695, 1500, 10, 1000, "pink"));       //3
doors.push(createDoor(695, 1500, 0, 0, "cyan"));           //4

//--
doors.push(createDoor(385, 155, 435, 10, "grey"));           //5
doors.push(createDoor(1200, 80, 800, 10, "grey"));           //6
doors.push(createDoor(1100, 920, 700, 10, "pink"));           //7
doors.push(createDoor(450, 355, 700, 10, "purple"));           //8 (is summoned)


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

    
    //door collisions
    for (var i = 0; i < doors.length; i++) {
        passableDoor(avatar2, avatar3, avatar4, doors[0]); //pink
        passableDoor(avatar1, avatar2, avatar4, doors[1]); //grey
        passableDoor(avatar1, avatar2, avatar4, doors[2]); //grey
        passableDoor(avatar2, avatar3, avatar4, doors[3]); //pink
        passableDoor(avatar1, avatar3, avatar4, doors[4]); //cyan

        doors[i].render();
    }

    //spike collisions
    for (var i = 0; i < spikes.length; i++) {
        spikeKill(avatar1, spikes[2], 100, 600);
        spikeKill(avatar2, spikes[2], 100, 600);
        spikeKill(avatar3, spikes[2], 100, 600);
        spikeKill(avatar4, spikes[2], 100, 600);

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

        //example: buttonAdd(player, buttons, {players: [{ player: avatar2, x: 500, y: 300 }], blocks: [{ block: 3, y: 975 },{ block: 4, y: 950 }], spikes: [{ spike: 2, y: 800 }], button: [{ button: 1, y: 600 }], doors: [{ door: 0, y: 200 }]});

        buttonRemove(avatar1, button[3], {players: [{player: avatar1, x: startingX, y: startingY}, {player: avatar2, x: startingX, y: startingY}, {player: avatar3, x: startingX, y: startingY}, {player: avatar4, x: startingX, y: startingY}], blocks: [{block: 8, y: 950}, {block: 9, y: 950}, {block: 10, y: 950}, {block: 11, y: 950}, {block: 12, y: 950}, {block: 13, y: 950}, {block: 14, y: 950}, {block: 15, y: 950}], spikes: [{spike: 2, y: 985}], button: [{button: 4, y: 890}, {button: 5, y: 890}, {button: 6, y: 890}], doors: [{door: 0, y: 500}, {door: 1, y: 500}]});
        colorButton(avatar1, 0, 1, 2, 3, 4, button[4]);
        colorButton(avatar3, 2, 3, 4, 5, 5, button[5]);

        //button end
        buttonRemove(avatar1, button[6], {players: [{player: avatar1, x: startingX, y: startingY}, {player: avatar2, x: startingX, y: startingY}, {player: avatar3, x: startingX, y: startingY}, {player: avatar4, x: startingX, y: startingY}], blocks: [{block: 0, y: 950}, {block: 1, y: 950}, {block: 2, y: 950}], spikes: [{spike: 0, y: 985}], button: [{button: 0, y: 990}, {button: 1, y: 710}]});
        buttonRemove(avatar2, button[6], {players: [{player: avatar1, x: startingX, y: startingY}, {player: avatar2, x: startingX, y: startingY}, {player: avatar3, x: startingX, y: startingY}, {player: avatar4, x: startingX, y: startingY}], blocks: [{block: 0, y: 950}, {block: 1, y: 950}, {block: 2, y: 950}], spikes: [{spike: 0, y: 985}], button: [{button: 0, y: 990}, {button: 1, y: 710}]});
        buttonRemove(avatar3, button[6], {players: [{player: avatar1, x: startingX, y: startingY}, {player: avatar2, x: startingX, y: startingY}, {player: avatar3, x: startingX, y: startingY}, {player: avatar4, x: startingX, y: startingY}], blocks: [{block: 0, y: 950}, {block: 1, y: 950}, {block: 2, y: 950}], spikes: [{spike: 0, y: 985}], button: [{button: 0, y: 990}, {button: 1, y: 710}]});
        buttonRemove(avatar4, button[6], {players: [{player: avatar1, x: startingX, y: startingY}, {player: avatar2, x: startingX, y: startingY}, {player: avatar3, x: startingX, y: startingY}, {player: avatar4, x: startingX, y: startingY}], blocks: [{block: 0, y: 950}, {block: 1, y: 950}, {block: 2, y: 950}], spikes: [{spike: 0, y: 985}], button: [{button: 0, y: 990}, {button: 1, y: 710}]});


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

function createDoor(x, y, w, h, color){
    var door = new GameObject();
    door.color = color;

    door.w = w;
    door.h = h;
    door.x = x;
    door.y = y;

    return door;
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

function passableDoor(player1, player2, player3, door){

    if(door.overlaps(player1) || door.overlaps(player2) || door.overlaps(player3)){

        //top of door
        while(door.hitTestPoint(player1.bottom()) ||  door.hitTestPoint(player1.leftbottom()) || door.hitTestPoint(player1.rightbottom())){
            player1.vy = 0;
            player1.y--;
        }
        while(door.hitTestPoint(player2.bottom()) ||  door.hitTestPoint(player2.leftbottom()) || door.hitTestPoint(player2.rightbottom())){
            player2.vy = 0;
            player2.y--;
        }
        while(door.hitTestPoint(player3.bottom()) ||  door.hitTestPoint(player3.leftbottom()) || door.hitTestPoint(player3.rightbottom())){
            player3.vy = 0;
            player3.y--;
        }

        //bottom of door
        while(door.hitTestPoint(player1.top())){
            player1.vy = 0;
            player1.y++;
        }
        while(door.hitTestPoint(player2.top())){
            player2.vy = 0;
            player2.y++;
        }
        while(door.hitTestPoint(player3.top())){
            player3.vy = 0;
            player3.y++;
        }

        //left of door
        while(door.hitTestPoint(player1.right())){
            player1.x--;
        }
        while(door.hitTestPoint(player2.right())){
            player2.x--;
        }
        while(door.hitTestPoint(player3.right())){
            player3.x--;
        }

        //right of door
        while(door.hitTestPoint(player1.left())){
            player1.x++;
        }
        while(door.hitTestPoint(player2.left())){
            player2.x++;
        }
        while(door.hitTestPoint(player3.left())){
            player3.x++;
        }
    }
}


function buttonAdd(player, buttons, options = {}){

     if(buttons.overlaps(player)) {

        //top of button
        while(buttons.hitTestPoint(player.bottom()) ||  buttons.hitTestPoint(player.leftbottom()) || buttons.hitTestPoint(player.rightbottom()) || buttons.hitTestPoint(player.leftbottom())){
            player.vy = 0;
            player.y--;

            //jumping 
            if(w == true){ 
                player.vy = jumpHeight;
            }

            if(player.vy == 0){

            buttons.y = 1500;

             // players
                if (options.players) {
                    options.players.forEach(function(playerData) {
                        playerData.player.x = playerData.x;
                        playerData.player.y = playerData.y;
                    });
                }

                // blocks
                if (options.blocks) {
                    options.blocks.forEach(function(blockData) {
                        blocks[blockData.block].y = blockData.y;
                    });
                }

                // spikes
                if (options.spikes) {
                    options.spikes.forEach(function(spikeData) {
                        spikes[spikeData.spike].y = spikeData.y;
                    });
                }

                // button
                if (options.button) {
                    options.button.forEach(function(buttonData) {
                        button[buttonData.button].y = buttonData.y;
                    });
                }

                // doors
                if (options.doors) {
                    options.doors.forEach(function(doorData) {
                        doors[doorData.door].y = doorData.y;
                    });
                }
            }

        }
    }
}

function buttonRemove(player, buttons, options = {}){

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
                //erase buttons
                for (var i = 0; i < button.length; i++) {
                    button[i].y = 1500;
                }

                //erase doors
                for (var i = 0; i < doors.length; i++) {
                    doors[i].y = 1500;
                }

                //erase blocks
                for (var i = 0; i < blocks.length; i++) {
                    blocks[i].y = 1500;
                }
                
                //erase spikes
                for (var i = 0; i < spikes.length; i++) {
                    spikes[i].y = 1500;
                }

             // players
                if (options.players) {
                    options.players.forEach(function(playerData) {
                        playerData.player.x = playerData.x;
                        playerData.player.y = playerData.y;
                    });
                }

                // blocks
                if (options.blocks) {
                    options.blocks.forEach(function(blockData) {
                        blocks[blockData.block].y = blockData.y;
                    });
                }

                // spikes
                if (options.spikes) {
                    options.spikes.forEach(function(spikeData) {
                        spikes[spikeData.spike].y = spikeData.y;
                    });
                }

                // button
                if (options.button) {
                    options.button.forEach(function(buttonData) {
                        button[buttonData.button].y = buttonData.y;
                    });
                }

                // doors
                if (options.doors) {
                    options.doors.forEach(function(doorData) {
                        doors[doorData.door].y = doorData.y;
                    });
                }
            }

        }
    }
}



function colorButton(player, door1, door2, door3, door4, button1, buttons){

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
                //erase doors and button
                button[button1].y = 1500;
                doors[door1].y = 1500;
                doors[door2].y = 1500;

                //new doors
                doors[door3].y = 500;
                doors[door4].y = 500;
            }
        }
    }
}
