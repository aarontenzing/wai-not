var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//De grootte van het tangramvierkant:
var zijde = 100;
var z_vierkant = 0.5*Math.sqrt(2*zijde*zijde) 
draw();

//De verschillende vormen
function draw(){

    //Vierkant
    ctx.save();
    ctx.translate(zijde,50);
    ctx.rotate(45*Math.PI/180);
    ctx.fillStyle = "red";
    ctx.fillRect(0,0, z_vierkant, z_vierkant);
    ctx.restore();

    //Grote Driehoek 
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(zijde/2, zijde/2);
    ctx.lineTo(0, zijde);
    ctx.fill();

    //Kleine Driehoek 
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(zijde/2, zijde/2);
    ctx.lineTo(0, zijde/2);
    ctx.fill();
    

    //Parallellogram
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(z_vierkant),Math.sin(z_vierkant));
    ctx.lineTo(Math.cos(z_vierkant)+zijde/2,Math.sin(z_vierkant));
    ctx.lineTo(zijde/2,0);
    ctx.fill();
}