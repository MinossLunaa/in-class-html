//player 1
var w = false;
var a = false;
var s = false;
var d = false;

//player 2
var t = false;
var f = false;
var g = false;
var h = false;

//player 3
var ibutton = false;
var j = false;
var k = false;
var l = false;

//player 4
var uparrow = false;
var downarrow = false;
var leftarrow = false;
var rightarrow = false;

document.addEventListener(`keydown`, press);
function press(e)
{
    if(e.keyCode == 87){w = true;}
    if(e.keyCode == 83){s = true;}
    if(e.keyCode == 65){a = true;}
    if(e.keyCode == 68){d = true;}

    if(e.keyCode == 84){t = true;}
    if(e.keyCode == 70){f = true;}
    if(e.keyCode == 71){g = true;}
    if(e.keyCode == 72){h = true;}

    if(e.keyCode == 73){ibutton = true;}
    if(e.keyCode == 74){j = true;}
    if(e.keyCode == 75){k = true;}
    if(e.keyCode == 76){l = true;}

    if(e.keyCode == 38){uparrow = true;}
    if(e.keyCode == 40){downarrow = true;}
    if(e.keyCode == 37){leftarrow = true;}
    if(e.keyCode == 39){rightarrow = true;}
}

document.addEventListener(`keyup`, release);
function release(e)
{
    if(e.keyCode == 87){w = false;}
    if(e.keyCode == 83){s = false;}
    if(e.keyCode == 65){a = false;}
    if(e.keyCode == 68){d = false;}

    if(e.keyCode == 84){t = false;}
    if(e.keyCode == 70){f = false;}
    if(e.keyCode == 71){g = false;}
    if(e.keyCode == 72){h = false;}

    if(e.keyCode == 73){ibutton = false;}
    if(e.keyCode == 74){j = false;}
    if(e.keyCode == 75){k = false;}
    if(e.keyCode == 76){l = false;}

    if(e.keyCode == 38){uparrow = false;}
    if(e.keyCode == 40){downarrow = false;}
    if(e.keyCode == 37){leftarrow = false;}
    if(e.keyCode == 39){rightarrow = false;}
}