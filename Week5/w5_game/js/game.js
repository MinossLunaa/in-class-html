var c = document.querySelector(`canvas`);
var ctx = c.getContext(`2d`);

var underwater = document.getElementById("underwaterbackground");
var pink_image = document.getElementById("pinkjellyfish");
var cyan_image = document.getElementById("bluejellyfish");
var grey_image = document.getElementById("greyjellyfish");
var purple_image = document.getElementById("purplejellyfish");
var spike_image = document.getElementById("crab");
var block_image = document.getElementById("wall")

var music = document.getElementById("music");
music.volume = 0.1;
var dead_sound = document.getElementById("dead");
var button_click = document.getElementById("button_sound")
var jump1 = document.getElementById("jump_1");
jump1.volume = 0.01;
var jump2 = document.getElementById("jump_2");
jump2.volume = 0.01;
var jump3 = document.getElementById("jump_3");
jump3.volume = 0.01;
var jump4 = document.getElementById("jump_4");
jump4.volume = 0.01;
var win_sound = document.getElementById("cheering");


var fps = 1000/60;
var timer = setInterval(main, fps);

var startingX = 100;
var startingY = 200;
var playerSpeed = 5;

var gravity = 0.5;
var jumpHeight = -8;

var tutorialEnd = false;
var gameWin = false;

//create background
var background = new GameObject();
background.x = 800;
background.y = 500;
background.w = c.width;
background.h = c.height;
background.image = underwater;

//create player 1
var avatar1 = new GameObject();
avatar1.x = startingX;
avatar1.y = startingY*4;
avatar1.vx = playerSpeed;
avatar1.vy = playerSpeed;
avatar1.color = "";
avatar1.image = pink_image;

//create player 2
var avatar2 = new GameObject();
avatar2.x = startingX;
avatar2.y = startingY*3;
avatar2.vx = playerSpeed;
avatar2.vy = playerSpeed;
avatar2.color = "";
avatar2.image = cyan_image;

//create player 3
var avatar3 = new GameObject();
avatar3.x = startingX;
avatar3.y = startingY*2;
avatar3.vx = playerSpeed;
avatar3.vy = playerSpeed;
avatar3.color = "";
avatar3.image = grey_image;

//create player 4
var avatar4 = new GameObject();
avatar4.x = startingX;
avatar4.y = startingY;
avatar4.vx = playerSpeed;
avatar4.vy = playerSpeed;
avatar4.color = "";
avatar4.image = purple_image;


//place blocks           x    y    w    h    color           num     properties
var blocks = [];
blocks.push(createBlock(500, 950, 100, 100));                //0  start  - button end
blocks.push(createBlock(700, 950, 100, 300));                //1  start  - button end
blocks.push(createBlock(1550, 950, 100, 460));               //2  start  - button end

blocks.push(createBlock(400, 1500, 100, 55));                //3  hidden - button 0
blocks.push(createBlock(600, 1500, 100, 200));               //4  hidden - button 0

blocks.push(createBlock(1025, 1500, 100, 100));              //5  hidden - button 1
blocks.push(createBlock(700, 1500, 100, 100));               //6  hidden - button 1
blocks.push(createBlock(350, 1500, 100, 100));               //7  hidden - button 1

blocks.push(createBlock(50, 1500, 150, 100));                //8  hidden - button 2
blocks.push(createBlock(300, 1500, 75, 100));                //9  hidden - button 2
blocks.push(createBlock(525, 1500, 75, 100));               //10  hidden - button 2
blocks.push(createBlock(725, 1500, 75, 100));               //11  hidden - button 2
blocks.push(createBlock(925, 1500, 75, 100));               //12  hidden - button 2
blocks.push(createBlock(1125, 1500, 75, 600));              //13  hidden - button 2
blocks.push(createBlock(1325, 1500, 75, 800));              //14  hidden - button 2
blocks.push(createBlock(1550, 1500, 150, 100));             //15  hidden - button 2

blocks.push(createBlock(70, 1500, 200, 50));                 //16
blocks.push(createBlock(700, 1500, 200, 50));                //17
blocks.push(createBlock(800, 2000, 50, 1200));               //18
blocks.push(createBlock(1225, 1500, 200, 50));               //19
blocks.push(createBlock(1200, 1500, 200, 50));               //20
blocks.push(createBlock(1200, 1500, 200, 50));               //21
blocks.push(createBlock(1125, 1500, 600, 50));               //22
blocks.push(createBlock(1500, 1500, 200, 100));              //23
blocks.push(createBlock(700, 1500, 200, 100));               //24
blocks.push(createBlock(275, 1500, 100, 50));                //25
blocks.push(createBlock(340, 1500, 700, 50));                //26
blocks.push(createBlock(50, 1500, 100, 50));                 //27

//place spikes
var spikes = [];
spikes.push(createSpike(825, 985, 30, 30));                  //0  start  - button end

spikes.push(createSpike(650, 1500, 650, 30));                //1  hidden - button 1

spikes.push(createSpike(800, 1500, 1600, 30));               //2  hidden - button 2

spikes.push(createSpike(340, 1500, 700, 30));                 //3
spikes.push(createSpike(750, 1500, 1500, 30));                //4
spikes.push(createSpike(840, 1500, 30, 30));                  //5 (start crab triangle)
spikes.push(createSpike(870, 1500, 30, 30));                  //6
spikes.push(createSpike(900, 1500, 30, 30));                  //7
spikes.push(createSpike(930, 1500, 30, 30));                  //8
spikes.push(createSpike(960, 1500, 30, 30));                  //9
spikes.push(createSpike(990, 1500, 30, 30));                  //10
spikes.push(createSpike(1020, 1500, 30, 30));                 //11
spikes.push(createSpike(1050, 1500, 30, 30));                 //12
spikes.push(createSpike(1080, 1500, 30, 30));                 //13
spikes.push(createSpike(1110, 1500, 30, 30));                 //14
spikes.push(createSpike(1140, 1500, 30, 30));                 //15
spikes.push(createSpike(1585, 1500, 30, 30));                 //16
spikes.push(createSpike(1555, 1500, 30, 30));                 //17
spikes.push(createSpike(1525, 1500, 30, 30));                 //18
spikes.push(createSpike(1495, 1500, 30, 30));                 //19
spikes.push(createSpike(1465, 1500, 30, 30));                 //20
spikes.push(createSpike(1435, 1500, 30, 30));                 //21
spikes.push(createSpike(1405, 1500, 30, 30));                 //22
spikes.push(createSpike(1375, 1500, 30, 30));                 //23
spikes.push(createSpike(1345, 1500, 30, 30));                 //24
spikes.push(createSpike(1315, 1500, 30, 30));                 //25
spikes.push(createSpike(1285, 1500, 30, 30));                 //26
spikes.push(createSpike(1255, 1500, 30, 30));                 //27
spikes.push(createSpike(1170, 1500, 30, 30));                 //28 (delete this one if falling doesnt work)

//place buttons
var button = [];
button.push(createButton(1110, 990, 30, 20, "orange"));      //0  start  - button end
button.push(createButton(1550, 710, 30, 20, "pink"));        //1  start  - button end

button.push(createButton(100, 1500, 30, 20, "orange"));      //2  hidden - button 1

button.push(createButton(100, 1500, 30, 20, "orange"));      //3  hidden - button 2
button.push(createButton(505, 1500, 30, 20, "pink"));        //4  hidden - button 2
button.push(createButton(545, 1500, 30, 20, "grey"));        //5  hidden - button 2
button.push(createButton(1550, 1500, 30, 20, "orange"));     //6  hidden - button 2

button.push(createButton(50, 1500, 30, 20, "purple"));          //7
button.push(createButton(700, 1500, 30, 20, "grey"));       //8
button.push(createButton(1215, 1500, 30, 20, "cyan"));        //9
button.push(createButton(275, 1500, 30, 20, "orange"));       //10

//place doors
var doors = [];
doors.push(createDoor(270, 1500, 10, 1000, "pink"));         //0  hidden - button 2
doors.push(createDoor(695, 1500, 10, 1000, "grey"));         //1  hidden - button 2
doors.push(createDoor(270, 1500, 10, 1000, "grey"));         //2  hidden - button 2
doors.push(createDoor(695, 1500, 10, 1000, "pink"));         //3  hidden - button 2
doors.push(createDoor(695, 1500, 0, 0, "cyan"));             //4  hidden - button 2

doors.push(createDoor(385, 1500, 435, 10, "grey"));          //5
doors.push(createDoor(1200, 1500, 800, 10, "grey"));         //6
doors.push(createDoor(1100, 1500, 650, 10, "pink"));         //7
doors.push(createDoor(450, 1500, 700, 10, "purple"));        //8 (is summoned)
doors.push(createDoor(350, 1500, 700, 10, "purple"));        //9 (is summoned)
doors.push(createDoor(350, 1500, 700, 10, "grey"));        //10 (is summoned)

//functions----
function main()
{
    ctx.clearRect(0, 0, c.width, c.height);
    
    //START SCREEN
    if(gameStart == false){

        background.render();

        ctx.fillStyle = "white";
        ctx.font = "40px Arial";

        ctx.fillText("JELLY JUMPERS", c.width/2-150, c.height/2);
        ctx.fillText("press space to start", c.width/2-170, 600);

        return;
    }
music.play();
background.render();

    //player 1 input
    if(player1right == true){avatar1.x += avatar1.vx;}
    if(player1left == true){avatar1.x -= avatar1.vx;}

    //player 2 input
    if(player2right == true){avatar2.x += avatar2.vx;}
    if(player2left == true){avatar2.x -= avatar2.vx;}

    //player 3 input
    if(player3right == true){avatar3.x += avatar3.vx;}
    if(player3left == true){avatar3.x -= avatar3.vx;}

    //player 4 input
    if(player4right == true){avatar4.x += avatar4.vx;}
    if(player4left == true){avatar4.x -= avatar4.vx;}

    
    //door collisions
    for (var i = 0; i < doors.length; i++) {
        passableDoor(avatar2, avatar3, avatar4, doors[0]); //pink
        passableDoor(avatar1, avatar2, avatar4, doors[1]); //grey
        passableDoor(avatar1, avatar2, avatar4, doors[2]); //grey
        passableDoor(avatar2, avatar3, avatar4, doors[3]); //pink
        passableDoor(avatar1, avatar3, avatar4, doors[4]); //cyan

        passableDoor(avatar2, avatar1, avatar4, doors[5]);
        passableDoor(avatar2, avatar1, avatar4, doors[6]);
        passableDoor(avatar2, avatar3, avatar4, doors[7]);
        passableDoor(avatar2, avatar3, avatar1, doors[8]);
        passableDoor(avatar2, avatar3, avatar1, doors[9]);
        passableDoor(avatar2, avatar4, avatar1, doors[9]);

        doors[i].render();
    }

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

        spikeKill(avatar1, spikes[2], 100, 600);
        spikeKill(avatar2, spikes[2], 100, 600);
        spikeKill(avatar3, spikes[2], 100, 600);
        spikeKill(avatar4, spikes[2], 100, 600);

        spikeKill(avatar3, spikes[3], 100, 100);
        spikeKill(avatar4, spikes[3], 50, 100);
        spikeKill(avatar1, spikes[4], 700, 600);
        spikeKill(avatar2, spikes[4], 700, 600);
        spikeKill(avatar3, spikes[4], 700, 600);
        spikeKill(avatar4, spikes[4], 700, 600);
        //crab triangle
        for (let i = 5; i <= 27; i++) {
            spikeKill(avatar1, spikes[i], 1200, 50);
        }

        spikes[i].render();
    }


    //player collisions
    for (var i = 0; i < blocks.length; i++) {

        playerCollision(avatar1, blocks[i]);
        playerCollision(avatar2, blocks[i]);
        playerCollision(avatar3, blocks[i]);
        playerCollision(avatar4, blocks[i]);

        playerOnPlayer(avatar1, avatar2, player1up, player2up);
        playerOnPlayer(avatar1, avatar3, player1up, player3up);
        playerOnPlayer(avatar1, avatar4, player1up, player4up);
        playerOnPlayer(avatar2, avatar3, player2up, player3up);
        playerOnPlayer(avatar2, avatar4, player2up, player4up);
        playerOnPlayer(avatar3, avatar4, player3up, player4up);

        blocks[i].render();
    }


    //button collisions
    for (var i = 0; i < button.length; i++) {

        //example: buttonAdd(player, buttons, {players: [{ player: avatar2, x: 500, y: 300 }],blocks: [{ block: 3, y: 975 },{ block: 4, y: 950 }],spikes: [{ spike: 2, y: 800 }],button: [{ button: 1, y: 600 }],doors: [{ door: 0, y: 200 }]});


        //button 0
        buttonAdd(avatar1, button[0], {blocks: [{block: 3, y: 975}, {block: 4, y: 950}]});
        buttonAdd(avatar2, button[0], {blocks: [{block: 3, y: 975}, {block: 4, y: 950}]});
        buttonAdd(avatar3, button[0], {blocks: [{block: 3, y: 975}, {block: 4, y: 950}]});
        buttonAdd(avatar4, button[0], {blocks: [{block: 3, y: 975}, {block: 4, y: 950}]});

        //button 1
        buttonRemove(avatar1, button[1], {blocks: [{block: 5, y: 990}, {block: 6, y: 990}, {block: 7, y: 960}], spikes: [{spike: 1, y: 985}], button: [{button: 3, y: 990}]});

        //button 2
        buttonRemove(avatar1, button[3], {players: [{player: avatar1, x: startingX, y: startingY}, {player: avatar2, x: startingX, y: startingY}, {player: avatar3, x: startingX, y: startingY}, {player: avatar4, x: startingX, y: startingY}], blocks: [{block: 8, y: 950}, {block: 9, y: 950}, {block: 10, y: 950}, {block: 11, y: 950}, {block: 12, y: 950}, {block: 13, y: 950}, {block: 14, y: 950}, {block: 15, y: 950}], spikes: [{spike: 2, y: 985}], button: [{button: 4, y: 890}, {button: 5, y: 890}, {button: 6, y: 890}], doors: [{door: 0, y: 500}, {door: 1, y: 500}]});
        buttonRemove(avatar2, button[3], {players: [{player: avatar1, x: startingX, y: startingY}, {player: avatar2, x: startingX, y: startingY}, {player: avatar3, x: startingX, y: startingY}, {player: avatar4, x: startingX, y: startingY}], blocks: [{block: 8, y: 950}, {block: 9, y: 950}, {block: 10, y: 950}, {block: 11, y: 950}, {block: 12, y: 950}, {block: 13, y: 950}, {block: 14, y: 950}, {block: 15, y: 950}], spikes: [{spike: 2, y: 985}], button: [{button: 4, y: 890}, {button: 5, y: 890}, {button: 6, y: 890}], doors: [{door: 0, y: 500}, {door: 1, y: 500}]});
        buttonRemove(avatar3, button[3], {players: [{player: avatar1, x: startingX, y: startingY}, {player: avatar2, x: startingX, y: startingY}, {player: avatar3, x: startingX, y: startingY}, {player: avatar4, x: startingX, y: startingY}], blocks: [{block: 8, y: 950}, {block: 9, y: 950}, {block: 10, y: 950}, {block: 11, y: 950}, {block: 12, y: 950}, {block: 13, y: 950}, {block: 14, y: 950}, {block: 15, y: 950}], spikes: [{spike: 2, y: 985}], button: [{button: 4, y: 890}, {button: 5, y: 890}, {button: 6, y: 890}], doors: [{door: 0, y: 500}, {door: 1, y: 500}]});
        buttonRemove(avatar4, button[3], {players: [{player: avatar1, x: startingX, y: startingY}, {player: avatar2, x: startingX, y: startingY}, {player: avatar3, x: startingX, y: startingY}, {player: avatar4, x: startingX, y: startingY}], blocks: [{block: 8, y: 950}, {block: 9, y: 950}, {block: 10, y: 950}, {block: 11, y: 950}, {block: 12, y: 950}, {block: 13, y: 950}, {block: 14, y: 950}, {block: 15, y: 950}], spikes: [{spike: 2, y: 985}], button: [{button: 4, y: 890}, {button: 5, y: 890}, {button: 6, y: 890}], doors: [{door: 0, y: 500}, {door: 1, y: 500}]});

        colorButton(avatar1, 0, 1, 2, 500, 3, 500, 4, button[4]);
        colorButton(avatar3, 2, 3, 4, 1500, 5, 1500, 5, button[5]);

        //button 3
        buttonRemove(avatar1, button[6], {players: [{player: avatar1, x: 1200, y: 50}, {player: avatar2, x: 1500, y: 900}, {player: avatar3, x: 100, y: 100}, {player: avatar4, x: 50, y: 100}], blocks: [{block: 16, y: 175}, {block: 17, y: 175}, {block: 18, y: 175}, {block: 19, y: 100}, {block: 20, y: 100}, {block: 21, y: 100}, {block: 22, y: 750}, {block: 23, y: 965}, {block: 24, y: 965}, {block: 25, y: 665}, {block: 26, y: 425}, {block: 27, y: 375}], spikes: [{spike: 3, y: 385}, {spike: 4, y: 985}, {spike: 5, y: 200}, {spike: 6, y: 230}, {spike: 7, y: 260}, {spike: 8, y: 290}, {spike: 9, y: 320}, {spike: 10, y: 350}, {spike: 11, y: 380}, {spike: 12, y: 410}, {spike: 13, y: 440}, {spike: 14, y: 470}, {spike: 15, y: 500}, {spike: 16, y: 200}, {spike: 17, y: 230}, {spike: 18, y: 260}, {spike: 19, y: 290}, {spike: 20, y: 320}, {spike: 21, y: 350}, {spike: 22, y: 380}, {spike: 23, y: 410}, {spike: 24, y: 440}, {spike: 25, y: 470}, {spike: 26, y: 500}, {spike: 27, y: 530}], button: [{button: 7, y: 340}, {button: 8, y: 140}, {button: 9, y: 715}], doors: [{door: 5, y: 155}, {door: 6, y: 80}, {door: 7, y: 920}]});
        buttonRemove(avatar2, button[6], {players: [{player: avatar1, x: 1200, y: 50}, {player: avatar2, x: 1500, y: 900}, {player: avatar3, x: 100, y: 100}, {player: avatar4, x: 50, y: 100}], blocks: [{block: 16, y: 175}, {block: 17, y: 175}, {block: 18, y: 175}, {block: 19, y: 100}, {block: 20, y: 100}, {block: 21, y: 100}, {block: 22, y: 750}, {block: 23, y: 965}, {block: 24, y: 965}, {block: 25, y: 665}, {block: 26, y: 425}, {block: 27, y: 375}], spikes: [{spike: 3, y: 385}, {spike: 4, y: 985}, {spike: 5, y: 200}, {spike: 6, y: 230}, {spike: 7, y: 260}, {spike: 8, y: 290}, {spike: 9, y: 320}, {spike: 10, y: 350}, {spike: 11, y: 380}, {spike: 12, y: 410}, {spike: 13, y: 440}, {spike: 14, y: 470}, {spike: 15, y: 500}, {spike: 16, y: 200}, {spike: 17, y: 230}, {spike: 18, y: 260}, {spike: 19, y: 290}, {spike: 20, y: 320}, {spike: 21, y: 350}, {spike: 22, y: 380}, {spike: 23, y: 410}, {spike: 24, y: 440}, {spike: 25, y: 470}, {spike: 26, y: 500}, {spike: 27, y: 530}], button: [{button: 7, y: 340}, {button: 8, y: 140}, {button: 9, y: 715}], doors: [{door: 5, y: 155}, {door: 6, y: 80}, {door: 7, y: 920}]});
        buttonRemove(avatar3, button[6], {players: [{player: avatar1, x: 1200, y: 50}, {player: avatar2, x: 1500, y: 900}, {player: avatar3, x: 100, y: 100}, {player: avatar4, x: 50, y: 100}], blocks: [{block: 16, y: 175}, {block: 17, y: 175}, {block: 18, y: 175}, {block: 19, y: 100}, {block: 20, y: 100}, {block: 21, y: 100}, {block: 22, y: 750}, {block: 23, y: 965}, {block: 24, y: 965}, {block: 25, y: 665}, {block: 26, y: 425}, {block: 27, y: 375}], spikes: [{spike: 3, y: 385}, {spike: 4, y: 985}, {spike: 5, y: 200}, {spike: 6, y: 230}, {spike: 7, y: 260}, {spike: 8, y: 290}, {spike: 9, y: 320}, {spike: 10, y: 350}, {spike: 11, y: 380}, {spike: 12, y: 410}, {spike: 13, y: 440}, {spike: 14, y: 470}, {spike: 15, y: 500}, {spike: 16, y: 200}, {spike: 17, y: 230}, {spike: 18, y: 260}, {spike: 19, y: 290}, {spike: 20, y: 320}, {spike: 21, y: 350}, {spike: 22, y: 380}, {spike: 23, y: 410}, {spike: 24, y: 440}, {spike: 25, y: 470}, {spike: 26, y: 500}, {spike: 27, y: 530}], button: [{button: 7, y: 340}, {button: 8, y: 140}, {button: 9, y: 715}], doors: [{door: 5, y: 155}, {door: 6, y: 80}, {door: 7, y: 920}]});
        buttonRemove(avatar4, button[6], {players: [{player: avatar1, x: 1200, y: 50}, {player: avatar2, x: 1500, y: 900}, {player: avatar3, x: 100, y: 100}, {player: avatar4, x: 50, y: 100}], blocks: [{block: 16, y: 175}, {block: 17, y: 175}, {block: 18, y: 175}, {block: 19, y: 100}, {block: 20, y: 100}, {block: 21, y: 100}, {block: 22, y: 750}, {block: 23, y: 965}, {block: 24, y: 965}, {block: 25, y: 665}, {block: 26, y: 425}, {block: 27, y: 375}], spikes: [{spike: 3, y: 385}, {spike: 4, y: 985}, {spike: 5, y: 200}, {spike: 6, y: 230}, {spike: 7, y: 260}, {spike: 8, y: 290}, {spike: 9, y: 320}, {spike: 10, y: 350}, {spike: 11, y: 380}, {spike: 12, y: 410}, {spike: 13, y: 440}, {spike: 14, y: 470}, {spike: 15, y: 500}, {spike: 16, y: 200}, {spike: 17, y: 230}, {spike: 18, y: 260}, {spike: 19, y: 290}, {spike: 20, y: 320}, {spike: 21, y: 350}, {spike: 22, y: 380}, {spike: 23, y: 410}, {spike: 24, y: 440}, {spike: 25, y: 470}, {spike: 26, y: 500}, {spike: 27, y: 530}], button: [{button: 7, y: 340}, {button: 8, y: 140}, {button: 9, y: 715}], doors: [{door: 5, y: 155}, {door: 6, y: 80}, {door: 7, y: 920}]});

        buttonAdd(avatar2, button[9], {button: [{button: 10, y: 630}]});

        colorButton(avatar3, 5, 8, 5, 1500, 8, 355, 8, button[8]);
        colorButton(avatar4, 6, 8, 10, 350, 9, 360, 7, button[7]);

        buttonEnd(avatar1, button[10]);
        buttonEnd(avatar2, button[10]);
        buttonEnd(avatar3, button[10]);
        buttonEnd(avatar4, button[10]);

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
    var orangeButtonTrigger = false;
    var pinkButtonTrigger = false;
    var spikeTrigger = false;

    //tutorial end trigger
    if(avatar1.x > 1400 && avatar1.y < 700){
        tutorialEnd = true;
    }

     //spike text appears
    if (avatar1.x > 500 && avatar1.x < 850 || avatar2.x > 500 && avatar2.x < 850 || avatar3.x > 500 && avatar3.x < 850 || avatar4.x > 500 && avatar4.x < 850 ){
        spikeTrigger = true;
    }

    //orange button text
    if (avatar1.x > 750 && avatar1.x < 1300 || avatar2.x > 750 && avatar2.x < 1300 || avatar3.x > 750 && avatar3.x < 1300 || avatar4.x > 750 && avatar4.x < 1300){
        orangeButtonTrigger = true;
    }

    //pink button text appears
    if (avatar1.x > 1400 || avatar2.x > 1400 || avatar3.x > 1400 || avatar4.x > 1400){
        pinkButtonTrigger = true;
    }

    //controls text
    ctx.font = "16px Arial";
    ctx.lineWidth = 3;
    ctx.fillStyle = "#a897fd";
    ctx.strokeText("Arrow Keys", avatar4.x-40, avatar4.y-35);
    ctx.fillText("Arrow Keys", avatar4.x-40, avatar4.y-35);
    ctx.fillStyle = "#9ca4be";
    ctx.strokeText("IJKL", avatar3.x-15, avatar3.y-35);
    ctx.fillText("IJKL", avatar3.x-15, avatar3.y-35);
    ctx.fillStyle = "#8eb8fe";
    ctx.strokeText("TFGH", avatar2.x-23, avatar2.y-35);
    ctx.fillText("TFGH", avatar2.x-23, avatar2.y-35);
    ctx.fillStyle = "#ffa2fa";
    ctx.strokeText("WASD", avatar1.x-23, avatar1.y-35);
    ctx.fillText("WASD", avatar1.x-23, avatar1.y-35);

    //orange button text
    if (tutorialEnd == true){
        ctx.fillText(" ", 0, 0);
    }
    else if(orangeButtonTrigger == true){
    ctx.font = "16px Arial";
    ctx.fillStyle = "orange";
    ctx.fillText("buttons will be pressed when jumped on", 980, 970);
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
        ctx.fillText("crabs hurt", 795, 950);
    }else{
        ctx.fillText(" ", 0, 0);
    }

    //victory text
    if(gameWin == true){
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText("CONGRATULATIONS!!!", c.width/2-200, c.height/2);
    ctx.fillText("YOU WIN", c.width/2-80, 600);
    }

    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    avatar1.render();
    avatar2.render();
    avatar3.render();
    avatar4.render();
}




function createBlock(x, y, w, h) {
    var block = new GameObject();
    block.color = "";
    block.image = wall;

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
    spike.color = "";
    spike.image = spike_image;

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
            if(player1up == true){ 
                avatar1.vy = jumpHeight;
                jump1.currentTime = 0;
                jump1.play();
            }
        }

        //top of block player 2
        while(block.hitTestPoint(avatar2.bottom()) ||  block.hitTestPoint(avatar2.leftbottom()) || block.hitTestPoint(avatar2.rightbottom())){
            avatar2.vy = 0;
            avatar2.y--;

            //jumping 
            if(player2up == true){ 
                avatar2.vy = jumpHeight;
                jump2.currentTime = 0;
                jump2.play();
            }
        }

        //top of block player 3
        while(block.hitTestPoint(avatar3.bottom()) ||  block.hitTestPoint(avatar3.leftbottom()) || block.hitTestPoint(avatar3.rightbottom())){
            avatar3.vy = 0;
            avatar3.y--;

            //jumping 
            if(player3up == true){ 
                avatar3.vy = jumpHeight;
                jump3.currentTime = 0;
                jump3.play();
            }
        }

        //top of block player 4
        while(block.hitTestPoint(avatar4.bottom()) ||  block.hitTestPoint(avatar4.leftbottom()) || block.hitTestPoint(avatar4.rightbottom())){
            avatar4.vy = 0;
            avatar4.y--;

            //jumping 
            if(player4up == true){ 
                avatar4.vy = jumpHeight;
                jump4.currentTime = 0;
                jump4.play();
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
        if(player1up == true){ 
            avatar1.vy = jumpHeight;
            jump1.currentTime = 0;
            jump1.play();
        }
    }

    //player 2 ground bounds
    if(avatar2.y > c.height - avatar2.h/2){

        avatar2.vy = 0;
        avatar2.y = c.height - avatar2.h/2;

        //jumping 
        if(player2up == true){ 
            avatar2.vy = jumpHeight;
            jump2.currentTime = 0;
            jump2.play();
        }
    }

    //player 3 ground bounds
    if(avatar3.y > c.height - avatar3.h/2){

        avatar3.vy = 0;
        avatar3.y = c.height - avatar3.h/2;

        //jumping 
        if(player3up == true){ 
            avatar3.vy = jumpHeight;
            jump3.currentTime = 0;
            jump3.play();
        }
    }

    //player 4 ground bounds
    if(avatar4.y > c.height - avatar4.h/2){

        avatar4.vy = 0;
        avatar4.y = c.height - avatar4.h/2;

        //jumping 
        if(player4up == true){ 
            avatar4.vy = jumpHeight;
            jump4.currentTime = 0;
            jump4.play();
        }
    }
}


function playerOnPlayer(player1, player2, player1Jump, player2Jump){

    //top of player 1
    while(player1.hitTestPoint(player2.bottom()) || player1.hitTestPoint(player2.leftbottom()) || player1.hitTestPoint(player2.rightbottom())){
        player2.vy = 0;
        player2.y--;

        //jumping 
        if(player2Jump == true){ 
            player2.vy = jumpHeight;
            jump3.currentTime = 0;
            jump3.play();
        }


    }
    //top of player 2
    while(player2.hitTestPoint(player1.bottom()) || player2.hitTestPoint(player1.leftbottom()) || player2.hitTestPoint(player1.rightbottom())){
        player1.vy = 0;
        player1.y--;

        //jumping 
        if(player1Jump == true){ 
            player1.vy = jumpHeight;
            jump4.currentTime = 0;
            jump4.play();
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
        dead_sound.play();
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

    if (buttons.overlaps(player) && player.vy > 0 && player.y < buttons.y) {

        //top of button
        while(buttons.hitTestPoint(player.bottom()) ||  buttons.hitTestPoint(player.leftbottom()) || buttons.hitTestPoint(player.rightbottom())){
            player.vy = 0;
            player.y--;

            if(player.vy >= 0){

            buttons.y = 1500;
            button_click.play();

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

    if (buttons.overlaps(player) && player.vy > 0 && player.y < buttons.y) {

        //top of button
        while(buttons.hitTestPoint(player.bottom()) ||  buttons.hitTestPoint(player.leftbottom()) || buttons.hitTestPoint(player.rightbottom())){
            player.vy = 0;
            player.y--;

            if(player.vy == 0){

            buttons.y = 1500;
            button_click.play();
                //erase buttons
                for (var i = 0; i < button.length; i++) {
                    button[i].y = 2000;
                }

                //erase doors
                for (var i = 0; i < doors.length; i++) {
                    doors[i].y = 2000;
                }

                //erase blocks
                for (var i = 0; i < blocks.length; i++) {
                    blocks[i].y = 2000;
                }
                
                //erase spikes
                for (var i = 0; i < spikes.length; i++) {
                    spikes[i].y = 2000;
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



function colorButton(player, door1, door2, door3, door3y, door4, door4y, button1, buttons){

    if (buttons.overlaps(player) && player.vy > 0 && player.y < buttons.y) {

        //top of button
        while(buttons.hitTestPoint(player.bottom()) ||  buttons.hitTestPoint(player.leftbottom()) || buttons.hitTestPoint(player.rightbottom())){
            player.vy = 0;
            player.y--;

            if(player.vy == 0){
                button_click.play();
                //erase doors and button
                button[button1].y = 2000;
                doors[door1].y = 2000;
                doors[door2].y = 2000;

                //new doors
                doors[door3].y = door3y;
                doors[door4].y = door4y;
            }
        }
    
    }
}



function buttonEnd(player, buttons){

    if (buttons.overlaps(player) && player.vy > 0 && player.y < buttons.y) {

        //top of button
        while(buttons.hitTestPoint(player.bottom()) ||  buttons.hitTestPoint(player.leftbottom()) || buttons.hitTestPoint(player.rightbottom())){
            player.vy = 0;
            player.y--;

            if(player.vy == 0){

            buttons.y = 1500;
            button_click.play();
            win_sound.play();

                //erase buttons
                for (var i = 0; i < button.length; i++) {
                    button[i].y = 2000;
                }

                //erase doors
                for (var i = 0; i < doors.length; i++) {
                    doors[i].y = 2000;
                }

                //erase blocks
                for (var i = 0; i < blocks.length; i++) {
                    blocks[i].y = 2000;
                }
                
                //erase spikes
                for (var i = 0; i < spikes.length; i++) {
                    spikes[i].y = 2000;
                }

                gameWin = true;
                
            }
        }
    }
}