//player 1
var player1up = false;
var player1left = false;
var player1right = false;

//player 2
var player2up = false;
var player2left = false;
var player2right = false;

//player 3
var player3up = false;
var player3left = false;
var player3right = false;

//player 4
var player4up = false;
var player4left = false;
var player4right = false;

//start key
var gameStart = false;

var y = false;
var n = false;


document.addEventListener(`keydown`, press);
function press(e)
{
    if(e.keyCode == 87){player1up = true;}
    if(e.keyCode == 65){player1left = true;}
    if(e.keyCode == 68){player1right = true;}

    if(e.keyCode == 84){player2up = true;}
    if(e.keyCode == 70){player2left = true;}
    if(e.keyCode == 72){player2right = true;}

    if(e.keyCode == 73){player3up = true;}
    if(e.keyCode == 74){player3left = true;}
    if(e.keyCode == 76){player3right = true;}

    if(e.keyCode == 38){player4up = true;}
    if(e.keyCode == 37){player4left = true;}
    if(e.keyCode == 39){player4right = true;}

    if(e.code == "Space"){gameStart = true;}

    if(e.keycode == "89"){y = true;}
    if(e.keycode == "78"){n = true;}
}

document.addEventListener(`keyup`, release);
function release(e)
{
    if(e.keyCode == 87){player1up = false;}
    if(e.keyCode == 65){player1left = false;}
    if(e.keyCode == 68){player1right = false;}
    
    if(e.keyCode == 84){player2up = false;}
    if(e.keyCode == 70){player2left = false;}
    if(e.keyCode == 72){player2right = false;}

    if(e.keyCode == 73){player3up = false;}
    if(e.keyCode == 74){player3left = false;}
    if(e.keyCode == 76){player3right = false;}

    if(e.keyCode == 38){player4up = false;}
    if(e.keyCode == 37){player4left = false;}
    if(e.keyCode == 39){player4right = false;}

    if(e.keycode == "89"){y = false;}
    if(e.keycode == "78"){n = false;}
}