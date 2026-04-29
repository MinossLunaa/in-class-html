var c = document.querySelector(`canvas`);
var ctx = c.getContext(`2d`);
var fps = 1000/60;
var timer = setInterval(main, fps);

var avatar1 = new GameObject();
avatar1.x = 300;
avatar1.y = 975;
avatar1.color = "hotpink";

var avatar2 = new GameObject();
avatar2.x = 400;
avatar2.y = 975;
avatar2.color = "cyan";

var avatar3 = new GameObject();
avatar3.x = 700;
avatar3.y = 975;
avatar3.color = "grey";

var avatar4 = new GameObject();
avatar4.x = 800;
avatar4.y = 975;
avatar4.color = "purple";

avatar1.vx = 5;
avatar2.vx = 5;
avatar3.vx = 5;
avatar4.vx = 5;

var blocks = [];
blocks.push(createBlock(500, 950));
blocks.push(createBlock(700, 800));
blocks.push(createBlock(300, 600));

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

    if(d == true){avatar1.x += avatar1.vx;}
    if(a == true){avatar1.x -= avatar1.vx;}

    if(h == true){avatar2.x += avatar2.vx;}
    if(f == true){avatar2.x -= avatar2.vx;}

    if(l == true){avatar3.x += avatar3.vx;}
    if(j == true){avatar3.x -= avatar3.vx;}

    if(rightarrow == true){avatar4.x += avatar4.vx;}
    if(leftarrow == true){avatar4.x -= avatar4.vx;}


    for (var i = 0; i < blocks.length; i++) {

        if (blocks[i].overlaps(avatar1)) {
            if (avatar1.vy > 0) {
                avatar1.y = blocks[i].y - blocks[i].h/2 - avatar1.h/2;
                avatar1.vy = 0;
            }
            if (avatar1.vx > 0) {
                avatar1.x = blocks[i].x - blocks[i].w/2 - avatar1.w/2;
                avatar1.vx = 0;
            }
        }

        if (blocks[i].overlaps(avatar2)) {
            if (avatar2.vy > 0) {
                avatar2.y = blocks[i].y - blocks[i].h/2 - avatar2.h/2;
                avatar2.vy = 0;
            }
        }

        if (blocks[i].overlaps(avatar3)) {
            if (avatar3.vy > 0) {
                avatar3.y = blocks[i].y - blocks[i].h/2 - avatar3.h/2;
                avatar3.vy = 0;
            }
        }

        if (blocks[i].overlaps(avatar4)) {
            if (avatar4.vy > 0) {
                avatar4.y = blocks[i].y - blocks[i].h/2 - avatar4.h/2;
                avatar4.vy = 0;
            }
        }

        blocks[i].render();
    }

    if (w == true && canJump1){ avatar1.vy = jumping; canJump1 = false; }
    if (t == true && canJump2){ avatar2.vy = jumping; canJump2 = false; }
    if (ibutton == true && canJump3){ avatar3.vy = jumping; canJump3 = false; }
    if (uparrow == true && canJump4){ avatar4.vy = jumping; canJump4 = false; }

    avatar1.render();
    avatar2.render();
    avatar3.render();
    avatar4.render();
}