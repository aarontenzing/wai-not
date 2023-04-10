var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var vierkant;
vierkant= new component(30, 30, "orange", 10, 120);
//De grootte van het tangramvierkant:
var zijde = 100;
var z_vierkant = zijde/(2*Math.sqrt(2))

let drag = false;
let startX;
let startY;
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

let is_mouse_in_shape = function(x,y,shape){
  let shape_left = shape.x;
  let shape_right = shape.x + shape.width;
  let shape_top = shape.x + shape.width;
  let shape_bottom = shape.y + shape.height;

  if(x>shape_left && x < shape_right && y>shape_top && y<shape_bottom){
    return true;
  }
  return false;
}

let mouse_down = function(event){

  event.PreventDefault();

  startX = parseInt(event.clientX);
  startY = parseInt(event.clientY);

  if(is_mouse_in_shape(startX,startY,vierkant)){
    console.log('yes');
    drag=true;
    return;
  }else{
    console.log('no');
  }
}

let mouse_up = function(event){
  event.PreventDefault();
  if(!drag){
    return;
  }
  event.PreventDefault();
  drag=false;
}

let mouse_out = function(event){
  event.PreventDefault();
  if(!drag){
    return;
  }
  event.PreventDefault();
  drag=false;
}

let mouse_move = function(event){
  event.PreventDefault();
  if(!drag){
    return;
  }else{
    event.PreventDefault();
    let mouseX = parseInt(event.clientX);
    let mouseY = parseInt(event.clientY);

    let dx = mouseX - startX;
    let dy = mouseX - startY;

    console.log(dx,dy);
    vierkant.x += dx;
    vierkant.y += dy;

    //clear it and redraw
    ctx.clearRect(0,0,650,500);
    vierkant= new component(30, 30, "orange", 10, 120);
    
    startX = mouseX;
    startY = mouseY;

  }
}

//eventlisteners
canvas.onmousedown = mouse_down;
canvas.onmouseup = mouse_up;
canvas.onmouseout = mouse_out;
canvas.onmousemove = mouse_move;
