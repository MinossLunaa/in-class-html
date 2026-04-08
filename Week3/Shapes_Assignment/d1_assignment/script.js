
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

        //circle
        ctx.strokeStyle = "#f00";
        ctx.lineWidth = 5.0;
        ctx.fillStyle = "#ffff00";
        ctx.beginPath();
        ctx.arc(385, 440, 65, 0, 2*Math.PI);
        ctx.fill();
        ctx.stroke();

        //pentagon
        ctx.strokeStyle = "#00ffff";
        ctx.lineWidth = 5.0;
        ctx.fillStyle = "#ff00ff";
        ctx.beginPath();
        ctx.moveTo(557, 308);
        ctx.lineTo(665, 283);
        ctx.lineTo(723, 379);
        ctx.lineTo(649, 463);
        ctx.lineTo(547, 419);
        ctx.lineTo(557, 308);
        ctx.fill();
        ctx.stroke();

        //square
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5.0;
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.moveTo(85, 302);
        ctx.lineTo(183, 302);
        ctx.lineTo(183, 400);
        ctx.lineTo(85, 400);
        ctx.lineTo(85, 302);
        ctx.fill();
        ctx.stroke();

        //star
        ctx.strokeStyle = "rgb(32,32,32)";
        ctx.lineWidth = 5.0;
        ctx.fillStyle = "ffff00";
        ctx.beginPath();
        ctx.moveTo(635, 496);
        ctx.lineTo(667, 553);
        ctx.lineTo(733, 567);
        ctx.lineTo(687, 616);
        ctx.lineTo(695, 680);
        ctx.lineTo(635, 650);
        ctx.lineTo(575, 680);
        ctx.lineTo(583, 616);
        ctx.lineTo(537, 567);
        ctx.lineTo(603, 553);
        ctx.lineTo(635, 496);
        ctx.fill();
        ctx.stroke();

        //line
        ctx.strokeStyle = "rgb(255,0,0)";
        ctx.lineWidth = 5.0;
        ctx.beginPath();
        ctx.moveTo(84, 682);
        ctx.lineTo(277, 548);
        ctx.stroke();

        