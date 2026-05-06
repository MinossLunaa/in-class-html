var c = document.querySelector(`canvas`);
var ctx = c.getContext(`2d`);
var fps = 1000/60;
var timer = setInterval(main, fps);

var gravity = 0.5;
var jumping = false;

var leftcollision = false;
var rightcollision = false;
var topcollision = false;
var bottomcollision = false;

//create player 1
var avatar1 = new GameObject();
avatar1.x = 200;
avatar1.y = 800;
avatar1.color = "pink";

//create player 2
var avatar2 = new GameObject();
avatar2.x = 400;
avatar2.y = 975;
avatar2.color = "cyan";

//create player 3
var avatar3 = new GameObject();
avatar3.x = 1000;
avatar3.y = 975;
avatar3.color = "grey";

//create player 4
var avatar4 = new GameObject();
avatar4.x = 800;
avatar4.y = 975;
avatar4.color = "purple";

//set player speed
avatar1.vx = 5;
avatar1.vy = 5;
avatar2.vx = 5;
avatar3.vx = 5;
avatar4.vx = 5;

//place blocks
var blocks = [];
blocks.push(createBlock(500, 950));
blocks.push(createBlock(700, 800));
blocks.push(createBlock(300, 600));

//create blocks
function createBlock(x, y, w = 100, h = 100) {
    var b = new GameObject();
    b.color = "#ffff00";
    b.w = w;
    b.h = h;
    b.x = x;
    b.y = y;

    return b;
}

function main()
{
ctx.clearRect(0, 0, c.width, c.height);

    //player 1 input
    
    if(s == true){avatar1.y += avatar1.vy;}
    if(d == true){avatar1.x += avatar1.vx;}
    if(a == true){avatar1.x -= avatar1.vx;}

    //player 2 input
    if(t == true){avatar2.y -= avatar1.vy;}
    if(h == true){avatar2.x += avatar2.vx;}
    if(f == true){avatar2.x -= avatar2.vx;}

    //player 3 input
    if(l == true){avatar3.x += avatar3.vx;}
    if(j == true){avatar3.x -= avatar3.vx;}

    //player 4 input
    if(rightarrow == true){avatar4.x += avatar4.vx;}
    if(leftarrow == true){avatar4.x -= avatar4.vx;}


    for (var i = 0; i < blocks.length; i++) {
        
        //collision detection for blocks -- player 1
        if (blocks[i].overlaps(avatar1)) {

            //collision with top of blocks
            while(blocks[i].hitTestPoint(avatar1.bottom())){
                avatar1.vy = 0;
                avatar1.y--;

                //jumping
                if(w == true){
                    avatar1.vy = -15;
                }
            }

            //collision with bottom of blocks
            while(blocks[i].hitTestPoint(avatar1.top())){
                avatar1.vy = 0;
                avatar1.y++;
            }

            //collision with left of blocks
            while(blocks[i].hitTestPoint(avatar1.right())){
                avatar1.x--;
            }

            //collision with right of blocks
            while(blocks[i].hitTestPoint(avatar1.left())){
                avatar1.x++;
            }
            
        }   


        //collision detection for blocks -- player 2
        

        //collision detection for blocks -- player 3
        

        //collision detection for blocks -- player 4
        


        blocks[i].render();
    }
    avatar1.vy += gravity;
    avatar1.y += avatar1.vy;

    
    //keeps player 1 on screen
    if(avatar1.x < 0 + avatar1.w/2){avatar1.x = 0 + avatar1.w/2;}
    if(avatar1.x > c.width + -avatar1.w/2){avatar1.x = c.width + -avatar1.w/2;}
    if(avatar1.y < 0 + avatar1.h/2){avatar1.y = 0 + avatar1.h/2;}

    //player 1 on the ground
    if(avatar1.y > c.height + -avatar1.h/2){
        avatar1.vy = 0;
        avatar1.y = c.height + -avatar1.h/2;

        //jumping
        if(w == true){
            avatar1.vy = -15;
        }
    }

    
    //keeps player 2 on screen
    if(avatar2.x < 0 + avatar2.w/2){avatar2.x = 0 + avatar2.w/2;}
    if(avatar2.x > c.width + -avatar2.w/2){avatar2.x = c.width + -avatar2.w/2;}
    if(avatar2.y < 0 + avatar2.h/2){avatar2.y = 0 + avatar2.h/2;}
    if(avatar2.y > c.height + -avatar2.h/2){avatar2.y = c.height + -avatar2.h/2;} 

    //keeps player 3 on screen
    if(avatar3.x < 0 + avatar3.w/2){avatar3.x = 0 + avatar3.w/2;}
    if(avatar3.x > c.width + -avatar3.w/2){avatar3.x = c.width + -avatar3.w/2;}
    if(avatar3.y < 0 + avatar3.h/2){avatar3.y = 0 + avatar3.h/2;}
    if(avatar3.y > c.height + -avatar3.h/2){avatar3.y = c.height + -avatar3.h/2;} 

    //keeps player 4 on screen
    if(avatar4.x < 0 + avatar4.w/2){avatar4.x = 0 + avatar4.w/2;}
    if(avatar4.x > c.width + -avatar4.w/2){avatar4.x = c.width + -avatar4.w/2;}
    if(avatar4.y < 0 + avatar4.h/2){avatar4.y = 0 + avatar4.h/2;}
    if(avatar4.y > c.height + -avatar4.h/2){avatar4.y = c.height + -avatar4.h/2;} 


    avatar1.render();
    avatar2.render();
    avatar3.render();
    avatar4.render();
}