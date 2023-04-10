var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var vierkant;
vierkant= new component(30, 30, "orange", 10, 120);
//De grootte van het tangramvierkant:
var zijde = 100;
var z_vierkant = zijde/(2*Math.sqrt(2))
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
    var place = 100;
    //ctx.save();
    //ctx.translate(place,place);
    //ctx.rotate(180*Math.PI/180);
    ctx.moveTo(place, place);
    ctx.lineTo(place+zijde/2,place);
    ctx.lineTo(place+zijde/2+z_vierkant*Math.cos(45*Math.PI/180),place+z_vierkant*Math.sin(45*Math.PI/180));
    ctx.lineTo(place+z_vierkant*Math.cos(45*Math.PI/180),place+z_vierkant*Math.sin(45*Math.PI/180));  
    ctx.lineTo(place,place);
    ctx.fill();
    //ctx.restore();
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
}

triangle.onmousedown = function(event) {

    let shiftX = event.clientX - triangle.getBoundingClientRect().left;
    let shiftY = event.clientY - triangle.getBoundingClientRect().top;
  
    triangle.style.position = 'absolute';
    triangle.style.zIndex = 1000;
    document.body.append(triangle);
  
    moveAt(event.pageX, event.pageY);
  
    // moves the triangle at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
      triangle.style.left = pageX - shiftX + 'px';
      triangle.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // move the triangle on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // drop the triangle, remove unneeded handlers
    triangle.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      triangle.onmouseup = null;
    };
  
  };
  
  triangle.ondragstart = function() {
    return false;
  };